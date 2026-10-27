// End-to-end flow through the app UI.
const { chromium } = require('playwright');
const assert = (c, m) => { if (!c) { throw new Error('FAIL: ' + m); } console.log('ok  ' + m); };
(async () => {
  const base = process.env.BASE || 'http://localhost:8765/';
  const out = process.argv[2] || '/tmp';
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1500, height: 1000 }, acceptDownloads: true });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('dialog', (d) => d.accept());
  await p.goto(base);
  await p.click('#btnNew'); await p.waitForSelector('#dlgNew[open]');
  assert(await p.evaluate(() => document.documentElement.dataset.theme) === 'light', 'light mode by default');
  await p.fill('#profileSearch', 'grizzled');
  await p.click('.p-row[data-id="grizzled-veteran"]');
  assert((await p.textContent('#profileDetail')).includes('Anti-Hero Cops'), 'summary shows the archetype examples');
  await p.click("#pickerFoot .pf-select");
  await p.waitForTimeout(300);
  assert(await p.inputValue('#fName') === 'Grizzled Veteran', 'opened Grizzled Veteran');
  assert(await p.inputValue('#fRatings') === '10', 'ratings 10');
  const strike0 = await p.inputValue('#attackList .attack[data-i="0"] [data-f=strike]');
  await p.click('.stat[data-key="fight"] [data-step="1"]');
  await p.waitForTimeout(200);
  assert(await p.inputValue('#attackList .attack[data-i="0"] [data-f=strike]') === '+' + (parseInt(strike0) + 1), 'fight strike follows Fight +1 (' + strike0 + ')');
  assert(await p.inputValue('#fRatings') === '11', 'auto ratings 11 after Fight +1');
  await p.click('.stat[data-key="defence"] [data-step="1"]');
  await p.waitForTimeout(200);
  assert(await p.inputValue('#fRatings') === '13', 'Defence +1 costs 2');
  // genre swap Sci-Fi -> Historical
  await p.click('.genre[data-i="5"]'); await p.click('.genre[data-i="3"]');
  await p.waitForTimeout(200);
  assert(await p.inputValue('#fRatings') === '14', 'genre swap costs 1');
  // library add (adds an effect: +1)
  await p.click('#btnLibrary');
  await p.fill('#libSearch', 'Dodge');
  await p.click('#libList [data-li="0"]');
  await p.click('#dlgLibrary .dlg-head button');
  await p.waitForTimeout(200);
  assert(await p.inputValue('#fRatings') === '15', 'adding Dodge costs 1');
  const txt = await p.textContent('#ratingsOut');
  assert(txt.includes('Add Dodge'), 'ratings breakdown lists Add Dodge');
  // attack table add
  await p.selectOption('#selAttackTable', 'Katana');
  await p.waitForTimeout(200);
  assert(await p.inputValue('#fRatings') === '16', 'adding Katana costs 1');
  // manual strike edit sets modifier
  await p.fill('#attackList .attack[data-i="0"] [data-f=strike]', '+12');
  await p.waitForTimeout(150);
  assert((await p.textContent('#attackList .attack[data-i="0"] .formula')).includes('modifier +2'), 'typed strike sets modifier');
  // portrait
  await p.setInputFiles('#inPortrait', require('path').join(__dirname, 'fixture-portrait.png'));
  await p.waitForTimeout(400);
  await p.fill('#fName', 'Sergeant Rock');
  await p.waitForTimeout(300);
  await p.screenshot({ path: out + '/v2-designer.png' });
  // PNG export
  const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#btnPngFront')]);
  assert(/sergeant-rock-front\.png/.test(dl.suggestedFilename()), 'front PNG download ' + dl.suggestedFilename());
  await p.click('#btnSave'); await p.waitForTimeout(400);
  assert((await p.textContent('#saveState')) === 'Saved', 'saved');
  // reload restores
  await p.reload(); await p.waitForTimeout(800);
  assert(await p.inputValue('#fName') === 'Sergeant Rock', 'reload restores the open card');
  // my cards
  await p.click('.tab[data-view="cards"]'); await p.waitForTimeout(800);
  assert(await p.locator('.tile').count() === 1, 'one saved card');
  await p.check('.tile [data-sel]');
  assert((await p.textContent('#castTotal')).includes('16 ratings'), 'cast total 16');
  await p.screenshot({ path: out + '/v2-cards.png' });
  // print
  await p.click('.tab[data-view="print"]'); await p.waitForTimeout(1500);
  assert(await p.inputValue('#pLayout') === 'fold', 'fold-over layout is the default');
  assert(await p.locator('.sheet').count() === 1 && await p.locator('.sheet img').count() === 2, 'fold-over preview: one sheet, front beside back');
  const faces = await p.$$eval('.sheet img', (x) => x.map((e) => [parseFloat(e.style.left), parseFloat(e.style.top)]));
  assert(faces[0][1] === faces[1][1] && faces[1][0] > faces[0][0], 'back sits to the right of the front');
  const touching = await p.evaluate(() => {
    for (const lay of ['fold', 'grid']) {
      const L = PrintSheet.layout({ layout: lay, paper: 'a4', gap: 0, backs: true });
      const rects = []; for (let i = 0; i < L.per; i++) for (const f of L.faces(i, lay === 'fold' ? 'both' : 'front')) rects.push([f.x, f.y, f.x + 63.5, f.y + 88]);
      for (const m of PrintSheet.markLines(L)) for (const [x1, y1, x2, y2] of rects) {
        const mx1 = Math.min(m.x1, m.x2), mx2 = Math.max(m.x1, m.x2), my1 = Math.min(m.y1, m.y2), my2 = Math.max(m.y1, m.y2);
        if (mx2 > x1 - 2.9 && mx1 < x2 + 2.9 && my2 > y1 - 2.9 && my1 < y2 + 2.9) return lay;
      }
    }
    return '';
  });
  assert(touching === '', 'crop marks stay at least 3 mm away from every card ' + touching);
  assert(await p.locator('.sheet .crop-mark').count() > 0 && await p.locator('.sheet .fold-line').count() === 0, 'preview shows edge marks only, no line across the cards');
  await p.screenshot({ path: out + '/v2-print.png' });
  const mediaBoxes = (f) => [...require('fs').readFileSync(f, 'latin1').matchAll(/\/MediaBox \[0 0 ([\d.]+) ([\d.]+)\]/g)].map((m) => [Math.round(+m[1]), Math.round(+m[2])]);
  let [pdf] = await Promise.all([p.waitForEvent('download', { timeout: 60000 }), p.click('#btnPdf')]);
  let path = out + '/sheet-fold.pdf'; await pdf.saveAs(path);
  assert(require('fs').statSync(path).size > 50000, 'fold PDF written ' + require('fs').statSync(path).size + ' bytes');
  let mb = mediaBoxes(path);
  assert(mb.length === 1 && mb[0][0] === 842 && mb[0][1] === 595, 'fold PDF is one A4 landscape page ' + JSON.stringify(mb));
  await p.selectOption('#pLayout', 'grid'); await p.waitForTimeout(1200);
  assert(await p.locator('.sheet').count() === 2, 'nine-up layout: front and back sheets in preview');
  assert(await p.isVisible('#pBacksRow'), 'back pages option shows for the nine-up layout');
  await p.selectOption('#pLayout', 'fold'); await p.waitForTimeout(200);
  assert(!(await p.isVisible('#pBacksRow')), 'back pages option hidden for fold-over');
  await p.selectOption('#pLayout', 'grid'); await p.waitForTimeout(1200);
  [pdf] = await Promise.all([p.waitForEvent('download', { timeout: 60000 }), p.click('#btnPdf')]);
  path = out + '/sheet.pdf'; await pdf.saveAs(path);
  mb = mediaBoxes(path);
  assert(mb.length === 2 && mb[0][0] === 595 && mb[0][1] === 842, 'nine-up PDF is two A4 portrait pages ' + JSON.stringify(mb));
  await p.reload(); await p.waitForTimeout(800); await p.click('.tab[data-view="print"]'); await p.waitForTimeout(300);
  assert(await p.inputValue('#pLayout') === 'grid', 'layout choice is remembered');
  await p.selectOption('#pLayout', 'fold');
  // backup export
  await p.click('.tab[data-view="cards"]'); await p.waitForTimeout(300);
  const [bk] = await Promise.all([p.waitForEvent('download'), p.click('#btnExport')]);
  const bpath = out + '/backup.json'; await bk.saveAs(bpath);
  const data = JSON.parse(require('fs').readFileSync(bpath, 'utf8'));
  assert(data.cards.length === 1 && data.cards[0].portrait && data.cards[0].portrait.src.startsWith('data:image'), 'backup holds card and portrait');
  await p.click('#btnTheme');
  assert(await p.evaluate(() => document.documentElement.dataset.theme) === 'dark', 'theme switches to dark');
  await p.reload(); await p.waitForTimeout(500);
  assert(await p.evaluate(() => document.documentElement.dataset.theme) === 'dark', 'dark mode remembered');
  assert(errs.length === 0, 'no page errors ' + JSON.stringify(errs));
  await b.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
