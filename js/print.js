/* Print sheets, 63.5 x 88 mm cards. Two layouts:
   fold  - front beside back on a landscape page, four fold-over cards (eight faces) per sheet. Cut round
           each pair, fold down the middle, glue or sleeve.
   grid  - nine cards per portrait page, with optional mirrored back pages for double-sided printing. */
(function () {
  const CW = 63.5, CH = 88;
  const PAPER = { a4: [210, 297], letter: [215.9, 279.4] };

  function slots(cards, qty) {
    const out = [];
    for (const c of cards) for (let i = 0; i < (qty[c.id] || 1); i++) out.push(c);
    return out;
  }

  /* layout: page size, cards per page, and where each face of slot i goes */
  function layout(opts) {
    const [w, h] = PAPER[opts.paper] || PAPER.a4;
    const g = opts.gap || 0;
    if (opts.layout === 'fold') {
      const pw = h, ph = w; // landscape
      const cols = 2, rows = 2, pairW = 2 * CW;
      const gw = cols * pairW + (cols - 1) * g, gh = rows * CH + (rows - 1) * g;
      const x0 = (pw - gw) / 2, y0 = (ph - gh) / 2;
      const at = (i) => { const r = Math.floor(i / cols), c = i % cols; return { x: x0 + c * (pairW + g), y: y0 + r * (CH + g) }; };
      return {
        pw, ph, per: cols * rows, orientation: 'landscape', sides: ['both'],
        faces: (i) => { const p = at(i); return [{ side: 'front', x: p.x, y: p.y }, { side: 'back', x: p.x + CW, y: p.y }]; },
        cutsX: [...Array(cols).keys()].flatMap((c) => [x0 + c * (pairW + g), x0 + c * (pairW + g) + pairW]),
        foldsX: [...Array(cols).keys()].map((c) => x0 + c * (pairW + g) + CW),
        cutsY: [...Array(rows).keys()].flatMap((r) => [y0 + r * (CH + g), y0 + r * (CH + g) + CH]),
        box: { left: x0, top: y0, right: x0 + gw, bottom: y0 + gh }
      };
    }
    const pw = w, ph = h, gw = 3 * CW + 2 * g, gh = 3 * CH + 2 * g;
    const x0 = (pw - gw) / 2, y0 = (ph - gh) / 2;
    const at = (i, mirror) => { const r = Math.floor(i / 3); let c = i % 3; if (mirror) c = 2 - c; return { x: x0 + c * (CW + g), y: y0 + r * (CH + g) }; };
    return {
      pw, ph, per: 9, orientation: 'portrait', sides: opts.backs ? ['front', 'back'] : ['front'],
      faces: (i, sheetSide) => { const p = at(i, sheetSide === 'back'); return [{ side: sheetSide, x: p.x, y: p.y }]; },
      cutsX: [0, 1, 2].flatMap((c) => [x0 + c * (CW + g), x0 + c * (CW + g) + CW]),
      foldsX: [],
      cutsY: [0, 1, 2].flatMap((r) => [y0 + r * (CH + g), y0 + r * (CH + g) + CH]),
      box: { left: x0, top: y0, right: x0 + gw, bottom: y0 + gh }
    };
  }
  function pages(list, per) { const p = []; for (let i = 0; i < list.length; i += per) p.push(list.slice(i, i + per)); return p; }
  const uniq = (xs) => [...new Set(xs.map((v) => v.toFixed(2)))].map(Number);

  async function images(cards, render, type) {
    const map = new Map();
    for (const c of cards) if (!map.has(c.id)) map.set(c.id, await render(c, 1, type));
    return map;
  }

  async function preview(el, cards, qty, opts, render) {
    el.innerHTML = '';
    if (!cards.length) return;
    const L = layout(opts), k = opts.layout === 'fold' ? 2.6 : 2.2; // px per mm on screen
    const imgs = new Map();
    for (const c of cards) if (!imgs.has(c.id)) imgs.set(c.id, await render(c, 0.35));
    for (const pg of pages(slots(cards, qty), L.per)) {
      for (const sheetSide of L.sides) {
        const sh = document.createElement('div'); sh.className = 'sheet';
        sh.style.width = L.pw * k + 'px'; sh.style.height = L.ph * k + 'px';
        sh.title = sheetSide === 'both' ? 'Fold-over: cut round each pair, then fold down the dotted line' : sheetSide === 'front' ? 'Fronts' : 'Backs (mirrored for double-sided printing)';
        pg.forEach((c, i) => {
          for (const f of L.faces(i, sheetSide)) {
            const im = document.createElement('img'); im.src = imgs.get(c.id)[f.side];
            Object.assign(im.style, { left: f.x * k + 'px', top: f.y * k + 'px', width: CW * k + 'px', height: CH * k + 'px' });
            sh.appendChild(im);
          }
        });
        if (opts.marks) previewMarks(sh, L, k);
        el.appendChild(sh);
      }
    }
  }

  /* Marks sit only in the margin round the card block, never on a card: they start MARK_GAP mm out
     from the cards, so a cut that wanders slightly still leaves no line on the card. */
  const MARK_GAP = 3, MARK_LEN = 4;
  function markLines(L) {
    const { left, top, right, bottom } = L.box, a = MARK_GAP, b = MARK_GAP + MARK_LEN;
    const out = [];
    for (const x of uniq(L.cutsX)) out.push({ x1: x, y1: top - b, x2: x, y2: top - a }, { x1: x, y1: bottom + a, x2: x, y2: bottom + b });
    for (const y of uniq(L.cutsY)) out.push({ x1: left - b, y1: y, x2: left - a, y2: y }, { x1: right + a, y1: y, x2: right + b, y2: y });
    for (const x of uniq(L.foldsX)) out.push({ x1: x, y1: top - b, x2: x, y2: top - a, fold: true }, { x1: x, y1: bottom + a, x2: x, y2: bottom + b, fold: true });
    return out;
  }
  function marks(doc, L) {
    const { top, bottom } = L.box, lines = markLines(L);
    doc.setLineWidth(0.2);
    for (const m of lines) {
      if (m.fold) { doc.setDrawColor(120); doc.setLineDashPattern([1, 1], 0); } else { doc.setDrawColor(0); doc.setLineDashPattern([], 0); }
      doc.line(m.x1, m.y1, m.x2, m.y2);
    }
    doc.setLineDashPattern([], 0);
    if (!L.foldsX.length) return;
    const ty = top - MARK_GAP - MARK_LEN - 1.2, by = bottom + MARK_GAP + MARK_LEN + 2.6;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(6); doc.setTextColor(110);
    for (const x of uniq(L.foldsX)) { doc.text('FOLD', x, ty, { align: 'center' }); doc.text('FOLD', x, by, { align: 'center' }); }
    for (const x of uniq(L.cutsX)) doc.text('CUT', x, ty, { align: 'center' });
    doc.setTextColor(0);
  }
  function previewMarks(sh, L, k) {
    for (const m of markLines(L)) {
      const d = document.createElement('div'); d.className = 'crop-mark' + (m.fold ? ' fold' : '');
      const vert = m.x1 === m.x2;
      Object.assign(d.style, vert
        ? { left: m.x1 * k + 'px', top: Math.min(m.y1, m.y2) * k + 'px', height: Math.abs(m.y2 - m.y1) * k + 'px' }
        : { top: m.y1 * k + 'px', left: Math.min(m.x1, m.x2) * k + 'px', width: Math.abs(m.x2 - m.x1) * k + 'px' });
      d.classList.add(vert ? 'v' : 'h');
      sh.appendChild(d);
    }
  }

  async function pdf(cards, qty, opts, render) {
    const { jsPDF } = window.jspdf;
    const L = layout(opts);
    const doc = new jsPDF({ unit: 'mm', format: opts.paper === 'letter' ? 'letter' : 'a4', orientation: L.orientation });
    const imgs = await images(cards, render, 'image/jpeg');
    let first = true;
    for (const pg of pages(slots(cards, qty), L.per)) {
      for (const sheetSide of L.sides) {
        if (!first) doc.addPage(); first = false;
        pg.forEach((c, i) => {
          for (const f of L.faces(i, sheetSide)) doc.addImage(imgs.get(c.id)[f.side], 'JPEG', f.x, f.y, CW, CH, c.id + f.side, 'FAST');
        });
        if (opts.marks) marks(doc, L);
      }
    }
    doc.save(opts.layout === 'fold' ? '7tv-cards-fold.pdf' : '7tv-cards.pdf');
  }

  window.PrintSheet = { preview, pdf, layout, markLines };
})();
