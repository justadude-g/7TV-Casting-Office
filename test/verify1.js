// Library-wide checks: every official profile renders, fits, and prices at zero change.
const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE || 'http://localhost:8765/';
  const b = await chromium.launch(); const p = await b.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(base + 'test/harness.html?ids=none');
  await p.waitForSelector('body[data-done]', { state: 'attached' });
  await p.addScriptTag({ url: base + 'js/data/special-effects.js' });
  await p.addScriptTag({ url: base + 'js/ratings.js' });
  const res = await p.evaluate(() => {
    const out = { count: 0, tight: [], squeezed: [], ratingIssues: [], strikeIssues: [] };
    const cf = document.createElement('canvas'), cb = document.createElement('canvas');
    for (const prof of SEVENTV_PROFILES) {
      out.count++;
      delete cf.dataset.tableSqueeze;
      CardRender.renderFront(cf, prof); CardRender.renderBack(cb, prof);
      const sc = +cb.dataset.backScale; if (sc < 0.8) out.tight.push(prof.id + ' back ' + sc);
      if (cf.dataset.tableSqueeze && +cf.dataset.tableSqueeze < 1) out.squeezed.push(prof.id + ' table ' + cf.dataset.tableSqueeze);
      const r = Ratings.compute(JSON.parse(JSON.stringify(prof)), prof);
      if (r.applies && (r.delta !== 0 || r.warnings.length)) out.ratingIssues.push(prof.id + ' ' + r.delta + ' ' + r.warnings.join('; '));
      for (const a of prof.attacks) { const v = CardRender.strikeValue(prof, a); if (!a.strikeOverride && !/^[+-]\d+$/.test(v)) out.strikeIssues.push(prof.id + ' ' + a.name + ' ' + v); }
    }
    // pricing spot checks on Grizzled Veteran
    const gv = SEVENTV_PROFILES.find((x) => x.id === 'grizzled-veteran');
    const c = JSON.parse(JSON.stringify(gv));
    c.stats.fight += 1; c.stats.mind -= 1; c.stats.defence += 1;
    c.genres = [0, 4, 3]; // swap Sci-Fi for Historical
    c.back[1].entries[0] = Object.assign({}, SEVENTV_SPECIAL_EFFECTS.find((e) => e.name === 'Camouflage'));
    c.attacks.push({ type: 'fight', name: 'Katana', range: '0"', mod: 0, effect: 'Deadly, -1 Health' });
    const r = Ratings.compute(c, gv);
    out.spot = { total: r.total, lines: r.lines, warnings: r.warnings };
    return out;
  });
  console.log(JSON.stringify(res, null, 1));
  console.log('errors', JSON.stringify(errs));
  await b.close();
})();
