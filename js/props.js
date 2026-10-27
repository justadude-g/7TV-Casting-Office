/* Props page: design Prop (blue) and Maguffin (yellow) cards. Saved cards go into My Cards with
   deck: 'prop' | 'maguffin', so My Cards, the Print Sheet and backups handle them like profile cards. */
(function () {
  const App = window.App;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const S = App.S;
  const PC = { card: null, img: null, dirty: false, built: false };

  function blank(deck) {
    return {
      id: App.uid(), deck, name: deck === 'maguffin' ? 'New Maguffin' : 'New Prop', play: "Model's Activation", action: deck === 'maguffin' ? 'S' : 'F', cost: deck === 'maguffin' ? 1 : 0,
      flavour: '', effect: '', image: { src: null, zoom: 1, x: 0, y: 0, flip: false }
    };
  }

  let raf = 0;
  function render() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const c = PC.card; if (!c) return;
      PropRender.renderFront($('#pcFront'), c, { img: PC.img });
      PropRender.renderBack($('#pcBack'), c, { img: PC.img, badgeImg: S.defaultBadge.img, backImg: S.propBack.img });
      $('#pcBackNote').textContent = c.deck === 'prop' ? (S.propBack.src ? 'Your shared Prop back' : 'Drawn Prop back, shared by every Prop card') : 'Same image as the front';
    });
  }
  function changed() { PC.dirty = true; state(); render(); saveDraftSoon(); }
  function state() {
    const saved = S.saved.some((x) => x.id === PC.card.id);
    $('#pcState').textContent = PC.dirty ? 'Unsaved changes' : (saved ? 'Saved' : '');
  }
  let draftT = 0;
  function saveDraftSoon() { clearTimeout(draftT); draftT = setTimeout(() => CardStore.setMeta('propDraft', { card: PC.card, dirty: PC.dirty }).catch(() => {}), 500); }

  function fill() {
    const c = PC.card;
    $$('#pcDeck button').forEach((b) => b.classList.toggle('is-on', b.dataset.deck === c.deck));
    $('#pcName').value = c.name || '';
    $('#pcPlay').value = c.play || '';
    $('#pcAction').value = c.action || '';
    $('#pcCost').value = String(c.cost || 0);
    $('#pcFlavour').value = c.flavour || '';
    $('#pcEffect').value = c.effect || '';
    $('#pcFlavourRow').hidden = c.deck !== 'maguffin';
    $('#pcEffectLabel').textContent = c.deck === 'maguffin' ? 'Rules text' : 'Effect (printed after a bold EFFECT:)';
    $('#pcZoom').value = (c.image && c.image.zoom) || 1;
    $('#pcFlip').checked = !!(c.image && c.image.flip);
    showBackPreview(); state(); render();
  }
  async function load(card, dirty) {
    PC.card = card; PC.dirty = !!dirty;
    if (!PC.card.image) PC.card.image = { src: null, zoom: 1, x: 0, y: 0, flip: false };
    PC.img = await App.loadImg(PC.card.image.src);
    fill();
  }
  function confirmLeave() { return !PC.dirty || confirm('You have unsaved changes on this card. Continue and lose them?'); }
  function showBackPreview() {
    const el = $('#pcBackPreview');
    el.style.backgroundImage = S.propBack.src ? `url(${S.propBack.src})` : '';
    el.classList.toggle('empty', !S.propBack.src);
    $('#pcBackClear').hidden = !S.propBack.src;
  }

  async function setImage(file) {
    if (!file || !/^image\//.test(file.type)) return;
    const { src, img } = await App.readImageFile(file, 1400);
    Object.assign(PC.card.image, { src, zoom: 1, x: 0, y: 0 });
    PC.img = img; $('#pcZoom').value = 1; changed();
  }

  async function save(asNew) {
    const c = JSON.parse(JSON.stringify(PC.card));
    if (asNew) { c.id = App.uid(); c.name = (c.name || 'Card') + ' (copy)'; delete c.createdAt; }
    await CardStore.put(c);
    await App.refreshSaved();
    PC.card = c; PC.dirty = false; state(); saveDraftSoon();
    App.toast(asNew ? `Saved a copy: ${c.name}.` : `Saved ${c.name} to My Cards.`);
  }

  function png() {
    const f = $('#pcFront'), b = $('#pcBack'), c = document.createElement('canvas');
    c.width = f.width * 2 + 40; c.height = f.height;
    const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height);
    x.drawImage(f, 0, 0); x.drawImage(b, f.width + 40, 0);
    const a = document.createElement('a'); a.download = (PC.card.name || 'card').replace(/[^\w-]+/g, '-') + '.png'; a.href = c.toDataURL('image/png'); a.click();
  }

  function wire() {
    $('#pcDeck').addEventListener('click', (e) => {
      const b = e.target.closest('[data-deck]'); if (!b || b.dataset.deck === PC.card.deck) return;
      PC.card.deck = b.dataset.deck; fill(); changed();
    });
    const bind = (sel, key, num) => $(sel).addEventListener('input', (e) => { PC.card[key] = num ? +e.target.value : e.target.value; changed(); });
    bind('#pcName', 'name'); bind('#pcPlay', 'play'); bind('#pcFlavour', 'flavour'); bind('#pcEffect', 'effect');
    $('#pcAction').addEventListener('change', (e) => { PC.card.action = e.target.value; changed(); });
    $('#pcCost').addEventListener('change', (e) => { PC.card.cost = +e.target.value; changed(); });
    $('#pcImage').addEventListener('change', (e) => { setImage(e.target.files[0]); e.target.value = ''; });
    $('#pcZoom').addEventListener('input', (e) => { PC.card.image.zoom = +e.target.value; changed(); });
    $('#pcFlip').addEventListener('change', (e) => { PC.card.image.flip = e.target.checked; changed(); });
    $('#pcRecentre').addEventListener('click', () => { Object.assign(PC.card.image, { x: 0, y: 0, zoom: 1 }); $('#pcZoom').value = 1; changed(); });
    $('#pcImageClear').addEventListener('click', () => { PC.card.image.src = null; PC.img = null; changed(); });
    $('#pcSave').addEventListener('click', () => save(false));
    $('#pcDuplicate').addEventListener('click', () => save(true));
    $('#pcPng').addEventListener('click', png);
    $('#pcNewProp').addEventListener('click', () => { if (confirmLeave()) load(blank('prop'), true); });
    $('#pcNewMag').addEventListener('click', () => { if (confirmLeave()) load(blank('maguffin'), true); });
    $('#pcBackImg').addEventListener('change', async (e) => {
      const file = e.target.files[0]; e.target.value = ''; if (!file) return;
      const { src, img } = await App.readImageFile(file, 1200);
      await CardStore.setMeta('propBack', src); S.propBack = { src, img }; S.thumbs.clear();
      showBackPreview(); render(); App.toast('Back image set for every Prop card.');
    });
    $('#pcBackClear').addEventListener('click', async () => {
      await CardStore.setMeta('propBack', null); S.propBack = { src: null, img: null }; S.thumbs.clear();
      showBackPreview(); render();
    });
    // drag to move the image on the front, wheel to zoom, drop a file anywhere on either face
    const cv = $('#pcFront');
    let drag = null;
    cv.addEventListener('pointerdown', (e) => { if (!PC.img) return; drag = { x: e.clientX, y: e.clientY, ox: PC.card.image.x || 0, oy: PC.card.image.y || 0, k: cv.width / cv.getBoundingClientRect().width }; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointermove', (e) => { if (!drag) return; PC.card.image.x = drag.ox + (e.clientX - drag.x) * drag.k; PC.card.image.y = drag.oy + (e.clientY - drag.y) * drag.k; changed(); });
    cv.addEventListener('pointerup', () => { drag = null; });
    cv.addEventListener('wheel', (e) => {
      if (!PC.img) return; e.preventDefault();
      PC.card.image.zoom = Math.max(0.2, Math.min(3, (PC.card.image.zoom || 1) * (e.deltaY < 0 ? 1.06 : 1 / 1.06)));
      $('#pcZoom').value = PC.card.image.zoom; changed();
    }, { passive: false });
    for (const el of [$('#pcFront'), $('#pcBack')]) {
      el.addEventListener('dragover', (e) => e.preventDefault());
      el.addEventListener('drop', (e) => { e.preventDefault(); setImage(e.dataTransfer.files[0]); });
    }
  }

  async function show() {
    if (!PC.built) {
      wire(); PC.built = true;
      const d = await CardStore.getMeta('propDraft').catch(() => null);
      await load(d && d.card ? d.card : blank('prop'), d && d.dirty);
    } else { showBackPreview(); render(); }
  }
  async function open(card) {
    if (!PC.built) { wire(); PC.built = true; }
    if (PC.card && !confirmLeave()) return;
    await load(card, false);
    App.showView('props');
  }
  function refresh() { if (PC.built) { showBackPreview(); render(); } }
  window.PropsUI = { show, open, refresh, state: PC };
})();
