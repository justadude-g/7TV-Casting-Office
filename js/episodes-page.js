/* Episodes page: browse the episodes and tropes of the Core Rulebook and the 80s book by summary,
   filter by book and genre, and see the page to turn to. */
(function () {
  const R = window.SEVENTV_RULES;
  const EPS = window.SEVENTV_EPISODES || [];
  const TROPES = window.SEVENTV_TROPES || [];
  const App = window.App;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = App.esc;
  const BOOK = { core: 'Core Rulebook', '80s': '80s book' };
  const E = { kind: 'episodes', q: '', book: '', genre: '', built: false };

  const GENRES = {};
  for (const set of ['core', '80s']) R.GENRE_SETS[set].genres.forEach((g) => { GENRES[g.key] = { set, name: g.name, icon: g.icon }; });
  const norm = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
  const genreNames = (x) => (x.g.length ? x.g.map((k) => GENRES[k].name) : ['Any genre']);

  function icons(x) {
    if (!x.g.length) return '<span class="ep-any">Any genre</span>';
    return [...new Set(x.g)].map((k) => { const g = GENRES[k]; return `<img src="${g.icon}" alt="${esc(g.name)}" title="${esc(g.name)}" class="${g.set === '80s' ? 'is80' : ''}">`; }).join('');
  }
  function mark(text, q) {
    if (!q) return esc(text);
    const i = text.toLowerCase().indexOf(q);
    return i < 0 ? esc(text) : esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
  }
  function rowHtml(x, q) {
    const vs = x.type && x.g.length > 1 ? x.g.map((k) => GENRES[k].name).join(' vs ') : genreNames(x).join(', ');
    return `<div class="ep-row">
      <div class="ep-head">
        <span class="ep-title">${mark(x.t, q)}</span>
        <span class="ep-gicons">${icons(x)}</span>
        <span class="ix-ref"><span class="ix-book ix-${x.b === 'core' ? 'core' : 'b80'}">${x.b === 'core' ? 'Core' : '80s'}</span><span class="ix-pages">p. ${x.p}</span></span>
      </div>
      <p class="ep-sum">${mark(x.s, q)}</p>
      <span class="ep-meta">${esc(x.type ? (x.type === 'Classic episode' ? x.type : x.type + ' episode') : 'Trope')}${x.g.length ? ', ' + esc(vs) : ''}</span>
    </div>`;
  }

  function filtered() {
    const q = norm(E.q);
    const src = E.kind === 'episodes' ? EPS : TROPES;
    return src.filter((x) => (!E.book || x.b === E.book)
      && (!E.genre || !x.g.length || x.g.includes(E.genre))
      && (!q || norm([x.t, x.s, x.type || '', genreNames(x).join(' ')].join(' ')).includes(q)));
  }
  function groupOf(x) {
    if (E.kind === 'episodes') return BOOK[x.b] + ': ' + (x.type === 'Open play' ? 'open play episodes' : x.type === 'Narrative' ? 'narrative episodes' : 'classic episodes');
    return BOOK[x.b] + ': ' + GENRES[x.g[0]].name + ' tropes';
  }

  function render() {
    $$('#epKind button').forEach((b) => b.classList.toggle('is-on', b.dataset.kind === E.kind));
    const q = norm(E.q), list = filtered();
    const noun = E.kind === 'episodes' ? 'episode' : 'trope';
    const bits = [];
    if (E.genre) bits.push(GENRES[E.genre].name);
    if (E.book) bits.push(E.book === 'core' ? 'Core' : '80s');
    if (q) bits.push(`"${E.q.trim()}"`);
    $('#epCount').textContent = `${list.length} ${noun}${list.length === 1 ? '' : 's'}${bits.length ? ': ' + bits.join(', ') : ''}`;
    let h = '', grp = '';
    for (const x of list) {
      const g = groupOf(x);
      if (g !== grp) { grp = g; h += `<h3 class="ix-letter ep-group">${esc(g)}</h3>`; }
      h += rowHtml(x, q);
    }
    $('#epList').innerHTML = h || `<p class="hint">No ${noun}s match. Try another genre or book, or clear the search.</p>`;
    $('#epGenreNote').hidden = !(E.genre && E.kind === 'episodes');
  }

  function build() {
    $('#epGenre').innerHTML = '<option value="">All genres</option>' + ['core', '80s'].map((set) =>
      `<optgroup label="${esc(R.GENRE_SETS[set].label)} genres">${R.GENRE_SETS[set].genres.map((g) => `<option value="${g.key}">${esc(g.name)}</option>`).join('')}</optgroup>`).join('');
    $('#epKind').addEventListener('click', (e) => { const b = e.target.closest('[data-kind]'); if (b) { E.kind = b.dataset.kind; render(); } });
    $('#epSearch').addEventListener('input', (e) => { E.q = e.target.value; render(); });
    $('#epGenre').addEventListener('change', (e) => { E.genre = e.target.value; render(); });
    $('#epBook').addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      $$('#epBook button').forEach((x) => x.classList.toggle('is-on', x === b)); E.book = b.dataset.book; render();
    });
    E.built = true;
  }

  function show() { if (!E.built) build(); render(); }
  window.EpisodesUI = { show, state: E };
})();
