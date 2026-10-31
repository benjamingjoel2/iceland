"""Generates Edge of North's own cloud / mist overlay textures (white RGBA WebP).

Fractal value-noise is built by summing blurred random fields at several scales,
then shaped with vertical masks. Run: python3 scripts/make-mist.py
"""
import os
import numpy as np
from PIL import Image, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "mist")
os.makedirs(OUT, exist_ok=True)


def fractal(w, h, seed, octaves=6, persistence=0.55):
    rng = np.random.default_rng(seed)
    acc = np.zeros((h, w), np.float32)
    amp, total = 1.0, 0.0
    for o in range(octaves):
        cell = max(2, int(min(w, h) / (2 ** (o + 1))))
        sw, sh = max(2, w // cell + 2), max(2, h // cell + 2)
        small = Image.fromarray((rng.random((sh, sw)) * 255).astype(np.uint8))
        big = small.resize((w, h), Image.BICUBIC).filter(ImageFilter.GaussianBlur(cell / 3))
        acc += np.asarray(big, np.float32) / 255 * amp
        total += amp
        amp *= persistence
    acc /= total
    return (acc - acc.min()) / (acc.max() - acc.min() + 1e-6)


def save(alpha, name, tint=(255, 255, 255)):
    h, w = alpha.shape
    rgba = np.zeros((h, w, 4), np.uint8)
    # slight cool shading in the denser parts gives the clouds volume
    shade = (1 - alpha * 0.08)
    for i, c in enumerate(tint):
        rgba[..., i] = np.clip(c * shade - (2 - i) * alpha * 4, 0, 255)
    rgba[..., 3] = np.clip(alpha * 255, 0, 255)
    Image.fromarray(rgba, "RGBA").save(os.path.join(OUT, name), "WEBP", quality=50, method=6)
    print("wrote", name, w, h)


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


W, H = 960, 400
y = np.linspace(0, 1, H)[:, None]

# Three drifting cloud layers: billowing, translucent cloud banks.
x = np.linspace(0, 1, W)[None, :]
for i, (seed, band, spread) in enumerate([(11, 0.55, 0.10), (23, 0.5, 0.08), (37, 0.6, 0.12)], 1):
    n = fractal(W, H, seed, octaves=7, persistence=0.6)
    lumps = fractal(W, H, seed + 100, octaves=3, persistence=0.5)
    # the vertical envelope wanders with the large-scale lumps so the band is not a straight stripe
    centre = band + (lumps - 0.5) * 0.35
    vertical = np.exp(-((y - centre) ** 2) / spread)
    a = smoothstep(0.35, 0.95, n * 0.55 + vertical * 0.55 + lumps * 0.15) * vertical
    a = a ** 1.4 * 0.92
    a *= smoothstep(0, 0.12, x) * smoothstep(0, 0.12, 1 - x)
    save(a.astype(np.float32), f"cloud-{i}.webp")

# Mist bank: transparent at top, solid white at bottom with a billowing edge.
n = fractal(W, H, 51)
edge = y + (n - 0.5) * 0.45
a = smoothstep(0.25, 0.75, edge)
save(a.astype(np.float32), "bank.webp")
