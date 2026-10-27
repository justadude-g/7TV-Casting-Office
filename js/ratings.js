/* Ratings calculator for customised Stars and Co-Stars (Core Rulebook pp. 38-47).
   Compares a card against the baseline profile it started from and prices each change. */
(function () {
  const R = window.SEVENTV_RULES;
  const C = R.CUSTOMISE;

  const norm = (s) => String(s || '').toLowerCase().replace(/[’'"”“.!?…]/g, '').replace(/\s+/g, ' ').trim();
  const moveOf = (name) => { const m = /^move\s*(\d+)/i.exec(String(name || '').trim()); return m ? +m[1] : null; };
  const magicOf = (name) => { const m = /^magic user\s*\(?\s*(\d+)/i.exec(String(name || '').trim()); return m ? +m[1] : null; };
  const isEffectsSection = (t) => /special effect/i.test(t || '');
  const isStarQuality = (t) => /star quality/i.test(t || '');

  function effectsOf(card) {
    const out = [];
    for (const s of card.back || []) if (isEffectsSection(s.title)) for (const e of s.entries || []) if (e.name) out.push(e);
    return out;
  }
  function starQualitiesOf(card) {
    const out = [];
    for (const s of card.back || []) if (isStarQuality(s.title)) for (const e of s.entries || []) if (e.name) out.push(e);
    return out;
  }

  function compute(card, base) {
    const res = { applies: false, base: null, lines: [], delta: 0, total: null, warnings: [], notes: [] };
    if (!base) { res.notes.push('No baseline profile, so set the ratings by hand.'); return res; }
    res.base = base.ratings;
    if (!['star', 'co-star'].includes(base.kind) || !['star', 'co-star'].includes(card.kind)) {
      res.notes.push('The customisation rules (p. 38) cover Stars and Co-Stars only. Extras and vehicles keep their listed ratings unless you agree a change with your opponent.');
      return res;
    }
    res.applies = true;
    const add = (label, cost) => { res.lines.push({ label, cost }); res.delta += cost; };

    if (base.affiliation !== card.affiliation && base.affiliation !== 'neutral') {
      res.warnings.push(`Affiliation changed from ${base.affiliation}: start from a ${card.affiliation} profile instead (p. 38).`);
    }
    if (base.kind !== card.kind) res.warnings.push(`Profile type changed from ${base.kind}. The rules price changes within the same profile.`);

    // 2. statistics
    const bs = base.stats || {}, cs = card.stats || {};
    let ups = 0, downs = 0;
    for (const k of ['fight', 'shoot', 'mind', 'body', 'spirit']) {
      const d = (+cs[k] || 0) - (+bs[k] || 0);
      if (!d) continue;
      if (Math.abs(d) > 1) res.warnings.push(`${cap(k)} moved by ${d > 0 ? '+' : ''}${d}. Each statistic can only be adjusted by 1.`);
      if (d > 0) ups++; else downs++;
      add(`${cap(k)} ${d > 0 ? '+' : ''}${d}`, d * C.statPerPoint);
    }
    const dd = (+cs.defence || 0) - (+bs.defence || 0);
    if (dd) add(`Defence ${dd > 0 ? '+' : ''}${dd}`, dd * C.defencePerPoint);
    if (dd < 0) res.notes.push('The rules only price raising Defence (+2 each). Lowering it is priced here at -2 per point; agree this with your opponent.');
    if (ups > C.maxStatsUp) res.warnings.push(`${ups} statistics raised. The limit is ${C.maxStatsUp}.`);
    if (downs > C.maxStatsDown) res.warnings.push(`${downs} statistics lowered. The limit is ${C.maxStatsDown}.`);
    if ((+card.health || 0) !== (+base.health || 0)) res.warnings.push('Health cannot be adjusted (p. 38).');

    // 3. genres
    // compare in the card's genre set, converting the baseline with the 80s alignment table if needed
    const bg = new Set(base.genreSet === card.genreSet ? (base.genres || []) : R.convertGenres(base.genreSet, card.genreSet, base.genres)), cg = new Set(card.genres || []);
    {
      const added = [...cg].filter((g) => !bg.has(g)), removed = [...bg].filter((g) => !cg.has(g));
      const swaps = Math.max(added.length, removed.length);
      if (swaps) add(`Genre swap${swaps > 1 ? ' x' + swaps : ''}`, swaps * C.genreSwap);
      if (swaps > C.maxGenreSwaps) res.warnings.push(`${swaps} genres changed. You can swap 1.`);
      if (added.length !== removed.length) res.warnings.push('Genres must be swapped one for one, not added or removed.');
    }

    // 4. special effects
    const be = effectsOf(base), ce = effectsOf(card);
    const bMove = be.map((e) => moveOf(e.name)).find((v) => v !== null) ?? C.baseMove;
    const cMove = ce.map((e) => moveOf(e.name)).find((v) => v !== null) ?? C.baseMove;
    if (cMove !== bMove) add(`Move ${bMove}" to ${cMove}"`, (cMove - bMove) * C.movePerInch);
    const bMagic = be.map((e) => magicOf(e.name)).find((v) => v !== null) ?? 0;
    const cMagic = ce.map((e) => magicOf(e.name)).find((v) => v !== null) ?? 0;
    if (cMagic !== bMagic) add(`Magic User ${bMagic} to ${cMagic}`, (cMagic - bMagic) * C.magicUserPerLevel);
    const plain = (list) => list.filter((e) => moveOf(e.name) === null && magicOf(e.name) === null);
    const bp = plain(be), cp = plain(ce);
    const bKeys = new Map(bp.map((e) => [norm(e.name), e])), cKeys = new Map(cp.map((e) => [norm(e.name), e]));
    const removedE = bp.filter((e) => !cKeys.has(norm(e.name)));
    const addedE = cp.filter((e) => !bKeys.has(norm(e.name)));
    const swapsE = Math.min(removedE.length, addedE.length);
    addedE.forEach((e, i) => {
      const pp = +e.pp || 0;
      if (i < swapsE) add(`Swap ${removedE[i].name} for ${e.name}${pp ? ` (${pp} plot point${pp > 1 ? 's' : ''})` : ''}`, pp * C.perPlotPoint);
      else add(`Add ${e.name}${pp ? ` (${pp} plot point${pp > 1 ? 's' : ''})` : ''}`, C.effectAdd + pp * C.perPlotPoint);
    });
    removedE.slice(swapsE).forEach((e) => add(`Remove ${e.name}`, C.effectRemove));
    if (swapsE > C.maxEffectSwaps) res.warnings.push(`${swapsE} special effects swapped. The limit is ${C.maxEffectSwaps}.`);
    if (removedE.length - swapsE > C.maxEffectRemoves) res.warnings.push(`${removedE.length - swapsE} special effects removed. The limit is ${C.maxEffectRemoves}.`);
    if (addedE.length > swapsE) res.notes.push('Adding a special effect is priced at +1 plus 1 per plot point, following the Regenerate example on p. 39.');
    const lib = new Set((window.SEVENTV_SPECIAL_EFFECTS || []).map((e) => norm(e.name.replace(/ X"?$| \(X\)$/, ''))));
    for (const e of addedE) {
      const k = norm(String(e.name).replace(/\s*\d+"?$/, '').replace(/\s*\(\d+\)$/, ''));
      if (!lib.has(k)) res.warnings.push(`${e.name} is not on the customisation list (pp. 40-46).`);
    }
    // edited text of a kept effect
    for (const e of cp) {
      const b = bKeys.get(norm(e.name));
      if (b && (norm(b.desc) !== norm(e.desc) || (+b.pp || 0) !== (+e.pp || 0))) res.notes.push(`${e.name} has edited text or cost. That is not priced.`);
    }

    // star quality
    const bq = starQualitiesOf(base).map((e) => norm(e.name)), cq = starQualitiesOf(card).map((e) => norm(e.name));
    if (bq.join('|') !== cq.join('|')) res.notes.push('Star quality changed. The rules have no cost for this, so agree it with your opponent.');

    // 5. attacks
    const ba = base.attacks || [], ca = card.attacks || [];
    const key = (a) => a.type + '|' + norm(a.name);
    const bA = new Map(ba.map((a) => [key(a), a])), cA = new Map(ca.map((a) => [key(a), a]));
    const remA = ba.filter((a) => !cA.has(key(a))), addA = ca.filter((a) => !bA.has(key(a)));
    let swapsA = 0, addsA = 0;
    const remPool = remA.slice();
    for (const a of addA) {
      const i = remPool.findIndex((r) => r.type === a.type);
      if (i >= 0) { const r = remPool.splice(i, 1)[0]; swapsA++; add(`Swap ${r.name} for ${a.name || 'new attack'}`, 0); }
      else { addsA++; add(`Add attack ${a.name || ''}`.trim(), C.attackAdd); }
    }
    if (remPool.length) res.notes.push(`Attack removed (${remPool.map((a) => a.name).join(', ')}). The rules have no cost for this.`);
    if (swapsA > C.maxAttackSwaps) res.warnings.push(`${swapsA} attacks swapped. The limit is ${C.maxAttackSwaps}.`);
    if (addsA > C.maxAttackAdds) res.warnings.push(`${addsA} attacks added. The limit is ${C.maxAttackAdds}.`);
    const table = new Set(R.ATTACK_TABLE.map((a) => norm(a.name)));
    for (const a of addA) if (!table.has(norm(a.name))) res.notes.push(`${a.name || 'New attack'} is not in the attack tables (pp. 48-49). Fine for a renamed attack, but check its strike and effects.`);
    for (const a of ca) {
      const b = bA.get(key(a));
      if (b && ((+b.mod || 0) !== (+a.mod || 0) || norm(b.effect) !== norm(a.effect) || norm(b.range) !== norm(a.range))) res.notes.push(`${a.name} has edited range, strike or effects. That is not priced.`);
    }

    res.total = (+base.ratings || 0) + res.delta;
    return res;
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  window.Ratings = { compute };
})();
