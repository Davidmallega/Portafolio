// Converts public/assets/**/*.{png,jpg,jpeg} to WebP (resized, quality 80).
// Originals are moved to ./assets-originals (git-ignored), never deleted.
// Usage: node scripts/optimize-images.mjs
import { readdirSync, mkdirSync, renameSync, statSync, existsSync } from 'node:fs'
import { join, relative, dirname, extname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const assetsDir = join(root, 'public', 'assets')
const backupDir = join(root, 'assets-originals')

const QUALITY = 80
const MAX_WIDTH = { certificates: 1400, previews: 1600, default: 1920 }
const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg'])

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

function maxWidthFor(file) {
  const rel = relative(assetsDir, file).split(sep)
  return MAX_WIDTH[rel[0]] ?? MAX_WIDTH.default
}

const kb = n => `${Math.round(n / 1024)}KB`
let before = 0
let after = 0
let count = 0

for (const file of [...walk(assetsDir)]) {
  if (!SOURCE_EXT.has(extname(file).toLowerCase())) continue

  const out = file.slice(0, -extname(file).length) + '.webp'
  const size = statSync(file).size

  await sharp(file)
    .rotate()
    .resize({ width: maxWidthFor(file), withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out)

  const backup = join(backupDir, relative(assetsDir, file))
  mkdirSync(dirname(backup), { recursive: true })
  if (!existsSync(backup)) renameSync(file, backup)

  const outSize = statSync(out).size
  before += size
  after += outSize
  count++
  console.log(`${relative(root, out)}  ${kb(size)} -> ${kb(outSize)}`)
}

console.log(`\n${count} images · ${kb(before)} -> ${kb(after)}`)
