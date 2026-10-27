/* Genres page: the Core and 80s genres, and films to cast from, filterable by genre, decade and text. */
(function () {
  const R = window.SEVENTV_RULES;
  const INFO = window.SEVENTV_GENRE_INFO || { core: {}, '80s': {} };
  const MOVIES = window.SEVENTV_MOVIES || [];
  const PROFILES = window.SEVENTV_PROFILES || [];
  const App = window.App;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = App.esc;

  const ROLE = { s: 'star', c: 'co-star', e: 'extra', v: 'vehicle' };
  const AFF = { h: 'heroic', v: 'villainous', n: 'neutral' };
  const DECADES = [...new Set(MOVIES.map((m) => m.decade))].sort((a, b) => a - b);
  const G = { genre: '', decade: 0, q: '', built: false };

  // genre key -> { set, i, name, icon }
  const GENRES = {};
  for (const set of ['core', '80s']) R.GENRE_SETS[set].genres.forEach((g, i) => { GENRES[g.key] = { set, i, key: g.key, name: g.name, icon: g.icon }; });
  const profileById = new Map(PROFILES.map((p) => [p.id, p]));
  const count = (key) => MOVIES.filter((m) => m.g.includes(key)).length;
  const roleLabel = (r) => (r[1] === 'v' ? 'Vehicle' : `${R.AFFILIATIONS[AFF[r[0]]]} ${R.KINDS[ROLE[r[1]]].label}`);
  const profLabel = (p) => p.name + (R.bookOf(p) !== 'core' ? ' (' + R.BOOKS[R.bookOf(p)].label + ')' : '');

  function genreCard(key) {
    const g = GENRES[key], info = (INFO[g.set] || {})[key] || {};
    return `<button type="button" class="gp-genre" data-genre="${key}" aria-pressed="false">
      <span class="gp-icon"><img src="${g.icon}" alt=""></span>
      <span class="gp-gtext"><span class="gp-gname">${esc(g.name)} <span class="gp-n">${count(key)} films</span></span>
        <span class="gp-sub">${esc(info.sub || '')}</span>
        <span class="gp-desc">${esc(info.desc || '')}</span></span>
    </button>`;
  }

  function build() {
    $('#gpCore').innerHTML = R.GENRE_SETS.core.genres.map((g) => genreCard(g.key)).join('');
    $('#gp80s').innerHTML = R.GENRE_SETS['80s'].genres.map((g) => genreCard(g.key)).join('');
    $('#gpGenre').innerHTML = '<option value="">All genres</option>'
      + ['core', '80s'].map((set) => `<optgroup label="${esc(R.GENRE_SETS[set].label)} genres">${R.GENRE_SETS[set].genres.map((g) => `<option value="${g.key}">${esc(g.name)}</option>`).join('')}</optgroup>`).join('');
    $('#gpDecade').innerHTML = '<button type="button" data-decade="0" class="is-on">All</button>' + DECADES.map((d) => `<button type="button" data-decade="${d}">${d}s</button>`).join('');
    wire();
    G.built = true;
  }

  function matches(m, q) {
    if (!q) return true;
    const hay = [m.t, m.y, m.pitch, ...m.cast.flatMap(([ch, ac, , pid]) => [ch, ac, (profileById.get(pid) || {}).name])].join(' ').toLowerCase();
    return hay.includes(q.replace(/\s+/g, ' '));
  }
  function filtered() {
    const q = G.q.trim().toLowerCase();
    return MOVIES.filter((m) => (!G.genre || m.g.includes(G.genre)) && (!G.decade || m.decade === G.decade) && matches(m, q));
  }

  function filmHtml(m) {
    const icons = m.g.map((k) => GENRES[k]).filter(Boolean)
      .map((g) => `<img src="${g.icon}" alt="${esc(g.name)}" title="${esc(g.name)}" class="${g.set === '80s' ? 'is80' : ''}">`).join('');
    const rows = m.cast.map(([ch, ac, role, pid], ci) => {
      const p = profileById.get(pid), kind = ROLE[role[1]];
      return `<tr>
        <td class="gp-char"><b>${esc(ch)}</b>${ac ? `<span class="gp-actor">${esc(ac)}</span>` : ''}</td>
        <td><span class="gp-role" style="--k:${R.KINDS[kind].band}">${esc(roleLabel(role))}</span></td>
        <td class="gp-prof">${p ? (p.stub ? `<span class="gp-stub" title="This profile card is in the ${esc(R.BOOKS[R.bookOf(p)].label)} book">${esc(profLabel(p))}</span>` : `<button type="button" class="link" data-start="${ci}" title="Start a card from ${esc(p.name)}">${esc(profLabel(p))}</button>`) : ''}</td>
      </tr>`;
    }).join('');
    return `<details class="gp-film" data-film="${MOVIES.indexOf(m)}">
      <summary><span class="gp-title">${esc(m.t)} <span class="gp-year">(${m.y})</span></span><span class="gp-gicons">${icons}</span><span class="gp-pitch">${esc(m.pitch)}</span></summary>
      <div class="gp-cast"><table><thead><tr><th>Character</th><th>7TV role</th><th>Start a card from</th></tr></thead><tbody>${rows}</tbody></table>
      <p class="hint">Profiles are suggestions. Click one to start a card in Casting, named after the character.</p></div>
    </details>`;
  }

  function render() {
    $$('.gp-genre').forEach((b) => { const on = b.dataset.genre === G.genre; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
    $$('#gpDecade button').forEach((b) => b.classList.toggle('is-on', +b.dataset.decade === G.decade));
    $('#gpGenre').value = G.genre;
    const list = filtered();
    const bits = [];
    if (G.genre) bits.push(GENRES[G.genre].name);
    if (G.decade) bits.push(G.decade + 's');
    if (G.q.trim()) bits.push(`"${G.q.trim()}"`);
    $('#gpCount').textContent = `${list.length} film${list.length === 1 ? '' : 's'}${bits.length ? ': ' + bits.join(', ') : ''}`;
    $('#gpClear').hidden = !bits.length;
    let h = '';
    for (const d of DECADES) {
      const ds = list.filter((m) => m.decade === d).sort((x, y) => x.y - y.y);
      if (!ds.length) continue;
      h += `<h3 class="gp-decade">${d}s <span>${ds.length}</span></h3>` + ds.map(filmHtml).join('');
    }
    $('#gpList').innerHTML = h || '<p class="hint">No films match. Try another genre or decade, or clear the filters.</p>';
  }

  function startCard(m, ci) {
    const [ch, , role, pid] = m.cast[ci];
    const p = profileById.get(pid); if (!p || p.stub || !App.confirmDiscard()) return;
    const card = App.cardFromProfile(p, p.genreSet);
    // Stars and Co-Stars take the character's name; Extras and vehicles keep the profile name
    if (role[1] === 's' || role[1] === 'c') card.name = ch;
    if (p.affiliation === 'neutral' && role[0] !== 'n' && role[1] !== 'v') card.affiliation = AFF[role[0]];
    App.openCard(card, true);
    App.toast(`Started a card for ${card.name} from ${p.name}. ${m.t} (${m.y}).`);
  }

  function wire() {
    const pick = (key) => {
      G.genre = G.genre === key ? '' : key;
      render();
      if (G.genre) $('#gpFilms').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    $('#gpCore').addEventListener('click', (e) => { const b = e.target.closest('[data-genre]'); if (b) pick(b.dataset.genre); });
    $('#gp80s').addEventListener('click', (e) => { const b = e.target.closest('[data-genre]'); if (b) pick(b.dataset.genre); });
    $('#gpGenre').addEventListener('change', (e) => { G.genre = e.target.value; render(); });
    $('#gpDecade').addEventListener('click', (e) => { const b = e.target.closest('[data-decade]'); if (b) { G.decade = +b.dataset.decade; render(); } });
    $('#gpSearch').addEventListener('input', (e) => { G.q = e.target.value; render(); });
    $('#gpClear').addEventListener('click', () => { G.genre = ''; G.decade = 0; G.q = ''; $('#gpSearch').value = ''; render(); });
    $('#gpList').addEventListener('click', (e) => {
      const b = e.target.closest('[data-start]'); if (!b) return;
      const m = MOVIES[+b.closest('[data-film]').dataset.film]; startCard(m, +b.dataset.start);
    });
  }

  function show() { if (!G.built) build(); render(); }
  window.GenresUI = { show, state: G };
})();
