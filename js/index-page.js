/* Index page: search the Core Rulebook and 80s book indexes, plus every Core profile with its page,
   and see which book and page each term is on. */
(function () {
  const R = window.SEVENTV_RULES;
  const RAW = window.SEVENTV_BOOK_INDEX || [];
  const PROFILES = window.SEVENTV_PROFILES || [];
  const App = window.App;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = App.esc;
  const BOOK = { core: 'Core', '80s': '80s' };
  const X = { q: '', book: '', built: false, rows: [] };

  const norm = (s) => s.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim();

  /* one row per term (parent + term), holding the pages in each book */
  function buildRows() {
    const prof = new Map();
    for (const p of PROFILES) if (!p.book) prof.set(p.genreSet + '|' + norm(p.name), p);
    const byKey = new Map();
    const add = (e) => {
      const key = norm((e.in ? e.in + ' > ' : '') + e.t);
      let r = byKey.get(key);
      if (!r) { r = { t: e.t, in: e.in || '', also: e.also || '', refs: [], profile: null }; byKey.set(key, r); }
      if (!r.refs.some((x) => x.b === e.b && x.p === e.p)) r.refs.push({ b: e.b, p: e.p });
      const p = e.profile || (!e.in && (prof.get(e.b + '|' + norm(e.t)) || (e.also && prof.get(e.b + '|' + norm(e.also)))));
      if (p) r.profile = p;
    };
    RAW.forEach(add);
    // the Core index only gives page ranges for profiles, so list each Core profile on its own page
    for (const p of PROFILES) {
      if (p.book || p.genreSet !== 'core' || !p.bookPage) continue;
      add({ t: p.name, p: String(p.bookPage), b: 'core', profile: p });
    }
    X.rows = [...byKey.values()].map((r) => Object.assign(r, {
      sortKey: norm(r.in ? r.in + ' ' + r.t : r.t).replace(/^[^a-z0-9]+/, ''),
      hay: norm([r.t, r.in, r.also, r.profile ? r.profile.name : ''].join(' '))
    })).sort((a, b) => a.sortKey.localeCompare(b.sortKey, undefined, { numeric: true }));
  }

  const pagesLabel = (p) => (/[,-]/.test(p) ? 'pp. ' : 'p. ') + p;
  function mark(text, q) {
    if (!q) return esc(text);
    const i = norm(text).indexOf(q);
    if (i < 0) return esc(text);
    return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
  }
  function score(r, q) {
    const t = norm(r.t), a = norm(r.also);
    if (t === q || a === q) return 0;
    if (t.startsWith(q) || a.startsWith(q)) return 1;
    if (new RegExp('(^|[\\s/&(-])' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(t + ' ' + a)) return 2;
    if (norm(r.in).includes(q)) return 3;
    return 4;
  }

  function rowHtml(r, q) {
    const refs = r.refs.filter((x) => !X.book || x.b === X.book)
      .sort((a, b) => (a.b === 'core' ? 0 : 1) - (b.b === 'core' ? 0 : 1))
      .map((x) => `<span class="ix-ref"><span class="ix-book ix-${x.b === 'core' ? 'core' : 'b80'}">${BOOK[x.b]}</span><span class="ix-pages">${esc(pagesLabel(x.p))}</span></span>`).join('');
    const p = r.profile;
    const name = p && !p.stub ? `<button type="button" class="link ix-name" data-pid="${p.id}" title="Open ${esc(p.name)} in the New card picker">${mark(r.t, q)}</button>` : `<span class="ix-name">${mark(r.t, q)}</span>`;
    const also = r.also ? ` <span class="ix-also">(card: ${mark(r.also, q)})</span>` : '';
    const tag = p ? ` <span class="ix-tag" style="--k:${R.KINDS[p.kind].band}">${esc(R.AFFILIATIONS[p.affiliation])} ${esc(R.KINDS[p.kind].label)}</span>` : '';
    return `<div class="ix-row${r.in ? ' ix-sub' : ''}">
      <span class="ix-term">${r.in ? `<span class="ix-parent">${mark(r.in, q)} &rsaquo;</span> ` : ''}${name}${also}${tag}</span>
      <span class="ix-refs">${refs}</span>
    </div>`;
  }

  function render() {
    const q = norm(X.q);
    let list = X.rows.filter((r) => (!X.book || r.refs.some((x) => x.b === X.book)) && (!q || r.hay.includes(q)));
    if (q) list = list.map((r) => ({ r, s: score(r, q) })).sort((a, b) => a.s - b.s || a.r.sortKey.localeCompare(b.r.sortKey)).map((x) => x.r);
    $('#ixCount').textContent = `${list.length} entr${list.length === 1 ? 'y' : 'ies'}${q ? ` for "${X.q.trim()}"` : ''}`;
    let h = '';
    if (q) h = list.map((r) => rowHtml(r, q)).join('');
    else {
      let letter = '';
      for (const r of list) {
        const L = /^[a-z]/.test(r.sortKey) ? r.sortKey[0].toUpperCase() : '#';
        if (L !== letter) { letter = L; h += `<h3 class="ix-letter">${L}</h3>`; }
        h += rowHtml(r, '');
      }
    }
    $('#ixList').innerHTML = h || '<p class="hint">Nothing in either index matches that. Try a shorter word, such as "cover", "stun" or "cop".</p>';
  }

  function build() {
    buildRows();
    $('#ixSearch').addEventListener('input', (e) => { X.q = e.target.value; render(); });
    $('#ixBook').addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      $$('#ixBook button').forEach((x) => x.classList.toggle('is-on', x === b)); X.book = b.dataset.book; render();
    });
    $('#ixList').addEventListener('click', (e) => { const b = e.target.closest('[data-pid]'); if (b) App.openProfile(b.dataset.pid); });
    X.built = true;
  }

  function show() { if (!X.built) build(); render(); $('#ixSearch').focus(); }
  window.IndexUI = { show, state: X };
})();
