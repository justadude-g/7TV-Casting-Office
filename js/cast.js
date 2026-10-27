/* Call Sheet (cast builder): assemble a cast from official profiles and your own cards, total the ratings
   and check it against the cast building rules. */
(function () {
  const R = window.SEVENTV_RULES;
  const PROFILES = window.SEVENTV_PROFILES || [];
  const App = window.App;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = App.esc;
  const KINDS = [['star', 'Stars'], ['co-star', 'Co-Stars'], ['extra', 'Extras'], ['vehicle', 'Vehicles']];

  const UNITS = window.SEVENTV_UNITS || [];
  const ROLES80 = window.SEVENTV_ROLES_80S || {};
  const C = { casts: [], cast: null, add: { src: 'official', book: '', kind: 'star', q: '', fits: true } };

  /* ---------- units (Core p. 37, 80s p. 29) ---------- */
  const unitDef = (id) => UNITS.find((u) => u.id === id) || null;
  const byName = new Map();
  function unitProfile(name, book) {
    const k = book + '|' + name.toLowerCase();
    if (!byName.has(k)) {
      const m = (b) => PROFILES.find((p) => R.bookOf(p) === b && p.name.toLowerCase() === name.toLowerCase());
      // the unit's own book first, then Core, then 80s (Steel Justice units borrow Core Cops and Thugs)
      const order = [book].concat(['core', '80s'].filter((b) => b !== book));
      byName.set(k, order.reduce((hit, b) => hit || m(b), null));
    }
    return byName.get(k);
  }
  function newUnit(def) {
    return { uid: App.uid(), def: def.id, leader: 0, slots: def.slots.map((s, i) => ({ opt: 0, qty: i === 0 ? 1 : 0 })) };
  }
  /* every model in a cast's units as rule-check entries, leader first */
  function unitEntries(c) {
    const out = [];
    for (const u of c.units || []) {
      const def = unitDef(u.def); if (!def) continue;
      out.push({ profile: unitProfile(def.leader[u.leader] || def.leader[0], def.book), qty: 1, key: 'u:' + u.uid + ':leader', unit: u, def, slot: -1 });
      def.slots.forEach((s, i) => {
        const st = u.slots[i] || { opt: 0, qty: 0 };
        out.push({ profile: unitProfile(s.opts[st.opt] || s.opts[0], def.book), qty: st.qty, key: 'u:' + u.uid + ':' + i, unit: u, def, slot: i });
      });
    }
    return out;
  }
  function entriesOf(c) { return c.members.map((m) => ({ profile: resolve(m), qty: m.qty, key: keyOf(m) })).concat(unitEntries(c)); }
  const modelsIn = (c) => entriesOf(c).reduce((t, e) => t + (e.qty || 0), 0);

  function newCast(set) {
    return { id: App.uid(), name: 'New cast', affiliation: 'heroic', genreSet: set || 'core', limit: 25, genre: '', members: [], units: [] };
  }
  function resolve(m) {
    if (m.src === 'p') return PROFILES.find((p) => p.id === m.id) || null;
    return App.S.saved.find((c) => c.id === m.id) || null;
  }
  const keyOf = (m) => m.src + ':' + m.id;
  function resolved() { return C.cast.members.map((m) => ({ profile: resolve(m), qty: m.qty, key: keyOf(m) })); }

  let saveT = 0;
  function saveSoon() {
    clearTimeout(saveT);
    saveT = setTimeout(async () => { saveT = 0; await CardStore.putCast(JSON.parse(JSON.stringify(C.cast))); C.casts = await CardStore.casts(); renderList(); }, 300);
  }
  function changed() { render(); renderList(); saveSoon(); }
  // save straight away if the page is closed or hidden inside the save delay
  window.addEventListener('pagehide', () => { if (saveT && C.cast) { clearTimeout(saveT); saveT = 0; CardStore.putCast(JSON.parse(JSON.stringify(C.cast))); } });
  document.addEventListener('visibilitychange', () => { if (document.hidden && saveT && C.cast) { clearTimeout(saveT); saveT = 0; CardStore.putCast(JSON.parse(JSON.stringify(C.cast))); } });

  async function show() {
    await App.refreshSaved();
    C.casts = await CardStore.casts();
    if (!C.cast) {
      const last = await CardStore.getMeta('lastCast').catch(() => null);
      C.cast = C.casts.find((c) => c.id === last) || C.casts[0] || null;
      if (!C.cast) { C.cast = newCast(App.S.card ? App.S.card.genreSet : 'core'); await CardStore.putCast(C.cast); C.casts = await CardStore.casts(); }
    }
    renderList(); fillForm(); render(); renderAdd();
    if (!C.pane) { setPane('cast'); if (phone() && C.cast.members.length) $('#castSettings').open = false; }
  }

  function booksOf(c) {
    const sets = new Set(entriesOf(c).filter((e) => e.qty && e.profile).map((e) => R.bookOf(e.profile)));
    if (!sets.size) return 'no members yet';
    const names = Object.keys(R.BOOKS).filter((x) => sets.has(x)).map((x) => R.BOOKS[x].label);
    return (names.length > 1 ? names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1] : names[0]) + ' profiles';
  }
  function renderList() {
    $('#castList').innerHTML = C.casts.map((c0) => {
      const c = C.cast && c0.id === C.cast.id ? C.cast : c0;
      const total = CastRules.check(c, entriesOf(c)).total;
      return `<button type="button" class="cast-item ${C.cast && c.id === C.cast.id ? 'is-on' : ''}" data-id="${c.id}">
        <span class="ci-name">${esc(c.name)}</span>
        <span class="ci-meta">${esc(R.AFFILIATIONS[c.affiliation])}, ${esc(booksOf(c))}</span>
        <span class="ci-total">${total}<small>/${esc(c.limit || '-')}</small></span>
      </button>`;
    }).join('') || '<p class="hint">No casts yet.</p>';
  }

  function fillForm() {
    const c = C.cast;
    $('#cName').value = c.name;
    $('#cAff').value = c.affiliation;
    $('#cLimit').value = c.limit || '';
    $('#cPreset').value = '';
    $('#cGenre').innerHTML = '<option value="">Not chosen yet</option>' + [0, 1, 2, 3, 4, 5].map((i) => `<option value="${i}">${esc(R.alignedName(i))}</option>`).join('');
    $('#cGenre').value = c.genre === null || c.genre === undefined ? '' : String(c.genre);
    const aff = {
      heroic: 'Heroic cast: every Star, Co-Star and Extra must be heroic or neutral.',
      villainous: 'Villainous cast: every Star, Co-Star and Extra must be villainous or neutral.',
      neutral: 'Neutral cast: Stars and Co-Stars must be neutral, Extras can come from any affiliation.'
    };
    $('#cAffHint').textContent = aff[c.affiliation] + ' Core and 80s profiles can be mixed. Extras must share a genre with your Stars and Co-Stars; the genre chips below pair each 80s genre with its Core match from the 80s guide.';
  }

  const phone = () => window.matchMedia('(max-width: 760px)').matches;
  function setPane(pane) {
    C.pane = pane;
    $('#view-cast').dataset.pane = pane;
    const n = C.cast ? modelsIn(C.cast) : 0;
    $('#cbToggle').textContent = pane === 'add' ? `View cast (${n})` : 'Add profiles';
    if (phone()) {
      window.scrollTo(0, 0);
      if (pane === 'cast' && C.cast && C.cast.members.length && !C.settingsTouched) $('#castSettings').open = false;
    }
  }
  function render() {
    const c = C.cast; if (!c) return;
    const all = entriesOf(c);
    const res = CastRules.check(c, all);
    // phone bar
    $('#cbTotal').textContent = res.total;
    $('#cbOf').textContent = c.limit ? `of ${c.limit} ratings` : 'ratings';
    $('#cbBar').style.width = (c.limit ? Math.min(100, (res.total / c.limit) * 100) : 0) + '%';
    $('#cbBar').classList.toggle('over', !!c.limit && res.total > c.limit);
    $('#cbTotal').classList.toggle('over', !!c.limit && res.total > c.limit);
    if (C.pane === 'add') $('#cbToggle').textContent = `View cast (${modelsIn(c)})`;
    // meter
    $('#cTotal').textContent = res.total;
    $('#cOf').textContent = c.limit ? `of ${c.limit} ratings` : 'ratings';
    const pct = c.limit ? Math.min(100, (res.total / c.limit) * 100) : 0;
    const bar = $('#cBar'); bar.style.width = pct + '%';
    bar.classList.toggle('over', !!c.limit && res.total > c.limit);
    $('#cTotal').classList.toggle('over', !!c.limit && res.total > c.limit);
    // counts
    $('#cCounts').innerHTML = KINDS.map(([k, label]) => `<span class="cc" style="--k:${R.KINDS[k].band}"><b>${res.counts[k] || 0}</b> ${label}</span>`).join('')
      + `<span class="cc plain"><b>${res.counts.models}</b> models</span>`;
    // genres
    $('#cGenres').innerHTML = [0, 1, 2, 3, 4, 5].map((i) => {
      const core = R.GENRE_SETS.core.genres[i], e80 = R.GENRE_SETS['80s'].genres[R.fromCore('80s', i)];
      return `<span class="cg ${res.genreCounts[i] ? 'on' : ''} ${String(c.genre) === String(i) ? 'chosen' : ''}" title="${esc(R.alignedName(i))}: ${res.genreCounts[i]} model${res.genreCounts[i] === 1 ? '' : 's'}"><img src="${core.icon}" alt=""><img src="${e80.icon}" alt="">${esc(core.name)} / ${esc(e80.name)} <b>${res.genreCounts[i]}</b></span>`;
    }).join('');
    // warnings
    $('#cWarnings').innerHTML = res.warnings.map((w) => `<div class="warn">${esc(w)}</div>`).join('') + res.notes.map((n) => `<p class="note">${esc(n)}</p>`).join('')
      || (all.length ? '<p class="ok-line">This cast follows the casting rules.</p>' : '');
    // members, grouped by type
    const rows = resolved();
    let h = renderUnits(c, all.slice(c.members.length), res.rows.slice(c.members.length));
    for (const [k, label] of KINDS) {
      const list = rows.map((r, i) => ({ r, i, m: c.members[i], row: res.rows[i] })).filter((x) => (x.r.profile ? x.r.profile.kind : 'extra') === k);
      if (!list.length) continue;
      h += `<div class="m-group">${label}</div>`;
      h += list.map(({ r, i, m, row }) => {
        const p = r.profile;
        if (!p) return `<div class="member missing" data-i="${i}"><div class="m-main"><span class="m-name">Missing card</span><span class="m-reason">${esc(row.reasons[0])}</span></div><div class="m-ctrl"><button type="button" class="icon-btn btn-danger" data-act="del">Remove</button></div></div>`;
        const g = R.GENRE_SETS[p.genreSet];
        return `<div class="member ${row.reasons.length ? 'bad' : ''}" data-i="${i}" style="--k:${R.KINDS[p.kind].band}">
          <div class="m-main">
            <span class="m-name">${p.stub ? `<span class="m-plain">${esc(p.name)}</span> <span class="tag tag-stub" title="This profile card is in the ${esc(R.BOOKS[R.bookOf(p)].label)} book, not in this app">Card not included</span>` : `<button type="button" class="link" data-act="open" title="Open in Casting">${esc(p.name)}</button>`}${m.src === 'c' ? ' <span class="tag">My card</span>' : ''}</span>
            <span class="m-meta">${esc(R.AFFILIATIONS[p.affiliation])} ${esc(R.KINDS[p.kind].label)}, ${esc(R.BOOKS[R.bookOf(p)].label)}, ${esc(CastRules.priceLabel(p))}</span>
            <span class="m-genres">${g.genres.map((x, gi) => `<img src="${x.icon}" alt="${esc(x.name)}" title="${esc(x.name)}" class="${(p.genres || []).includes(gi) ? '' : 'off'}">`).join('')}</span>
            ${row.reasons.map((t) => `<span class="m-reason">${esc(t)}</span>`).join('')}
          </div>
          <div class="m-ctrl">
            <div class="stepper"><button type="button" data-act="minus" aria-label="One fewer">-</button><input type="text" inputmode="numeric" value="${m.qty}" aria-label="Number of models"><button type="button" data-act="plus" aria-label="One more">+</button></div>
            <span class="m-cost">${row.cost}</span>
            <button type="button" class="icon-btn btn-danger" data-act="del" aria-label="Remove ${esc(p.name)}">Remove</button>
          </div>
        </div>`;
      }).join('');
    }
    $('#cMembers').innerHTML = h || '<p class="empty-line">The cast is empty. Add Stars, Co-Stars, Extras or a unit from the panel on the right.</p>';
    renderAdd();
  }

  function genreIcons(p) {
    const g = R.GENRE_SETS[p.genreSet];
    return `<span class="m-genres">${g.genres.map((x, gi) => `<img src="${x.icon}" alt="${esc(x.name)}" title="${esc(x.name)}" class="${(p.genres || []).includes(gi) ? '' : 'off'}">`).join('')}</span>`;
  }
  function renderUnits(c, entries, rows) {
    if (!(c.units || []).length) return '';
    let h = '<div class="m-group">Units</div>';
    for (const u of c.units) {
      const def = unitDef(u.def); if (!def) continue;
      const list = entries.map((e, i) => ({ e, row: rows[i] })).filter((x) => x.e.unit === u);
      const cost = list.reduce((t, x) => t + x.row.cost, 0), models = list.reduce((t, x) => t + x.e.qty, 0);
      const leader = list[0].e.profile;
      h += `<div class="unit" data-u="${u.uid}">
        <div class="u-head">
          <div class="u-title"><span class="u-name">${esc(def.name)}</span>
            <span class="u-meta">Unit, ${esc(def.page)}. ${models} model${models === 1 ? '' : 's'}. ${leader ? esc(leader.name) + "'s Unit Leader effect lets these models activate with them when within 6\"." : ''}</span></div>
          <span class="m-cost">${cost}</span>
          <button type="button" class="icon-btn btn-danger" data-uact="del" aria-label="Remove the ${esc(def.name)} unit">Remove unit</button>
        </div>`;
      h += list.map(({ e, row }) => {
        const p = e.profile, isLeader = e.slot < 0;
        const s = isLeader ? null : def.slots[e.slot];
        const opts = isLeader ? def.leader : s.opts;
        const cur = isLeader ? u.leader : u.slots[e.slot].opt;
        const pick = opts.length > 1
          ? `<select class="u-opt" aria-label="Choose the ${isLeader ? 'unit leader' : 'model'}">${opts.map((o, oi) => `<option value="${oi}" ${oi === cur ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`
          : p && p.stub ? `<span class="m-plain">${esc(p.name)}</span>` : `<button type="button" class="link" data-uact="open" title="Open in Casting">${esc(p ? p.name : opts[0])}</button>`;
        const label = isLeader ? 'Unit leader' : s.text;
        const ctrl = isLeader
          ? '<span class="u-fixed">1</span>'
          : `<div class="stepper"><button type="button" data-uact="minus" aria-label="One fewer" ${e.qty <= 0 ? 'disabled' : ''}>-</button><input type="text" inputmode="numeric" value="${e.qty}" aria-label="Number of models"><button type="button" data-uact="plus" aria-label="One more" ${e.qty >= s.max ? 'disabled title="The unit leader can activate at most ' + s.max + '. Add more from Official profiles."' : ''}>+</button></div>`;
        return `<div class="member u-row ${e.qty ? '' : 'u-none'} ${row.reasons.length && e.qty ? 'bad' : ''}" data-u="${u.uid}" data-slot="${e.slot}" style="--k:${p ? R.KINDS[p.kind].band : 'var(--line)'}">
          <div class="m-main">
            <span class="m-name">${pick} <span class="u-slot">${esc(label)}</span>${p && R.bookOf(p) !== def.book ? ` <span class="tag">${esc(R.BOOKS[R.bookOf(p)].label)}</span>` : ''}</span>
            ${p ? `<span class="m-meta">${esc(R.AFFILIATIONS[p.affiliation])} ${esc(R.KINDS[p.kind].label)}, ${esc(CastRules.priceLabel(p))}</span>${genreIcons(p)}` : '<span class="m-reason">Profile not found.</span>'}
            ${e.qty ? row.reasons.map((t) => `<span class="m-reason">${esc(t)}</span>`).join('') : ''}
          </div>
          <div class="m-ctrl">${ctrl}<span class="m-cost">${row.cost}</span></div>
        </div>`;
      }).join('');
      h += '</div>';
    }
    return h;
  }
  function unitRow(el) {
    const r = el.closest('.u-row, .unit'); if (!r) return null;
    const u = (C.cast.units || []).find((x) => x.uid === r.dataset.u); if (!u) return null;
    return { u, def: unitDef(u.def), slot: r.dataset.slot === undefined ? null : +r.dataset.slot };
  }

  function addPool() {
    const a = C.add;
    if (a.src === 'mine') return App.S.saved.filter((c) => !c.deck).map((c) => ({ ref: { src: 'c', id: c.id }, p: c }));
    return PROFILES.map((p) => ({ ref: { src: 'p', id: p.id }, p }));
  }
  function fitReason(p) {
    const c = C.cast;
    const ar = CastRules.affiliationReason(c.affiliation, p);
    if (ar) return ar;
    if (p.kind === 'extra' || p.kind === 'vehicle') {
      const leads = resolved().filter((r) => r.profile && (r.profile.kind === 'star' || r.profile.kind === 'co-star'));
      if (leads.length) {
        const lg = new Set(leads.flatMap((r) => CastRules.aligned(r.profile)));
        if (!CastRules.aligned(p).some((g) => lg.has(g))) return 'No shared genre';
      }
    }
    return '';
  }
  function unitFit(def) {
    const leader = unitProfile(def.leader[0], def.book);
    return leader ? CastRules.affiliationReason(C.cast.affiliation, leader) : '';
  }
  function renderAddUnits() {
    const a = C.add, q = a.q.trim().toLowerCase();
    let list = UNITS.filter((u) => !a.book || u.book === a.book)
      .filter((u) => !q || [u.name, u.leader.join(' '), u.slots.map((s) => s.text).join(' ')].join(' ').toLowerCase().includes(q))
      .map((u) => ({ u, why: unitFit(u) }));
    if (a.fits) list = list.filter((x) => !x.why);
    const have = new Map(); for (const u of C.cast.units || []) have.set(u.def, (have.get(u.def) || 0) + 1);
    $('#addKinds').innerHTML = '';
    $('#addList').innerHTML = list.map(({ u, why }) => {
      const leader = unitProfile(u.leader[0], u.book), n = have.get(u.id) || 0;
      return `<div class="add-row unit-row ${why ? 'misfit' : ''}" style="--k:${R.KINDS.extra.band}">
        <div class="a-main"><span class="a-name">${esc(u.name)}</span>
          <span class="a-meta">${esc(R.BOOKS[u.book].label)}, led by ${esc(u.leader.join(' or '))}${leader ? ' (' + esc(R.AFFILIATIONS[leader.affiliation]).toLowerCase() + ')' : ''}${why ? ` <span class="a-why">${esc(why)}</span>` : ''}</span>
          <span class="a-units">${esc(u.slots.map((s) => s.text).join(', '))}</span></div>
        <button type="button" class="btn btn-ghost btn-small" data-addunit="${u.id}" aria-label="Add the ${esc(u.name)} unit">${n ? `Add another (${n})` : 'Add unit'}</button>
      </div>`;
    }).join('') || '<p class="hint">No unit fits this cast. Untick the filter above to see them all.</p>';
  }
  function renderAdd() {
    const a = C.add, q = a.q.trim().toLowerCase();
    $('#addBook').hidden = a.src === 'mine';
    $('#addFitsLabel').textContent = a.src === 'units' ? 'Only show units whose leader fits this cast' : 'Only show profiles that fit this cast';
    $('#addSearch').placeholder = a.src === 'units' ? 'Search units, leaders or members' : 'Search names or roles (cops, vampires, CEOs)';
    if (a.src === 'units') { renderAddUnits(); return; }
    let pool = addPool().filter(({ p }) => !q || [p.name, p.archetypes, p.examples, ROLES80[p.id]].join(' ').toLowerCase().includes(q));
    if (a.src === 'official' && a.book) pool = pool.filter(({ p }) => R.bookOf(p) === a.book);
    const withFit = pool.map((x) => Object.assign(x, { why: fitReason(x.p) }));
    const shown = a.fits ? withFit.filter((x) => !x.why) : withFit;
    $('#addKinds').innerHTML = KINDS.map(([k, label]) => `<button type="button" class="kind-tab small ${a.kind === k ? 'is-on' : ''}" data-kind="${k}" style="--k:${R.KINDS[k].band}">${label} <span class="n">${shown.filter((x) => x.p.kind === k).length}</span></button>`).join('');
    const list = shown.filter((x) => x.p.kind === a.kind);
    const inCast = new Map(C.cast.members.map((m) => [keyOf(m), m.qty]));
    $('#addList').innerHTML = list.map(({ ref, p, why }) => {
      const n = inCast.get(ref.src + ':' + ref.id) || 0;
      return `<div class="add-row ${why ? 'misfit' : ''}" style="--k:${R.KINDS[p.kind].band}">
        <div class="a-main"><span class="a-name">${esc(p.name)}</span>
          <span class="a-meta">${esc(R.BOOKS[R.bookOf(p)].label)}, ${esc(R.AFFILIATIONS[p.affiliation])}, ${esc(CastRules.priceLabel(p))}${why ? ` <span class="a-why">${esc(why)}</span>` : ''}</span></div>
        <button type="button" class="btn btn-ghost btn-small" data-add="${ref.src}:${ref.id}" aria-label="Add ${esc(p.name)}">${n ? `Add another (${n})` : 'Add'}</button>
      </div>`;
    }).join('') || `<p class="hint">${a.src === 'mine' && !App.S.saved.length ? 'You have no saved cards yet. Save cards in Casting to add them here.' : 'Nothing here fits this cast. Untick the filter above to see everything.'}</p>`;
    // say how many profiles of this type the fit filter is hiding, and why
    const hidden = a.fits ? withFit.filter((x) => x.why && x.p.kind === a.kind) : [];
    if (hidden.length && list.length) {
      const why = [...new Set(hidden.map((x) => x.why))];
      $('#addList').insertAdjacentHTML('beforeend', `<p class="hint add-hidden">${hidden.length} more ${hidden.length === 1 ? 'is' : 'are'} hidden: ${esc(why.join(' '))} Untick "Only show profiles that fit this cast" to see ${hidden.length === 1 ? 'it' : 'them'}.</p>`);
    }
  }

  function addUnit(id) {
    const def = unitDef(id); if (!def) return;
    (C.cast.units = C.cast.units || []).push(newUnit(def));
    changed();
    const res = CastRules.check(C.cast, entriesOf(C.cast));
    App.toast(`${def.name} unit added. Set how many of each model below. ${res.total}${C.cast.limit ? ' of ' + C.cast.limit : ''} ratings.`);
  }
  function addMember(src, id) {
    const m = C.cast.members.find((x) => x.src === src && x.id === id);
    if (m) m.qty += 1; else C.cast.members.push({ src, id, qty: 1 });
    changed();
    if (phone()) {
      const p = resolve(m || C.cast.members[C.cast.members.length - 1]);
      const res = CastRules.check(C.cast, entriesOf(C.cast));
      App.toast(`${p ? p.name : 'Profile'} added. ${res.total}${C.cast.limit ? ' of ' + C.cast.limit : ''} ratings.`);
    }
  }

  function wire() {
    $('#cbToggle').addEventListener('click', () => setPane(C.pane === 'add' ? 'cast' : 'add'));
    $('#castSettings').addEventListener('toggle', () => { if (phone()) C.settingsTouched = true; });
    $('#castList').addEventListener('click', async (e) => {
      const b = e.target.closest('[data-id]'); if (!b) return;
      C.cast = C.casts.find((c) => c.id === b.dataset.id);
      CardStore.setMeta('lastCast', C.cast.id).catch(() => {});
      renderList(); fillForm(); render();
    });
    $('#btnCastNew').addEventListener('click', async () => {
      C.cast = newCast(C.cast ? C.cast.genreSet : 'core');
      await CardStore.putCast(C.cast); C.casts = await CardStore.casts();
      CardStore.setMeta('lastCast', C.cast.id).catch(() => {});
      renderList(); fillForm(); render();
      $('#cName').select();
    });
    $('#btnCastDup').addEventListener('click', async () => {
      const c = JSON.parse(JSON.stringify(C.cast)); c.id = App.uid(); c.name += ' (copy)';
      C.cast = c; await CardStore.putCast(c); C.casts = await CardStore.casts();
      renderList(); fillForm(); render(); App.toast('Cast duplicated.');
    });
    $('#btnCastDel').addEventListener('click', async () => {
      if (!confirm(`Delete the cast ${C.cast.name}? Your cards are not affected.`)) return;
      await CardStore.removeCast(C.cast.id);
      C.casts = await CardStore.casts(); C.cast = C.casts[0] || null;
      if (!C.cast) { C.cast = newCast('core'); await CardStore.putCast(C.cast); C.casts = await CardStore.casts(); }
      renderList(); fillForm(); render();
    });
    $('#cName').addEventListener('input', (e) => { C.cast.name = e.target.value || 'Untitled cast'; renderList(); saveSoon(); });
    $('#cAff').addEventListener('change', (e) => { C.cast.affiliation = e.target.value; fillForm(); changed(); });
    $('#cLimit').addEventListener('input', (e) => { C.cast.limit = Math.max(0, +e.target.value || 0); changed(); });
    $('#cPreset').addEventListener('change', (e) => { if (!e.target.value) return; C.cast.limit = +e.target.value; $('#cLimit').value = C.cast.limit; e.target.value = ''; changed(); });
    $('#cGenre').addEventListener('change', (e) => { C.cast.genre = e.target.value; changed(); });

    const mem = $('#cMembers');
    mem.addEventListener('click', (e) => {
      const ub = e.target.closest('[data-uact]');
      if (ub) {
        const t = unitRow(ub); if (!t) return;
        const a = ub.dataset.uact;
        if (a === 'del') { C.cast.units.splice(C.cast.units.indexOf(t.u), 1); changed(); return; }
        if (a === 'open') {
          const p = t.slot < 0 ? unitProfile(t.def.leader[t.u.leader], t.def.book) : unitProfile(t.def.slots[t.slot].opts[t.u.slots[t.slot].opt], t.def.book);
          if (!p || p.stub || !App.confirmDiscard()) return;
          App.openCard(App.cardFromProfile(p), true); return;
        }
        const st = t.u.slots[t.slot], max = t.def.slots[t.slot].max;
        if (a === 'plus') st.qty = Math.min(max, st.qty + 1);
        if (a === 'minus') st.qty = Math.max(0, st.qty - 1);
        changed(); return;
      }
      const b = e.target.closest('[data-act]'); if (!b) return;
      const i = +b.closest('.member').dataset.i, m = C.cast.members[i];
      const a = b.dataset.act;
      if (a === 'plus') m.qty += 1;
      if (a === 'minus') { m.qty -= 1; if (m.qty <= 0) C.cast.members.splice(i, 1); }
      if (a === 'del') C.cast.members.splice(i, 1);
      if (a === 'open') {
        const p = resolve(m); if (!p || p.stub || !App.confirmDiscard()) return;
        App.openCard(m.src === 'p' ? App.cardFromProfile(p) : JSON.parse(JSON.stringify(p)), m.src === 'p');
        return;
      }
      changed();
    });
    mem.addEventListener('change', (e) => {
      const t = unitRow(e.target);
      if (t && t.slot !== null) {
        if (e.target.classList.contains('u-opt')) { if (t.slot < 0) t.u.leader = +e.target.value; else t.u.slots[t.slot].opt = +e.target.value; }
        else if (e.target.tagName === 'INPUT' && t.slot >= 0) t.u.slots[t.slot].qty = Math.max(0, Math.min(t.def.slots[t.slot].max, parseInt(e.target.value, 10) || 0));
        changed(); return;
      }
      const row = e.target.closest('.member'); if (!row || e.target.tagName !== 'INPUT') return;
      const i = +row.dataset.i, v = parseInt(e.target.value, 10);
      if (!v || v < 1) C.cast.members.splice(i, 1); else C.cast.members[i].qty = Math.min(99, v);
      changed();
    });
    $('#btnCastPrint').addEventListener('click', () => {
      const cards = [], qty = {}; let skipped = 0;
      for (const m of C.cast.members) {
        const p = resolve(m); if (!p) continue;
        if (p.stub) { skipped++; continue; }
        const card = m.src === 'p' ? Object.assign(App.cardFromProfile(p), { id: 'p_' + p.id }) : p;
        cards.push(card); qty[card.id] = m.qty;
      }
      for (const e of unitEntries(C.cast)) {
        if (!e.profile || !e.qty) continue;
        if (e.profile.stub) { skipped++; continue; }
        const id = 'p_' + e.profile.id;
        if (qty[id]) { qty[id] += e.qty; continue; }
        cards.push(Object.assign(App.cardFromProfile(e.profile), { id })); qty[id] = e.qty;
      }
      if (!cards.length) { App.toast(skipped ? 'None of these profile cards are included in this app, so there is nothing to print.' : 'Add cast members first.'); return; }
      App.printCast(C.cast.name, cards, qty);
      if (skipped) App.toast(`Printing the cards in this app. ${skipped} cast ${skipped === 1 ? 'entry uses a profile' : 'entries use profiles'} from books not included here.`);
    });

    $('#addSource').addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      $$('#addSource button').forEach((x) => x.classList.toggle('is-on', x === b));
      C.add.src = b.dataset.src; renderAdd();
    });
    $('#addBook').addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      $$('#addBook button').forEach((x) => x.classList.toggle('is-on', x === b));
      C.add.book = b.dataset.book; renderAdd();
    });
    $('#addSearch').addEventListener('input', (e) => { C.add.q = e.target.value; renderAdd(); });
    $('#addFits').addEventListener('change', (e) => { C.add.fits = e.target.checked; renderAdd(); });
    $('#addKinds').addEventListener('click', (e) => { const b = e.target.closest('[data-kind]'); if (b) { C.add.kind = b.dataset.kind; renderAdd(); } });
    $('#addList').addEventListener('click', (e) => {
      const u = e.target.closest('[data-addunit]'); if (u) { addUnit(u.dataset.addunit); return; }
      const b = e.target.closest('[data-add]'); if (!b) return;
      const [src, ...rest] = b.dataset.add.split(':'); addMember(src, rest.join(':'));
    });
  }

  wire();
  window.CastUI = { show, state: C };
})();
