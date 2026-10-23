"""Offline test: run figma_export.main() against a fake in-memory Figma document."""
import json
import os
import sys
import tempfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import figma_export as fe  # noqa: E402

RED = {"r": 1, "g": 0, "b": 0, "a": 1}
BLUE = {"r": 0, "g": 0, "b": 1, "a": 1}
BLACK = {"r": 0, "g": 0, "b": 0, "a": 1}


def text(nid, name, chars, x, y, size=16, weight=400, family="Inter", overrides=None):
    node = {
        "id": nid, "type": "TEXT", "name": name, "characters": chars,
        "absoluteBoundingBox": {"x": x, "y": y, "width": 100, "height": 20},
        "fills": [{"type": "SOLID", "color": BLACK}],
        "style": {"fontFamily": family, "fontWeight": weight, "fontSize": size,
                  "lineHeightPx": size * 1.4, "letterSpacing": 0},
    }
    if overrides:
        node["styleOverrideTable"] = overrides
    return node


FAKE_FILE = {
    "name": "ZUN fake",
    "lastModified": "2026-09-13T00:00:00Z",
    "document": {
        "id": "0:0", "type": "DOCUMENT", "name": "Document",
        "children": [
            {
                "id": "0:1", "type": "CANVAS", "name": "Page 1",
                "children": [
                    {
                        "id": "1:289", "type": "FRAME", "name": "Home",
                        "absoluteBoundingBox": {"x": 0, "y": 0, "width": 1440, "height": 900},
                        "fills": [{"type": "SOLID", "color": RED}],
                        "children": [
                            # deliberately out of order: body first, heading second
                            text("1:3", "Body", "Second line third line", 10, 100),
                            text("1:2", "Heading", "Welcome to ZUN", 10, 10, size=48, weight=700),
                            text("1:4", "Right", "Right of heading", 500, 12, size=48, weight=700,
                                 overrides={"1": {"fontWeight": 400, "italic": True}}),
                            text("1:5", "Hidden", "SHOULD NOT APPEAR", 0, 0),
                            {"id": "1:6", "type": "RECTANGLE", "name": "Hero photo",
                             "absoluteBoundingBox": {"x": 0, "y": 200, "width": 800, "height": 400},
                             "fills": [{"type": "IMAGE", "imageRef": "abc123hash", "scaleMode": "FILL"}]},
                            {"id": "1:7", "type": "RECTANGLE", "name": "Gradient bar",
                             "fills": [{"type": "GRADIENT_LINEAR",
                                        "gradientHandlePositions": [{"x": 0, "y": 0}, {"x": 1, "y": 0}],
                                        "gradientStops": [{"position": 0, "color": RED},
                                                          {"position": 1, "color": BLUE}]}],
                             "strokes": [{"type": "SOLID", "color": BLUE, "opacity": 0.5}]},
                        ],
                    },
                    {
                        "id": "2:1", "type": "SECTION", "name": "Mobile",
                        "children": [
                            {"id": "2:2", "type": "FRAME", "name": "Home / mobile",
                             "absoluteBoundingBox": {"x": 2000, "y": 0, "width": 390, "height": 844},
                             "fills": [{"type": "SOLID", "color": RED}],
                             "children": [text("2:3", "H", "Mobile heading", 2000, 0)]},
                        ],
                    },
                    {"id": "3:1", "type": "FRAME", "name": "Empty", "children": [],
                     "fills": [{"type": "IMAGE", "imageRef": "missing_ref"}]},
                ],
            }
        ],
    },
}
FAKE_FILE["document"]["children"][0]["children"][0]["children"][3]["visible"] = False  # hide "Hidden"

API_CALLS = []
DOWNLOADS = []


def fake_api_get(token, path, params=None):
    API_CALLS.append((path, params))
    assert token == "fake-token"
    if path == "/v1/files/KEY":
        return FAKE_FILE
    if path == "/v1/files/KEY/images":
        return {"error": False, "status": 200,
                "meta": {"images": {"abc123hash": "https://s3.example/abc.png"}}}
    if path == "/v1/images/KEY":
        assert params["scale"] == 2 and params["format"] == "png"
        ids = params["ids"].split(",")
        assert len(ids) <= fe.RENDER_BATCH_SIZE
        return {"err": None, "images": {i: ("https://s3.example/%s.png" % i) if i != "3:1" else None
                                        for i in ids}}
    raise AssertionError("unexpected path " + path)


def fake_download(url, dest_path):
    DOWNLOADS.append(url)
    with open(dest_path + ".png", "wb") as fh:
        fh.write(b"\x89PNG fake")
    return ".png"


fe.api_get = fake_api_get
fe.download_file = fake_download
fe.time.sleep = lambda s: None
os.environ["FIGMA_TOKEN"] = "fake-token"

out = tempfile.mkdtemp(prefix="figma_test_")
sys.argv = ["figma_export.py", "KEY", out]
fe.main()

# ---- assertions ----
md = open(os.path.join(out, "figma_text.md"), encoding="utf-8").read()
print("\n----- figma_text.md -----\n" + md)
assert "SHOULD NOT APPEAR" not in md
assert md.index("Welcome to ZUN") < md.index("Right of heading") < md.index("Second line")
assert "## Home / mobile  (section: Mobile)" in md
assert "Inter · w700 · 48px" in md and "mixed:" in md
assert "third line" in md  #   converted to newline

colors = json.load(open(os.path.join(out, "figma_colors.json")))
hexes = {c["hex"]: c for c in colors["solid_colors"]}
assert hexes["#FF0000"]["count"] == 2  # two frame fills
assert hexes["#0000FF"]["alpha"] == 0.5 and hexes["#0000FF"]["in_strokes"] == 1
assert len(colors["gradients"]) == 1 and colors["gradients"][0]["stops"][1]["hex"] == "#0000FF"

imap = json.load(open(os.path.join(out, "figma_image_map.json")))
assert imap["images"]["abc123hash"][0]["frame_name"] == "Home"
assert imap["images"]["abc123hash"][0]["file"] == "figma_images/originals/abc123hash.png"
assert imap["missing_refs"] == ["missing_ref"]

frames = sorted(os.listdir(os.path.join(out, "figma_images", "frames")))
print("frames:", frames)
assert len(frames) == 2  # "Empty" frame returned null render
assert os.path.exists(os.path.join(out, "figma_images", "originals", "abc123hash.png"))
assert os.path.exists(os.path.join(out, "figma_file.json"))
print("API calls:", API_CALLS)
print("\nALL TESTS PASSED")
