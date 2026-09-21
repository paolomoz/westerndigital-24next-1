/**
 * accordion — FAQ accordion (D11 collection `accordion`); variant `faq` = the solutions FAQ panel.
 *
 * Schema: stardust/eds-schema/solutions.json § faq (DIV.accordion-text × 10; interactive button /
 * aria-expanded / aria-controls).
 * Authoring: the section h2 is DEFAULT CONTENT before the block — REABSORBED here because on the
 *   source the
 *   title lives INSIDE the grey panel (the panel's left column): the wrapper's children MOVE into
 *   .head
 *   and the emptied wrapper goes (EW8, § Section heads). One row per Q/A: [question <p> | answer —
 *   one or
 *   more <p> with inline links]. A leading single-cell row is treated as an in-table head (decode
 *   fallback).
 * EW7: the question moves into div.q-title (never into the <button>); the whole .q-row takes the
 *   click;
 *   the button is a glyph-only toggle (aria-expanded / aria-controls / aria-label) carrying the
 *   source's
 *   two inline 16×16 svgs (plus = collapsed, minus = expanded). Row 1 open at rest (recorded: live
 *   aria-expanded=true on item 1). Behaviour = stardust/prototypes/solutions.js § FAQ accordion
 *   (observed on live: independent items, `hidden` class on the content, max-height/opacity .4s).
 * In-page anchor: the section's `data-id` (section-metadata `id` row) is copied onto the section id
 *   so
 *   the anchor-nav chip `#faq` lands here.
 * DOM = solutions.css .sol-faq / __row / __head / __title / __list / __item / __q / __label / __a /
 *   __a-inner; .accordion-wrap is the lifted container (.contain: 1140 / 0 16 / auto). Visual spec:
 *   stardust/prototypes/solutions-proposed.html #faq + solutions.css § 8.
 * Runtime words: none displayed (aria-labels "Expand section" / "Collapse section" — in-code UI
 *   constants, D14).
 * HARNESS-ONLY fallback (EW5): a bare-text cell has its text nodes wrapped into a fresh <p>.
 */
const PLUS = '<svg class="glyph plus" width="16" height="16" viewBox="0 0 16 16" fill="none" '
  + 'xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">'
  + '<path fill-rule="evenodd" clip-rule="evenodd" '
  + 'd="M7 16L7 -8.74228e-08L9 0L9 16L7 16Z" fill="black"></path>'
  + '<path fill-rule="evenodd" clip-rule="evenodd" '
  + 'd="M1.74846e-07 7L16 7L16 9L0 9L1.74846e-07 7Z" fill="black"></path>'
  + '</svg>';
const MINUS = '<svg class="glyph minus" width="16" height="16" viewBox="0 0 16 2" fill="none" '
  + 'xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">'
  + '<path fill-rule="evenodd" clip-rule="evenodd" '
  + 'd="M1.74846e-07 -1.39876e-06L16 0L16 2L0 2L1.74846e-07 -1.39876e-06Z" fill="black"></path>'
  + '</svg>';

function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

/** Authored elements of one cell, in order (#104 — never a copy of the text). */
function cellNodes(cell) {
  let kids = [...cell.children];
  if (kids.length === 1 && kids[0].tagName === 'P' && kids[0].children.length
      && kids[0].querySelector('picture, img')) {
    kids = [...kids[0].childNodes].map((n) => {
      if (n.nodeType === 1) return n;
      if (n.textContent.trim()) { const p = el('p'); p.append(n); return p; } // HARNESS-ONLY (EW5)
      return null;
    }).filter(Boolean);
  }
  if (!kids.length && cell.textContent.trim()) {
    const p = el('p'); p.append(...cell.childNodes); kids = [p]; // HARNESS-ONLY fallback (EW5)
  }
  return kids;
}

function setState(btn, panel, open) {
  btn.setAttribute('aria-expanded', String(open));
  btn.setAttribute('aria-label', open ? 'Collapse section' : 'Expand section');
  panel.classList.toggle('collapsed', !open);
  panel.setAttribute('aria-hidden', String(!open));
}

export default function decorate(block) {
  const section = block.closest('.section');
  if (section && !section.id && section.dataset.id) section.id = section.dataset.id;

  const rows = [...block.children];
  if (!rows.length) return;
  const seq = [...document.querySelectorAll('.accordion')].indexOf(block);
  const uid = `accordion-${seq < 0 ? 0 : seq}`;

  const wrap = el('div', 'accordion-wrap');
  const panel = el('div', 'panel');
  const row = el('div', 'panel-row');
  const head = el('div', 'head');
  const list = el('div', 'list');

  // 1. reabsorb the section head (EW8): the wrapper's children MOVE, the emptied wrapper goes.
  const dcw = block.parentElement && block.parentElement.previousElementSibling;
  if (dcw && dcw.classList.contains('default-content-wrapper')) {
    const title = el('div', 'title');
    title.append(...dcw.childNodes);
    head.append(title);
    dcw.remove();
  }

  // 2. one item per [question | answer] row
  let n = 0;
  rows.forEach((r) => {
    const cells = [...r.children];
    if (cells.length < 2) { // in-table head (defensive decode fallback)
      const title = el('div', 'title');
      cells.forEach((c) => cellNodes(c).forEach((node) => title.append(node)));
      head.append(title);
      return;
    }
    const [qCell, ...aCells] = cells;
    const item = el('div', 'item');
    const qRow = el('div', 'q-row');
    const qTitle = el('div', 'q-title');
    // EW7: the title never enters the button
    cellNodes(qCell).forEach((node) => qTitle.append(node));
    const btn = el('button', 'toggle');
    btn.type = 'button';
    btn.innerHTML = PLUS + MINUS;
    const aId = `${uid}-a${n}`;
    btn.setAttribute('aria-controls', aId);
    const a = el('div', 'a');
    a.id = aId;
    const aInner = el('div', 'a-inner');
    aCells.forEach((c) => cellNodes(c).forEach((node) => aInner.append(node)));
    a.append(aInner);
    setState(btn, a, n === 0); // row 1 open at rest (recorded)
    qRow.addEventListener('click', () => {
      setState(btn, a, btn.getAttribute('aria-expanded') !== 'true');
    });
    qRow.append(qTitle, btn);
    item.append(qRow, a);
    list.append(item);
    n += 1;
  });

  row.append(head, list);
  panel.append(row);
  wrap.append(panel);
  block.replaceChildren(wrap);
}
