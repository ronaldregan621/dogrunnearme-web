const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const PARKS_DIR = path.join(PUBLIC_DIR, 'parks');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');
const PARK_PHOTOS_JSON = path.join(ROOT, 'src', 'data', 'park-photos.json');
const DOG_PARKS_TS = path.join(ROOT, 'src', 'data', 'dogParks.ts');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function readDogParksIdsAndNames() {
  const result = { ids: new Set(), nameToId: {} };
  if (!fs.existsSync(DOG_PARKS_TS)) return result;
  const content = fs.readFileSync(DOG_PARKS_TS, 'utf8');
  let currentId = null;
  for (const line of content.split(/\r?\n/)) {
    const idMatch = line.match(/id:\s*'([^']+)'/);
    if (idMatch) {
      currentId = idMatch[1];
      result.ids.add(currentId);
      continue;
    }
    const nameMatch = line.match(/name:\s*'([^']+)'/);
    if (nameMatch && currentId) {
      const name = nameMatch[1];
      result.nameToId[slugify(name)] = currentId;
      currentId = null; // reset after capturing name in same block
    }
  }
  return result;
}

function listImageFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      out.push(...listImageFiles(full));
    } else if (exts.has(path.extname(ent.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

function readExistingMapping() {
  try {
    if (fs.existsSync(PARK_PHOTOS_JSON)) {
      const raw = fs.readFileSync(PARK_PHOTOS_JSON, 'utf8') || '{}';
      return JSON.parse(raw);
    }
  } catch (_) {}
  return {};
}

function relativePublicPath(absPath) {
  const rel = path.relative(PUBLIC_DIR, absPath);
  return '/' + rel.split(path.sep).join('/');
}

function main() {
  console.log('🔎 Ingesting local photos...');
  ensureDir(path.dirname(PARK_PHOTOS_JSON));

  const mapping = readExistingMapping();
  const { ids: parkIds, nameToId } = readDogParksIdsAndNames();

  // 1) public/parks/<park-id>/**/*.{jpg,png,...}
  if (fs.existsSync(PARKS_DIR)) {
    const subdirs = fs.readdirSync(PARKS_DIR, { withFileTypes: true }).filter(d => d.isDirectory());
    for (const dirent of subdirs) {
      const parkId = dirent.name;
      const absDir = path.join(PARKS_DIR, parkId);
      const files = listImageFiles(absDir);
      if (files.length === 0) continue;
      const rels = files.map(relativePublicPath);
      mapping[parkId] = Array.from(new Set([...(mapping[parkId] || []), ...rels]));
      if (!parkIds.has(parkId)) {
        console.warn(`⚠️  Found photos for unknown park id folder: ${parkId}`);
      }
    }
  }

  // 2) public/uploads/* infer id from filename (either slug or from name)
  if (fs.existsSync(UPLOADS_DIR)) {
    const files = listImageFiles(UPLOADS_DIR);
    for (const abs of files) {
      const base = path.basename(abs, path.extname(abs));
      // Try patterns: slug_*, slug-*, Name - anything
      const normalized = slugify(base.replace(/[_]+/g, '-'));
      let targetId = null;
      if (parkIds.has(normalized)) {
        targetId = normalized;
      } else if (nameToId[normalized]) {
        targetId = nameToId[normalized];
      } else {
        // try to strip trailing tokens (e.g., -1, -photo)
        const parts = normalized.split('-');
        for (let len = parts.length; len >= 2 && !targetId; len--) {
          const candidate = parts.slice(0, len).join('-');
          if (parkIds.has(candidate)) targetId = candidate;
          else if (nameToId[candidate]) targetId = nameToId[candidate];
        }
      }
      if (!targetId) {
        console.warn(`⚠️  Could not match upload to park: ${abs}`);
        continue;
      }
      const rel = relativePublicPath(abs);
      mapping[targetId] = Array.from(new Set([...(mapping[targetId] || []), rel]));
    }
  }

  fs.writeFileSync(PARK_PHOTOS_JSON, JSON.stringify(mapping, null, 2));
  console.log(`✅ Wrote ${PARK_PHOTOS_JSON}`);
}

main(); 