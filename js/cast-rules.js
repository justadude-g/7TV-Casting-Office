/* Cast building rules (Core Rulebook pp. 21-25, and the 80s guide on mixing profiles).
   Core and 80s profiles can share a cast; genres are compared through the 80s alignment table.
   Pure functions: give them a cast and its resolved members, get totals and warnings back. */
(function () {
  const R = window.SEVENTV_RULES;
  const MODEL_KINDS = ['star', 'co-star', 'extra'];

  /* "or 5 for 3 models" -> { price: 5, size: 3 } */
  function bundleOf(note) {
    const m = /or\s+(\d+)\s+for\s+(\d+)/i.exec(String(note || ''));
    return m ? { price: +m[1], size: +m[2] } : null;
  }
  function unitRatings(p) { const n = parseInt(p.ratings, 10); return isNaN(n) ? 0 : n; }
  function memberCost(p, qty) {
    const unit = unitRatings(p), q = Math.max(0, qty | 0), b = bundleOf(p.ratingsNote);
    if (!b || b.price >= unit * b.size) return unit * q;
    return Math.floor(q / b.size) * b.price + (q % b.size) * unit;
  }
  function priceLabel(p) {
    const b = bundleOf(p.ratingsNote);
    return b ? `${unitRatings(p)} each, or ${b.price} for ${b.size}` : `${unitRatings(p)} each`;
  }

  /* Can this profile join a cast of this affiliation? Returns a reason when it cannot. */
  function affiliationReason(castAff, p) {
    const aff = p.affiliation, kind = p.kind;
    if (castAff === 'heroic' && aff === 'villainous') return 'Villainous profiles cannot join a heroic cast.';
    if (castAff === 'villainous' && aff === 'heroic') return 'Heroic profiles cannot join a villainous cast.';
    if (castAff === 'neutral' && (kind === 'star' || kind === 'co-star') && aff !== 'neutral') return 'A neutral cast can only take neutral Stars and Co-Stars.';
    return '';
  }

  /* a profile's genres as Core genre indices (0 Action / Cold War ... 5 Sci-Fi / Silicon Dream) */
  function aligned(p) { return (p.genres || []).map((i) => R.toCore(p.genreSet || 'core', i)).filter((i) => i >= 0); }

  function hasUnique(p) {
    if (p.unique) return true; // name-only stubs carry the flag instead of their card text
    return (p.back || []).some((s) => (s.entries || []).some((e) => /^unique$/i.test(String(e.name || '').trim())));
  }

  /* members: [{ profile, qty, key }] already resolved */
  function check(cast, members) {
    const out = { total: 0, limit: +cast.limit || 0, counts: { star: 0, 'co-star': 0, extra: 0, vehicle: 0, models: 0 }, warnings: [], notes: [], rows: [], genreCounts: [0, 0, 0, 0, 0, 0] };
    const leads = members.filter((m) => m.profile && (m.profile.kind === 'star' || m.profile.kind === 'co-star') && m.qty > 0);
    const leadGenres = new Set();
    for (const m of leads) for (const g of aligned(m.profile)) leadGenres.add(g);

    for (const m of members) {
      const p = m.profile;
      const row = { key: m.key, cost: 0, reasons: [] };
      if (!p) { row.reasons.push('This card no longer exists in My Cards.'); out.rows.push(row); continue; }
      const qty = Math.max(0, m.qty | 0);
      row.cost = memberCost(p, qty);
      out.total += row.cost;
      out.counts[p.kind] = (out.counts[p.kind] || 0) + qty;
      if (MODEL_KINDS.includes(p.kind)) out.counts.models += qty;
      for (const g of aligned(p)) out.genreCounts[g] += qty;

      const ar = affiliationReason(cast.affiliation, p);
      if (ar) row.reasons.push(ar);
      if ((p.kind === 'extra' || p.kind === 'vehicle') && leads.length) {
        const shares = aligned(p).some((g) => leadGenres.has(g));
        if (!shares) row.reasons.push('Shares no genre with your Stars and Co-Stars.');
      }
      if (hasUnique(p) && qty > 1) row.reasons.push('Unique: only one model with this profile name per cast.');
      out.rows.push(row);
    }

    if (!members.length) return out;
    if (!leads.length) out.warnings.push('Add a Star or Co-Star. Their genres decide which Extras can join, and a cast usually has at least one (p. 25).');
    if (out.limit && out.total > out.limit) out.warnings.push(`${out.total - out.limit} ratings over the ${out.limit}-ratings limit.`);
    const flagged = out.rows.filter((r) => r.reasons.length).length;
    if (flagged) out.warnings.push(`${flagged} cast member${flagged > 1 ? 's break' : ' breaks'} the casting rules. See the notes on each row.`);
    if (cast.genre !== null && cast.genre !== undefined && cast.genre !== '') {
      const g = +cast.genre, name = R.alignedName(g);
      if (!out.genreCounts[g]) out.warnings.push(`No cast member has the ${name} genre, so its genre effects are unavailable (p. 23).`);
    }
    if (flagged) out.notes.push('Some special effects (such as Flunky) let a profile bend these rules. Agree any exception with your opponent.');
    return out;
  }

  window.CastRules = { bundleOf, memberCost, priceLabel, affiliationReason, check, unitRatings, aligned };
})();
