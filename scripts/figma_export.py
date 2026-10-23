#!/usr/bin/env python3
"""
figma_export.py — pull ALL text and images out of a Figma file so the content
can be moved to a new website.

Usage:
    export FIGMA_TOKEN=figd_xxxxxxxxxxxxxxxx
    python3 figma_export.py                      # uses the default file key below
    python3 figma_export.py <FILE_KEY> [OUT_DIR] # or override

Needs only Python 3 standard library (urllib + json). No pip installs.

The token must be a Figma *personal access token* with the scope
    file_content:read
ticked (that single scope covers all three endpoints used here).

What you get in OUT_DIR (default ./figma_export):
    figma_file.json           raw file tree straight from the API
    figma_text.md             every TEXT node, grouped by page / top-level frame,
                              in reading order, with font family / size / weight
    figma_colors.json         every distinct solid colour + gradient, with counts
    figma_image_map.json      which imageRef is used by which node / frame
    figma_images/originals/   the original uploaded bitmaps (by imageRef)
    figma_images/frames/      every top-level frame rendered to PNG at 2x
"""

import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

# --------------------------------------------------------------------------
# Settings you might want to tweak
# --------------------------------------------------------------------------
DEFAULT_FILE_KEY = "yLf57sLbNZrBNeXnRMLH4X"   # the ZUN file
API_BASE = "https://api.figma.com"
RENDER_SCALE = 2                               # 2x PNGs for retina-quality assets
RENDER_BATCH_SIZE = 20                         # node ids per /v1/images request
SLEEP_BETWEEN_API_CALLS = 6.0                  # seconds; ~10 req/min keeps Tier-1 happy
SLEEP_BETWEEN_DOWNLOADS = 0.2                  # S3 downloads are not rate limited, be polite
MAX_RETRIES = 6                                # how many times to retry a 429 / 5xx

# Node types we treat as a "top-level frame" (a screen / artboard) on a page.
FRAME_LIKE_TYPES = {"FRAME", "COMPONENT", "COMPONENT_SET", "INSTANCE", "GROUP"}

# Map the Content-Type header of a downloaded image to a file extension.
CONTENT_TYPE_TO_EXT = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
}


# --------------------------------------------------------------------------
# Small helpers
# --------------------------------------------------------------------------
def log(msg):
    """Print a progress line immediately (no buffering) so you can watch it run."""
    print(msg, flush=True)


def safe_filename(name, fallback="untitled"):
    """Turn any Figma layer name into something safe to use as a file name."""
    cleaned = re.sub(r"[^A-Za-z0-9._-]+", "_", name or "").strip("_")
    return (cleaned or fallback)[:80]


def rgba_to_hex(color):
    """Convert Figma's {r,g,b,a} (all 0..1 floats) into '#RRGGBB' and a 0..1 alpha."""
    r = round(color.get("r", 0) * 255)
    g = round(color.get("g", 0) * 255)
    b = round(color.get("b", 0) * 255)
    return "#{:02X}{:02X}{:02X}".format(r, g, b), round(color.get("a", 1), 3)


# --------------------------------------------------------------------------
# Talking to the Figma API
# --------------------------------------------------------------------------
def api_get(token, path, params=None):
    """
    Call one Figma REST endpoint and return the parsed JSON.
    Retries automatically on HTTP 429 (rate limited) and 5xx (server hiccup),
    waiting for the number of seconds Figma asks for in the Retry-After header.
    """
    url = API_BASE + path
    if params:
        url += "?" + urllib.parse.urlencode(params)

    for attempt in range(1, MAX_RETRIES + 1):
        req = urllib.request.Request(url, headers={"X-Figma-Token": token})
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as err:
            if err.code == 429 or err.code >= 500:
                wait = int(err.headers.get("Retry-After") or 30)
                log("  HTTP {} on {} — waiting {}s (attempt {}/{})".format(
                    err.code, path, wait, attempt, MAX_RETRIES))
                time.sleep(wait)
                continue
            if err.code in (401, 403):
                sys.exit("Figma said {} {}. Check that FIGMA_TOKEN is valid, "
                         "has the file_content:read scope, and that this account can "
                         "open the file.".format(err.code, err.reason))
            if err.code == 404:
                sys.exit("Figma said 404 for {}. The file key may be wrong, or the token's "
                         "account only has a prototype link and not access to the file itself."
                         .format(path))
            raise
    sys.exit("Gave up after {} retries on {}".format(MAX_RETRIES, path))


def download_file(url, dest_path):
    """
    Download one image URL (a pre-signed S3 link Figma gives us) to disk.
    Returns the file extension chosen from the Content-Type header, or None on failure.
    No token needed for these links.
    """
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            with urllib.request.urlopen(url, timeout=120) as resp:
                content_type = (resp.headers.get("Content-Type") or "").split(";")[0].strip()
                ext = CONTENT_TYPE_TO_EXT.get(content_type, ".bin")
                data = resp.read()
            final_path = dest_path + ext
            with open(final_path, "wb") as fh:
                fh.write(data)
            return ext
        except (urllib.error.HTTPError, urllib.error.URLError) as err:
            log("  download failed ({}) attempt {}/{}: {}".format(err, attempt, MAX_RETRIES, url[:80]))
            time.sleep(5)
    return None


# --------------------------------------------------------------------------
# Walking the document tree
# --------------------------------------------------------------------------
def iter_nodes(node, path=None):
    """
    Generator that yields (node, path) for this node and every descendant.
    `path` is the list of ancestor nodes, so callers know which page/frame a node lives in.
    Invisible layers (visible == False) are skipped entirely.
    """
    if path is None:
        path = []
    if node.get("visible", True) is False:
        return
    yield node, path
    for child in node.get("children", []) or []:
        yield from iter_nodes(child, path + [node])


def top_level_frames(page):
    """
    Return the frames directly on a page, in canvas order.
    Frames tucked inside a SECTION are treated as top-level too (sections are just
    visual grouping on the canvas), and we keep the section name for context.
    """
    frames = []

    def collect(container, section_name):
        for child in container.get("children", []) or []:
            if child.get("visible", True) is False:
                continue
            if child.get("type") == "SECTION":
                collect(child, child.get("name") or section_name)
            elif child.get("type") in FRAME_LIKE_TYPES:
                frames.append((child, section_name))

    collect(page, None)
    return frames


def reading_order_key(node):
    """
    Sort key so text comes out top-to-bottom, then left-to-right.
    Y is bucketed to 8px so text on the same visual line is ordered by X
    even if the boxes are a pixel or two off.
    """
    box = node.get("absoluteBoundingBox") or {}
    y = box.get("y", 0) or 0
    x = box.get("x", 0) or 0
    return (round(y / 8.0), x)


def describe_style(style):
    """Summarise a TypeStyle dict as a short human-readable string for the markdown."""
    if not style:
        return ""
    bits = []
    family = style.get("fontFamily")
    if family:
        bits.append(family)
    weight = style.get("fontWeight")
    if weight is not None:
        bits.append("w{}".format(weight))
    if style.get("italic"):
        bits.append("italic")
    size = style.get("fontSize")
    if size is not None:
        bits.append("{}px".format(round(size, 1)))
    lh = style.get("lineHeightPx")
    if lh is not None:
        bits.append("lh {}px".format(round(lh, 1)))
    ls = style.get("letterSpacing")
    if ls:
        bits.append("ls {}".format(round(ls, 2)))
    case = style.get("textCase")
    if case and case != "ORIGINAL":
        bits.append(case.lower())
    return " · ".join(bits)


def type_signature(style):
    """Key used to count how often each (family, weight, size) combo is used."""
    return (style.get("fontFamily"), style.get("fontWeight"), style.get("fontSize"))


# --------------------------------------------------------------------------
# Text extraction -> figma_text.md
# --------------------------------------------------------------------------
def extract_text(document):
    """
    Build the markdown text dump and a type-system tally.
    Returns (markdown_string, text_node_count, frame_count, type_counts_dict).
    """
    lines = ["# Figma text export", ""]
    text_count = 0
    frame_count = 0
    type_counts = {}

    for page in document.get("children", []) or []:
        if page.get("type") != "CANVAS":
            continue
        lines.append("# Page: {}".format(page.get("name", "")))
        lines.append("")

        for frame, section_name in top_level_frames(page):
            frame_count += 1
            heading = "## {}".format(frame.get("name", ""))
            if section_name:
                heading += "  (section: {})".format(section_name)
            box = frame.get("absoluteBoundingBox") or {}
            lines.append(heading)
            lines.append("<!-- id={} size={}x{} -->".format(
                frame.get("id"), round(box.get("width", 0) or 0), round(box.get("height", 0) or 0)))
            lines.append("")

            texts = [n for n, _ in iter_nodes(frame) if n.get("type") == "TEXT"]
            texts.sort(key=reading_order_key)

            if not texts:
                lines.append("_(no text)_")
                lines.append("")
                continue

            for t in texts:
                chars = (t.get("characters") or "").replace(" ", "\n")
                if not chars.strip():
                    continue
                text_count += 1
                style = t.get("style") or {}
                type_counts[type_signature(style)] = type_counts.get(type_signature(style), 0) + 1

                style_note = describe_style(style)
                # If parts of the text use a different style, list those too.
                overrides = t.get("styleOverrideTable") or {}
                if overrides:
                    extra = sorted({describe_style({**style, **o}) for o in overrides.values()})
                    style_note += "  (mixed: " + "; ".join(extra) + ")"

                lines.append("- **{}** `{}`".format(t.get("name", "").strip() or "text", style_note))
                for text_line in chars.split("\n"):
                    lines.append("  " + text_line)
                lines.append("")

    # Type-system summary at the bottom so the new site can match the fonts.
    lines.append("---")
    lines.append("# Type system (family / weight / size → how many text layers)")
    lines.append("")
    for (family, weight, size), count in sorted(
            type_counts.items(), key=lambda kv: (-kv[1], str(kv[0]))):
        lines.append("- {} · w{} · {}px — {} uses".format(family, weight, size, count))
    lines.append("")

    return "\n".join(lines), text_count, frame_count, type_counts


# --------------------------------------------------------------------------
# Colour extraction -> figma_colors.json
# --------------------------------------------------------------------------
def extract_colors(document):
    """
    Walk every node and tally each distinct solid colour and gradient
    found in fills and strokes (text colour lives in TEXT fills).
    Returns a JSON-ready dict.
    """
    solids = {}     # "#RRGGBB@alpha" -> {hex, alpha, count, in_fills, in_strokes, examples}
    gradients = {}  # signature string -> {type, stops, count, examples}

    for node, path in iter_nodes(document):
        for where in ("fills", "strokes"):
            for paint in node.get(where, []) or []:
                if paint.get("visible", True) is False:
                    continue
                opacity = paint.get("opacity", 1)
                ptype = paint.get("type")

                if ptype == "SOLID" and paint.get("color"):
                    hex_code, alpha = rgba_to_hex(paint["color"])
                    alpha = round(alpha * opacity, 3)
                    key = "{}@{}".format(hex_code, alpha)
                    entry = solids.setdefault(key, {
                        "hex": hex_code, "alpha": alpha, "count": 0,
                        "in_fills": 0, "in_strokes": 0, "example_layers": []})
                    entry["count"] += 1
                    entry["in_fills" if where == "fills" else "in_strokes"] += 1
                    if len(entry["example_layers"]) < 5:
                        entry["example_layers"].append(node.get("name", ""))

                elif ptype and ptype.startswith("GRADIENT_"):
                    stops = []
                    for stop in paint.get("gradientStops", []) or []:
                        hex_code, alpha = rgba_to_hex(stop.get("color", {}))
                        stops.append({"position": round(stop.get("position", 0), 3),
                                      "hex": hex_code, "alpha": alpha})
                    key = json.dumps({"type": ptype, "stops": stops}, sort_keys=True)
                    entry = gradients.setdefault(key, {
                        "type": ptype, "stops": stops, "opacity": opacity,
                        "handle_positions": paint.get("gradientHandlePositions"),
                        "count": 0, "example_layers": []})
                    entry["count"] += 1
                    if len(entry["example_layers"]) < 5:
                        entry["example_layers"].append(node.get("name", ""))

    return {
        "solid_colors": sorted(solids.values(), key=lambda e: -e["count"]),
        "gradients": sorted(gradients.values(), key=lambda e: -e["count"]),
    }


# --------------------------------------------------------------------------
# Image fills -> figma_image_map.json + figma_images/originals/
# --------------------------------------------------------------------------
def collect_image_refs(document):
    """
    Find every IMAGE fill in the file and remember which node/frame/page uses it.
    Returns {imageRef: [ {node_id, node_name, frame_name, page_name, scale_mode}, ... ]}.
    """
    usage = {}
    for node, path in iter_nodes(document):
        page_name = next((p.get("name") for p in path if p.get("type") == "CANVAS"), None)
        frame = next((p for p in path[2:] if p.get("type") in FRAME_LIKE_TYPES), None)
        frame_name = frame.get("name") if frame else (
            node.get("name") if node.get("type") in FRAME_LIKE_TYPES else None)

        for paint in node.get("fills", []) or []:
            if paint.get("type") != "IMAGE" or not paint.get("imageRef"):
                continue
            usage.setdefault(paint["imageRef"], []).append({
                "node_id": node.get("id"),
                "node_name": node.get("name"),
                "node_type": node.get("type"),
                "frame_name": frame_name,
                "page_name": page_name,
                "scale_mode": paint.get("scaleMode"),
                "visible": paint.get("visible", True),
            })
    return usage


def download_image_fills(token, file_key, usage, out_dir):
    """
    Ask Figma for download links for every original image fill in the file,
    then save each one into figma_images/originals/<imageRef>.<ext>.
    Returns (downloaded_count, missing_refs_list).
    """
    originals_dir = os.path.join(out_dir, "figma_images", "originals")
    os.makedirs(originals_dir, exist_ok=True)

    log("Requesting original image-fill URLs ...")
    resp = api_get(token, "/v1/files/{}/images".format(file_key))
    url_map = (resp.get("meta") or {}).get("images") or {}
    log("  Figma returned {} image URLs; file uses {} distinct imageRefs".format(
        len(url_map), len(usage)))

    downloaded = 0
    missing = []
    # Download every ref the file actually uses; fall back to whatever Figma listed.
    refs = list(usage.keys()) or list(url_map.keys())
    for i, ref in enumerate(refs, 1):
        url = url_map.get(ref)
        if not url:
            missing.append(ref)
            continue
        dest = os.path.join(originals_dir, safe_filename(ref))
        ext = download_file(url, dest)
        if ext:
            downloaded += 1
            for use in usage.get(ref, []):
                use["file"] = "figma_images/originals/{}{}".format(safe_filename(ref), ext)
        else:
            missing.append(ref)
        log("  [{}/{}] {}{}".format(i, len(refs), ref, ext or " FAILED"))
        time.sleep(SLEEP_BETWEEN_DOWNLOADS)

    return downloaded, missing


# --------------------------------------------------------------------------
# Frame renders -> figma_images/frames/
# --------------------------------------------------------------------------
def render_frames(token, file_key, document, out_dir):
    """
    Render every top-level frame on every page to a PNG at RENDER_SCALE.
    Node ids are sent in batches of RENDER_BATCH_SIZE per request, with a sleep
    between requests so we stay under the Tier-1 rate limit.
    Returns (rendered_count, failed_ids_list).
    """
    frames_dir = os.path.join(out_dir, "figma_images", "frames")
    os.makedirs(frames_dir, exist_ok=True)

    # Build the list of (id, nice file name) for all frames first.
    targets = []
    for page in document.get("children", []) or []:
        if page.get("type") != "CANVAS":
            continue
        for frame, _section in top_level_frames(page):
            nice = "{}__{}__{}".format(
                safe_filename(page.get("name"), "page"),
                safe_filename(frame.get("name"), "frame"),
                frame.get("id", "").replace(":", "-"))
            targets.append((frame["id"], nice))

    rendered = 0
    failed = []
    batches = [targets[i:i + RENDER_BATCH_SIZE] for i in range(0, len(targets), RENDER_BATCH_SIZE)]
    log("Rendering {} frames in {} batch(es) at {}x ...".format(len(targets), len(batches), RENDER_SCALE))

    for b, batch in enumerate(batches, 1):
        ids = ",".join(node_id for node_id, _ in batch)
        resp = api_get(token, "/v1/images/{}".format(file_key),
                       {"ids": ids, "format": "png", "scale": RENDER_SCALE})
        if resp.get("err"):
            log("  batch {} error from Figma: {}".format(b, resp["err"]))
        images = resp.get("images") or {}

        for node_id, nice in batch:
            url = images.get(node_id)
            if not url:
                failed.append(node_id)
                log("  {} -> no render returned".format(nice))
                continue
            ext = download_file(url, os.path.join(frames_dir, nice))
            if ext:
                rendered += 1
                log("  {}{}".format(nice, ext))
            else:
                failed.append(node_id)
            time.sleep(SLEEP_BETWEEN_DOWNLOADS)

        if b < len(batches):
            time.sleep(SLEEP_BETWEEN_API_CALLS)

    return rendered, failed


# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------
def main():
    """Run the whole export end to end and print a summary."""
    token = os.environ.get("FIGMA_TOKEN", "").strip()
    if not token:
        sys.exit("FIGMA_TOKEN is not set — run:  export FIGMA_TOKEN=your_figma_personal_access_token")

    file_key = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE_KEY
    out_dir = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.getcwd(), "figma_export")
    os.makedirs(out_dir, exist_ok=True)

    # 1. Full file JSON
    log("Downloading file {} ...".format(file_key))
    file_json = api_get(token, "/v1/files/{}".format(file_key))
    with open(os.path.join(out_dir, "figma_file.json"), "w", encoding="utf-8") as fh:
        json.dump(file_json, fh, indent=1, ensure_ascii=False)
    document = file_json.get("document") or {}
    log("  file name: {!r}, last modified {}".format(file_json.get("name"), file_json.get("lastModified")))
    time.sleep(SLEEP_BETWEEN_API_CALLS)

    # 2. Text
    markdown, text_count, frame_count, type_counts = extract_text(document)
    with open(os.path.join(out_dir, "figma_text.md"), "w", encoding="utf-8") as fh:
        fh.write(markdown)

    # 3. Colours
    colors = extract_colors(document)
    with open(os.path.join(out_dir, "figma_colors.json"), "w", encoding="utf-8") as fh:
        json.dump(colors, fh, indent=2)

    # 4. Original image fills
    usage = collect_image_refs(document)
    originals_downloaded, originals_missing = download_image_fills(token, file_key, usage, out_dir)
    with open(os.path.join(out_dir, "figma_image_map.json"), "w", encoding="utf-8") as fh:
        json.dump({"images": usage, "missing_refs": originals_missing}, fh, indent=2)
    time.sleep(SLEEP_BETWEEN_API_CALLS)

    # 5. Frame renders
    frames_rendered, frames_failed = render_frames(token, file_key, document, out_dir)

    # 6. Summary
    pages = [p for p in document.get("children", []) if p.get("type") == "CANVAS"]
    log("")
    log("==== Export summary ====")
    log("Output folder:          {}".format(out_dir))
    log("Pages:                  {}".format(len(pages)))
    log("Top-level frames:       {}".format(frame_count))
    log("Text layers exported:   {}".format(text_count))
    log("Distinct type styles:   {}".format(len(type_counts)))
    log("Distinct solid colours: {}".format(len(colors["solid_colors"])))
    log("Distinct gradients:     {}".format(len(colors["gradients"])))
    log("Image fills used:       {} distinct ({} downloaded, {} missing)".format(
        len(usage), originals_downloaded, len(originals_missing)))
    log("Frames rendered @{}x:   {} ok, {} failed".format(RENDER_SCALE, frames_rendered, len(frames_failed)))
    if frames_failed:
        log("  failed frame ids: {}".format(", ".join(frames_failed)))


if __name__ == "__main__":
    main()
