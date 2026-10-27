// Units in the Call Sheet and the find-by-role filter in the profile picker.
const { chromium } = require('playwright');
const assert = (c, m) => { if (!c) throw new Error('FAIL: ' + m); console.log('ok  ' + m); };
(async () => {
  const base = process.env.BASE || 'http://localhost:8765/';
  const b = await chromium.launch(); const errs = [];
  const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  p.on('pageerror', (e) => errs.push(e.message)); p.on('dialog', (d) => d.accept());
  await p.goto(base); await p.waitForTimeout(700);

  const unstamped = await p.evaluate(() => [...document.querySelectorAll('script[src^="js/"], link[rel="stylesheet"][href^="css/"]')].map((e) => e.getAttribute('src') || e.getAttribute('href')).filter((u) => !/\?v=\d+/.test(u)));
  assert(unstamped.length === 0, 'local scripts and styles carry a version stamp ' + unstamped.join(', '));

  // every unit member resolves to a profile
  const missing = await p.evaluate(() => {
    const P = window.SEVENTV_PROFILES, out = [];
    const find = (n, book) => { const m = (bk) => P.find((x) => x.genreSet === bk && x.name.toLowerCase() === n.toLowerCase()); return m(book) || m(book === 'core' ? '80s' : 'core'); };
    for (const u of window.SEVENTV_UNITS) for (const n of [...u.leader, ...u.slots.flatMap((s) => s.opts)]) if (!find(n, u.book)) out.push(u.name + ': ' + n);
    return out;
  });
  assert(missing.length === 0, 'all 20 units resolve to profiles ' + missing.join(', '));
  assert(await p.evaluate(() => Object.keys(window.SEVENTV_ROLES_80S).length) === 36, '36 80s Stars and Co-Stars have example roles');

  // find by role
  await p.click('#btnNew'); await p.waitForTimeout(300);
  const hits = async (q) => { await p.fill('#roleSearch', q); await p.waitForTimeout(150); return p.$$eval('.role-hit', (x) => x.map((e) => e.textContent.trim())); };
  let h = await hits('immoral capitalists');
  assert(h.length === 1 && /Corrupt Authority/.test(h[0]), 'Immoral Capitalists finds Corrupt Authority');
  assert((await p.$$eval('#profileList .p-row', (x) => x.map((e) => e.dataset.id))).join() === 'corrupt-authority', 'profile list narrows to Corrupt Authority');
  h = await hits('cop');
  assert(h.length > 4 && !h.some((x) => /Sycophantic/.test(x)), 'cop matches word starts only');
  assert((await hits('spy')).some((x) => /Super Spies/.test(x)), 'spy also finds spies');
  assert((await hits('ceos')).some((x) => /Millionaire Meddler/.test(x)), '80s roles are searchable (CEOs)');
  assert((await hits('robot')).some((x) => /Killer Robot/.test(x)), 'Extras match by name');
  await p.click('.role-hit[data-role-id="millionaire-meddler-80s"]').catch(async () => { await hits('ceos'); await p.click('.role-hit[data-role-id="millionaire-meddler-80s"]'); });
  await p.waitForTimeout(200);
  assert(await p.evaluate(() => App.S.wizard.sel) === 'millionaire-meddler-80s', 'clicking a role selects its profile');
  await hits('zzzz');
  assert(/No profile lists/.test(await p.textContent('#roleHits')), 'no-match message');
  await p.fill('#roleSearch', ''); await p.click('#dlgNew .dlg-head button');

  // units
  await p.click('.tab[data-view="cast"]'); await p.waitForTimeout(500);
  await p.click('#btnCastNew'); await p.waitForTimeout(300);
  await p.selectOption('#cAff', 'heroic');
  await p.click('#addSource [data-src="units"]'); await p.waitForTimeout(200);
  const heroic = await p.$$eval('#addList [data-addunit]', (x) => x.map((e) => e.dataset.addunit));
  assert(!heroic.includes('criminal-gang') && heroic.includes('police-squad'), 'fit filter hides units with a villainous leader');
  await p.selectOption('#cAff', 'villainous'); await p.waitForTimeout(200);
  await p.click('[data-addunit="criminal-gang"]'); await p.waitForTimeout(300);
  assert(await p.textContent('#cTotal') === '5', 'Criminal Gang starts with Enforcer and 1 Thug (5 ratings)');
  for (let i = 0; i < 7; i++) await p.click('.u-row[data-slot="0"] [data-uact="plus"]', { force: true, timeout: 1000 }).catch(() => {});
  assert(await p.inputValue('.u-row[data-slot="0"] input') === '6', 'Thugs stop at the unit maximum of 6');
  await p.click('.u-row[data-slot="3"] [data-uact="plus"]'); await p.waitForTimeout(200);
  assert(await p.textContent('#cTotal') === '19', 'Enforcer 3 + 6 Thugs 12 + Getaway Car 4 = 19');
  await p.click('[data-addunit="minion-squad"]'); await p.waitForTimeout(200);
  const ms = p.locator('.unit').nth(1);
  await ms.locator('.u-row[data-slot="2"] .u-opt').selectOption('1');
  await ms.locator('.u-row[data-slot="2"] [data-uact="plus"]').click(); await p.waitForTimeout(200);
  assert(/7 each/.test(await ms.locator('.u-row[data-slot="2"] .m-meta').textContent()), 'or-choice swaps Killer Robot for Heavy Weapons Team');
  await p.waitForTimeout(600); await p.reload(); await p.waitForTimeout(700);
  await p.click('.tab[data-view="cast"]'); await p.waitForTimeout(500);
  assert((await p.$$eval('.unit', (x) => x.length)) === 2, 'units are saved with the cast');
  await p.locator('.unit').nth(1).locator('[data-uact="del"]').first().click(); await p.waitForTimeout(200);
  assert((await p.$$eval('.unit', (x) => x.length)) === 1, 'remove unit');
  await p.click('#btnCastPrint'); await p.waitForTimeout(600);
  assert(await p.isVisible('#view-print'), 'unit models go to the print sheet');

  // official errata
  const err = await p.evaluate(() => {
    const fx = (id) => SEVENTV_PROFILES.find((x) => x.id === id).back.flatMap((s) => s.entries);
    const gv = fx('grizzled-veteran'), hg = fx('hardened-grunt-80s');
    return { gvPower: gv.some((e) => e.name === 'Power Behind The Throne' && e.action === 'P'), gvQuick: gv.some((e) => /quickdraw/i.test(e.name)),
      hgMil: hg.some((e) => e.name === 'Military Training' && /add \+1 to its strike roll/.test(e.desc)), hgLeader: hg.some((e) => /activated for no plot point cost/.test(e.desc)) };
  });
  assert(err.gvPower && !err.gvQuick, 'errata: Grizzled Veteran has Power Behind The Throne, not Quickdraw');
  assert(err.hgMil && !err.hgLeader, 'errata: Hardened Grunt has Military Training, no Unit Leader text');

  await p.click('.tab[data-view="about"]'); await p.waitForTimeout(200);
  assert(/Karl Perrotto/.test(await p.textContent('#aboutErrata')) && /Power Behind The Throne/.test(await p.textContent('#aboutErrata')), 'About lists the errata');

  // reference tab
  await p.click('.tab[data-view="reference"]'); await p.waitForTimeout(300);
  assert(await p.isVisible('#view-reference .qref-grid'), 'Reference tab shows the quick reference');
  assert((await p.$$eval('#view-reference .q-step', (x) => x.length)) === 10, 'all 10 setup steps on screen');
  const pdf = await p.evaluate(async () => { const r = await fetch(document.querySelector('.qref-dl').getAttribute('href')); const b = await r.arrayBuffer(); return { ok: r.ok, head: String.fromCharCode(...new Uint8Array(b.slice(0, 5))), size: b.byteLength }; });
  assert(pdf.ok && pdf.head === '%PDF-' && pdf.size > 50000, 'Download the PDF serves the quick reference PDF');
  assert(/7TV Quick Reference\.pdf/.test(await p.getAttribute('.qref-dl', 'download')), 'download keeps a readable file name');

  // phone
  const ph = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage(); ph.on('pageerror', (e) => errs.push(e.message));
  await ph.goto(base); await ph.waitForTimeout(700); await ph.click('.tab[data-view="cast"]'); await ph.waitForTimeout(500);
  assert((await ph.evaluate(() => document.documentElement.scrollWidth)) <= 390, 'phone: no sideways scroll with units');
  await ph.click('.tab[data-view="reference"]'); await ph.waitForTimeout(300);
  assert((await ph.evaluate(() => document.documentElement.scrollWidth)) <= 390, 'phone: no sideways scroll on Reference');
  assert(errs.length === 0, 'no page errors ' + JSON.stringify(errs));
  await b.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
