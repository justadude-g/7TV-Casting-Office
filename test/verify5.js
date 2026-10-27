// Genres page: genre data, film data, filters and starting a card from a film character.
const { chromium } = require('playwright');
const assert = (c, m) => { if (!c) throw new Error('FAIL: ' + m); console.log('ok  ' + m); };
(async () => {
  const base = process.env.BASE || 'http://localhost:8765/';
  const b = await chromium.launch(); const errs = [];
  const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  p.on('pageerror', (e) => errs.push(e.message)); p.on('dialog', (d) => d.accept());
  await p.goto(base); await p.waitForTimeout(700);

  const data = await p.evaluate(() => {
    const P = new Map(SEVENTV_PROFILES.map((x) => [x.id, x])), M = SEVENTV_MOVIES, R = SEVENTV_RULES;
    const keys = new Set([...R.GENRE_SETS.core.genres, ...R.GENRE_SETS['80s'].genres].map((g) => g.key));
    const kinds = { s: 'star', c: 'co-star', e: 'extra', v: 'vehicle' }, affs = { h: 'heroic', v: 'villainous', n: 'neutral' };
    const bad = [];
    for (const m of M) {
      for (const g of m.g) if (!keys.has(g)) bad.push(`${m.t}: genre ${g}`);
      for (const [ch, , role, pid] of m.cast) {
        const pr = P.get(pid);
        if (!pr) { bad.push(`${m.t}: ${ch} has no profile ${pid}`); continue; }
        if (pr.kind !== kinds[role[1]]) bad.push(`${m.t}: ${ch} is ${role} but ${pid} is a ${pr.kind}`);
        if (pr.affiliation !== 'neutral' && pr.affiliation !== affs[role[0]]) bad.push(`${m.t}: ${ch} is ${affs[role[0]]} but ${pid} is ${pr.affiliation}`);
      }
    }
    const per = {}; for (const m of M) per[m.decade] = (per[m.decade] || 0) + 1;
    const info = Object.values(SEVENTV_GENRE_INFO).flatMap((s) => Object.values(s)).filter((g) => g.sub && g.desc).length;
    return { bad, per, n: M.length, info, titles: M.map((m) => m.t), dup: M.map((m) => m.t + m.y).filter((x, i, a) => a.indexOf(x) !== i) };
  });
  assert(data.info === 12, 'all 12 genres have a sub-genre line and a summary');
  assert(data.n === 100 && Object.values(data.per).every((n) => n === 20) && Object.keys(data.per).join() === '1980,1990,2000,2010,2020', '100 films, 20 in each decade from the 1980s to the 2020s');
  assert(data.bad.length === 0, 'every cast role resolves to a matching profile ' + data.bad.join('; '));
  assert(data.dup.length === 0, 'no duplicate films');
  const must = ['Commando', 'Rambo: First Blood Part II', 'Rambo', 'John Wick', 'Predator', 'Die Hard', 'Die Hard 2', 'Die Hard with a Vengeance', 'Universal Soldier', 'Hard Target',
    'Army of Darkness', 'Lethal Weapon', 'Escape from New York', 'They Live', 'Scarface', 'Under Siege', 'Metro', 'Beverly Hills Cop', 'Aliens', 'GoldenEye', 'Bad Boys', 'Rush Hour',
    'True Lies', 'Speed', 'The Terminator', 'Demolition Man'];
  const missing = must.filter((t) => !data.titles.includes(t));
  assert(missing.length === 0, 'all requested films are listed ' + missing.join(', '));

  await p.click('.tab[data-view="genres"]'); await p.waitForTimeout(300);
  assert(await p.locator('.gp-genre').count() === 12, '12 genre cards with symbols');
  assert(await p.locator('.gp-genre img').count() === 12, 'every genre card has its symbol');
  assert((await p.textContent('#gpCount')).startsWith('100 films'), 'all 100 films listed by default');
  await p.click('.gp-genre[data-genre="frightmare"]'); await p.waitForTimeout(300);
  const fright = await p.evaluate(() => SEVENTV_MOVIES.filter((m) => m.g.includes('frightmare')).length);
  assert(await p.locator('.gp-film').count() === fright && await p.getAttribute('.gp-genre[data-genre="frightmare"]', 'aria-pressed') === 'true', 'clicking Frightmare filters to its films');
  await p.click('#gpDecade [data-decade="1980"]'); await p.waitForTimeout(200);
  const titles = await p.$$eval('.gp-title', (x) => x.map((e) => e.textContent));
  assert(titles.length > 0 && titles.every((t) => /\(198\d\)/.test(t)), 'decade filter keeps only 1980s films');
  await p.click('.gp-genre[data-genre="frightmare"]'); await p.waitForTimeout(200);
  assert(await p.inputValue('#gpGenre') === '', 'clicking the selected genre again clears it');
  await p.click('#gpClear'); await p.fill('#gpSearch', 'die hard'); await p.waitForTimeout(200);
  assert(await p.locator('.gp-film').count() === 4, 'search "die hard" finds the four Die Hard films');
  await p.fill('#gpSearch', 'commando'); await p.waitForTimeout(200);
  await p.click('.gp-film summary'); await p.waitForTimeout(200);
  assert(/John Matrix[\s\S]*Heroic Star/.test(await p.textContent('.gp-film')) && /Bennett[\s\S]*Villainous Star/.test(await p.textContent('.gp-film')) && /Cindy[\s\S]*Heroic Co-Star/.test(await p.textContent('.gp-film')), 'Commando lists John Matrix, Cindy and Bennett with their 7TV roles');
  await p.click('.gp-film [data-start="0"]'); await p.waitForTimeout(500);
  assert(await p.inputValue('#fName') === 'John Matrix' && await p.inputValue('#fAffiliation') === 'heroic', 'starting a card from a character names it and sets the affiliation');

  const ph = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage(); ph.on('pageerror', (e) => errs.push(e.message));
  await ph.goto(base); await ph.waitForTimeout(700); await ph.click('.tab[data-view="genres"]'); await ph.waitForTimeout(300);
  await ph.fill('#gpSearch', 'aliens'); await ph.click('.gp-film summary'); await ph.waitForTimeout(200);
  assert((await ph.evaluate(() => document.documentElement.scrollWidth)) <= 390, 'phone: no sideways scroll with a film open');
  assert(errs.length === 0, 'no page errors ' + JSON.stringify(errs));
  await b.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
