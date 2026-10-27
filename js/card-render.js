/* 7TV 2e profile card renderer.
   Draws card fronts and backs on a canvas at 300 dpi for a 63.5 x 88 mm card (750 x 1040 px),
   matching the layout of the official 2nd Edition profile cards. Every position lives in LAYOUT. */
(function () {
  const R = window.SEVENTV_RULES;

  const LAYOUT = {
    W: 750, H: 1040,
    fonts: { head: '"League Gothic"', body: '"PT Sans Narrow"', num: '"Anton"' },
    bodyHScale: 1.0,
    header: {
      band: { x: 48, y: -24, w: 654, h: 146, r: 22 },
      outline: { x: 36, y: -24, w: 678, h: 160, r: 30, lw: 5 },
      darkBottom: 142,
      title: { y: 94, size: 78, maxW: 610 },
      pill: { cx: 375, cy: 132, h: 52, pad: 28, minW: 190, size: 38, lw: 4 },
      ratings: { cx: 632, cy: 132, r: 29, size: 32, lw: 4, noteY: 178, noteSize: 21 },
      badge: { cx: 118, cy: 132, r: 29, lw: 4 }
    },
    content: { y: 142, bottom: 926 },
    portrait: { x: 0, y: 142, w: 750, h: 784, defaultH: 420, defaultCy: 345 },
    stats: {
      model: { top: 198, rowTops: [212, 296, 378], rowH: 79 },
      vehicle: { top: 708, rowTops: [722, 802], rowH: 78 },
      left: { boxX: -30, boxR: 232, cellX: 152, cellW: 66, labelX: 138 },
      right: { boxX: 518, boxR: 780, cellX: 532, cellW: 66, labelX: 612 },
      pad: 14, r: 22, labelSize: 45, valueSize: 44
    },
    table: {
      x: 30, w: 690, headerY: 532, headerH: 46, minHeaderY: 474, bottom: 896, r: 18,
      cols: { icon: 66, name: 102, nameW: 170, range: 292, strikeX: 322, strikeW: 84, effect: 422, effectW: 288 },
      headerSize: 29, textSize: 30, lineH: 35, rowPad: 26, minRowH: 64, strikeSize: 40, iconR: 26
    },
    health: { cy: 938, d: 64, gap: 7, lw: 4 },
    band: { x: 25, y: 946, w: 700, h: 130, r: 24 },
    healthLabel: { y: 1014, size: 34 },
    genres: { xs: [78, 158, 238, 512, 592, 672], cy: 993, size: 72, offAlpha: 0.32, scale: { core: 1, '80s': 0.9 } }, // 80s icons are solid discs with no margin, so they draw smaller to match the Core rings
    back: {
      topDark: 52, bottomDark: 998,
      band: { x: 55, y: -24, w: 640, h: 42, r: 14 },
      outline: { x: 40, y: -24, w: 670, h: 50, r: 20, lw: 3 },
      cols: [60, 402], colW: 288, top: 116, bottom: 978,
      headSize: 46, headBefore: 20, headAfter: 8,
      textSize: 33, lineH: 40, entryBefore: 12, minScale: 0.5
    }
  };

  /* ---------- assets ---------- */
  const assets = { ready: null, img: {} };
  function loadImage(src) {
    return new Promise((res) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => res(null);
      i.src = src;
    });
  }
  function loadAssets() {
    if (assets.ready) return assets.ready;
    const list = { clouds: 'assets/textures/clouds.jpg' };
    for (const set of Object.values(R.GENRE_SETS)) for (const g of set.genres) list['g_' + set.id + '_' + g.key] = g.icon;
    const fontLoads = [
      `48px ${LAYOUT.fonts.head}`, `48px ${LAYOUT.fonts.num}`, `31px ${LAYOUT.fonts.body}`, `700 31px ${LAYOUT.fonts.body}`, `italic 31px ${LAYOUT.fonts.body}`
    ].map((f) => (document.fonts ? document.fonts.load(f).catch(() => null) : null));
    assets.ready = Promise.all([
      ...Object.entries(list).map(([k, src]) => loadImage(src).then((i) => { assets.img[k] = i; })),
      ...fontLoads
    ]).then(() => { assets.speckle = makeSpeckle(); return assets; });
    return assets.ready;
  }

  /* deterministic random for repeatable textures */
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function makeSpeckle() {
    const c = document.createElement('canvas'); c.width = 400; c.height = 400;
    const x = c.getContext('2d'); const rand = rng(7);
    x.fillStyle = '#000';
    for (let i = 0; i < 2600; i++) {
      const r = rand() < 0.92 ? rand() * 1.4 + 0.3 : rand() * 3 + 1.2;
      x.globalAlpha = 0.35 + rand() * 0.65;
      x.beginPath(); x.arc(rand() * 400, rand() * 400, r, 0, Math.PI * 2); x.fill();
    }
    x.globalAlpha = 0.5; x.lineWidth = 0.8; x.strokeStyle = '#000';
    for (let i = 0; i < 40; i++) {
      const sx = rand() * 400, sy = rand() * 400, len = 6 + rand() * 30;
      x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + len, sy + (rand() - 0.5) * 3); x.stroke();
    }
    return c;
  }

  /* ---------- helpers ---------- */
  function rr(ctx, x, y, w, h, r) {
    const rad = typeof r === 'number' ? [r, r, r, r] : r; // tl tr br bl
    ctx.beginPath();
    ctx.moveTo(x + rad[0], y);
    ctx.lineTo(x + w - rad[1], y); ctx.quadraticCurveTo(x + w, y, x + w, y + rad[1]);
    ctx.lineTo(x + w, y + h - rad[2]); ctx.quadraticCurveTo(x + w, y + h, x + w - rad[2], y + h);
    ctx.lineTo(x + rad[3], y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - rad[3]);
    ctx.lineTo(x, y + rad[0]); ctx.quadraticCurveTo(x, y, x + rad[0], y);
    ctx.closePath();
  }
  function headFont(size) { return `${size}px ${LAYOUT.fonts.head}`; }
  function bodyFont(size, style) {
    if (style === 'bold') return `700 ${size}px ${LAYOUT.fonts.body}`;
    if (style === 'ital') return `italic ${size}px ${LAYOUT.fonts.body}`;
    if (style === 'boldital') return `italic 700 ${size}px ${LAYOUT.fonts.body}`;
    return `${size}px ${LAYOUT.fonts.body}`;
  }
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const f = (v) => Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)));
    return '#' + ((1 << 24) + (f(r) << 16) + (f(g) << 8) + f(b)).toString(16).slice(1);
  }
  function kindStyle(card) {
    const k = R.KINDS[card.kind] || R.KINDS.star;
    const c = card.colours || {};
    return { band: c.band || k.band, accent: c.accent || k.accent, heading: c.heading || k.heading };
  }
  function typeLabel(card) {
    if (card.typeLabel) return card.typeLabel;
    return `${R.AFFILIATIONS[card.affiliation] || ''} ${(R.KINDS[card.kind] || {}).label || ''}`.trim();
  }
  function strikeValue(card, a) {
    if (a.strikeOverride !== undefined && a.strikeOverride !== null && a.strikeOverride !== '') return String(a.strikeOverride);
    const t = R.ATTACK_TYPES[a.type] || R.ATTACK_TYPES.fight;
    let v = t.base(card.stats || {}) + (+a.mod || 0);
    if (a.addBody) v += (+(card.stats || {}).body || 0) ;
    return (v >= 0 ? '+' : '') + v;
  }

  /* text drawn through an offscreen buffer so it can be distressed like the Veneer face on the cards */
  function distressText(ctx, text, x, y, opts) {
    const { size, colour, align = 'center', maxW = 0, distress = true, shadow = null, strength = 1, font = null } = opts;
    const fnt = font ? `${size}px ${font}` : headFont(size);
    ctx.save();
    ctx.font = fnt;
    let w = ctx.measureText(text).width;
    let sx = 1;
    if (maxW && w > maxW) { sx = maxW / w; w = maxW; }
    ctx.restore();
    const pad = Math.ceil(size * 0.3);
    const bw = Math.ceil(w + pad * 2), bh = Math.ceil(size * 1.4);
    const buf = document.createElement('canvas'); buf.width = Math.max(1, bw); buf.height = bh;
    const b = buf.getContext('2d');
    b.font = fnt; b.fillStyle = colour; b.textBaseline = 'alphabetic';
    b.save(); b.translate(pad, size * 1.05); b.scale(sx, 1); b.fillText(text, 0, 0); b.restore();
    if (distress && assets.speckle) {
      b.globalCompositeOperation = 'destination-out';
      b.globalAlpha = 0.55 * strength;
      const ox = ((text.length * 37) % 300), oy = ((size * 13) % 300);
      b.drawImage(assets.speckle, -ox, -oy);
      b.drawImage(assets.speckle, -ox + 400, -oy);
    }
    let dx = x - pad;
    if (align === 'center') dx = x - w / 2 - pad;
    else if (align === 'right') dx = x - w - pad;
    const dy = y - size * 1.05;
    if (shadow) {
      ctx.save(); ctx.shadowColor = shadow; ctx.shadowBlur = 6; ctx.shadowOffsetY = 2;
      ctx.drawImage(buf, dx, dy); ctx.restore();
    } else ctx.drawImage(buf, dx, dy);
    return w;
  }

  function texture(ctx, x, y, w, h, mode, alpha) {
    const img = assets.img.clouds; if (!img) return;
    ctx.save();
    ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    ctx.globalCompositeOperation = mode; ctx.globalAlpha = alpha;
    ctx.drawImage(img, 0, 0, LAYOUT.W, LAYOUT.H);
    ctx.restore();
  }

  function grunge(ctx, x, y, w, h, seed) {
    const rand = rng(seed);
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    ctx.strokeStyle = 'rgba(255,255,255,0.10)'; ctx.lineWidth = 1.2;
    for (let i = 0; i < 26; i++) {
      const sx = x + rand() * w, sy = y + rand() * h;
      ctx.beginPath(); ctx.moveTo(sx, sy);
      let cx = sx, cy = sy;
      for (let j = 0; j < 4; j++) { cx += (rand() - 0.3) * 60; cy += (rand() - 0.5) * 30; ctx.lineTo(cx, cy); }
      ctx.stroke();
    }
    ctx.restore();
  }

  function darkArea(ctx, x, y, w, h, seed) {
    ctx.fillStyle = '#14171a'; ctx.fillRect(x, y, w, h);
    texture(ctx, x, y, w, h, 'screen', 0.14);
    grunge(ctx, x, y, w, h, seed);
  }

  function bandFill(ctx, colour, seed) {
    ctx.fillStyle = colour; ctx.fill();
    ctx.save(); ctx.clip();
    texture(ctx, 0, 0, LAYOUT.W, LAYOUT.H, 'multiply', 0.28);
    const rand = rng(seed);
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    for (let i = 0; i < 500; i++) { ctx.fillRect(rand() * LAYOUT.W, rand() * LAYOUT.H, 1 + rand() * 2, 1); }
    ctx.restore();
  }

  /* ---------- icons (drawn in code) ---------- */
  function attackIcon(ctx, type, cx, cy, r) {
    ctx.save();
    if (type === 'presence') {
      // starburst with a figure
      ctx.fillStyle = '#231f20';
      ctx.beginPath();
      const spikes = 12;
      for (let i = 0; i < spikes * 2; i++) {
        const ang = (Math.PI * i) / spikes - Math.PI / 2;
        const rad = i % 2 === 0 ? r * 1.02 : r * 0.74;
        const px = cx + Math.cos(ang) * rad, py = cy + Math.sin(ang) * rad;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(cx, cy - r * 0.2, r * 0.24, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.46, cy + r * 0.52);
      ctx.quadraticCurveTo(cx - r * 0.44, cy + r * 0.08, cx, cy + r * 0.08);
      ctx.quadraticCurveTo(cx + r * 0.44, cy + r * 0.08, cx + r * 0.46, cy + r * 0.52);
      ctx.closePath(); ctx.fill();
    } else {
      ctx.fillStyle = '#231f20';
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.strokeStyle = '#fff';
      if (type === 'shoot') {
        ctx.lineWidth = r * 0.13;
        ctx.beginPath(); ctx.arc(cx, cy, r * 0.56, 0, Math.PI * 2); ctx.stroke();
        ctx.lineWidth = r * 0.11;
        ctx.beginPath();
        ctx.moveTo(cx - r * 0.82, cy); ctx.lineTo(cx - r * 0.24, cy);
        ctx.moveTo(cx + r * 0.24, cy); ctx.lineTo(cx + r * 0.82, cy);
        ctx.moveTo(cx, cy - r * 0.82); ctx.lineTo(cx, cy - r * 0.24);
        ctx.moveTo(cx, cy + r * 0.24); ctx.lineTo(cx, cy + r * 0.82);
        ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy, r * 0.1, 0, Math.PI * 2); ctx.fill();
      } else {
        // fist: four knuckles over a palm block, thumb across
        const s = r / 26;
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.35);
        for (let i = 0; i < 4; i++) { rr(ctx, (-15 + i * 7.8) * s, -15 * s, 6.8 * s, 16 * s, 3 * s); ctx.fill(); }
        rr(ctx, -15 * s, 0, 31 * s, 14 * s, 4 * s); ctx.fill();
        ctx.fillStyle = '#231f20';
        ctx.fillRect(-15 * s, 1.2 * s, 31 * s, 1.6 * s);
        ctx.restore();
      }
    }
    ctx.restore();
  }

  function symbolGlyph(ctx, g, x, baseline, size) {
    const d = size * 0.86, r = d / 2, cy = baseline - size * 0.33, cx = x + r;
    ctx.save();
    ctx.fillStyle = '#231f20';
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    if (g === 'PP') {
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const ang = (Math.PI * i) / 5 - Math.PI / 2;
        const rad = i % 2 === 0 ? r * 0.78 : r * 0.33;
        const px = cx + Math.cos(ang) * rad, py = cy + Math.sin(ang) * rad;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath(); ctx.fill();
    } else {
      ctx.font = `700 ${Math.round(d * 0.78)}px ${LAYOUT.fonts.body}`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(g, cx, cy + d * 0.04);
    }
    ctx.restore();
    return d;
  }

  /* ---------- rich text ---------- */
  // markup: **bold**, *italic*, {PP} plot point, {F} {P} {S} {1} action symbols, newline = paragraph
  function parseRich(text, baseStyle) {
    const out = [];
    const re = /(\*\*(?:\\\*|[^*])+\*\*|\*(?:\\\*|[^*])+\*|\{PP\}|\{F\}|\{P\}|\{S\}|\{1\}|\n)/g;
    const un = (t) => t.replace(/\\\*/g, '*');
    let last = 0, m;
    const src = String(text || '');
    while ((m = re.exec(src))) {
      if (m.index > last) out.push({ t: 'text', s: un(src.slice(last, m.index)), style: baseStyle });
      const tok = m[0];
      if (tok === '\n') out.push({ t: 'br' });
      else if (tok.startsWith('**')) out.push({ t: 'text', s: un(tok.slice(2, -2)), style: 'bold' });
      else if (tok.startsWith('*')) out.push({ t: 'text', s: un(tok.slice(1, -1)), style: baseStyle === 'bold' ? 'boldital' : 'ital' });
      else out.push({ t: 'glyph', g: tok.slice(1, -1) });
      last = m.index + tok.length;
    }
    if (last < src.length) out.push({ t: 'text', s: un(src.slice(last)), style: baseStyle });
    return out;
  }
  function symbolsFor(e) {
    const g = [];
    for (let i = 0; i < (+e.pp || 0); i++) g.push('PP');
    if (e.action) g.push(e.action);
    if (e.action2) g.push(e.action2);
    if (e.once) g.push('1');
    return g;
  }
  // split runs into words with measured widths
  function wordsOf(ctx, runs, size, hs) {
    const words = [];
    for (const r of runs) {
      if (r.t === 'br') { words.push({ br: true }); continue; }
      if (r.t === 'glyph') {
        const prev = words[words.length - 1], gw = size * 0.86 + 1;
        if (prev && prev.glyphs && !prev.space) { prev.glyphs.push(r.g); prev.w += gw; continue; }
        words.push({ glyphs: [r.g], w: gw, space: false, lead: !!(prev && !prev.glyphs && !prev.space) }); continue;
      }
      const parts = r.s.split(/(\s+)/);
      for (const p of parts) {
        if (p === '') continue;
        if (/^\s+$/.test(p)) { if (words.length) words[words.length - 1].space = true; continue; }
        ctx.font = bodyFont(size, r.style);
        words.push({ s: p, style: r.style, w: ctx.measureText(p).width * hs, space: false });
      }
    }
    return words;
  }
  function wrapWords(ctx, words, width, size, hs) {
    ctx.font = bodyFont(size, 'reg');
    const spaceW = ctx.measureText(' ').width * hs;
    const lines = []; let line = []; let lw = 0;
    for (const w of words) {
      if (w.br) { lines.push(line); line = []; lw = 0; continue; }
      const gap = line.length && (line[line.length - 1].space || w.lead) ? spaceW : 0;
      if (line.length && lw + gap + w.w > width) {
        // keep symbols with the word before them rather than leaving them alone on a line
        const prev = line[line.length - 1];
        if (w.glyphs && line.length > 1 && !prev.glyphs) {
          line.pop(); lines.push(line);
          line = [Object.assign({}, prev, { x: 0 })]; lw = prev.w;
        } else { lines.push(line); line = []; lw = 0; }
      }
      const g2 = line.length && (line[line.length - 1].space || w.lead) ? spaceW : 0;
      line.push(Object.assign({}, w, { x: lw + g2 }));
      lw += g2 + w.w;
    }
    if (line.length) lines.push(line);
    return lines;
  }
  function drawLine(ctx, line, x, baseline, size, hs, colour) {
    for (const w of line) {
      if (w.glyphs) { let gx = x + w.x; for (const g of w.glyphs) gx += symbolGlyph(ctx, g, gx, baseline, size) + 1; continue; }
      ctx.save();
      ctx.font = bodyFont(size, w.style);
      ctx.fillStyle = colour;
      ctx.translate(x + w.x, baseline); ctx.scale(hs, 1);
      ctx.fillText(w.s, 0, 0);
      ctx.restore();
    }
  }

  /* ---------- FRONT ---------- */
  function renderFront(canvas, card, opt = {}) {
    const L = LAYOUT; canvas.width = L.W; canvas.height = L.H;
    const ctx = canvas.getContext('2d');
    const st = kindStyle(card);
    const isVeh = card.kind === 'vehicle';
    const distress = card.distress !== false;
    ctx.clearRect(0, 0, L.W, L.H);
    ctx.textBaseline = 'alphabetic';

    // content background
    ctx.fillStyle = '#d6d7d9'; ctx.fillRect(0, 0, L.W, L.H);
    texture(ctx, 0, L.content.y, L.W, L.content.bottom - L.content.y, 'multiply', 0.5);
    const g = ctx.createRadialGradient(375, 420, 60, 375, 420, 520);
    g.addColorStop(0, 'rgba(255,255,255,0.45)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g; ctx.fillRect(0, L.content.y, L.W, L.content.bottom - L.content.y);

    // portrait
    drawPortrait(ctx, card, opt.portraitImg);

    // top dark area + header band
    darkArea(ctx, 0, 0, L.W, L.header.darkBottom, 11);
    const hb = L.header.band, ho = L.header.outline;
    ctx.save();
    rr(ctx, ho.x, ho.y, ho.w, ho.h, [0, 0, ho.r, ho.r]);
    ctx.lineWidth = ho.lw; ctx.strokeStyle = st.band; ctx.stroke();
    ctx.restore();
    ctx.save();
    rr(ctx, hb.x, hb.y, hb.w, hb.h, [0, 0, hb.r, hb.r]);
    bandFill(ctx, st.band, 3);
    if (card.kind === 'extra') halftone(ctx, hb.x, hb.y, hb.w, hb.h, st.band);
    ctx.restore();

    // title
    const T = L.header.title;
    distressText(ctx, (card.name || '').toUpperCase(), L.W / 2, T.y, { size: T.size, colour: '#ffffff', maxW: T.maxW, distress });

    // badge
    const B = L.header.badge;
    ctx.save();
    if (opt.badgeImg) {
      // an uploaded badge brings its own ring, so it fills the whole disc
      const R2 = B.r + B.lw / 2;
      ctx.beginPath(); ctx.arc(B.cx, B.cy, R2, 0, Math.PI * 2); ctx.fillStyle = '#1b1d20'; ctx.fill();
      ctx.save(); ctx.clip();
      const im = opt.badgeImg, s = Math.max((R2 * 2) / im.width, (R2 * 2) / im.height);
      ctx.drawImage(im, B.cx - (im.width * s) / 2, B.cy - (im.height * s) / 2, im.width * s, im.height * s);
      ctx.restore();
      ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(0,0,0,0.55)'; ctx.stroke();
    } else {
      ctx.beginPath(); ctx.arc(B.cx, B.cy, B.r, 0, Math.PI * 2);
      ctx.fillStyle = '#1b1d20'; ctx.fill(); ctx.lineWidth = B.lw; ctx.strokeStyle = st.band; ctx.stroke();
      // small retro TV set
      const u = B.r / 29;
      ctx.strokeStyle = st.band; ctx.fillStyle = st.band; ctx.lineCap = 'round';
      ctx.lineWidth = 2.6 * u;
      ctx.beginPath(); ctx.moveTo(B.cx - 7 * u, B.cy - 18 * u); ctx.lineTo(B.cx, B.cy - 9 * u); ctx.lineTo(B.cx + 8 * u, B.cy - 19 * u); ctx.stroke();
      rr(ctx, B.cx - 17 * u, B.cy - 10 * u, 34 * u, 24 * u, 5 * u); ctx.fill();
      ctx.fillStyle = '#1b1d20';
      rr(ctx, B.cx - 13 * u, B.cy - 6.5 * u, 20 * u, 17 * u, 4 * u); ctx.fill();
      for (const ky of [-2, 5]) { ctx.beginPath(); ctx.arc(B.cx + 11 * u, B.cy + ky * u, 2 * u, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.restore();

    // type pill
    const P = L.header.pill;
    const label = typeLabel(card).toUpperCase();
    ctx.font = headFont(P.size);
    const pw = Math.max(P.minW, ctx.measureText(label).width + P.pad * 2);
    ctx.save();
    rr(ctx, P.cx - pw / 2, P.cy - P.h / 2, pw, P.h, P.h / 2);
    ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = P.lw; ctx.strokeStyle = st.band; ctx.stroke();
    ctx.restore();
    distressText(ctx, label, P.cx, P.cy + P.size * 0.36, { size: P.size, colour: st.accent, distress, strength: 0.6 });

    // ratings
    const RT = L.header.ratings;
    ctx.save();
    ctx.beginPath(); ctx.arc(RT.cx, RT.cy, RT.r, 0, Math.PI * 2);
    ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = RT.lw; ctx.strokeStyle = st.band; ctx.stroke();
    ctx.restore();
    const rtxt = String(card.ratings === undefined || card.ratings === null ? '' : card.ratings);
    distressText(ctx, rtxt, RT.cx, RT.cy + RT.size * 0.36, { size: RT.size, colour: st.accent, maxW: RT.r * 1.6, distress, strength: 0.6, font: L.fonts.num });
    if (card.ratingsNote) {
      distressText(ctx, String(card.ratingsNote).toUpperCase(), RT.cx, RT.noteY, { size: RT.noteSize, colour: '#ffffff', maxW: 200, distress: false, shadow: 'rgba(0,0,0,0.9)' });
    }

    // stats
    drawStats(ctx, card, distress);

    // attacks
    drawAttacks(ctx, card, st);

    // bottom dark + band
    darkArea(ctx, 0, L.content.bottom, L.W, L.H - L.content.bottom, 29);
    const BD = L.band;
    ctx.save();
    rr(ctx, BD.x, BD.y, BD.w, BD.h, BD.r);
    bandFill(ctx, st.band, 5);
    if (card.kind === 'extra') halftone(ctx, BD.x, BD.y, BD.w, BD.h, st.band);
    ctx.restore();

    // genres
    drawGenres(ctx, card);

    // health
    const H = L.health, n = Math.max(0, Math.min(10, +card.health || 0));
    let step = H.d + H.gap;
    if (n * step > 420) step = 420 / n;
    const d = Math.min(H.d, step - 3);
    for (let i = 0; i < n; i++) {
      const cx = L.W / 2 + (i - (n - 1) / 2) * step;
      ctx.beginPath(); ctx.arc(cx, H.cy, d / 2, 0, Math.PI * 2);
      ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = H.lw; ctx.strokeStyle = st.band; ctx.stroke();
    }
    distressText(ctx, 'HEALTH', L.W / 2, L.healthLabel.y, { size: L.healthLabel.size, colour: '#fff', distress, strength: 0.7 });
    return canvas;
  }

  function halftone(ctx, x, y, w, h, colour) {
    ctx.save(); ctx.clip();
    ctx.fillStyle = shade(colour, -0.25);
    for (let yy = y; yy < y + h; yy += 9) {
      for (let xx = x + w * 0.45; xx < x + w; xx += 9) {
        const t = (xx - (x + w * 0.45)) / (w * 0.55);
        const r = 0.6 + t * 2.4;
        ctx.beginPath(); ctx.arc(xx + ((yy / 9) % 2) * 4.5, yy, r, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawPortrait(ctx, card, img) {
    const L = LAYOUT.portrait;
    if (!img) return;
    const p = card.portrait || {};
    const zoom = +p.zoom || 1;
    const baseScale = LAYOUT.portrait.defaultH / img.height;
    const s = baseScale * zoom;
    const w = img.width * s, h = img.height * s;
    const cx = LAYOUT.W / 2 + (+p.x || 0), cy = L.defaultCy + (+p.y || 0);
    ctx.save();
    ctx.beginPath(); ctx.rect(L.x, L.y, L.w, L.h); ctx.clip();
    if (p.flip) { ctx.translate(cx, 0); ctx.scale(-1, 1); ctx.translate(-cx, 0); }
    ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h);
    ctx.restore();
  }

  function drawStats(ctx, card, distress) {
    const S = LAYOUT.stats;
    const isVeh = card.kind === 'vehicle';
    const defs = isVeh ? R.STATS.vehicle : R.STATS.model;
    const geo = isVeh ? S.vehicle : S.model;
    const rows = geo.rowTops.length;
    for (const side of ['left', 'right']) {
      const G = S[side];
      const list = defs.filter((d) => d.side === side);
      const top = geo.top, bottom = geo.rowTops[rows - 1] + geo.rowH + S.pad;
      ctx.save();
      rr(ctx, G.boxX, top, G.boxR - G.boxX, bottom - top, S.r);
      ctx.fillStyle = '#121619'; ctx.fill();
      ctx.restore();
      // inner light border
      ctx.save();
      const ix = side === 'left' ? G.boxX : G.cellX - 6;
      const iw = side === 'left' ? G.cellX + G.cellW + 6 - G.boxX : G.boxR - ix;
      rr(ctx, ix, geo.rowTops[0] - 6, iw, rows * geo.rowH + (rows - 1) * 4 + 12, side === 'left' ? [0, 14, 14, 0] : [14, 0, 0, 14]);
      ctx.lineWidth = 3; ctx.strokeStyle = '#c9cbcd'; ctx.stroke();
      ctx.restore();
      list.forEach((d, i) => {
        const y = geo.rowTops[i];
        // separator line
        if (i > 0) {
          ctx.fillStyle = '#c9cbcd';
          if (side === 'left') ctx.fillRect(G.boxX, y - 3, G.cellX - G.boxX, 2);
          else ctx.fillRect(G.cellX + G.cellW, y - 3, G.boxR - G.cellX - G.cellW, 2);
        }
        // value cell
        const radii = side === 'left'
          ? [0, i === 0 ? 10 : 0, i === rows - 1 ? 10 : 0, 0]
          : [i === 0 ? 10 : 0, 0, 0, i === rows - 1 ? 10 : 0];
        ctx.save();
        rr(ctx, G.cellX, y, G.cellW, geo.rowH - 2, radii);
        ctx.fillStyle = d.colour; ctx.fill();
        ctx.clip();
        texture(ctx, G.cellX, y, G.cellW, geo.rowH, 'multiply', 0.25);
        ctx.restore();
        const val = String(((card.stats || {})[d.key] ?? ''));
        distressText(ctx, val, G.cellX + G.cellW / 2, y + geo.rowH / 2 + S.valueSize * 0.36, { size: S.valueSize, colour: '#fff', maxW: G.cellW - 8, distress, strength: 0.5, shadow: 'rgba(0,0,0,0.55)', font: LAYOUT.fonts.num });
        distressText(ctx, d.label.toUpperCase(), G.labelX, y + geo.rowH / 2 + S.labelSize * 0.36, { size: S.labelSize, colour: '#d9dadb', align: side === 'left' ? 'right' : 'left', distress, strength: 0.9 });
      });
    }
  }

  function attackRows(ctx, card, size) {
    const T = LAYOUT.table, hs = LAYOUT.bodyHScale;
    size = size || T.textSize;
    return (card.attacks || []).map((a) => {
      const nameRuns = [{ t: 'text', s: a.name || '', style: 'reg' }];
      const nameWords = wordsOf(ctx, nameRuns, size, hs);
      const nameLines = wrapWords(ctx, nameWords, T.cols.nameW, size, hs);
      const effWords = wordsOf(ctx, [{ t: 'text', s: a.effect || '', style: 'reg' }], size, hs);
      const effLines = wrapWords(ctx, effWords, T.cols.effectW, size, hs);
      const lines = Math.max(nameLines.length + (a.or ? 0 : 0), effLines.length, 1);
      return { a, nameLines, effLines, lines };
    });
  }

  function drawAttacks(ctx, card, st) {
    const L = LAYOUT, T = L.table, hs = L.bodyHScale;
    const attacks = card.attacks || [];
    if (!attacks.length) return;
    const isVeh = card.kind === 'vehicle';
    const bottomLimit = isVeh ? L.stats.vehicle.top - 14 : T.bottom;
    const maxAvail = bottomLimit - (isVeh ? 160 : T.minHeaderY) - T.headerH;
    // text size: the full size, or the largest size down to 80% whose re-wrapped rows fit
    let size = T.textSize, rows, total;
    const rowH = (r) => Math.max(T.minRowH, r.lines * T.lineH * (size / T.textSize) + T.rowPad);
    for (;;) {
      rows = attackRows(ctx, card, size);
      total = rows.reduce((s, r) => s + rowH(r), 0);
      if (total <= maxAvail || size <= T.textSize * 0.8) break;
      size = Math.max(T.textSize * 0.8, size - 0.5);
    }
    let headerY = T.headerY;
    if (headerY + T.headerH + total > bottomLimit) headerY = Math.max(isVeh ? 160 : T.minHeaderY, bottomLimit - T.headerH - total);
    if (isVeh) headerY = Math.max(160, bottomLimit - T.headerH - total);
    let squeeze = 1;
    const avail = bottomLimit - headerY - T.headerH;
    if (total > avail) squeeze = avail / total;
    ctx.canvas.dataset.tableText = (size / T.textSize).toFixed(2);
    ctx.canvas.dataset.tableSqueeze = squeeze.toFixed(2);
    ctx.canvas.dataset.tableTop = String(Math.round(headerY));

    // header
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 3;
    rr(ctx, T.x, headerY, T.w, T.headerH + total * squeeze, [T.r, T.r, 0, 0]);
    ctx.fillStyle = '#fff'; ctx.fill();
    ctx.restore();
    ctx.save();
    rr(ctx, T.x, headerY, T.w, T.headerH, [T.r, T.r, 0, 0]);
    ctx.fillStyle = '#121619'; ctx.fill();
    ctx.restore();
    const hy = headerY + T.headerH / 2 + T.headerSize * 0.36;
    const hdr = (t, x, align) => distressText(ctx, t, x, hy, { size: T.headerSize, colour: '#fff', align, distress: false });
    hdr('ATTACK', T.cols.name, 'left');
    hdr('RANGE', T.cols.range, 'center');
    hdr('STRIKE', T.cols.strikeX + T.cols.strikeW / 2, 'center');
    hdr('WEAPON EFFECT', T.cols.effect + 2, 'left');

    let y = headerY + T.headerH;
    rows.forEach((r, i) => {
      const h = rowH(r) * squeeze;
      ctx.fillStyle = i % 2 === 0 ? '#ffffff' : '#e2e3e5';
      ctx.fillRect(T.x, y, T.w, h);
      // strike column
      ctx.fillStyle = '#353536';
      ctx.fillRect(T.cols.strikeX, y, T.cols.strikeW, h);
      const cy = y + h / 2;
      attackIcon(ctx, r.a.type, T.cols.icon, cy, T.iconR * Math.min(1, squeeze + 0.1));
      const lh = T.lineH * (size / T.textSize);
      // name
      const nlines = r.nameLines;
      let by = cy - ((nlines.length - 1) * lh) / 2 + size * 0.34;
      nlines.forEach((ln, k) => {
        drawLine(ctx, ln, T.cols.name, by + k * lh, size, hs, '#231f20');
      });
      if (r.a.or) {
        const last = nlines[nlines.length - 1] || [];
        const lw = last.length ? last[last.length - 1].x + last[last.length - 1].w : 0;
        ctx.save(); ctx.font = bodyFont(size, 'bold'); ctx.fillStyle = '#1475bc';
        ctx.translate(T.cols.name + lw + 6, by + (nlines.length - 1) * lh); ctx.scale(hs, 1); ctx.fillText('OR', 0, 0); ctx.restore();
      }
      // range
      ctx.save(); ctx.font = bodyFont(size, 'reg'); ctx.fillStyle = '#231f20'; ctx.textAlign = 'center';
      ctx.translate(T.cols.range, cy + size * 0.34); ctx.scale(hs, 1); ctx.fillText(r.a.range || '', 0, 0); ctx.restore();
      // strike
      distressText(ctx, strikeValue(card, r.a), T.cols.strikeX + T.cols.strikeW / 2, cy + T.strikeSize * 0.36 * Math.min(1, squeeze + 0.15), { size: T.strikeSize * Math.min(1, squeeze + 0.15), colour: '#fff', distress: card.distress !== false, strength: 0.4, font: L.fonts.num });
      // effect
      const el = r.effLines;
      let ey = cy - ((el.length - 1) * lh) / 2 + size * 0.34;
      el.forEach((ln, k) => drawLine(ctx, ln, T.cols.effect, ey + k * lh, size, hs, '#231f20'));
      // row divider
      ctx.fillStyle = 'rgba(0,0,0,0.08)'; ctx.fillRect(T.x, y + h - 1, T.w, 1);
      y += h;
    });
  }

  function drawGenres(ctx, card) {
    const G = LAYOUT.genres;
    const set = R.GENRE_SETS[card.genreSet] || R.GENRE_SETS.core;
    const active = new Set(card.genres || []);
    set.genres.forEach((gd, i) => {
      const img = assets.img['g_' + set.id + '_' + gd.key];
      if (!img) return;
      ctx.save();
      ctx.globalAlpha = active.has(i) ? 1 : G.offAlpha;
      const sz = G.size * ((G.scale && G.scale[set.id]) || 1);
      ctx.drawImage(img, G.xs[i] - sz / 2, G.cy - sz / 2, sz, sz);
      ctx.restore();
    });
  }

  /* ---------- BACK ---------- */
  /* Each star quality or special effect is one block (name lines plus description) that is never split
     across the two columns. Headings stay with the first block under them. */
  function buildBackBlocks(ctx, card, scale) {
    const B = LAYOUT.back, hs = LAYOUT.bodyHScale;
    const size = B.textSize * scale, lh = B.lineH * scale;
    const sections = [];
    (card.back || []).forEach((sec, si) => {
      const entries = (sec.entries || []).filter((e) => (e.name || e.desc));
      if (!entries.length && !sec.title) return;
      const head = sec.title ? { text: sec.title.toUpperCase(), h: B.headSize * scale, before: si === 0 ? 0 : B.headBefore * scale, after: B.headAfter * scale } : null;
      const blocks = entries.map((e) => {
        const nameRuns = parseRich(e.name || '', 'bold');
        symbolsFor(e).forEach((g) => nameRuns.push({ t: 'glyph', g }));
        const lines = wrapWords(ctx, wordsOf(ctx, nameRuns, size, hs), B.colW, size, hs);
        if (e.desc) lines.push(...wrapWords(ctx, wordsOf(ctx, parseRich(e.desc, 'reg'), size, hs), B.colW, size, hs));
        return { lines, h: lines.length * lh };
      });
      // the star quality keeps its place; special effects and other sections may be reordered to fit
      sections.push({ head, blocks, movable: !/star qualit/i.test(sec.title || '') && blocks.length > 1 });
    });
    return { sections, size, lh, entryBefore: B.entryBefore * scale };
  }

  /* place the sections in the given block order; null if anything would be split or overflow */
  function placeBack(built, orders, loose) {
    const B = LAYOUT.back, colH = B.bottom - B.top, lh = built.lh;
    const placed = []; let col = 0, y = B.top, afterHead = false;
    // loose: last resort when nothing fits, run text on line by line and let the last column overflow
    const nextCol = () => { if (loose && col === B.cols.length - 1) return true; col++; y = B.top; return col < B.cols.length; };
    for (let si = 0; si < built.sections.length; si++) {
      const sec = built.sections[si], blocks = orders[si].map((i) => sec.blocks[i]);
      if (sec.head) {
        const before = y === B.top ? 0 : sec.head.before;
        const need = before + sec.head.h + sec.head.after + (blocks[0] ? blocks[0].h : 0);
        if (y + need > B.bottom && y > B.top && !nextCol()) return null;
        y += y === B.top ? 0 : before;
        placed.push({ kind: 'head', text: sec.head.text, h: sec.head.h, col, y });
        y += sec.head.h + sec.head.after; afterHead = true;
      }
      for (const b of blocks) {
        let before = y === B.top || afterHead ? 0 : built.entryBefore;
        if (y + before + b.h > B.bottom) {
          if (b.h > colH || loose) {
            // taller than a whole column: the only case where a block may run on
            if (!loose && y > B.top && !nextCol()) return null;
            for (const ln of b.lines) {
              if (y + lh > B.bottom && !nextCol()) return null;
              placed.push({ kind: 'line', line: ln, col, y }); y += lh;
            }
            afterHead = false; continue;
          }
          if (!nextCol()) return null;
          before = 0;
        }
        y += before;
        for (const ln of b.lines) { placed.push({ kind: 'line', line: ln, col, y }); y += lh; }
        afterHead = false;
      }
    }
    return placed;
  }

  function permutations(n, cap) {
    const out = [], a = [...Array(n).keys()];
    const walk = (k) => {
      if (out.length >= cap) return;
      if (k === n) { out.push(a.slice()); return; }
      for (let i = k; i < n; i++) { [a[k], a[i]] = [a[i], a[k]]; walk(k + 1); [a[k], a[i]] = [a[i], a[k]]; }
    };
    walk(0);
    return out;
  }
  /* try the printed order first, then other orders of the movable sections, until nothing is split */
  function layoutBack(built) {
    const opts = built.sections.map((s) => (s.movable ? permutations(s.blocks.length, 720) : [[...s.blocks.keys()]]));
    let tries = 0;
    const pick = (si, chosen) => {
      if (si === opts.length) { tries++; return placeBack(built, chosen); }
      for (const o of opts[si]) {
        const r = pick(si + 1, chosen.concat([o]));
        if (r || tries > 4000) return r;
      }
      return null;
    };
    return pick(0, []);
  }

  let lastBack = null; // layout of the last back rendered, for tests
  function renderBack(canvas, card) {
    const L = LAYOUT, B = L.back; canvas.width = L.W; canvas.height = L.H;
    const ctx = canvas.getContext('2d');
    const st = kindStyle(card);
    ctx.clearRect(0, 0, L.W, L.H);
    ctx.fillStyle = '#d4d4d5'; ctx.fillRect(0, 0, L.W, L.H);
    texture(ctx, 0, B.topDark, L.W, B.bottomDark - B.topDark, 'multiply', 0.12);
    // grunge edges top and bottom of the content
    edgeGrunge(ctx, B.topDark, 1, 17);
    edgeGrunge(ctx, B.bottomDark, -1, 23);
    darkArea(ctx, 0, 0, L.W, B.topDark, 41);
    darkArea(ctx, 0, B.bottomDark, L.W, L.H - B.bottomDark, 43);
    ctx.save();
    rr(ctx, B.outline.x, B.outline.y, B.outline.w, B.outline.h, [0, 0, B.outline.r, B.outline.r]);
    ctx.lineWidth = B.outline.lw; ctx.strokeStyle = st.band; ctx.stroke();
    ctx.restore();
    ctx.save();
    rr(ctx, B.band.x, B.band.y, B.band.w, B.band.h, [0, 0, B.band.r, B.band.r]);
    bandFill(ctx, st.band, 9);
    ctx.restore();

    let scale = card.backScale ? +card.backScale : 1;
    let built, placed;
    for (let tries = 0; tries < 60; tries++) {
      built = buildBackBlocks(ctx, card, scale);
      placed = layoutBack(built);
      if (placed || scale <= B.minScale) break;
      scale -= 0.02;
    }
    if (!placed) placed = placeBack(built, built.sections.map((sec) => [...sec.blocks.keys()]), true);
    const hs = L.bodyHScale;
    for (const p of placed) {
      const x = B.cols[p.col];
      if (p.kind === 'head') {
        distressText(ctx, p.text, x, p.y + p.h * 0.86, { size: B.headSize * scale, colour: st.heading, align: 'left', distress: card.distress !== false, strength: 0.8 });
      } else {
        drawLine(ctx, p.line, x, p.y + built.lh * 0.78, built.size, hs, '#231f20');
      }
    }
    canvas.dataset.backScale = scale.toFixed(2);
    lastBack = { placed, scale };
    return canvas;
  }

  function edgeGrunge(ctx, y, dir, seed) {
    const rand = rng(seed);
    ctx.save();
    ctx.fillStyle = 'rgba(160,160,160,0.55)';
    for (let i = 0; i < 900; i++) {
      const x = rand() * LAYOUT.W;
      const d = Math.pow(rand(), 3) * 70;
      ctx.fillRect(x, y + dir * d, 1 + rand() * 3, 1 + rand() * 2);
    }
    ctx.restore();
  }

  window.CardRender = { lastBackLayout: () => lastBack, LAYOUT, loadAssets, renderFront, renderBack, strikeValue, typeLabel, parseRich, kindStyle, assets,
    helpers: { rr, headFont, bodyFont, distressText, texture, wordsOf, wrapWords, drawLine, symbolGlyph, rng, shade } };
})();
