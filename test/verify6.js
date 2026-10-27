// Props page: design, save, print and back up Prop and Maguffin cards.
const { chromium } = require('playwright');
const assert = (c, m) => { if (!c) throw new Error('FAIL: ' + m); console.log('ok  ' + m); };
(async () => {
  const base = process.env.BASE || 'http://localhost:8765/';
  const b = await chromium.launch(); const errs = [];
  const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, acceptDownloads: true }); const p = await ctx.newPage();
  p.on('pageerror', (e) => errs.push(e.message)); p.on('dialog', (d) => d.accept());
  await p.goto(base); await p.waitForTimeout(700);
  // a test item image drawn in the browser: a red circle on a transparent background
  const png = Buffer.from((await p.evaluate(() => { const c = document.createElement('canvas'); c.width = 400; c.height = 300; const x = c.getContext('2d'); x.fillStyle = '#c33'; x.beginPath(); x.arc(200, 150, 120, 0, 7); x.fill(); return c.toDataURL('image/png'); })).split(',')[1], 'base64');
  const file = { name: 'item.png', mimeType: 'image/png', buffer: png };

  await p.click('.tab[data-view="props"]'); await p.waitForTimeout(500);
  assert(await p.isVisible('#pcFront') && await p.isVisible('#pcBack'), 'Props page shows a front and a back');
  await p.click('#pcNewProp'); await p.fill('#pcName', 'Grappling Hook');
  await p.fill('#pcEffect', 'Choose any point 12" away. Place this model at that point immediately.');
  await p.setInputFiles('#pcImage', file); await p.waitForTimeout(500);
  const px = (sel, x, y) => p.$eval(sel, (c, [x, y]) => [...c.getContext('2d').getImageData(x, y, 1, 1).data].slice(0, 3), [x, y]);
  const head = await px('#pcFront', 100, 90), img = await px('#pcFront', 375, 360);
  assert(head[2] > head[0] && img[0] > 150 && img[1] < 90, 'Prop front: blue header, uploaded image in the panel');
  assert(!(await p.isVisible('#pcFlavourRow')), 'Prop cards have no flavour text field');
  await p.click('#pcSave'); await p.waitForTimeout(400);

  await p.click('#pcNewMag'); await p.fill('#pcName', 'Mirror Shades');
  await p.fill('#pcFlavour', 'These rad glasses keep you cool.'); await p.fill('#pcEffect', 'Beam. Enemies touched receive the Immobilised status.');
  await p.setInputFiles('#pcImage', file); await p.waitForTimeout(500);
  const mh = await px('#pcFront', 300, 90), backImg = await px('#pcBack', 375, 500);
  assert(mh[0] > 180 && mh[1] > 120 && mh[2] < 90, 'Maguffin front: yellow header');
  assert(backImg[0] > 150 && backImg[1] < 90, 'Maguffin back shows the same uploaded image');
  await p.click('#pcSave'); await p.waitForTimeout(400);

  await p.click('.tab[data-view="cards"]'); await p.waitForTimeout(1200);
  const metas = await p.$$eval('.tile .t-meta', (x) => x.map((e) => e.textContent));
  assert(metas.includes('Prop card') && metas.includes('Maguffin card'), 'both cards are in My Cards');
  for (const t of await p.$$('.tile [data-sel]')) await t.check();
  await p.click('.tab[data-view="print"]'); await p.waitForTimeout(1500);
  assert(await p.locator('.sheet img').count() === 4, 'print preview: two cards, front beside back');
  const [pdf] = await Promise.all([p.waitForEvent('download', { timeout: 60000 }), p.click('#btnPdf')]);
  const path = '/tmp/props-sheet.pdf'; await pdf.saveAs(path);
  assert(require('fs').statSync(path).size > 40000, 'Prop and Maguffin cards print to PDF');

  await p.click('.tab[data-view="cast"]'); await p.waitForTimeout(500); await p.click('#addSource [data-src="mine"]'); await p.waitForTimeout(300);
  assert(await p.locator('#addList .add-row').count() === 0, 'Prop and Maguffin cards are not offered as cast members');

  await p.click('.tab[data-view="cards"]'); await p.waitForTimeout(800);
  await p.click('.tile:has-text("Grappling Hook") img'); await p.waitForTimeout(600);
  assert(await p.evaluate(() => document.querySelector('.view.is-active').id) === 'view-props' && await p.inputValue('#pcName') === 'Grappling Hook', 'opening a Prop from My Cards goes to the Props page');

  // shared Prop back image
  const before = await px('#pcBack', 375, 400);
  await p.setInputFiles('#pcBackImg', file); await p.waitForTimeout(500);
  const after = await px('#pcBack', 375, 450);
  assert(after[0] > 150 && after[1] < 90 && JSON.stringify(before) !== JSON.stringify(after), 'uploading a Prop back replaces the drawn back');
  const [bk] = await Promise.all([p.waitForEvent('download'), (async () => { await p.click('.tab[data-view="cards"]'); await p.waitForTimeout(300); await p.click('#btnExport'); })()]);
  const data = JSON.parse(require('fs').readFileSync(await bk.path(), 'utf8'));
  assert(data.cards.some((c) => c.deck === 'maguffin' && c.image && c.image.src) && /^data:image/.test(data.settings.propBack || ''), 'backup holds the cards, their images and the Prop back');
  assert(errs.length === 0, 'no page errors ' + JSON.stringify(errs));
  await b.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
