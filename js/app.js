/* 7TV Casting Office: editor UI. */
(function () {
  const R = window.SEVENTV_RULES;
  // name-only stubs (the public build's 80s and Steel Justice profiles) are for the Call Sheet only, never Casting
  const PROFILES = (window.SEVENTV_PROFILES || []).filter((p) => !p.stub);
  const LIB = window.SEVENTV_SPECIAL_EFFECTS || [];
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const uid = () => 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const slug = (s) => String(s || 'card').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'card';
  const MODEL_STATS = ['fight', 'shoot', 'defence', 'mind', 'body', 'spirit'];
  // the standard effect every official vehicle carries
  const VEHICLE_EFFECT = { name: 'Vehicle', pp: 0, action: 'P', once: false, desc: 'This vehicle ignores all statuses except Immobilised and On Fire, cannot be knocked down and is immune to presence attacks. Enemies gain one stretch die when making a strike against this vehicle.' };

  const S = {
    card: null, dirty: false, portraitImg: null, badgeImg: null, defaultBadge: { src: null, img: null }, propBack: { src: null, img: null },
    saved: [], selection: new Set(), qty: {}, thumbs: new Map(),
    wizard: { book: '', kind: '', aff: '', q: '', role: '' }, lastSet: 'core',
    lib: { q: '', kind: 'all' }
  };

  /* ---------------- card factory ---------------- */
  function defaultBack(kind) {
    if (kind === 'star' || kind === 'co-star') return [{ title: 'Star Quality', entries: [] }, { title: 'Special Effects', entries: [] }];
    if (kind === 'vehicle') return [{ title: 'Special Effects', entries: [Object.assign({}, VEHICLE_EFFECT)] }, { title: 'Stunts', entries: [] }];
    return [{ title: 'Special Effects', entries: [] }];
  }
  function blankCard(kind, set) {
    const stats = kind === 'vehicle'
      ? { capacity: 4, speed: 12, defence: 8, armour: '5+' }
      : { fight: 3, shoot: 3, defence: kind === 'star' ? 10 : kind === 'co-star' ? 9 : 8, mind: 3, body: 3, spirit: 3 };
    return {
      id: uid(), name: 'New ' + R.KINDS[kind].label, affiliation: 'neutral', kind, genreSet: set,
      ratings: kind === 'star' ? 10 : kind === 'co-star' ? 6 : kind === 'vehicle' ? 4 : 2, ratingsAuto: false,
      genres: [], stats, health: R.KINDS[kind].health,
      attacks: kind === 'vehicle' ? [] : [
        { type: 'fight', name: 'Brawl', range: '0"', mod: 0, effect: '0 Health, Weakened' },
        { type: 'shoot', name: 'Handgun', range: '12"', mod: 3, effect: '2 Shots, -1 Health' },
        { type: 'presence', name: 'Presence attack', range: '3"', mod: 0, effect: '0 Health, Distracted' }
      ],
      back: defaultBack(kind), portrait: null, distress: true, base: null
    };
  }
  function cardFromProfile(p, set) {
    const c = clone(p);
    const base = clone(p);
    const card = {
      id: uid(), name: c.name, affiliation: c.affiliation, kind: c.kind, genreSet: set || c.genreSet,
      ratings: c.ratings, ratingsNote: c.ratingsNote || '', ratingsAuto: ['star', 'co-star'].includes(c.kind),
      genres: set && set !== c.genreSet ? R.convertGenres(c.genreSet, set, c.genres) : c.genres, stats: c.stats, health: c.health, attacks: c.attacks,
      back: c.back, portrait: null, distress: true, base, baseId: p.id
    };
    if (set && set !== c.genreSet) card.base.genreSet = c.genreSet;
    return card;
  }

  /* ---------------- rendering ---------------- */
  let raf = 0;
  function render() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const c = S.card; if (!c) return;
      applyAutoRatings();
      CardRender.renderFront($('#cvFront'), c, { portraitImg: S.portraitImg, badgeImg: S.badgeImg || S.defaultBadge.img });
      const back = CardRender.renderBack($('#cvBack'), c);
      const sc = +back.dataset.backScale;
      $('#backScaleNote').textContent = sc < 0.995 ? `Text shrunk to ${Math.round(sc * 100)}% to fit` : '';
      renderRatings();
    });
  }
  function changed(opts = {}) {
    S.dirty = true; setSaveState();
    render();
    saveDraftSoon();
    if (opts.rebuild) buildForm();
  }
  function setSaveState() {
    $('#saveState').textContent = S.dirty ? 'Unsaved changes' : (S.card && S.saved.some((x) => x.id === S.card.id) ? 'Saved' : '');
  }
  let draftT = 0;
  function saveDraftSoon() {
    clearTimeout(draftT);
    draftT = setTimeout(() => { CardStore.setMeta('draft', { card: S.card, dirty: S.dirty }).catch(() => {}); }, 600);
  }

  function applyAutoRatings() {
    const c = S.card;
    if (!c.ratingsAuto || !c.base) return;
    const r = Ratings.compute(c, c.base);
    if (r.applies && r.total !== null) { c.ratings = r.total; const el = $('#fRatings'); if (el && document.activeElement !== el) el.value = r.total; }
  }

  function renderRatings() {
    const c = S.card, out = $('#ratingsOut');
    const r = Ratings.compute(c, c.base);
    let h = '';
    if (r.applies) {
      h += '<table>';
      h += `<tr><td>Baseline: ${esc(c.base.name)}</td><td>${esc(r.base)}</td></tr>`;
      if (!r.lines.length) h += '<tr><td class="note">No priced changes yet.</td><td></td></tr>';
      for (const l of r.lines) h += `<tr><td>${esc(l.label)}</td><td>${l.cost > 0 ? '+' : ''}${l.cost}</td></tr>`;
      h += `<tr class="total"><td>Suggested ratings</td><td>${r.total}</td></tr></table>`;
      if (!c.ratingsAuto && String(c.ratings) !== String(r.total)) h += `<p class="note">The card shows ${esc(c.ratings)}. Tick Auto next to Ratings to use the suggested value.</p>`;
    }
    for (const w of r.warnings) h += `<div class="warn">${esc(w)}</div>`;
    for (const n of r.notes) h += `<p class="note">${esc(n)}</p>`;
    out.innerHTML = h || '<p class="note">Nothing to price.</p>';
  }

  /* ---------------- form ---------------- */
  function buildForm() {
    const c = S.card;
    $('#fName').value = c.name || '';
    $('#fAffiliation').value = c.affiliation;
    $('#fKind').value = c.kind;
    $('#fRatings').value = c.ratings ?? '';
    $('#fRatingsAuto').checked = !!c.ratingsAuto;
    $('#fRatingsAuto').disabled = !(c.base && ['star', 'co-star'].includes(c.base.kind));
    $('#fRatingsNote').value = c.ratingsNote || '';
    $('#fTypeLabel').value = c.typeLabel || '';
    $('#fDistress').checked = c.distress !== false;
    $('#fBackScale').value = c.backScale ? String(c.backScale) : '';
    $('#fBand').value = (c.colours && c.colours.band) || R.KINDS[c.kind].band;
    $('#baseLine').innerHTML = c.base
      ? `Started from <b>${esc(c.base.name)}</b> (${esc(R.AFFILIATIONS[c.base.affiliation])} ${esc(R.KINDS[c.base.kind].label)}, ${esc(c.base.ratings)} ratings${c.base.source ? ', ' + esc(c.base.source) : ''}).`
      : 'Blank profile.';
    buildGenres(); buildStats(); buildAttacks(); buildSections();
    render();
  }

  function buildGenres() {
    const c = S.card;
    const band = (c.colours && c.colours.band) || R.KINDS[c.kind].band;
    $('#genreToggles').innerHTML = ['core', '80s'].map((id) => {
      const set = R.GENRE_SETS[id], active = id === c.genreSet;
      const lit = active ? c.genres : R.convertGenres(c.genreSet, id, c.genres);
      const chips = set.genres.map((g, i) => {
        const on = lit.includes(i);
        return active
          ? `<button type="button" class="genre ${on ? 'is-on' : ''}" data-i="${i}" style="--g:${band}" aria-pressed="${on}"><img src="${g.icon}" alt=""><span>${esc(g.name)}</span></button>`
          : `<button type="button" class="genre ghost ${on ? 'is-on' : ''}" data-use="${id}" tabindex="-1" title="Switch to the ${esc(set.label)} genres"><img src="${g.icon}" alt=""><span>${esc(g.name)}</span></button>`;
      }).join('');
      return `<div class="genre-set ${active ? 'is-active' : ''}" style="--g:${band}">
        <label class="gs-pick"><input type="radio" name="genreSet" value="${id}" ${active ? 'checked' : ''}><span>${esc(set.label)}</span></label>
        <div class="genres">${chips}</div></div>`;
    }).join('');
  }
  function useGenreSet(next) {
    const c = S.card; if (!next || next === c.genreSet) return;
    c.genres = R.convertGenres(c.genreSet, next, c.genres); c.genreSet = next;
    S.lastSet = next; CardStore.setMeta('lastSet', next).catch(() => {});
    changed({ rebuild: true });
  }

  function buildStats() {
    const c = S.card;
    const defs = c.kind === 'vehicle' ? R.STATS.vehicle : R.STATS.model;
    const base = c.base && c.base.kind === c.kind ? c.base.stats : null;
    const fields = defs.map((d) => statField(d.key, d.label, d.colour, c.stats[d.key], base ? base[d.key] : undefined));
    fields.push(statField('health', 'Health', '#ffffff', c.health, c.base ? c.base.health : undefined));
    $('#statFields').innerHTML = fields.join('');
    updateResetButtons();
  }
  function statField(key, label, colour, val, baseVal) {
    let delta = '';
    if (baseVal !== undefined && String(val) !== String(baseVal)) delta = `was ${baseVal}`;
    return `<div class="stat" data-key="${key}"><span style="--c:${colour}">${label}</span>
      <div class="stepper"><button type="button" data-step="-1" aria-label="Lower ${label}">-</button><input type="text" value="${esc(val ?? '')}" aria-label="${label}"><button type="button" data-step="1" aria-label="Raise ${label}">+</button></div>
      <div class="delta">${delta}</div></div>`;
  }

  /* the statistics a reset goes back to: the starting profile, or the blank defaults for a blank card */
  function resetTarget() {
    const c = S.card, isVeh = c.kind === 'vehicle';
    if (c.base && (c.base.kind === 'vehicle') === isVeh) return { stats: clone(c.base.stats), health: c.base.health, from: c.base.name };
    const b = blankCard(c.kind, c.genreSet);
    return { stats: b.stats, health: b.health, from: 'the blank ' + R.KINDS[c.kind].label + ' values' };
  }
  function updateResetButtons() {
    const c = S.card, btn = $('#btnStatsReset'); if (!c || !btn) return;
    const t = resetTarget();
    const same = String(c.health) === String(t.health) && Object.keys(t.stats).every((k) => String(c.stats[k]) === String(t.stats[k]));
    btn.disabled = same;
    btn.title = same ? 'Statistics match ' + t.from : 'Put the statistics and health back to ' + t.from;
    $('#btnCardReset').textContent = c.base ? 'Reset whole card' : 'Reset to blank';
    $('#btnCardReset').title = c.base ? `Put everything except the portrait, badge and card look back to ${c.base.name}` : 'Clear the card back to a blank profile, keeping the portrait, badge and card look';
  }

  function attackFormula(a) {
    const c = S.card, t = R.ATTACK_TYPES[a.type];
    let base = t.base(c.stats);
    let f = t.formula;
    if (a.addBody) { base += +c.stats.body || 0; f = 'Shoot + Body'; }
    const m = +a.mod || 0;
    return `${f} = ${base}, modifier ${m >= 0 ? '+' : ''}${m}`;
  }
  function buildAttacks() {
    const c = S.card;
    $('#attackList').innerHTML = (c.attacks || []).map((a, i) => `
      <div class="attack" data-i="${i}">
        <select class="a-type" data-f="type" aria-label="Attack type">
          ${Object.entries(R.ATTACK_TYPES).map(([k, t]) => `<option value="${k}" ${a.type === k ? 'selected' : ''}>${t.label}</option>`).join('')}
        </select>
        <input class="a-name" data-f="name" type="text" value="${esc(a.name)}" placeholder="Attack name" aria-label="Attack name">
        <input class="a-range" data-f="range" type="text" value="${esc(a.range)}" placeholder='0"' aria-label="Range">
        <span class="a-strike"><input data-f="strike" type="text" value="${esc(CardRender.strikeValue(c, a))}" aria-label="Strike"></span>
        <input class="a-eff" data-f="effect" type="text" value="${esc(a.effect)}" placeholder="Weapon effect" list="dlEffects" aria-label="Weapon effect">
        <div class="a-foot"><div class="formula">${esc(attackFormula(a))}${a.strikeOverride ? ' (fixed value)' : ''}</div>
        <div class="a-tools row">
          <label class="inline check" title="Choose one of the OR attacks before play"><input type="checkbox" data-f="or" ${a.or ? 'checked' : ''}> OR</label>
          <button type="button" class="icon-btn" data-act="up" aria-label="Move up">&uarr;</button>
          <button type="button" class="icon-btn" data-act="down" aria-label="Move down">&darr;</button>
          <button type="button" class="icon-btn btn-danger" data-act="del" aria-label="Delete attack">Delete</button>
        </div></div>
      </div>`).join('') || '<p class="hint">No attacks. Vehicles usually have none.</p>';
  }

  function symbolSummary(e) {
    const s = [];
    for (let i = 0; i < (+e.pp || 0); i++) s.push('✪');
    if (e.action) s.push(e.action); if (e.once) s.push('1');
    return s.join(' ');
  }
  function buildSections() {
    const c = S.card;
    $('#sectionList').innerHTML = (c.back || []).map((sec, si) => `
      <div class="section" data-si="${si}">
        <div class="section-head">
          <input type="text" data-sf="title" value="${esc(sec.title)}" aria-label="Section heading" list="dlSections">
          <button type="button" class="icon-btn" data-sact="up" aria-label="Move section up">&uarr;</button>
          <button type="button" class="icon-btn" data-sact="down" aria-label="Move section down">&darr;</button>
          <button type="button" class="icon-btn btn-danger" data-sact="del">Delete section</button>
        </div>
        ${(sec.entries || []).map((e, ei) => `
          <div class="entry" data-ei="${ei}">
            <input class="e-name" type="text" data-ef="name" value="${esc(e.name)}" placeholder="Name" list="dlEffectNames" aria-label="Name">
            <select data-ef="pp" title="Plot point cost" aria-label="Plot points">${[0, 1, 2, 3].map((n) => `<option value="${n}" ${(+e.pp || 0) === n ? 'selected' : ''}>${n ? '✪'.repeat(n) : 'No ✪'}</option>`).join('')}</select>
            <select data-ef="action" title="Action type" aria-label="Action type">${Object.entries(R.ACTIONS).map(([k, v]) => `<option value="${k}" ${e.action === k ? 'selected' : ''}>${v}</option>`).join('')}</select>
            <label class="inline check" title="One use per turn"><input type="checkbox" data-ef="once" ${e.once ? 'checked' : ''}> Once</label>
            <span></span>
            <textarea data-ef="desc" rows="3" aria-label="Description">${esc(e.desc)}</textarea>
            <div class="e-tools">
              <button type="button" class="icon-btn" data-eact="up" aria-label="Move up">&uarr;</button>
              <button type="button" class="icon-btn" data-eact="down" aria-label="Move down">&darr;</button>
              <button type="button" class="icon-btn btn-danger" data-eact="del">Delete</button>
            </div>
          </div>`).join('')}
        <div class="row"><button type="button" class="btn btn-ghost btn-small" data-sact="add">Add ${esc(singular(sec.title))}</button></div>
      </div>`).join('');
  }
  function singular(t) {
    if (/special effects/i.test(t)) return 'special effect';
    if (/stunts/i.test(t)) return 'stunt';
    if (/star qualit/i.test(t)) return 'star quality';
    return 'entry';
  }

  function wireForm() {
    const bind = (sel, fn, ev = 'input') => $(sel).addEventListener(ev, (e) => { fn(e.target); changed(); });
    bind('#fName', (t) => { S.card.name = t.value; });
    bind('#fAffiliation', (t) => { S.card.affiliation = t.value; }, 'change');
    $('#fKind').addEventListener('change', (e) => {
      const c = S.card, k = e.target.value, wasVeh = c.kind === 'vehicle';
      c.kind = k;
      if ((k === 'vehicle') !== wasVeh) {
        c.stats = k === 'vehicle' ? { capacity: 4, speed: 12, defence: +c.stats.defence || 8, armour: '5+' } : { fight: 3, shoot: 3, defence: +c.stats.defence || 9, mind: 3, body: 3, spirit: 3 };
        toast(k === 'vehicle' ? 'Switched to vehicle statistics.' : 'Switched to model statistics.');
      }
      if (c.colours) delete c.colours.band;
      changed({ rebuild: true });
    });
    $('#fRatings').addEventListener('input', (e) => {
      const v = e.target.value.trim();
      S.card.ratings = /^-?\d+$/.test(v) ? +v : v;
      if (S.card.ratingsAuto) { S.card.ratingsAuto = false; $('#fRatingsAuto').checked = false; }
      changed();
    });
    $('#fRatingsAuto').addEventListener('change', (e) => { S.card.ratingsAuto = e.target.checked; changed(); buildFormRatingsOnly(); });
    bind('#fRatingsNote', (t) => { S.card.ratingsNote = t.value; });
    bind('#fTypeLabel', (t) => { S.card.typeLabel = t.value.trim() || undefined; });
    bind('#fDistress', (t) => { S.card.distress = t.checked; }, 'change');
    bind('#fBackScale', (t) => { S.card.backScale = t.value ? +t.value : undefined; }, 'change');
    $('#fBand').addEventListener('input', (e) => { S.card.colours = Object.assign({}, S.card.colours, { band: e.target.value }); changed(); buildGenres(); });
    $('#btnStatsReset').addEventListener('click', () => {
      const t = resetTarget();
      S.card.stats = t.stats; S.card.health = t.health;
      buildStats(); refreshStrikes(); changed();
      toast(`Statistics reset to ${t.from}.`);
    });
    $('#btnCardReset').addEventListener('click', () => {
      const c = S.card;
      const what = c.base ? c.base.name : 'a blank ' + R.KINDS[c.kind].label;
      if (!confirm(`Reset this card to ${what}? Name, ratings, genres, statistics, attacks and the back of the card go back to the original. The portrait, badge and card look stay.`)) return;
      let fresh;
      if (c.base) {
        const src = clone(c.base);
        fresh = cardFromProfile(src, c.genreSet);
        fresh.base = c.base;
      } else fresh = blankCard(c.kind, c.genreSet);
      const keep = ['id', 'portrait', 'badge', 'distress', 'colours', 'backScale', 'createdAt'];
      for (const k of keep) if (c[k] !== undefined) fresh[k] = c[k]; else delete fresh[k];
      if (c.baseId) fresh.baseId = c.baseId;
      S.card = fresh;
      changed({ rebuild: true });
      toast(`Card reset to ${what}.`);
    });
    $('#btnColourReset').addEventListener('click', () => { delete S.card.colours; changed({ rebuild: true }); });

    $('#genreToggles').addEventListener('change', (e) => { if (e.target.name === 'genreSet') useGenreSet(e.target.value); });
    $('#genreToggles').addEventListener('click', (e) => {
      const u = e.target.closest('[data-use]'); if (u) { useGenreSet(u.dataset.use); return; }
      const b = e.target.closest('.genre[data-i]'); if (!b) return;
      const i = +b.dataset.i, g = S.card.genres;
      const k = g.indexOf(i); if (k >= 0) g.splice(k, 1); else { g.push(i); g.sort(); }
      buildGenres(); changed();
    });

    $('#statFields').addEventListener('click', (e) => {
      const b = e.target.closest('[data-step]'); if (!b) return;
      const key = b.closest('.stat').dataset.key, step = +b.dataset.step;
      if (key === 'health') S.card.health = Math.max(0, (+S.card.health || 0) + step);
      else {
        const v = S.card.stats[key];
        const m = /^(\d+)(\+?)$/.exec(String(v));
        if (m) S.card.stats[key] = key === 'armour' ? Math.max(2, Math.min(6, +m[1] - step)) + '+' : Math.max(0, +m[1] + step);
        else S.card.stats[key] = Math.max(0, (+v || 0) + step);
      }
      buildStats(); refreshStrikes(); changed();
    });
    $('#statFields').addEventListener('input', (e) => {
      const st = e.target.closest('.stat'); if (!st) return;
      const key = st.dataset.key, v = e.target.value.trim();
      if (key === 'health') S.card.health = +v || 0;
      else S.card.stats[key] = /^\d+$/.test(v) ? +v : v;
      refreshStrikes(); changed();
    });

    // attacks
    const atk = $('#attackList');
    atk.addEventListener('input', (e) => {
      const row = e.target.closest('.attack'); if (!row) return;
      const a = S.card.attacks[+row.dataset.i], f = e.target.dataset.f;
      if (f === 'strike') {
        const v = e.target.value.trim();
        const n = /^[+-]?\d+$/.test(v) ? parseInt(v, 10) : null;
        if (n !== null) {
          const t = R.ATTACK_TYPES[a.type]; let base = t.base(S.card.stats); if (a.addBody) base += +S.card.stats.body || 0;
          a.mod = n - base; delete a.strikeOverride;
        } else a.strikeOverride = v;
        row.querySelector('.formula').textContent = attackFormula(a) + (a.strikeOverride ? ' (fixed value)' : '');
      } else if (f === 'or') a.or = e.target.checked || undefined;
      else if (f !== 'type') a[f] = e.target.value;
      changed();
    });
    atk.addEventListener('change', (e) => {
      const row = e.target.closest('.attack'); if (!row) return;
      const a = S.card.attacks[+row.dataset.i], f = e.target.dataset.f;
      if (f === 'type') {
        // keep the visible strike when the type changes
        const shown = parseInt(CardRender.strikeValue(S.card, a), 10);
        a.type = e.target.value; delete a.addBody;
        if (!isNaN(shown)) a.mod = shown - R.ATTACK_TYPES[a.type].base(S.card.stats);
        buildAttacks(); changed();
      }
      if (f === 'or') { a.or = e.target.checked || undefined; changed(); }
    });
    atk.addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      const i = +b.closest('.attack').dataset.i, list = S.card.attacks;
      if (b.dataset.act === 'del') list.splice(i, 1);
      if (b.dataset.act === 'up' && i > 0) [list[i - 1], list[i]] = [list[i], list[i - 1]];
      if (b.dataset.act === 'down' && i < list.length - 1) [list[i + 1], list[i]] = [list[i], list[i + 1]];
      buildAttacks(); changed();
    });
    $('#btnAddAttack').addEventListener('click', () => {
      S.card.attacks.push({ type: 'fight', name: '', range: '0"', mod: 0, effect: '0 Health' });
      buildAttacks(); changed();
      const last = $$('#attackList .a-name').pop(); if (last) last.focus();
    });
    const sel = $('#selAttackTable');
    for (const type of ['fight', 'shoot']) {
      const og = document.createElement('optgroup'); og.label = R.ATTACK_TYPES[type].label + ' attacks (pp. 48-49)';
      R.ATTACK_TABLE.filter((a) => a.type === type).forEach((a) => {
        const o = document.createElement('option'); o.value = a.name;
        o.textContent = `${a.name}  ${a.range}, ${a.effect}${a.genres !== 'All' ? ' (' + a.genres + ')' : ''}`;
        og.appendChild(o);
      });
      sel.appendChild(og);
    }
    sel.addEventListener('change', () => {
      const a = R.ATTACK_TABLE.find((x) => x.name === sel.value); sel.value = '';
      if (!a) return;
      const n = { type: a.type, name: a.name, range: a.range, mod: a.mod, effect: a.effect };
      if (a.addBody) n.addBody = true;
      S.card.attacks.push(n); buildAttacks(); changed();
      toast(`${a.name} added.`);
    });

    // back sections
    const secs = $('#sectionList');
    secs.addEventListener('input', (e) => {
      const s = e.target.closest('.section'); if (!s) return;
      const sec = S.card.back[+s.dataset.si];
      if (e.target.dataset.sf === 'title') { sec.title = e.target.value; changed(); return; }
      const en = e.target.closest('.entry'); if (!en) return;
      const ent = sec.entries[+en.dataset.ei], f = e.target.dataset.ef;
      if (f === 'once') ent.once = e.target.checked;
      else if (f === 'pp') ent.pp = +e.target.value;
      else ent[f] = e.target.value;
      if (f === 'name' && !ent.desc) {
        const hit = LIB.find((x) => x.name.toLowerCase() === ent.name.trim().toLowerCase());
        if (hit) { Object.assign(ent, { pp: hit.pp, action: hit.action, once: hit.once, desc: hit.desc }); buildSections(); }
      }
      changed();
    });
    secs.addEventListener('click', (e) => {
      const b = e.target.closest('[data-sact],[data-eact]'); if (!b) return;
      const si = +b.closest('.section').dataset.si, list = S.card.back;
      if (b.dataset.sact) {
        const a = b.dataset.sact;
        if (a === 'del') { if (list[si].entries.length && !confirm(`Delete the ${list[si].title} section and its entries?`)) return; list.splice(si, 1); }
        if (a === 'up' && si > 0) [list[si - 1], list[si]] = [list[si], list[si - 1]];
        if (a === 'down' && si < list.length - 1) [list[si + 1], list[si]] = [list[si], list[si + 1]];
        if (a === 'add') list[si].entries.push({ name: '', pp: 0, action: 'P', once: false, desc: '' });
      } else {
        const ei = +b.closest('.entry').dataset.ei, ents = list[si].entries, a = b.dataset.eact;
        if (a === 'del') ents.splice(ei, 1);
        if (a === 'up' && ei > 0) [ents[ei - 1], ents[ei]] = [ents[ei], ents[ei - 1]];
        if (a === 'down' && ei < ents.length - 1) [ents[ei + 1], ents[ei]] = [ents[ei], ents[ei + 1]];
      }
      buildSections(); changed();
    });
    $('#btnAddSection').addEventListener('click', () => {
      const has = (t) => S.card.back.some((s) => s.title.toLowerCase() === t.toLowerCase());
      const t = !has('Star Quality') && ['star', 'co-star'].includes(S.card.kind) ? 'Star Quality'
        : !has('Special Effects') ? 'Special Effects' : !has('Stunts') && S.card.kind === 'vehicle' ? 'Stunts' : 'New Section';
      if (t === 'Star Quality') S.card.back.unshift({ title: t, entries: [] }); else S.card.back.push({ title: t, entries: [] });
      buildSections(); changed();
    });
  }
  function buildFormRatingsOnly() { $('#fRatings').value = S.card.ratings ?? ''; }
  function refreshStrikes() {
    $$('#attackList .attack').forEach((row) => {
      const a = S.card.attacks[+row.dataset.i]; if (!a) return;
      const inp = row.querySelector('[data-f=strike]');
      if (document.activeElement !== inp) inp.value = CardRender.strikeValue(S.card, a);
      row.querySelector('.formula').textContent = attackFormula(a) + (a.strikeOverride ? ' (fixed value)' : '');
    });
    $$('#statFields .stat').forEach((el) => {
      const k = el.dataset.key, base = S.card.base && S.card.base.kind === S.card.kind ? S.card.base : null;
      const bv = k === 'health' ? (base ? base.health : undefined) : (base ? base.stats[k] : undefined);
      const v = k === 'health' ? S.card.health : S.card.stats[k];
      el.querySelector('.delta').textContent = bv !== undefined && String(v) !== String(bv) ? `was ${bv}` : '';
      const inp = el.querySelector('input'); if (document.activeElement !== inp) inp.value = v ?? '';
    });
    updateResetButtons();
  }

  /* ---------------- datalists ---------------- */
  function buildDatalists() {
    const dl = (id, vals) => { const d = document.createElement('datalist'); d.id = id; d.innerHTML = vals.map((v) => `<option value="${esc(v)}">`).join(''); document.body.appendChild(d); };
    dl('dlEffects', R.WEAPON_EFFECTS);
    dl('dlEffectNames', LIB.map((e) => e.name));
    dl('dlSections', ['Star Quality', 'Special Effects', 'Stunts', 'Weapon Effect']);
  }

  /* ---------------- portrait ---------------- */
  function readImageFile(file, maxSide) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => {
        const img = new Image();
        img.onload = () => {
          const s = Math.min(1, maxSide / Math.max(img.width, img.height));
          if (s >= 1 && file.size < 2.5e6) return res({ src: fr.result, img });
          const c = document.createElement('canvas'); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          const src = c.toDataURL(/png|webp|gif/.test(file.type) ? 'image/png' : 'image/jpeg', 0.9);
          const i2 = new Image(); i2.onload = () => res({ src, img: i2 }); i2.src = src;
        };
        img.onerror = () => rej(new Error('That file is not an image the browser can read.'));
        img.src = fr.result;
      };
      fr.onerror = () => rej(fr.error);
      fr.readAsDataURL(file);
    });
  }
  async function setPortraitFile(file) {
    try {
      const { src, img } = await readImageFile(file, 1600);
      S.card.portrait = { src, zoom: 1, x: 0, y: 0, flip: false };
      S.portraitImg = img; $('#inZoom').value = 1; $('#inFlip').checked = false;
      changed();
    } catch (err) { toast(err.message); }
  }
  function loadPortrait(card) {
    S.portraitImg = null;
    if (card.portrait && card.portrait.src) {
      const i = new Image(); i.onload = () => { if (S.card === card) { S.portraitImg = i; render(); } }; i.src = card.portrait.src;
    }
    S.badgeImg = null;
    if (card.badge) { const b = new Image(); b.onload = () => { if (S.card === card) { S.badgeImg = b; render(); } }; b.src = card.badge; }
    $('#inZoom').value = (card.portrait && card.portrait.zoom) || 1;
    $('#inFlip').checked = !!(card.portrait && card.portrait.flip);
  }
  function wirePortrait() {
    $('#inPortrait').addEventListener('change', (e) => { const f = e.target.files[0]; if (f) setPortraitFile(f); e.target.value = ''; });
    $('#inZoom').addEventListener('input', (e) => { if (!S.card.portrait) return; S.card.portrait.zoom = +e.target.value; changed(); });
    $('#inFlip').addEventListener('change', (e) => { if (!S.card.portrait) return; S.card.portrait.flip = e.target.checked; changed(); });
    $('#btnPortraitReset').addEventListener('click', () => { if (!S.card.portrait) return; Object.assign(S.card.portrait, { x: 0, y: 0, zoom: 1 }); $('#inZoom').value = 1; changed(); });
    $('#btnPortraitClear').addEventListener('click', () => { S.card.portrait = null; S.portraitImg = null; changed(); });
    $('#inBadge').addEventListener('change', async (e) => {
      const f = e.target.files[0]; e.target.value = ''; if (!f) return;
      try { const { src, img } = await badgeFromFile(f); S.card.badge = src; S.badgeImg = img; changed(); } catch (err) { toast(err.message); }
    });
    $('#btnBadgeClear').addEventListener('click', () => { delete S.card.badge; S.badgeImg = null; changed(); });
    $('#inBadgeAll').addEventListener('change', async (e) => {
      const f = e.target.files[0]; e.target.value = ''; if (!f) return;
      try {
        const { src, img } = await badgeFromFile(f);
        await CardStore.setMeta('defaultBadge', src);
        S.defaultBadge = { src, img }; S.thumbs.clear(); showBadgePreview(); render();
        toast('Badge set for all cards.');
      } catch (err) { toast(err.message); }
    });
    $('#btnBadgeAllClear').addEventListener('click', async () => {
      await CardStore.setMeta('defaultBadge', null);
      S.defaultBadge = { src: null, img: null }; S.thumbs.clear(); showBadgePreview(); render();
    });

    const cv = $('#cvFront');
    let drag = null;
    cv.addEventListener('pointerdown', (e) => {
      if (!S.card.portrait) return;
      cv.setPointerCapture(e.pointerId); cv.classList.add('dragging');
      drag = { x: e.clientX, y: e.clientY, px: S.card.portrait.x || 0, py: S.card.portrait.y || 0, k: cv.width / cv.getBoundingClientRect().width };
    });
    cv.addEventListener('pointermove', (e) => {
      if (!drag) return;
      S.card.portrait.x = Math.round(drag.px + (e.clientX - drag.x) * drag.k);
      S.card.portrait.y = Math.round(drag.py + (e.clientY - drag.y) * drag.k);
      changed();
    });
    const end = () => { drag = null; cv.classList.remove('dragging'); };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
    cv.addEventListener('wheel', (e) => {
      if (!S.card.portrait) return;
      e.preventDefault();
      const z = Math.max(0.2, Math.min(3, (S.card.portrait.zoom || 1) * (e.deltaY < 0 ? 1.05 : 1 / 1.05)));
      S.card.portrait.zoom = +z.toFixed(3); $('#inZoom').value = z; changed();
    }, { passive: false });
    const stage = $('#stage');
    ['dragenter', 'dragover'].forEach((t) => stage.addEventListener(t, (e) => { if ([...e.dataTransfer.types].includes('Files')) { e.preventDefault(); $('#wrapFront').classList.add('drop'); } }));
    ['dragleave', 'drop'].forEach((t) => stage.addEventListener(t, () => $('#wrapFront').classList.remove('drop')));
    stage.addEventListener('drop', (e) => {
      e.preventDefault();
      const f = [...e.dataTransfer.files].find((x) => x.type.startsWith('image/'));
      if (f) setPortraitFile(f);
    });
    $$('.stage-tools [data-show]').forEach((b) => b.addEventListener('click', () => {
      $$('.stage-tools [data-show]').forEach((x) => x.classList.toggle('is-on', x === b));
      $('#stage').dataset.show = b.dataset.show;
    }));
  }

  /* Badge images: trim plain margins around the artwork and make a square, so it fills the round badge. */
  function badgeFromFile(file) {
    return readImageFile(file, 1200).then(({ img }) => {
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      const x = c.getContext('2d'); x.drawImage(img, 0, 0);
      const d = x.getImageData(0, 0, c.width, c.height).data;
      const px = (i, j) => { const k = (j * c.width + i) * 4; return [d[k], d[k + 1], d[k + 2], d[k + 3]]; };
      const corner = px(1, 1);
      const differs = (p) => (corner[3] < 20 ? p[3] > 40 : Math.abs(p[0] - corner[0]) + Math.abs(p[1] - corner[1]) + Math.abs(p[2] - corner[2]) > 60 && p[3] > 40);
      let x0 = c.width, y0 = c.height, x1 = -1, y1 = -1;
      for (let j = 0; j < c.height; j += 2) for (let i = 0; i < c.width; i += 2) {
        if (differs(px(i, j))) { if (i < x0) x0 = i; if (i > x1) x1 = i; if (j < y0) y0 = j; if (j > y1) y1 = j; }
      }
      if (x1 < 0) { x0 = 0; y0 = 0; x1 = c.width - 1; y1 = c.height - 1; }
      const side = Math.max(x1 - x0, y1 - y0) + 2, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      const out = document.createElement('canvas'); out.width = out.height = 256;
      const o = out.getContext('2d');
      o.drawImage(c, cx - side / 2, cy - side / 2, side, side, 0, 0, 256, 256);
      const src = out.toDataURL('image/png');
      return loadImg(src).then((im) => ({ src, img: im }));
    });
  }
  function showBadgePreview() {
    const el = $('#badgePreview'); if (!el) return;
    el.style.backgroundImage = S.defaultBadge.src ? `url(${S.defaultBadge.src})` : '';
    el.classList.toggle('empty', !S.defaultBadge.src);
    $('#btnBadgeAllClear').hidden = !S.defaultBadge.src;
  }

  /* ---------------- save / export ---------------- */
  async function saveCard() {
    const c = S.card;
    if (!c.name || !c.name.trim()) { if (!confirm('This card has no name. Save it as "Unnamed profile"?')) return; c.name = 'Unnamed profile'; $('#fName').value = c.name; }
    await CardStore.put(clone(c));
    S.dirty = false;
    await refreshSaved();
    setSaveState(); render();
    toast(`Saved ${c.name}.`);
  }
  function duplicateCard() {
    const c = clone(S.card); c.id = uid(); c.name = (c.name || '') + ' (copy)'; delete c.createdAt; delete c.updatedAt;
    openCard(c, true);
    toast('Duplicate made. Save it to keep both versions.');
  }
  function download(blob, name) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function exportPng(which) {
    const c = S.card, name = slug(c.name);
    const f = $('#cvFront'), b = $('#cvBack');
    if (which === 'pair') {
      const p = document.createElement('canvas'); p.width = f.width * 2 + 40; p.height = f.height;
      const x = p.getContext('2d'); x.drawImage(f, 0, 0); x.drawImage(b, f.width + 40, 0);
      p.toBlob((bl) => download(bl, `${name}-front-back.png`), 'image/png');
    } else (which === 'front' ? f : b).toBlob((bl) => download(bl, `${name}-${which}.png`), 'image/png');
  }

  /* ---------------- open / new ---------------- */
  function openCard(card, dirty = false) {
    S.card = card; S.dirty = dirty;
    if (!card.back) card.back = defaultBack(card.kind);
    if (!card.attacks) card.attacks = [];
    if (!card.genres) card.genres = [];
    loadPortrait(card);
    buildForm(); setSaveState();
    showView('designer');
    saveDraftSoon();
  }
  function confirmDiscard() {
    return !S.dirty || confirm('You have unsaved changes on this card. Continue and lose them?');
  }

  const KIND_ORDER = [['star', 'Stars'], ['co-star', 'Co-Stars'], ['extra', 'Extras'], ['vehicle', 'Vehicles']];
  const AFF_ORDER = ['heroic', 'villainous', 'neutral'];
  function openWizard() {
    if (!confirmDiscard()) return;
    const d = $('#dlgNew');
    if (!S.wizard.kind) S.wizard.kind = 'star';
    $('#newTitle').textContent = 'New card';
    $('#blankRow').innerHTML = '<span class="hint">Or start from a blank profile:</span>' + Object.entries(R.KINDS).map(([k, v]) => `<button type="button" class="btn btn-ghost btn-small" data-blank="${k}">Blank ${esc(v.label)}</button>`).join('');
    S.wizard.sel = null;
    renderProfileList();
    d.showModal();
    $('#profileSearch').focus();
    return true;
  }
  /* open the New card picker on one profile, clearing any filter that would hide it */
  function openProfile(id) {
    const p = PROFILES.find((x) => x.id === id); if (!p) return;
    const w = S.wizard;
    if (w.book && R.bookOf(p) !== w.book) { w.book = ''; $$('#bookFilter button').forEach((x) => x.classList.toggle('is-on', x.dataset.book === '')); }
    if (w.aff && p.affiliation !== w.aff) { w.aff = ''; $$('#affFilter button').forEach((x) => x.classList.toggle('is-on', x.dataset.aff === '')); }
    w.q = ''; $('#profileSearch').value = ''; w.role = ''; $('#roleSearch').value = '';
    w.kind = p.kind;
    if (openWizard()) selectRow(id, true);
  }
  /* ---------- roles: the example characters each Star and Co-Star can play (Core pp. 30-33, 80s pp. 30-37) ---------- */
  const ROLES80 = window.SEVENTV_ROLES_80S || {};
  const capFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  function splitRoles(text) {
    return String(text || '').replace(/\.$/, '').split(/,\s*|\s+and\s+|^and\s+/i)
      .map((x) => x.replace(/^and\s+/i, '').replace(/[.]+$/, '').trim()).filter((x) => x.length > 2).map(capFirst);
  }
  const ROLE_INDEX = new Map();
  function rolesOf(p) {
    if (!ROLE_INDEX.has(p.id)) {
      const seen = new Set(), out = [];
      // Extras and vehicles have no example roles in the books, so their own name stands in
      const own = p.kind === 'extra' || p.kind === 'vehicle' ? [p.name] : [];
      for (const r of [...own, ...splitRoles(p.archetypes), ...splitRoles(ROLES80[p.id]), ...splitRoles(p.examples)]) {
        const k = r.toLowerCase(); if (!seen.has(k)) { seen.add(k); out.push(r); }
      }
      ROLE_INDEX.set(p.id, out);
    }
    return ROLE_INDEX.get(p.id);
  }
  function roleMatches(p, q) {
    // every typed word must start a word in the role; a trailing s is optional (cops finds cop)
    // and y matches ies (spy finds spies)
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
      .map((w) => w.replace(/[^a-z0-9'-]/g, '').replace(/(?<=..)ies$/, 'y').replace(/(?<=..)s$/, '')).filter(Boolean);
    if (!words.length) return [];
    const res = words.map((w) => new RegExp('(^|[\\s-])' + w.replace(/[-']/g, '\\$&').replace(/y$/, '(?:y|ie)')));
    return rolesOf(p).filter((r) => { const l = r.toLowerCase(); return res.every((re) => re.test(l)); });
  }
  function wizardPool() {
    const w = S.wizard;
    return PROFILES.filter((p) => (!w.book || R.bookOf(p) === w.book) && (!w.aff || p.affiliation === w.aff) && (!w.role.trim() || roleMatches(p, w.role).length));
  }
  function renderRoleHits() {
    const w = S.wizard, q = w.role.trim(), box = $('#roleHits');
    if (!q) { box.innerHTML = ''; return; }
    const hits = [];
    for (const p of wizardPool()) for (const r of roleMatches(p, q)) hits.push({ r, p });
    box.innerHTML = hits.length
      ? hits.slice(0, 40).map(({ r, p }) => `<button type="button" class="role-hit" data-role-id="${p.id}" style="--k:${R.KINDS[p.kind].band}">${r === p.name ? `<b class="solo">${esc(p.name)}</b>` : `<span>${esc(r)}</span><b>${esc(p.name)}</b>`}</button>`).join('')
        + (hits.length > 40 ? `<span class="hint">and ${hits.length - 40} more. Add another word to narrow it down.</span>` : '')
      : '<span class="hint">No profile lists that role. Try a broader word, such as cop, monster or spy.</span>';
  }
  function matches(p, q) {
    return [p.name, p.archetypes, p.examples, ROLES80[p.id], p.description, p.attacks.map((a) => a.name).join(' '), p.back.map((s) => s.entries.map((e) => e.name).join(' ')).join(' ')]
      .join(' ').toLowerCase().includes(q);
  }
  function examplesOf(p) { return p.archetypes || ROLES80[p.id] || p.examples || ''; }
  function renderProfileList() {
    const w = S.wizard, q = w.q.trim().toLowerCase();
    const pool = wizardPool().filter((p) => !q || matches(p, q));
    if (w.role.trim() && !pool.some((p) => p.kind === w.kind) && pool.length) w.kind = pool[0].kind;
    renderRoleHits();
    // kind tabs with counts for the current filters
    $('#kindTabs').innerHTML = KIND_ORDER.map(([k, label]) => {
      const n = pool.filter((p) => p.kind === k).length;
      return `<button type="button" class="kind-tab ${w.kind === k ? 'is-on' : ''}" data-kind="${k}" style="--k:${R.KINDS[k].band}" aria-pressed="${w.kind === k}">${label} <span class="n">${n}</span></button>`;
    }).join('');
    const list = pool.filter((p) => p.kind === w.kind);
    let h = '';
    for (const aff of AFF_ORDER) {
      const g = list.filter((p) => p.affiliation === aff); if (!g.length) continue;
      h += `<div class="p-group">${R.AFFILIATIONS[aff]} ${R.KINDS[w.kind].label}s</div>`;
      h += g.map((p) => `<div class="p-row ${w.sel === p.id ? 'is-on' : ''}" data-id="${p.id}" role="option" tabindex="0" aria-selected="${w.sel === p.id}" style="--k:${R.KINDS[p.kind].band}">
          <span class="r-name">${esc(p.name)}${!w.book ? ` <span class="r-book">${esc(R.BOOKS[R.bookOf(p)].label)}</span>` : ''}</span><span class="r-rat">${esc(p.ratings)}</span>
          <span class="r-ex">${w.role.trim() ? '<b>Role:</b> ' + esc(roleMatches(p, w.role).join(', ')) : esc(examplesOf(p) || p.description)}</span>
          <button type="button" class="btn btn-primary btn-small r-select" data-cast="${p.id}" tabindex="-1">Select</button>
        </div>`).join('');
    }
    $('#profileList').innerHTML = h || `<p class="hint">No ${R.KINDS[w.kind].label.toLowerCase()} profiles match. ${q ? 'Try another tab above, or clear the search.' : 'Clear the filters.'}</p>`;
    if (!list.some((p) => p.id === w.sel)) w.sel = list.length ? list[0].id : null;
    $$('#profileList .p-row').forEach((r) => { const on = r.dataset.id === w.sel; r.classList.toggle('is-on', on); r.setAttribute('aria-selected', on); });
    renderProfileDetail();
  }
  function statTiles(p) {
    const defs = p.kind === 'vehicle' ? R.STATS.vehicle : R.STATS.model;
    const order = p.kind === 'vehicle' ? defs : ['fight', 'shoot', 'defence', 'mind', 'body', 'spirit'].map((k) => defs.find((d) => d.key === k));
    const tiles = order.map((d) => `<div class="d-stat" style="--c:${d.colour}"><b>${esc(p.stats[d.key])}</b><span>${d.label}</span></div>`).join('');
    const pips = '<i></i>'.repeat(Math.max(0, +p.health || 0));
    return tiles + `<div class="d-health" style="--k:${R.KINDS[p.kind].band}"><div>${pips}</div><span>Health ${esc(p.health)}</span></div>`;
  }
  function renderProfileDetail() {
    const w = S.wizard, box = $('#profileDetail');
    const p = PROFILES.find((x) => x.id === w.sel);
    if (!p) { box.innerHTML = '<p class="hint">Pick a profile on the left to see its summary.</p>'; $('#pickerFoot').innerHTML = ''; return; }
    const k = R.KINDS[p.kind].band;
    const gs = R.GENRE_SETS[p.genreSet];
    const lit = gs.genres.filter((g, i) => p.genres.includes(i)).map((g) => g.name);
    const genres = gs.genres.map((g, i) => `<span class="d-genre ${p.genres.includes(i) ? 'on' : ''}"><img src="${g.icon}" alt="">${esc(g.name)}</span>`).join('');
    const attacks = p.attacks.length ? `<table class="d-attacks"><thead><tr><th>Attack</th><th>Range</th><th>Strike</th><th>Weapon effect</th></tr></thead><tbody>${
      p.attacks.map((a) => `<tr><td><span class="t t-${a.type}">${R.ATTACK_TYPES[a.type].label}</span>${esc(a.name)}${a.or ? ' <b>OR</b>' : ''}</td><td>${esc(a.range)}</td><td class="s">${esc(CardRender.strikeValue(p, a))}</td><td>${esc(a.effect)}</td></tr>`).join('')
    }</tbody></table>` : '';
    const backHtml = p.back.filter((s) => s.entries.length).map((s) => `<div class="d-label">${esc(s.title)}</div><div class="d-fx">${
      s.entries.map((e) => `<span class="${/star quality/i.test(s.title) ? 'sq' : ''}" title="${esc(e.desc)}">${esc(e.name.replace(/\\\*/g, '*'))}${symHtml(e)}</span>`).join('')}</div>`).join('');
    const ex = examplesOf(p);
    box.innerHTML = `<div style="--k:${k}">
      <div class="d-head">
        <div>
          <div class="d-title"><h3>${esc(p.name)}</h3><span class="d-pill">${esc(R.AFFILIATIONS[p.affiliation])} ${esc(R.KINDS[p.kind].label)}</span>
            <span class="d-rat">${esc(p.ratings)} <small>ratings${p.ratingsNote ? ', ' + esc(p.ratingsNote) : ''}</small></span></div>
          ${ex ? `<div class="d-label">Examples</div><p class="d-text">${esc(ex)}</p>` : ''}
          <div class="d-label">Genres <span class="hint">${esc(lit.join(', ') || 'None')}</span></div>
          <div class="d-genres">${genres}</div>
          ${p.description ? `<div class="d-label">Description</div><p class="d-desc">${esc(p.description)}</p>` : ''}
        </div>
        <div class="d-side">
          <canvas class="d-thumb" id="pdThumb" width="750" height="1040" aria-label="${esc(p.name)} card preview"></canvas>
        </div>
      </div>
      <div class="d-label">Statistics</div>
      <div class="d-stats">${statTiles(p)}</div>
      ${attacks ? `<div class="d-label">Attacks</div>${attacks}` : ''}
      ${backHtml}
      <div class="d-actions">
        ${p.errata ? `<span class="d-errata">${esc(p.errata)}</span>` : ''}
        <span class="d-src">Source: ${esc(p.source)}. You can switch the card to the other genre set in the Genres panel.</span>
      </div>
    </div>`;
    CardRender.renderFront($('#pdThumb'), p);
    $('#pickerFoot').innerHTML = `<span class="pf-text">Selected: <b>${esc(p.name)}</b> <span class="hint">${esc(R.AFFILIATIONS[p.affiliation])} ${esc(R.KINDS[p.kind].label)}, ${esc(p.ratings)} ratings. You edit a copy, the official profile stays as it is.</span></span>
      <button type="button" class="btn btn-primary pf-select" data-cast="${p.id}">Select this profile</button>`;
  }
  function castProfile(id) {
    const p = PROFILES.find((x) => x.id === id); if (!p) return;
    $('#dlgNew').close();
    openCard(cardFromProfile(p, p.genreSet), true);
  }
  function selectRow(id, focus) {
    S.wizard.sel = id;
    $$('#profileList .p-row').forEach((r) => { const on = r.dataset.id === id; r.classList.toggle('is-on', on); r.setAttribute('aria-selected', on); if (on && focus) { r.focus(); r.scrollIntoView({ block: 'nearest' }); } });
    renderProfileDetail();
  }
  function wireWizard() {
    $('#btnNew').addEventListener('click', openWizard);
    document.addEventListener('click', (e) => { if (e.target.closest('[data-action=new]')) openWizard(); });
    $('#roleSearch').addEventListener('input', (e) => { S.wizard.role = e.target.value; S.wizard.sel = null; renderProfileList(); });
    $('#roleHits').addEventListener('click', (e) => {
      const b = e.target.closest('[data-role-id]'); if (!b) return;
      const p = PROFILES.find((x) => x.id === b.dataset.roleId); if (!p) return;
      S.wizard.kind = p.kind; S.wizard.sel = p.id; renderProfileList(); selectRow(p.id, true);
    });
    // hide books with no profiles loaded (the public build leaves out the paid 80s and Steel Justice profiles)
    $$('#bookFilter button[data-book]').forEach((x) => { if (x.dataset.book && !PROFILES.some((p) => R.bookOf(p) === x.dataset.book)) x.hidden = true; });
    $('#bookFilter').addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      $$('#bookFilter button').forEach((x) => x.classList.toggle('is-on', x === b));
      S.wizard.book = b.dataset.book; S.wizard.sel = null; renderProfileList();
    });
    $('#profileSearch').addEventListener('input', (e) => {
      S.wizard.q = e.target.value;
      // jump to the first tab with results when the current one has none
      const q = S.wizard.q.trim().toLowerCase();
      if (q) {
        const pool = wizardPool().filter((p) => matches(p, q));
        if (!pool.some((p) => p.kind === S.wizard.kind) && pool.length) S.wizard.kind = pool[0].kind;
      }
      renderProfileList();
    });
    $('#kindTabs').addEventListener('click', (e) => { const b = e.target.closest('[data-kind]'); if (!b) return; S.wizard.kind = b.dataset.kind; S.wizard.sel = null; renderProfileList(); });
    $('#affFilter').addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      $$('#affFilter button').forEach((x) => x.classList.toggle('is-on', x === b));
      S.wizard.aff = b.dataset.aff; renderProfileList();
    });
    $('#profileList').addEventListener('click', (e) => { const b = e.target.closest('[data-id]'); if (b) selectRow(b.dataset.id); });
    $('#profileList').addEventListener('dblclick', (e) => { const b = e.target.closest('[data-id]'); if (b) castProfile(b.dataset.id); });
    $('#profileList').addEventListener('keydown', (e) => {
      const rows = $$('#profileList .p-row'); const i = rows.findIndex((r) => r.dataset.id === S.wizard.sel);
      if (e.key === 'ArrowDown' && i < rows.length - 1) { e.preventDefault(); selectRow(rows[i + 1].dataset.id, true); }
      if (e.key === 'ArrowUp' && i > 0) { e.preventDefault(); selectRow(rows[i - 1].dataset.id, true); }
      if (e.key === 'Enter' && S.wizard.sel) { e.preventDefault(); castProfile(S.wizard.sel); }
    });
    $('#dlgNew').addEventListener('click', (e) => { const b = e.target.closest('[data-cast]'); if (b) { e.stopPropagation(); castProfile(b.dataset.cast); } });
    $('#blankRow').addEventListener('click', (e) => {
      const b = e.target.closest('[data-blank]'); if (!b) return;
      $('#dlgNew').close();
      openCard(blankCard(b.dataset.blank, S.wizard.book ? R.BOOKS[S.wizard.book].genreSet : S.lastSet), true);
    });
  }

  /* ---------------- library ---------------- */
  function profileEffects(set, kind) {
    const seen = new Map();
    for (const p of PROFILES) {
      if (kind ? p.kind !== kind : p.genreSet !== set) continue;
      for (const s of p.back) for (const e of s.entries) {
        const k = e.name.toLowerCase();
        if (!seen.has(k)) seen.set(k, Object.assign({ from: p.name, section: s.title }, e));
      }
    }
    return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
  }
  function symHtml(e) {
    let h = '';
    for (let i = 0; i < (+e.pp || 0); i++) h += '<span class="sym" title="Plot point">✪</span>';
    if (e.action) h += `<span class="sym" title="${R.ACTIONS[e.action]} action">${e.action}</span>`;
    if (e.once) h += '<span class="sym" title="Once per turn">1</span>';
    return h;
  }
  function openLibrary() {
    const tgt = $('#libTarget');
    tgt.innerHTML = S.card.back.map((s, i) => `<option value="${i}">${esc(s.title)}</option>`).join('') + '<option value="new">New Special Effects section</option>';
    const fx = S.card.back.findIndex((s) => /special effect/i.test(s.title)); if (fx >= 0) tgt.value = String(fx);
    // show vehicle filter only for vehicle cards; reset to 'all' when switching away
    const vehicleBtn = $('#libKind [data-kind="vehicle"]');
    vehicleBtn.hidden = S.card.kind !== 'vehicle';
    if (S.lib.kind === 'vehicle' && S.card.kind !== 'vehicle') S.lib.kind = 'all';
    $$('#libKind button').forEach((x) => x.classList.toggle('is-on', x.dataset.kind === S.lib.kind));
    renderLibrary();
    $('#dlgLibrary').showModal();
    $('#libSearch').focus();
  }
  function renderLibrary() {
    const q = S.lib.q.trim().toLowerCase();
    let list;
    if (S.lib.kind === 'vehicle') {
      list = profileEffects(null, 'vehicle');
    } else {
      const libItems = LIB.map((e) => Object.assign({ from: 'Core Rulebook', section: 'Special Effects' }, e));
      const profItems = profileEffects(S.card.genreSet);
      const seen = new Map();
      for (const e of [...libItems, ...profItems]) { const k = e.name.toLowerCase(); if (!seen.has(k)) seen.set(k, e); }
      list = [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
      if (S.lib.kind === 'star') list = list.filter((e) => e.section === 'Star Quality');
      else if (S.lib.kind === 'fx') list = list.filter((e) => e.section === 'Special Effects');
    }
    if (q) list = list.filter((e) => (e.name + ' ' + e.desc).toLowerCase().includes(q));
    $('#libList').innerHTML = list.map((e, i) => `<div class="lib-item">
      <b>${esc(e.name)} ${symHtml(e)}</b>
      <p>${esc(e.desc)}</p>
      <span class="src">${esc(e.from)}${e.section && e.section !== 'Special Effects' ? ' (' + esc(e.section) + ')' : ''}</span>
      <div class="row"><button type="button" class="btn btn-ghost btn-small" data-li="${i}">Add to card</button></div>
    </div>`).join('') || '<p class="hint">Nothing matches that search.</p>';
    S.lib.list = list;
  }
  function wireLibrary() {
    $('#btnLibrary').addEventListener('click', openLibrary);
    $('#libSearch').addEventListener('input', (e) => { S.lib.q = e.target.value; renderLibrary(); });
    $('#libKind').addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      $$('#libKind button').forEach((x) => x.classList.toggle('is-on', x === b)); S.lib.kind = b.dataset.kind; renderLibrary();
    });
    $('#libList').addEventListener('click', (e) => {
      const b = e.target.closest('[data-li]'); if (!b) return;
      const src = S.lib.list[+b.dataset.li];
      let ti = $('#libTarget').value;
      if (ti === 'new') { S.card.back.push({ title: 'Special Effects', entries: [] }); ti = S.card.back.length - 1; openLibraryTargets(ti); }
      let sec = S.card.back[+ti];
      if (/stunt/i.test(src.section || '')) {
        let st = S.card.back.find((x) => /stunt/i.test(x.title));
        if (!st) { st = { title: 'Stunts', entries: [] }; S.card.back.push(st); }
        sec = st;
      }
      sec.entries.push({ name: src.name, pp: src.pp || 0, action: src.action || '', once: !!src.once, desc: src.desc });
      buildSections(); changed();
      toast(`${src.name} added to ${sec.title}.`);
    });
  }
  function openLibraryTargets(sel) {
    const tgt = $('#libTarget');
    tgt.innerHTML = S.card.back.map((s, i) => `<option value="${i}">${esc(s.title)}</option>`).join('') + '<option value="new">New Special Effects section</option>';
    tgt.value = String(sel);
  }

  /* ---------------- my cards ---------------- */
  async function refreshSaved() {
    S.saved = await CardStore.all();
    $('#cardCount').textContent = S.saved.length ? `(${S.saved.length})` : '';
    for (const id of [...S.selection]) if (!S.saved.some((c) => c.id === id)) S.selection.delete(id);
  }
  function thumbFor(card) {
    const key = card.id + ':' + (card.updatedAt || 0);
    if (S.thumbs.has(key)) return Promise.resolve(S.thumbs.get(key));
    return renderCardImages(card, 0.4).then(({ front }) => { S.thumbs.set(key, front); return front; });
  }
  function loadImg(src) { return new Promise((r) => { if (!src) return r(null); const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = src; }); }
  async function renderCardImages(card, scale = 1, type = 'image/png') {
    const f = document.createElement('canvas'), b = document.createElement('canvas');
    if (card.deck) {
      // Prop and Maguffin cards
      const [img, bi, bk] = await Promise.all([loadImg(card.image && card.image.src), loadImg(S.defaultBadge.src), loadImg(S.propBack.src)]);
      PropRender.renderFront(f, card, { img });
      PropRender.renderBack(b, card, { img, badgeImg: bi, backImg: bk });
    } else {
      const [pi, bi] = await Promise.all([loadImg(card.portrait && card.portrait.src), loadImg(card.badge || S.defaultBadge.src)]);
      CardRender.renderFront(f, card, { portraitImg: pi, badgeImg: bi });
      CardRender.renderBack(b, card);
    }
    const out = (c) => {
      if (scale === 1) return c.toDataURL(type, 0.92);
      const s = document.createElement('canvas'); s.width = Math.round(c.width * scale); s.height = Math.round(c.height * scale);
      s.getContext('2d').drawImage(c, 0, 0, s.width, s.height); return s.toDataURL('image/jpeg', 0.85);
    };
    return { front: out(f), back: out(b) };
  }
  async function renderCardsView() {
    await refreshSaved();
    const q = ($('#cardSearch').value || '').toLowerCase();
    const list = S.saved.filter((c) => !q || (c.name || '').toLowerCase().includes(q));
    $('#cardsEmpty').hidden = S.saved.length > 0;
    const grid = $('#cardGrid');
    grid.innerHTML = list.map((c) => `<div class="tile ${S.selection.has(c.id) ? 'is-selected' : ''}" data-id="${c.id}">
      <img alt="${esc(c.name)} card" data-open="1">
      <div class="t-name">${esc(c.name)}</div>
      <div class="t-meta">${c.deck ? (c.deck === 'maguffin' ? 'Maguffin card' : 'Prop card') : `${esc(CardRender.typeLabel(c))}, ${esc(c.ratings)} ratings, ${esc(R.GENRE_SETS[c.genreSet].label)} genres`}</div>
      <div class="row"><label class="inline check"><input type="checkbox" data-sel ${S.selection.has(c.id) ? 'checked' : ''}> Print</label>
      <span class="row"><button class="icon-btn" data-dup>Duplicate</button><button class="icon-btn btn-danger" data-del>Delete</button></span></div>
    </div>`).join('');
    updateCastTotal();
    for (const c of list) thumbFor(c).then((src) => { const img = grid.querySelector(`[data-id="${c.id}"] img`); if (img) img.src = src; });
  }
  function updateCastTotal() {
    const sel = S.saved.filter((c) => S.selection.has(c.id));
    const total = sel.filter((c) => !c.deck).reduce((s, c) => s + (parseInt(c.ratings, 10) || 0) * (S.qty[c.id] || 1), 0);
    $('#castTotal').textContent = sel.length ? `${sel.length} selected, ${total} ratings` : '';
    Store_saveSelection();
  }
  function Store_saveSelection() { CardStore.setMeta('selection', { ids: [...S.selection], qty: S.qty }).catch(() => {}); }
  function wireCards() {
    $('#cardSearch').addEventListener('input', renderCardsView);
    $('#cardGrid').addEventListener('click', async (e) => {
      const tile = e.target.closest('.tile'); if (!tile) return;
      const card = S.saved.find((c) => c.id === tile.dataset.id); if (!card) return;
      if (e.target.closest('[data-open]')) { if (card.deck) { if (window.PropsUI) window.PropsUI.open(clone(card)); return; } if (confirmDiscard()) openCard(clone(card)); return; }
      if (e.target.closest('[data-del]')) {
        if (!confirm(`Delete ${card.name}? This cannot be undone. Export a backup first if you might want it back.`)) return;
        await CardStore.remove(card.id); S.selection.delete(card.id); renderCardsView(); toast(`Deleted ${card.name}.`); return;
      }
      if (e.target.closest('[data-dup]')) {
        const c = clone(card); c.id = uid(); c.name += ' (copy)'; delete c.createdAt;
        await CardStore.put(c); renderCardsView(); toast('Duplicate saved.'); return;
      }
    });
    $('#cardGrid').addEventListener('change', (e) => {
      if (!e.target.matches('[data-sel]')) return;
      const id = e.target.closest('.tile').dataset.id;
      if (e.target.checked) S.selection.add(id); else S.selection.delete(id);
      e.target.closest('.tile').classList.toggle('is-selected', e.target.checked);
      updateCastTotal();
    });
    $('#btnSelectAll').addEventListener('click', () => { S.saved.forEach((c) => S.selection.add(c.id)); renderCardsView(); });
    $('#btnSelectNone').addEventListener('click', () => { S.selection.clear(); renderCardsView(); });
    $('#btnExport').addEventListener('click', async () => {
      const txt = await CardStore.exportJSON();
      download(new Blob([txt], { type: 'application/json' }), `7tv-cards-${new Date().toISOString().slice(0, 10)}.json`);
    });
    $('#inImport').addEventListener('change', async (e) => {
      const f = e.target.files[0]; e.target.value = ''; if (!f) return;
      try {
        const n = await CardStore.importJSON(await f.text());
        const db = await CardStore.getMeta('defaultBadge').catch(() => null);
        S.defaultBadge = db ? { src: db, img: await loadImg(db) } : { src: null, img: null }; S.thumbs.clear(); showBadgePreview();
        const pb = await CardStore.getMeta('propBack').catch(() => null);
        S.propBack = pb ? { src: pb, img: await loadImg(pb) } : { src: null, img: null }; if (window.PropsUI) window.PropsUI.refresh();
        toast(`Imported ${n} card${n === 1 ? '' : 's'}.`); renderCardsView();
      }
      catch (err) { toast('Import failed: ' + err.message); }
    });
  }

  /* ---------------- print ---------------- */
  // what the print sheet prints: a cast sent from the Call Sheet, or the cards ticked in My Cards
  function printSet() {
    if (S.printCast) return { cards: S.printCast.cards, qty: S.printCast.qty, cast: true };
    return { cards: S.saved.filter((c) => S.selection.has(c.id)), qty: S.qty, cast: false };
  }
  function renderPrintView() {
    const set = printSet();
    const src = $('#printSource');
    src.hidden = !set.cast;
    if (set.cast) src.innerHTML = `Printing the cast <b>${esc(S.printCast.name)}</b>. <button type="button" class="btn btn-ghost btn-small" id="btnPrintSelected">Print my selected cards instead</button>`;
    $('#printList').innerHTML = set.cards.length
      ? set.cards.map((c) => `<div class="print-item" data-id="${c.id}"><span>${esc(c.name)}</span><label class="inline">Copies <input type="number" min="1" max="30" value="${set.qty[c.id] || 1}"></label></div>`).join('')
      : '<p class="hint">No cards selected. Tick Print on cards in My Cards, or print a cast from the Call Sheet.</p>';
    PrintSheet.preview($('#printPreview'), set.cards, set.qty, printOpts(), renderCardImages);
  }
  function printOpts() { return { layout: $('#pLayout').value, paper: $('#pPaper').value, backs: $('#pBacks').checked, marks: $('#pMarks').checked, gap: +$('#pGap').value || 0 }; }
  const LAYOUT_HINT = {
    fold: 'Landscape sheets with each front beside its back: 8 faces, 4 finished cards per sheet. Print one-sided, cut round each pair, fold down the middle and glue or sleeve.',
    grid: 'Portrait sheets of nine cards. Back pages are mirrored, so print double-sided and flip on the long edge.'
  };
  function syncLayoutUI() {
    const fold = $('#pLayout').value === 'fold';
    $('#pBacksRow').hidden = fold;
    $('#pLayoutHint').textContent = LAYOUT_HINT[fold ? 'fold' : 'grid'];
  }
  function wirePrint() {
    $('#printList').addEventListener('input', (e) => {
      const it = e.target.closest('.print-item'); if (!it) return;
      const set = printSet();
      set.qty[it.dataset.id] = Math.max(1, Math.min(30, +e.target.value || 1));
      if (!set.cast) Store_saveSelection();
      renderPrintPreviewSoon();
    });
    $('#printSource').addEventListener('click', (e) => { if (e.target.closest('#btnPrintSelected')) { S.printCast = null; renderPrintView(); } });
    try { const l = localStorage.getItem('seventv-print-layout'); if (l === 'grid' || l === 'fold') $('#pLayout').value = l; } catch (e) { /* storage blocked */ }
    syncLayoutUI();
    $('#pLayout').addEventListener('change', () => { syncLayoutUI(); try { localStorage.setItem('seventv-print-layout', $('#pLayout').value); } catch (e) { /* storage blocked */ } });
    ['#pLayout', '#pPaper', '#pBacks', '#pMarks', '#pGap'].forEach((s) => $(s).addEventListener('change', renderPrintPreviewSoon));
    $('#btnPdf').addEventListener('click', async () => {
      const set = printSet();
      if (!set.cards.length) { toast('Select cards in My Cards first, or print a cast from the Call Sheet.'); return; }
      $('#pdfState').textContent = 'Building PDF...';
      try { await PrintSheet.pdf(set.cards, set.qty, printOpts(), renderCardImages); $('#pdfState').textContent = 'PDF ready. Print at 100% (actual size).'; }
      catch (err) { $('#pdfState').textContent = 'PDF failed: ' + err.message; }
    });
  }
  function printCast(name, cards, qty) { S.printCast = { name, cards, qty }; showView('print'); }
  let prT = 0;
  function renderPrintPreviewSoon() { clearTimeout(prT); prT = setTimeout(renderPrintView, 250); }

  /* ---------------- views ---------------- */
  function showView(v) {
    $$('.tab').forEach((t) => t.classList.toggle('is-active', t.dataset.view === v));
    $$('.view').forEach((s) => s.classList.toggle('is-active', s.id === 'view-' + v));
    if (v === 'cards') renderCardsView();
    if (v === 'print') refreshSaved().then(renderPrintView);
    if (v === 'cast' && window.CastUI) window.CastUI.show();
    if (v === 'genres' && window.GenresUI) window.GenresUI.show();
    if (v === 'props' && window.PropsUI) window.PropsUI.show();
    if (v === 'index' && window.IndexUI) window.IndexUI.show();
    if (v === 'episodes' && window.EpisodesUI) window.EpisodesUI.show();
  }

  let toastT = 0;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 3200);
  }

  /* ---------------- boot ---------------- */
  async function boot() {
    buildDatalists();
    wireForm(); wirePortrait(); wireWizard(); wireLibrary(); wireCards(); wirePrint();
    $$('.tab').forEach((t) => t.addEventListener('click', () => showView(t.dataset.view)));
    const setThemeLabel = () => { const dark = document.documentElement.dataset.theme === 'dark'; $('#btnTheme').textContent = dark ? 'Light mode' : 'Dark mode'; $('#btnTheme').setAttribute('aria-pressed', dark); };
    setThemeLabel();
    $('#btnTheme').addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('seventv-theme', next); } catch (err) { /* private mode */ }
      setThemeLabel();
    });
    $('#btnSave').addEventListener('click', saveCard);
    $('#btnDuplicate').addEventListener('click', duplicateCard);
    $('#btnPngFront').addEventListener('click', () => exportPng('front'));
    $('#btnPngBack').addEventListener('click', () => exportPng('back'));
    $('#btnPngPair').addEventListener('click', () => exportPng('pair'));
    document.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); saveCard(); } });
    window.addEventListener('beforeunload', (e) => { if (S.dirty) { e.preventDefault(); e.returnValue = ''; } });
    await CardRender.loadAssets();
    try {
      const db = await CardStore.getMeta('defaultBadge');
      if (db) { const img = await loadImg(db); S.defaultBadge = { src: db, img }; }
      const pb = await CardStore.getMeta('propBack');
      if (pb) S.propBack = { src: pb, img: await loadImg(pb) };
    } catch (err) { /* no stored badge */ }
    showBadgePreview();
    try {
      const sel = await CardStore.getMeta('selection');
      if (sel) { S.selection = new Set(sel.ids || []); S.qty = sel.qty || {}; }
      await refreshSaved();
      const ls = await CardStore.getMeta('lastSet'); if (ls === 'core' || ls === '80s') S.lastSet = ls;
      const draft = await CardStore.getMeta('draft');
      if (draft && draft.card) { openCard(draft.card, !!draft.dirty); return; }
    } catch (err) { console.warn('Storage unavailable', err); }
    openCard(cardFromProfile(PROFILES.find((p) => p.id === 'bold-blade') || PROFILES[0]), false);
  }
  window.App = { S, openCard, openProfile, cardFromProfile, blankCard, renderCardImages, toast, showView, refreshSaved, printCast, confirmDiscard, esc, uid, loadImg, readImageFile };
  boot();
})();
