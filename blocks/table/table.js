/**
 * table — data table (D11 collection `table`); variant `compare` = the solutions "Compare Storage
 * Solutions" table.
 *
 * Schema: stardust/eds-schema/solutions.json § compare-table (header row + TR × 5, 4 cells each).
 * Authoring: the section h2 is DEFAULT CONTENT before the block (styled in place by table.css — the
 *   head
 *   sits above the table on the source, no reabsorb); first block row = the header cells (<th>)
 *   unless the
 *   block carries the `no-header` variant; every other row = one <tr>, one authored cell per <td>.
 *   Cell
 *   content MOVES as authored (a <p> per cell in DA; <strong> on the bold first-column label).
 * compare: the third column ("Key benefits") renders as a pill — the moved cell content is wrapped
 *   in
 *   div.tag (the source's span.sol-tag does not survive DA; the column position carries the
 *   meaning).
 * DOM = solutions.css .sol-table / __scroll / __table with the authored cells MOVED into th/td
 *   (EW1);
 *   .table-wrap is the lifted container (.contain: 1140 / 0 16 / auto). Visual spec:
 *   stardust/prototypes/solutions-proposed.html #solutions-table + solutions.css § 7.
 * HARNESS-ONLY fallback (EW5): a bare-text cell (off-pipeline content) has its text nodes wrapped
 *   into a
 *   fresh <p> — DA content always carries the <p>.
 */
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

export default function decorate(block) {
  const noHeader = block.classList.contains('no-header');
  const compare = block.classList.contains('compare');
  const rows = [...block.children];
  if (!rows.length) return;

  const table = el('table');
  const thead = el('thead');
  const tbody = el('tbody');

  rows.forEach((row, i) => {
    const header = i === 0 && !noHeader;
    const tr = el('tr');
    [...row.children].forEach((cell, j) => {
      const td = el(header ? 'th' : 'td');
      if (header) td.setAttribute('scope', 'col');
      const nodes = cellNodes(cell);
      if (!header && compare && j === 2) {
        const tag = el('div', 'tag'); // the pill column — the position IS the meaning
        nodes.forEach((n) => tag.append(n));
        td.append(tag);
      } else {
        nodes.forEach((n) => td.append(n));
      }
      tr.append(td);
    });
    (header ? thead : tbody).append(tr);
  });

  if (thead.children.length) table.append(thead);
  table.append(tbody);

  const wrap = el('div', 'table-wrap');
  const box = el('div', 'table-box');
  const scroll = el('div', 'table-scroll');
  scroll.append(table);
  box.append(scroll);
  wrap.append(box);
  block.replaceChildren(wrap);
}
