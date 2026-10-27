/* Prop (blue) and Maguffin (yellow) cards at 750 x 1040 px, the same 63.5 x 88 mm size as the profile cards.
   Layout measured from the printed cards. Prop backs share one image for every Prop card; a Maguffin
   shows its own image on both faces. Uses CardRender's text and texture helpers. */
(function () {
  const W = 750, H = 1040;
  const P = { x: 42, y: 44, w: 666, h: 958, r: 30 }; // inner panel inside the black frame
  const LINE = 7;
  const STYLE = {
    prop: {
      headA: '#4a7fb3', headB: '#6aa6d6', dots: '#152331', image: '#93c1dd', row: '#70b1d5', text: '#93c1dd',
      band: '#5a8cc2', bandB: '#4877a8', word: 'PROP', wordColour: '#a6cbe8',
      front: { header: 86, imageEnd: 579, rowH: 66 }
    },
    maguffin: {
      headA: '#e2a62c', headB: '#f3c42a', dots: '#2f2612', image: '#f4dd40', row: '#f2de4e', text: '#f1d63e',
      band: '#f1d53a', bandB: '#e4c12d', word: 'MAGUFFIN', wordColour: '#2b2619',
      front: { header: 86, imageEnd: 437, rowH: 64 }
    }
  };
  const ACTION_LABEL = { F: 'F', S: 'S', P: 'P' };

  const H_ = () => window.CardRender.helpers;
  const style = (card) => STYLE[card.deck] || STYLE.prop;

  function frame(ctx) {
    const h = H_();
    ctx.fillStyle = '#000000'; ctx.fillRect(0, 0, W, H);
    h.texture(ctx, 0, 0, W, H, 'screen', 0.12);
  }
  function panelClip(ctx) { H_().rr(ctx, P.x, P.y, P.w, P.h, P.r); }

  /* comic-style halftone: dots grow towards one corner */
  function halftone(ctx, x, y, w, h, colour, fromX, opts = {}) {
    const step = opts.step || 7, max = opts.max || 3.6, diag = opts.diag || 0;
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    ctx.fillStyle = colour;
    for (let row = 0, yy = y; yy < y + h + step; yy += step * 0.866, row++) {
      for (let xx = x + (row % 2 ? step / 2 : 0); xx < x + w + step; xx += step) {
        let t = (xx - fromX) / (x + w - fromX);
        if (diag) t = t * 0.7 + ((yy - y) / h) * diag;
        if (t <= 0) continue;
        const r = Math.min(max, max * t * 1.15);
        if (r < 0.35) continue;
        ctx.beginPath(); ctx.arc(xx, yy, r, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.restore();
  }

  function header(ctx, card, s, height, title) {
    const h = H_(), y0 = P.y;
    ctx.save(); panelClip(ctx); ctx.clip();
    const g = ctx.createLinearGradient(P.x, 0, P.x + P.w, 0);
    g.addColorStop(0, s.headA); g.addColorStop(0.55, s.headB); g.addColorStop(1, s.headB);
    ctx.fillStyle = g; ctx.fillRect(P.x, y0, P.w, height);
    halftone(ctx, P.x, y0, P.w, height, s.dots, P.x + P.w * 0.5, { step: 7, max: 3.4 });
    h.texture(ctx, P.x, y0, P.w, height, 'multiply', 0.18);
    ctx.restore();
    if (title) h.distressText(ctx, (card.name || '').toUpperCase(), W / 2, y0 + height * 0.82, { size: 84, colour: '#ffffff', maxW: P.w - 70, strength: 0.6 });
    ctx.fillStyle = '#141312'; ctx.fillRect(P.x, y0 + height, P.w, LINE);
    return y0 + height + LINE;
  }

  function area(ctx, y, h, colour) {
    const hp = H_();
    ctx.save(); panelClip(ctx); ctx.clip();
    ctx.fillStyle = colour; ctx.fillRect(P.x, y, P.w, h);
    hp.texture(ctx, P.x, y, P.w, h, 'multiply', 0.16);
    ctx.restore();
  }
  function rule(ctx, y) { ctx.fillStyle = '#141312'; ctx.fillRect(P.x, y, P.w, LINE); return y + LINE; }

  /* the uploaded image, fitted inside a box, then zoomed and nudged */
  function drawImage(ctx, img, box, im) {
    if (!img) return;
    const z = (im && +im.zoom) || 1, ox = (im && +im.x) || 0, oy = (im && +im.y) || 0;
    const s = Math.min(box.w / img.width, box.h / img.height) * z;
    const w = img.width * s, h = img.height * s;
    ctx.save(); ctx.beginPath(); ctx.rect(box.x, box.y, box.w, box.h); ctx.clip();
    if (im && im.flip) { ctx.translate(box.x + box.w / 2 + ox, 0); ctx.scale(-1, 1); ctx.translate(-(box.x + box.w / 2 + ox), 0); }
    ctx.drawImage(img, box.x + (box.w - w) / 2 + ox, box.y + (box.h - h) / 2 + oy, w, h);
    ctx.restore();
  }
  function placeholder(ctx, box, colour) {
    ctx.save();
    ctx.strokeStyle = colour; ctx.globalAlpha = 0.5; ctx.lineWidth = 4; ctx.setLineDash([14, 10]);
    H_().rr(ctx, box.x + 40, box.y + 30, box.w - 80, box.h - 60, 18); ctx.stroke();
    ctx.setLineDash([]); ctx.globalAlpha = 0.6; ctx.fillStyle = colour;
    ctx.font = H_().headFont(44); ctx.textAlign = 'center'; ctx.fillText('ADD AN IMAGE', box.x + box.w / 2, box.y + box.h / 2 + 15);
    ctx.restore();
  }

  function rowText(ctx, label, rest, y, rowH) {
    const h = H_(), size = 43, base = y + rowH / 2 + size * 0.33, x = P.x + 34;
    const runs = [{ t: 'text', s: label + ' ', style: 'bold' }, ...window.CardRender.parseRich(rest, 'bold')];
    const words = h.wordsOf(ctx, runs, size, 1);
    const lines = h.wrapWords(ctx, words, P.w - 68, size, 1);
    h.drawLine(ctx, lines[0] || [], x, base, size, 1, '#16191b');
  }

  /* text block: optional bold flavour paragraph, then rules text; shrinks to fit */
  function textBlock(ctx, card, top, bottom, effectLabel) {
    const h = H_(), x = P.x + 34, width = P.w - 68;
    const paras = [];
    if (card.flavour) paras.push(window.CardRender.parseRich(card.flavour, 'bold'));
    const rules = window.CardRender.parseRich(card.effect || '', 'reg');
    if (effectLabel && (card.effect || '').trim()) rules.unshift({ t: 'text', s: 'EFFECT: ', style: 'bold' });
    if ((card.effect || '').trim() || !paras.length) paras.push(rules);
    for (let size = 40; size >= 22; size -= 1) {
      const lh = size * 1.2, gap = size * 0.32;
      const laid = paras.map((runs) => h.wrapWords(ctx, h.wordsOf(ctx, runs, size, 1), width, size, 1));
      const total = laid.reduce((t, ls) => t + ls.length * lh, 0) + gap * (laid.length - 1);
      if (top + 22 + total <= bottom - 24 || size === 22) {
        let y = top + 22 + size * 0.92;
        laid.forEach((ls, i) => { for (const ln of ls) { h.drawLine(ctx, ln, x, y, size, 1, '#16191b'); y += lh; } y += gap; });
        return;
      }
    }
  }

  function costText(card) {
    const n = Math.max(0, Math.min(5, +card.cost || 0));
    return n ? '{PP}'.repeat(n) : 'None';
  }
  function playText(card) {
    const when = (card.play || "Model's Activation").trim();
    return card.action && ACTION_LABEL[card.action] ? `${when}, {${card.action}}` : when;
  }

  function renderFront(canvas, card, opt = {}) {
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d'), s = style(card), F = s.front;
    frame(ctx);
    let y = header(ctx, card, s, F.header, true);
    const imgBox = { x: P.x, y, w: P.w, h: F.imageEnd - y };
    area(ctx, imgBox.y, imgBox.h, s.image);
    if (opt.img) drawImage(ctx, opt.img, { x: imgBox.x + 24, y: imgBox.y + 14, w: imgBox.w - 48, h: imgBox.h - 28 }, card.image);
    else placeholder(ctx, imgBox, s.dots);
    y = rule(ctx, F.imageEnd);
    area(ctx, y, F.rowH, s.row); rowText(ctx, 'PLAY:', playText(card), y, F.rowH);
    y = rule(ctx, y + F.rowH);
    area(ctx, y, F.rowH, s.row); rowText(ctx, 'COST:', costText(card), y, F.rowH);
    y = rule(ctx, y + F.rowH);
    area(ctx, y, P.y + P.h - y, s.text);
    textBlock(ctx, card, y, P.y + P.h, card.deck !== 'maguffin');
  }

  function badge(ctx, cx, cy, r, badgeImg) {
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = '#1b1d20'; ctx.fill();
    if (badgeImg) {
      ctx.save(); ctx.clip();
      const s = Math.max((r * 2) / badgeImg.width, (r * 2) / badgeImg.height);
      ctx.drawImage(badgeImg, cx - (badgeImg.width * s) / 2, cy - (badgeImg.height * s) / 2, badgeImg.width * s, badgeImg.height * s);
      ctx.restore();
    } else {
      // small TV set, as on the profile cards without an uploaded badge
      const u = r / 29, rr = H_().rr;
      ctx.strokeStyle = '#fff'; ctx.fillStyle = '#fff'; ctx.lineCap = 'round'; ctx.lineWidth = 2.6 * u;
      ctx.beginPath(); ctx.moveTo(cx - 7 * u, cy - 18 * u); ctx.lineTo(cx, cy - 9 * u); ctx.lineTo(cx + 8 * u, cy - 19 * u); ctx.stroke();
      rr(ctx, cx - 17 * u, cy - 10 * u, 34 * u, 24 * u, 5 * u); ctx.fill();
      ctx.fillStyle = '#1b1d20'; rr(ctx, cx - 13 * u, cy - 6.5 * u, 20 * u, 17 * u, 4 * u); ctx.fill();
      for (const ky of [-2, 5]) { ctx.beginPath(); ctx.arc(cx + 11 * u, cy + ky * u, 2 * u, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.restore();
  }

  function bottomBand(ctx, s, y) {
    const h = H_(), bh = P.y + P.h - y;
    ctx.save(); panelClip(ctx); ctx.clip();
    const g = ctx.createLinearGradient(0, y, 0, y + bh); g.addColorStop(0, s.band); g.addColorStop(1, s.bandB);
    ctx.fillStyle = g; ctx.fillRect(P.x, y, P.w, bh);
    halftone(ctx, P.x, y, P.w, bh, s.dots, P.x + P.w * 0.42, { step: 7, max: 3.4, diag: 0.45 });
    h.texture(ctx, P.x, y, P.w, bh, 'multiply', 0.18);
    ctx.restore();
    h.distressText(ctx, s.word, P.x + 22, y + bh * 0.83, { size: 128, colour: s.wordColour, align: 'left', strength: 0.8 });
  }

  function renderBack(canvas, card, opt = {}) {
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d'), s = style(card);
    frame(ctx);
    const isMag = card.deck === 'maguffin';
    let y = header(ctx, card, s, isMag ? 84 : 81, isMag);
    const bandTop = isMag ? 865 : 861, artEnd = bandTop - LINE;
    const art = { x: P.x, y, w: P.w, h: artEnd - y };
    if (isMag) {
      area(ctx, art.y, art.h, s.image);
      if (opt.img) drawImage(ctx, opt.img, { x: art.x + 30, y: art.y + 40, w: art.w - 60, h: art.h - 80 }, card.image);
      else placeholder(ctx, art, s.dots);
    } else {
      ctx.save(); ctx.beginPath(); ctx.rect(art.x, art.y, art.w, art.h); ctx.clip();
      if (opt.backImg) {
        const im = opt.backImg, sc = Math.max(art.w / im.width, art.h / im.height);
        ctx.drawImage(im, art.x + (art.w - im.width * sc) / 2, art.y + (art.h - im.height * sc) / 2, im.width * sc, im.height * sc);
      } else defaultPropArt(ctx, art);
      ctx.restore();
    }
    rule(ctx, artEnd);
    bottomBand(ctx, s, bandTop);
    if (isMag) badge(ctx, 632, 861, 50, opt.badgeImg); else badge(ctx, 652, 822, 48, opt.badgeImg);
  }

  /* drawn stand-in for the Prop back art: a prop store at night under a spotlight */
  function defaultPropArt(ctx, a) {
    const h = H_();
    const g = ctx.createRadialGradient(a.x + a.w * 0.5, a.y + a.h * 0.35, 30, a.x + a.w * 0.5, a.y + a.h * 0.45, a.h * 0.75);
    g.addColorStop(0, '#5f8fbf'); g.addColorStop(0.55, '#24456b'); g.addColorStop(1, '#0d1a2a');
    ctx.fillStyle = g; ctx.fillRect(a.x, a.y, a.w, a.h);
    // shelving silhouettes
    ctx.fillStyle = 'rgba(8,16,26,0.55)';
    for (let i = 0; i < 5; i++) ctx.fillRect(a.x, a.y + 70 + i * 95, a.w, 10);
    const rand = h.rng(11);
    for (let i = 0; i < 5; i++) for (let j = 0; j < 7; j++) {
      const bw = 40 + rand() * 50, bh = 30 + rand() * 50;
      ctx.fillStyle = `rgba(10,20,34,${0.35 + rand() * 0.3})`;
      ctx.fillRect(a.x + 10 + j * 95 + rand() * 20, a.y + 70 + i * 95 - bh, bw, bh);
    }
    halftone(ctx, a.x, a.y, a.w, a.h, 'rgba(10,20,32,0.55)', a.x + a.w * 0.15, { step: 9, max: 3.2, diag: 0.6 });
    // a crate stencilled PROPS in the foreground
    const cx = a.x + a.w * 0.5, cy = a.y + a.h * 0.62;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.04);
    ctx.fillStyle = '#7a5a36'; ctx.fillRect(-170, -110, 340, 220);
    ctx.strokeStyle = '#4b3520'; ctx.lineWidth = 10; ctx.strokeRect(-170, -110, 340, 220);
    ctx.beginPath(); ctx.moveTo(-170, -110); ctx.lineTo(170, 110); ctx.moveTo(170, -110); ctx.lineTo(-170, 110); ctx.globalAlpha = 0.35; ctx.stroke(); ctx.globalAlpha = 1;
    h.distressText(ctx, 'PROPS', 0, 36, { size: 110, colour: 'rgba(25,18,10,0.85)', strength: 1.2 });
    ctx.restore();
    h.texture(ctx, a.x, a.y, a.w, a.h, 'multiply', 0.25);
  }

  window.PropRender = { W, H, renderFront, renderBack, STYLE };
})();
