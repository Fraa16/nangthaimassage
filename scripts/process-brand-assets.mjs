// Erzeugt die Web-Assets aus den Original-Grafiken in design/reference/.
// Aufruf: npm run assets  (nur nötig, wenn sich die Originale ändern)
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const ref = (f) => fileURLToPath(new URL(`../design/reference/${f}`, import.meta.url));
const brandDir = fileURLToPath(new URL('../src/assets/brand/', import.meta.url));
const publicDir = fileURLToPath(new URL('../public/', import.meta.url));

await mkdir(brandDir, { recursive: true });
await mkdir(publicDir, { recursive: true });

async function load(file, region) {
  let img = sharp(ref(file)).ensureAlpha();
  if (region) img = img.extract(region);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

const toSharp = ({ data, width, height }) => sharp(data, { raw: { width, height, channels: 4 } });

function alphaBBox({ data, width, height }, threshold = 8) {
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > threshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

function crop(img, { left, top, width, height }) {
  const out = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    img.data.copy(out, y * width * 4, ((top + y) * img.width + left) * 4, ((top + y) * img.width + left + width) * 4);
  }
  return { data: out, width, height };
}

function pad(box, px, img) {
  const left = Math.max(0, box.left - px);
  const top = Math.max(0, box.top - px);
  return {
    left,
    top,
    width: Math.min(img.width, box.left + box.width + px) - left,
    height: Math.min(img.height, box.top + box.height + px) - top,
  };
}

/**
 * Entfernt einen neutralen (grauen/weißen) Hintergrund, z. B. ein eingebranntes
 * Transparenz-Schachbrett. Gold ist stark gesättigt, der Hintergrund nicht.
 * Kantenpixel werden gegen die lokale Hintergrundfarbe entmischt, damit auf
 * dunklem Grund kein heller Saum bleibt. Kleine eingeschlossene neutrale
 * Flächen (Glanzlichter) bleiben erhalten, große (Innenräume von „a“ und „g“)
 * werden transparent.
 */
function keyNeutralBackground(img, { bgChroma = 12, minBgArea = 800, edgeWidth = 3 } = {}) {
  const { data, width: w, height: h } = img;
  const n = w * h;
  const isBg = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
    isBg[i] = Math.max(r, g, b) - Math.min(r, g, b) <= bgChroma ? 1 : 0;
  }

  // Zusammenhängende Hintergrundflächen; kleine Flächen gehören zum Motiv.
  const seen = new Uint8Array(n);
  const queue = new Int32Array(n);
  for (let start = 0; start < n; start++) {
    if (!isBg[start] || seen[start]) continue;
    let head = 0, tail = 0;
    queue[tail++] = start;
    seen[start] = 1;
    while (head < tail) {
      const p = queue[head++];
      const x = p % w, y = (p - x) / w;
      const nb = [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, y > 0 ? p - w : -1, y < h - 1 ? p + w : -1];
      for (const q of nb) {
        if (q >= 0 && isBg[q] && !seen[q]) {
          seen[q] = 1;
          queue[tail++] = q;
        }
      }
    }
    if (tail < minBgArea) for (let k = 0; k < tail; k++) isBg[queue[k]] = 0;
  }

  // Abstand zum Hintergrund (Schachbrett-Metrik, bis edgeWidth).
  const dist = new Uint8Array(n).fill(255);
  let frontier = [];
  for (let i = 0; i < n; i++) if (isBg[i]) { dist[i] = 0; frontier.push(i); }
  for (let d = 1; d <= edgeWidth + 2; d++) {
    const next = [];
    for (const p of frontier) {
      const x = p % w, y = (p - x) / w;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx, yy = y + dy;
          if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
          const q = yy * w + xx;
          if (dist[q] === 255) { dist[q] = d; next.push(q); }
        }
      }
    }
    frontier = next;
  }

  const out = Buffer.from(data);
  const R = edgeWidth + 2;
  for (let i = 0; i < n; i++) {
    if (isBg[i]) { out[i * 4 + 3] = 0; continue; }
    if (dist[i] > edgeWidth) { out[i * 4 + 3] = 255; continue; }
    const x = i % w, y = (i - x) / w;
    // Lokale Hintergrund- und Motivfarbe schätzen.
    let bgSum = [0, 0, 0], bgN = 0, fgSum = [0, 0, 0], fgN = 0;
    for (let dy = -R; dy <= R; dy++) {
      for (let dx = -R; dx <= R; dx++) {
        const xx = x + dx, yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
        const q = yy * w + xx;
        if (isBg[q]) { bgSum[0] += data[q * 4]; bgSum[1] += data[q * 4 + 1]; bgSum[2] += data[q * 4 + 2]; bgN++; }
        else if (dist[q] > edgeWidth) { fgSum[0] += data[q * 4]; fgSum[1] += data[q * 4 + 1]; fgSum[2] += data[q * 4 + 2]; fgN++; }
      }
    }
    const W = bgN ? bgSum.map((s) => s / bgN) : [253, 253, 253];
    const C = [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];
    let a = 1;
    if (fgN) {
      const F = fgSum.map((s) => s / fgN);
      const fw = F.map((f, k) => f - W[k]);
      const cw = C.map((c, k) => c - W[k]);
      const denom = fw[0] ** 2 + fw[1] ** 2 + fw[2] ** 2;
      a = denom > 0 ? (cw[0] * fw[0] + cw[1] * fw[1] + cw[2] * fw[2]) / denom : 1;
      a = Math.min(1, Math.max(0, a));
    }
    out[i * 4 + 3] = Math.round(a * 255);
    if (a > 0.02 && a < 1) {
      for (let k = 0; k < 3; k++) {
        out[i * 4 + k] = Math.min(255, Math.max(0, Math.round((C[k] - (1 - a) * W[k]) / a)));
      }
    }
  }
  return { data: out, width: w, height: h };
}

/** Macht den violetten Untergrund transparent und lässt das Gold stehen. */
function keyPurple(img, { lo = -6, hi = 46 } = {}) {
  const out = Buffer.from(img.data);
  for (let i = 0; i < img.width * img.height; i++) {
    const r = out[i * 4], b = out[i * 4 + 2];
    const goldness = r - b;
    const a = Math.min(1, Math.max(0, (goldness - lo) / (hi - lo)));
    out[i * 4 + 3] = Math.round(a * out[i * 4 + 3]);
  }
  return { ...img, data: out };
}

/** Behält nur die zusammenhängende Fläche, die den Punkt (x, y) enthält. */
function keepComponentAt(img, x0, y0, threshold = 24) {
  const { data, width: w, height: h } = img;
  const keep = new Uint8Array(w * h);
  const stack = [y0 * w + x0];
  keep[stack[0]] = 1;
  while (stack.length) {
    const p = stack.pop();
    const x = p % w, y = (p - x) / w;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const xx = x + dx, yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
        const q = yy * w + xx;
        if (!keep[q] && data[q * 4 + 3] > threshold) { keep[q] = 1; stack.push(q); }
      }
    }
  }
  const out = Buffer.from(data);
  for (let i = 0; i < w * h; i++) if (!keep[i]) out[i * 4 + 3] = 0;
  return { ...img, data: out };
}

/** Schneidet eine nahtlos kachelbare Kachel aus dem Ornamentband. */
function seamlessTile(img, { top, height, periods = 4, period = 51, search = [300, 1600] }) {
  const { data, width: w } = img;
  const col = (x, y) => (y * w + x) * 4;
  let best = { cost: Infinity, x0: 0, p: 0 };
  for (let p = periods * period - 5; p <= periods * period + 5; p++) {
    for (let x0 = search[0]; x0 < search[1]; x0++) {
      let cost = 0;
      for (let off = -1; off <= 1; off++) {
        for (let y = top; y < top + height; y++) {
          const a = col(x0 + off, y), b = col(x0 + p + off, y);
          for (let k = 0; k < 3; k++) cost += (data[a + k] - data[b + k]) ** 2;
        }
      }
      if (cost < best.cost) best = { cost, x0, p };
    }
  }
  return { ...best, tile: crop(img, { left: best.x0, top, width: best.p, height }) };
}

function icoFromPngs(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, buf } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
}

// 1) Rahmen mit drei Feldern (Originalbild oben), Felder sind bereits transparent.
const frameSrc = await load('frame-three-panels.webp');
const frame = crop(frameSrc, { left: 0, top: 0, width: 2000, height: 476 });
await toSharp(frame).png({ compressionLevel: 9 }).toFile(`${brandDir}frame.png`);

// 2) Logo „Nang – Thai Massage“ (unter dem Rahmen im selben Bild).
const logoArea = crop(frameSrc, { left: 700, top: 476, width: 640, height: frameSrc.height - 476 });
const logo = crop(logoArea, pad(alphaBBox(logoArea), 2, logoArea));
await toSharp(logo).png({ compressionLevel: 9 }).toFile(`${brandDir}logo.png`);

// 3) Großer Schriftzug „Nang“ ohne Schachbrett.
const nangSrc = await load('logo-nang.webp');
const nangKeyed = keyNeutralBackground(nangSrc);
const nang = crop(nangKeyed, pad(alphaBBox(nangKeyed, 24), 4, nangKeyed));
await toSharp(nang).png({ compressionLevel: 9 }).toFile(`${brandDir}logo-nang.png`);

// 4) Volant / Lambrequin.
const valanceSrc = await load('valance.webp');
const valance = crop(valanceSrc, { left: 0, top: 84, width: 2000, height: 557 - 84 });
await toSharp(valance).png({ compressionLevel: 9 }).toFile(`${brandDir}valance.png`);

// 5) Ornamentband als nahtlose Kachel (Goldlinie – Rautenmuster – Goldlinie).
const band = seamlessTile(valanceSrc, { top: 86, height: 158 - 86 + 1 });
console.log(`Ornamentband: x0=${band.x0}, Breite=${band.p}`);
await toSharp(band.tile).png({ compressionLevel: 9 }).toFile(`${brandDir}lattice-band.png`);

// 6) Kleines Blütenornament (links im Volant), Violett freigestellt.
const ornamentBox = { left: 660, top: 170, width: 200, height: 200 };
const ornamentKeyed = keepComponentAt(keyPurple(crop(valanceSrc, ornamentBox)), 100, 100);
const ornament = crop(ornamentKeyed, pad(alphaBBox(ornamentKeyed, 24), 2, ornamentKeyed));
await toSharp(ornament).png({ compressionLevel: 9 }).toFile(`${brandDir}ornament.png`);

// 7) Favicons: Ornament auf flachem Markenviolett.
const iconSize = 180;
const iconOrnament = await toSharp(ornament)
  .resize(Math.round(iconSize * 0.8), Math.round(iconSize * 0.8), { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
const iconBase = await sharp({ create: { width: iconSize, height: iconSize, channels: 4, background: { r: 52, g: 27, b: 102, alpha: 1 } } })
  .composite([{ input: iconOrnament, gravity: 'center' }])
  .png()
  .toBuffer();
await sharp(iconBase).png({ compressionLevel: 9 }).toFile(`${publicDir}apple-touch-icon.png`);
const ico = [];
for (const size of [16, 32, 48]) {
  ico.push({ size, buf: await sharp(iconBase).resize(size, size, { kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toBuffer() });
}
await writeFile(`${publicDir}favicon.ico`, icoFromPngs(ico));
await sharp(iconBase).resize(32, 32, { kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toFile(`${publicDir}favicon-32.png`);

// 8) Open-Graph-Bild 1200×630: Volant oben, Logo darunter auf Creme.
const cream = { r: 251, g: 246, b: 236, alpha: 1 };
const ogValanceFull = await toSharp(valance).resize(1200).png().toBuffer();
const ogValanceH = (await sharp(ogValanceFull).metadata()).height;
const ogValance = await sharp(ogValanceFull).extract({ left: 0, top: 40, width: 1200, height: ogValanceH - 40 }).png().toBuffer();
const ogLogoW = 560;
const ogLogo = await toSharp(logo).resize(ogLogoW, null, { kernel: 'lanczos3' }).png().toBuffer();
const ogLogoH = Math.round((logo.height * ogLogoW) / logo.width);
const ogBand = await toSharp(band.tile).resize(null, 30).png().toBuffer();
const ogBandMeta = await sharp(ogBand).metadata();
const bandTiles = [];
for (let x = 0; x < 1200; x += ogBandMeta.width) bandTiles.push({ input: ogBand, left: x, top: 600 });
const ogTop = ogValanceH - 40;
await sharp({ create: { width: 1200, height: 630, channels: 4, background: cream } })
  .composite([
    { input: ogValance, left: 0, top: 0 },
    { input: ogLogo, left: Math.round((1200 - ogLogoW) / 2), top: ogTop + Math.round((600 - ogTop - ogLogoH) / 2) },
    ...bandTiles,
  ])
  .flatten({ background: cream })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(`${publicDir}og-image.jpg`);

console.log('Fertig:', { logo: [logo.width, logo.height], nang: [nang.width, nang.height], ornament: [ornament.width, ornament.height] });
