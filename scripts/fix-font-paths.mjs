import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const DIST_ROOT = path.resolve('dist')
const DIST_SUB_DIRS = ['.', 'out', 'build']

async function pathExists(target) {
  try {
    await stat(target)
    return true
  }
  catch {
    return false
  }
}

async function collectHtmlFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const dirent of dirents) {
    const fullPath = path.join(dir, dirent.name)

    if (dirent.isDirectory())
      files.push(...await collectHtmlFiles(fullPath))
    else if (dirent.isFile() && dirent.name.endsWith('.html'))
      files.push(fullPath)
  }

  return files
}

function toPosix(input) {
  return input.split(path.sep).join('/')
}

function getFontsPath(htmlFile, assetsRoot) {
  const relativeAssetsPath = path.relative(path.dirname(htmlFile), path.join(assetsRoot, 'assets'))
  const normalized = relativeAssetsPath === '' ? '.' : relativeAssetsPath
  const cleaned = toPosix(normalized)

  if (cleaned === '.' || cleaned === './')
    return 'fonts/'

  return `${cleaned.replace(/\/$/, '')}/fonts/`
}

async function fixFontsInHtml(htmlFile, assetsRoot) {
  const html = await readFile(htmlFile, 'utf8')

  if (!html.includes('assets/fonts/'))
    return false

  const replacement = getFontsPath(htmlFile, assetsRoot)
  const candidates = [
    '../assets/fonts/',
    './assets/fonts/',
    '/assets/fonts/',
    'assets/fonts/',
  ]

  let updated = html
  for (const candidate of candidates) {
    if (updated.includes(candidate))
      updated = updated.replaceAll(candidate, replacement)
  }

  if (updated === html)
    return false

  await writeFile(htmlFile, updated)
  console.log(`[fix-font-paths] patched ${path.relative(DIST_ROOT, htmlFile)}`)
  return true
}

const patched = []
for (const subDir of DIST_SUB_DIRS) {
  const targetDir = path.join(DIST_ROOT, subDir)
  if (!await pathExists(targetDir))
    continue

  const htmlFiles = await collectHtmlFiles(targetDir)
  for (const file of htmlFiles) {
    if (await fixFontsInHtml(file, targetDir))
      patched.push(file)
  }
}

if (!patched.length)
  console.log('[fix-font-paths] no HTML files required patching')
