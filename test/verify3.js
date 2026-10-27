// Cast builder: pricing and casting rules, then a walk through the Cast builder tab.
const { chromium } = require('playwright');
const assert = (c, m) => { if (!c) throw new Error('FAIL: ' + m); console.log('ok  ' + m); };
(async () => {
  const base = process.env.BASE || 'http://localhost:8765/';
  const out = process.argv[2] || '/tmp';
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1500, height: 1000 } });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message)); p.on('dialog', (d) => d.accept());
  await p.goto(base); await p.waitForSelector('#genreToggles .genre-set');
  assert(!(await p.isVisible('#dlgNew')), 'no popup on first open');
  const r = await p.evaluate(() => {
    const P = (id) => SEVENTV_PROFILES.find((x) => x.id === id);
    const cast = { affiliation: 'heroic', genreSet: 'core', limit: 25, genre: '', members: [] };
    const m = (id, qty) => ({ profile: P(id), qty, key: id });
    return {
      invader4: CastRules.memberCost(P('alien-invader'), 4),
      invader3: CastRules.memberCost(P('alien-invader'), 3),
      agent3: CastRules.memberCost(P('agent'), 3),
      villainInHeroic: CastRules.check(cast, [m('bold-blade', 1), m('alien-invader', 1)]).rows[1].reasons,
      genreMiss: CastRules.check(cast, [m('mythic-champion', 1), m('cop', 1), m('chopper', 1)]).rows.map((x) => x.reasons.length),
      neutralStar: CastRules.check(Object.assign({}, cast, { affiliation: 'neutral' }), [m('bold-blade', 1)]).rows[0].reasons,
      unique: CastRules.check(cast, [m('bold-blade', 1), m('comic-relief', 2)]).rows[1].reasons,
      noLead: CastRules.check(cast, [m('agent', 2)]).warnings[0],
      over: CastRules.check(cast, [m('bold-blade', 1), m('grizzled-veteran', 1), m('agent', 3)]).warnings,
      convert: SEVENTV_RULES.convertGenres('80s', 'core', [0, 1, 2]),
      names: [0, 1, 2, 3, 4, 5].map(SEVENTV_RULES.alignedName),
      mixed: CastRules.check(cast, [m('maverick-cop-80s', 1), m('knight', 1), m('shuttlecraft', 1), m('cop', 2)]).rows.map((x) => x.reasons.length),
      mixedGenres: CastRules.check(cast, [m('maverick-cop-80s', 1)]).genreCounts
    };
  });
  assert(r.invader4 === 7, 'Alien Invader x4 = 5 + 2 (' + r.invader4 + ')');
  assert(r.invader3 === 5, 'Alien Invader x3 = 5');
  assert(r.agent3 === 9, 'Agent x3 = 9');
  assert(r.villainInHeroic.some((x) => /Villainous/.test(x)), 'villainous Extra flagged in a heroic cast');
  assert(JSON.stringify(r.genreMiss) === '[0,0,1]', 'Chopper shares no genre with Mythic Champion, Cop is fine ' + JSON.stringify(r.genreMiss));
  assert(r.neutralStar.length === 1, 'heroic Star flagged in a neutral cast');
  assert(r.unique.some((x) => /Unique/.test(x)), 'Unique profile x2 flagged');
  assert(/Add a Star or Co-Star/.test(r.noLead || ''), 'cast without a Star or Co-Star warned');
  assert(r.over.some((x) => /over the 25/.test(x)), 'over the ratings limit warned');
  assert(JSON.stringify(r.convert) === '[0,2,4]', 'Cold War, Frightmare, Greed & Glamour = Action, Fantasy, Horror ' + JSON.stringify(r.convert));
  assert(r.names.join('|') === 'Action / Cold War|Adventure / Hired Help|Fantasy / Greed & Glamour|Historical / Rebel State|Horror / Frightmare|Sci-Fi / Silicon Dream', 'alignment table matches the 80s guide');
  assert(JSON.stringify(r.mixed) === '[0,0,1,0]', '80s Maverick Cop leads Core Extras: Knight fits through Fantasy, Shuttlecraft does not ' + JSON.stringify(r.mixed));
  assert(JSON.stringify(r.mixedGenres) === '[1,0,1,0,1,0]', 'Maverick Cop counts as Action, Fantasy, Horror');

  // UI
  await p.click('.tab[data-view="cast"]'); await p.waitForTimeout(500);
  await p.fill('#cName', 'Pulp Heroes');
  await p.click('#addKinds [data-kind="star"]');
  await p.fill('#addSearch', 'bold blade'); await p.click('#addList [data-add="p:bold-blade"]');
  await p.click('#addKinds [data-kind="extra"]');
  await p.fill('#addSearch', 'agent'); await p.click('#addList [data-add="p:agent"]'); await p.click('#addList [data-add="p:agent"]');
  await p.waitForTimeout(200);
  assert((await p.textContent('#cTotal')) === '16', 'Bold Blade + 2 Agents = 16');
  await p.click('.member:has-text("Agent") [data-act="plus"]'); await p.waitForTimeout(200);
  assert((await p.textContent('#cTotal')) === '19', 'third Agent makes 19');
  await p.uncheck('#addFits'); await p.fill('#addSearch', 'alien invader');
  await p.click('#addList [data-add="p:alien-invader"]'); await p.waitForTimeout(200);
  assert((await p.locator('.member.bad').count()) === 1, 'Alien Invader row flagged');
  assert((await p.textContent('#cWarnings')).includes('breaks the casting rules'), 'cast warning shown');
  await p.screenshot({ path: out + '/v3-cast.png' });
  await p.click('.member:has-text("Alien Invader") [data-act="del"]');
  await p.waitForTimeout(400);
  assert((await p.textContent('#cWarnings')).includes('follows the casting rules'), 'clean cast after removing it');
  await p.click('#btnCastPrint'); await p.waitForTimeout(1500);
  assert(await p.isVisible('#printSource'), 'print sheet shows the cast as its source');
  { const sheets = await p.locator('.sheet').count(), faces = await p.locator('.sheet img').count();
    assert(faces % 2 === 0 && sheets === Math.ceil(faces / 2 / 4), `fold-over sheets hold 4 cards each (${faces / 2} cards on ${sheets} sheets)`); }
  await p.reload(); await p.waitForTimeout(600);
  await p.click('.tab[data-view="cast"]'); await p.waitForTimeout(600);
  assert((await p.inputValue('#cName')) === 'Pulp Heroes' && (await p.textContent('#cTotal')) === '19', 'cast saved and restored');
  await p.click('#btnCastNew'); await p.waitForTimeout(300);
  await p.uncheck('#addFits'); await p.fill('#addSearch', '');
  await p.click('#addBook [data-book="80s"]');
  for (const [k, n] of [['star', 18], ['co-star', 18], ['extra', 88], ['vehicle', 3]]) {
    await p.click(`#addKinds [data-kind="${k}"]`);
    assert((await p.locator('#addList [data-add^="p:"]').count()) === n, `${n} 80s ${k} profiles listed`);
  }
  await p.click('#addBook [data-book=""]'); await p.click('#addKinds [data-kind="star"]');
  assert((await p.locator('#addList [data-add^="p:"]').count()) === 34, 'both books together: 34 Stars');
  // phone layout: bottom bar flips between the cast and the Add list
  const ph = await (await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage();
  ph.on('pageerror', (e) => errs.push(e.message));
  await ph.goto(base); await ph.waitForTimeout(600);
  if (await ph.isVisible('#dlgNew')) await ph.click('#dlgNew .dlg-head button');
  await ph.click('.tab[data-view="cast"]'); await ph.waitForTimeout(500);
  assert(await ph.isVisible('#castBar') && !(await ph.isVisible('.cast-add')), 'phone: bottom bar shown, Add list hidden');
  await ph.click('#cbToggle'); await ph.waitForTimeout(200);
  assert(await ph.isVisible('.cast-add') && !(await ph.isVisible('#castMain')), 'phone: Add profiles shows the Add list');
  const before = +(await ph.textContent('#cbTotal'));
  await ph.uncheck('#addFits'); await ph.click('#addKinds [data-kind="extra"]'); await ph.fill('#addSearch', 'agent'); await ph.click('#addList [data-add="p:agent"]');
  await ph.waitForTimeout(200);
  assert(+(await ph.textContent('#cbTotal')) === before + 3, 'phone: bar total updates when adding');
  assert(await ph.evaluate(() => document.documentElement.scrollWidth - innerWidth) === 0, 'phone: no sideways scroll');
  assert(errs.length === 0, 'no page errors ' + JSON.stringify(errs));
  await b.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
