// Renders cv/CV-David-Mallega.md into public/cv-david-mallega.pdf.
// Custom line-based parser for a specific CV markdown convention — not a
// general markdown engine. See .claude/agents/cv-curator.md for the format.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { chromium } from 'playwright'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const mdPath = resolve(root, 'cv/CV-David-Mallega.md')
const pdfPath = resolve(root, 'public/cv-david-mallega.pdf')
const debugHtmlPath = resolve(root, 'cv/.cv-render.html')

function inline(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}

function render(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  let html = ''
  let inList = false
  const closeList = () => { if (inList) { html += '</ul>'; inList = false } }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('# ')) {
      closeList()
      html += `<h1>${inline(line.slice(2))}</h1>`
      let j = i + 1
      while (j < lines.length && lines[j].trim() === '') j++
      if (j < lines.length) html += `<div class="contact">${inline(lines[j])}</div>`
      i = j
      continue
    }

    if (line.startsWith('## ')) {
      closeList()
      html += `<h2>${inline(line.slice(3))}</h2>`
      continue
    }

    if (line.startsWith('### ')) {
      closeList()
      const rest = line.slice(4)
      const [title, date] = rest.split('::').map(s => s?.trim())
      html += `<div class="row"><span class="row-title">${inline(title)}</span>${date ? `<span class="row-date">${inline(date)}</span>` : ''}</div>`
      continue
    }

    const roleMatch = line.match(/^\*\*(.+?)\*\*\s*::\s*(.+)$/)
    if (roleMatch) {
      closeList()
      html += `<div class="row role-row"><span class="row-title">${inline(roleMatch[1])}</span><span class="row-date">${inline(roleMatch[2])}</span></div>`
      continue
    }

    if (/^\*\*.+\*\*$/.test(line)) {
      closeList()
      html += `<p class="bold-line">${inline(line)}</p>`
      continue
    }

    if (/^\*[^*].*[^*]\*$/.test(line) || /^\*[^*]\*$/.test(line)) {
      closeList()
      html += `<p class="italic-note">${inline(line.slice(1, -1))}</p>`
      continue
    }

    if (line.startsWith('- ')) {
      if (!inList) { html += '<ul>'; inList = true }
      html += `<li>${inline(line.slice(2))}</li>`
      continue
    }

    if (line.trim() === '') {
      closeList()
      continue
    }

    closeList()
    html += `<p>${inline(line)}</p>`
  }
  closeList()
  return html
}

const md = readFileSync(mdPath, 'utf8')
const bodyHtml = render(md)

const page = /* html */ `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body {
    font-family: Calibri, 'Segoe UI', Arial, sans-serif;
    font-size: 9.5pt;
    line-height: 1.25;
    color: #1a1a1a;
    margin: 0;
    padding: 11mm 15mm;
  }
  h1 {
    text-align: center;
    font-size: 19pt;
    font-weight: 700;
    margin: 0 0 3px 0;
  }
  .contact {
    text-align: center;
    font-size: 9pt;
    color: #333;
    margin: 0 0 10px 0;
  }
  .contact a { color: #1a56db; text-decoration: underline; }
  p { margin: 0 0 8px 0; }
  h2 {
    font-size: 11pt;
    font-weight: 700;
    letter-spacing: 0.3px;
    border-bottom: 1px solid #999;
    margin: 10px 0 5px 0;
    padding-bottom: 1px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
  }
  .row-title { font-weight: 700; }
  .role-row .row-title { font-weight: 400; font-style: italic; }
  .row-date { font-size: 9.3pt; color: #333; white-space: nowrap; }
  .bold-line { font-weight: 700; margin: 6px 0 0 0; }
  .bold-line + .italic-note { margin-top: 0; }
  .italic-note { font-style: italic; color: #333; margin: 0 0 3px 0; font-size: 9.6pt; }
  ul { margin: 0 0 6px 0; padding-left: 16px; }
  li { margin: 0 0 2px 0; }
  strong { font-weight: 700; }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`

writeFileSync(debugHtmlPath, page, 'utf8')

const browser = await chromium.launch()
const browserPage = await browser.newPage()
await browserPage.goto('file://' + debugHtmlPath.replace(/\\/g, '/'))
await browserPage.pdf({ path: pdfPath, format: 'A4', printBackground: true })
await browser.close()

console.log('Wrote', pdfPath)
