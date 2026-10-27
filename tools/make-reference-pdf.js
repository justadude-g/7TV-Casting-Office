#!/usr/bin/env node
/* Rebuild assets/7TV-Quick-Reference.pdf from the Reference tab in index.html.
   Run it after editing the Quick reference text, so the download matches the page:
     node tools/make-reference-pdf.js
   Needs Playwright (npm i playwright, then npx playwright install chromium). Two A4 landscape pages. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'assets', '7TV-Quick-Reference.pdf');
const ZOOM = process.argv[2] || '0.74';
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.json': 'application/json' };

const PRINT_CSS = `
  @page { size: 297mm 210mm; margin: 7mm 8mm; }
  html, body { background: #fff !important; height: auto !important; min-height: 0 !important; }
  body > *:not(main):not(section) { display: none !important; }
  header, nav, .topbar, .tabs, #toast, .qref-intro, footer, dialog { display: none !important; }
  .view:not(#view-reference) { display: none !important; }
  .qref { max-width: none !important; zoom: ZOOM; gap: 6px !important; }
  .panel { box-shadow: none !important; border: 0 !important; padding: 0 !important; background: transparent !important; }
  .qref-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 22px !important; break-inside: avoid; }
  .qref-title { display: flex; align-items: baseline; gap: 10px; margin: 0 0 4px !important; }
  .qref-title + .qref-grid ~ .qref-title { break-before: page; }
  .qh-a { font: 600 28px/1 Oswald, sans-serif; }
  .qh-b { font: 600 15px Oswald, sans-serif; color: #285d86; }
  .qh-c { margin-left: auto; font: 12px 'Barlow Semi Condensed', sans-serif; color: #555; text-transform: none; letter-spacing: 0; }
  .q-s { display: grid !important; grid-template-columns: 38px minmax(0, 1fr); column-gap: 8px; align-items: start; }
  .q-sti { float: none !important; margin: 2px 0 0 !important; }
`;

(async () => {
  const server = http.createServer((req, res) => {
    const file = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  }).listen(0);
  const port = server.address().port;
  const browser = await chromium.launch();
  try {
    const p = await browser.newPage({ viewport: { width: 1500, height: 1000 } });
    await p.goto(`http://localhost:${port}/index.html`);
    await p.waitForTimeout(1200);
    await p.evaluate(() => { document.documentElement.dataset.theme = 'light'; window.App.showView('reference'); });
    await p.evaluate(() => {
      document.querySelectorAll('.qref-title').forEach((h) => {
        const t = h.textContent;
        h.innerHTML = '<span class="qh-a">7TV Quick Reference</span> <span class="qh-b">' + t + '</span><span class="qh-c">2nd Edition. Page numbers refer to the Core Rulebook. ★ = plot point</span>';
      });
    });
    await p.emulateMedia({ media: 'print' });
    await p.addStyleTag({ content: PRINT_CSS.replace('ZOOM', ZOOM) });
    await p.evaluate(() => document.fonts.ready);
    await p.pdf({ path: OUT, preferCSSPageSize: true, printBackground: true });
  } finally {
    await browser.close();
    server.close();
  }
  console.log('wrote', path.relative(process.cwd(), OUT));
})();
