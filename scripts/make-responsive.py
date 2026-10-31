"""Pre-builds responsive AVIF variants of public/images/*.jpg and tiny blur placeholders.

Images are served as static files by the CDN (no runtime image optimisation), via the
custom loader in lib/imageLoader.ts. Run after adding or replacing photography:
    python3 scripts/make-responsive.py
"""
import base64, io, json, os
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..")
SRC = os.path.join(ROOT, "public", "images")
OUT = os.path.join(SRC, "r")
WIDTHS = [480, 828, 1200, 1920]
os.makedirs(OUT, exist_ok=True)

blur = {}
for f in sorted(os.listdir(SRC)):
    if not f.endswith(".jpg"):
        continue
    name = f[:-4]
    im = Image.open(os.path.join(SRC, f)).convert("RGB")
    for w in WIDTHS:
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(os.path.join(OUT, f"{name}-{w}.avif"), "AVIF", quality=45, speed=4)
    tiny = im.resize((12, max(1, round(im.height * 12 / im.width))), Image.LANCZOS)
    b = io.BytesIO(); tiny.save(b, "WEBP", quality=40)
    blur[f"/images/{f}"] = "data:image/webp;base64," + base64.b64encode(b.getvalue()).decode()

with open(os.path.join(ROOT, "data", "blur.json"), "w") as fh:
    json.dump(blur, fh, indent=0)
print(len(blur), "images")
