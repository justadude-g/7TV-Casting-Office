/* IndexedDB storage for saved cards, plus JSON backup export and import. */
(function () {
  const DB = 'seventv-card-maker', VER = 2, STORE = 'cards', META = 'meta', CASTS = 'casts';
  let dbp = null;
  function db() {
    if (dbp) return dbp;
    dbp = new Promise((res, rej) => {
      const r = indexedDB.open(DB, VER);
      r.onupgradeneeded = () => {
        const d = r.result;
        if (!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE, { keyPath: 'id' });
        if (!d.objectStoreNames.contains(META)) d.createObjectStore(META);
        if (!d.objectStoreNames.contains(CASTS)) d.createObjectStore(CASTS, { keyPath: 'id' });
      };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    return dbp;
  }
  function tx(store, mode, fn) {
    return db().then((d) => new Promise((res, rej) => {
      const t = d.transaction(store, mode); const s = t.objectStore(store);
      const out = fn(s);
      // a request's result is undefined when a key is missing; return that, not the request object
      t.oncomplete = () => res(out instanceof IDBRequest ? out.result : out);
      t.onerror = () => rej(t.error);
    }));
  }
  const Store = {
    all: () => tx(STORE, 'readonly', (s) => s.getAll()).then((r) => (r || []).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))),
    get: (id) => tx(STORE, 'readonly', (s) => s.get(id)),
    put: (card) => { card.updatedAt = Date.now(); if (!card.createdAt) card.createdAt = card.updatedAt; return tx(STORE, 'readwrite', (s) => s.put(card)).then(() => card); },
    remove: (id) => tx(STORE, 'readwrite', (s) => s.delete(id)),
    casts: () => tx(CASTS, 'readonly', (s) => s.getAll()).then((r) => (r || []).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))),
    putCast: (c) => { c.updatedAt = Date.now(); return tx(CASTS, 'readwrite', (s) => s.put(c)).then(() => c); },
    removeCast: (id) => tx(CASTS, 'readwrite', (s) => s.delete(id)),
    getMeta: (k) => tx(META, 'readonly', (s) => s.get(k)),
    setMeta: (k, v) => tx(META, 'readwrite', (s) => s.put(v, k)),
    async exportJSON() {
      const cards = await Store.all(); const casts = await Store.casts();
      const defaultBadge = await Store.getMeta('defaultBadge').catch(() => null);
      const propBack = await Store.getMeta('propBack').catch(() => null);
      return JSON.stringify({ app: '7tv-card-maker', version: 2, exportedAt: new Date().toISOString(), cards, casts, settings: { defaultBadge: defaultBadge || null, propBack: propBack || null } }, null, 1);
    },
    async importJSON(text) {
      const data = JSON.parse(text);
      const cards = Array.isArray(data) ? data : data.cards;
      if (!Array.isArray(cards)) throw new Error('No cards found in that file.');
      let n = 0;
      for (const c of cards) { if (c && c.id && c.name !== undefined) { await tx(STORE, 'readwrite', (s) => s.put(c)); n++; } }
      for (const c of (data.casts || [])) { if (c && c.id && Array.isArray(c.members)) await tx(CASTS, 'readwrite', (s) => s.put(c)); }
      if (data.settings && typeof data.settings.defaultBadge === 'string' && data.settings.defaultBadge.startsWith('data:image')) await Store.setMeta('defaultBadge', data.settings.defaultBadge);
      if (data.settings && typeof data.settings.propBack === 'string' && data.settings.propBack.startsWith('data:image')) await Store.setMeta('propBack', data.settings.propBack);
      return n;
    }
  };
  window.CardStore = Store;
})();
