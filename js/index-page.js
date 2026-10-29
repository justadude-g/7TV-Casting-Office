/* Index page: search the Core Rulebook and 80s book indexes and see which book and page each term is on.
   Profile cards are left out: the New card picker and the Call Sheet already list them. */
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
    // names of profile cards, which are not listed here
    const profNames = new Set();
    for (const p of PROFILES) if (!p.book) profNames.add(p.genreSet + '|' + norm(p.name));
    const isProfile = (e) => /\bprofiles$/i.test(e.t) || (!e.in && (profNames.has(e.b + '|' + norm(e.t)) || (e.also && profNames.has(e.b + '|' + norm(e.also)))));
    const byKey = new Map();
    const add = (e) => {
      if (isProfile(e)) return;
      const key = norm((e.in ? e.in + ' > ' : '') + e.t);
      let r = byKey.get(key);
      if (!r) { r = { t: e.t, in: e.in || '', also: e.also || '', refs: [] }; byKey.set(key, r); }
      if (!r.refs.some((x) => x.b === e.b && x.p === e.p)) r.refs.push({ b: e.b, p: e.p });
    };
    RAW.forEach(add);
    X.rows = [...byKey.values()].map((r) => Object.assign(r, {
      sortKey: norm(r.in ? r.in + ' ' + r.t : r.t).replace(/^[^a-z0-9]+/, ''),
      hay: norm([r.t, r.in, r.also].join(' '))
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
    const name = `<span class="ix-name">${mark(r.t, q)}</span>`;
    const also = r.also ? ` <span class="ix-also">(${mark(r.also, q)})</span>` : '';
    return `<div class="ix-row${r.in ? ' ix-sub' : ''}">
      <span class="ix-term">${r.in ? `<span class="ix-parent">${mark(r.in, q)} &rsaquo;</span> ` : ''}${name}${also}</span>
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
    X.built = true;
  }

  function show() { if (!X.built) build(); render(); $('#ixSearch').focus(); }
  window.IndexUI = { show, state: X };
})();
