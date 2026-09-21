/**
 * columns — text-beside-media compositions, ONE decode with three skins (D9 / D11 collection
 *    `columns`):
 *   feature  (index / business)               one row [picture + h3 + p | picture + h3 + p]
 *   split    (company / leadership, responsibility)  one row [h2 + p + CTA | picture]  or  [picture
 *    | h2 + p + CTA]
 *   cta      (solutions / cta band)            one row [p title |
 *    <p><strong><a>CTA</a></strong></p> <p><em><a>CTA</a></em></p>]
 *
 * Schema: stardust/eds-schema/index.json § business (DIV.biz__col × 2); company.json § leadership /
 * responsibility; solutions.json § cta. Visual specs: stardust/prototypes/index-proposed.html band
 *    6 +
 * index.css § business; company-proposed.html .co-lead__row / .co-cr__row + company.css §
 *    leadership /
 * corporate responsibility; solutions-proposed.html .sol-cta + solutions.css § sol-cta. This block
 *    is
 * the ONE owner of all three variants (conversion log § inventory); the other archetypes author
 *    content only.
 *
 * Decode (classified by content, never by index): each cell of the first row is a column. A cell
 *    holding
 * only a picture is a media column (the picture becomes the fill layer, `.media`); any other cell
 *    is a
 * text column whose heading moves into `.title`, link-only paragraphs into `.actions` (EW3 — the
 *    <p>
 * moves), a picture into `.media`, everything else into `.body`. The row is tagged `.media-first`
 *    when
 * the media column is authored first (the responsibility layout) — the variant CSS reads that.
 * The `feature` head (h2 + lede) and its trailing CTA are default content in the same section,
 *    styled
 * in place by columns.css (`.columns-container:has(.columns.feature) .default-content-wrapper`).
 */

// ── Experience Workspace helpers (EW1–EW4) — copied into every block, no shared import ──
function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}
const text = (el) => (el ? el.textContent.trim() : '');
const pic = (cell) => (cell ? cell.querySelector('picture, img') : null);

/** Authored elements of one cell, in order (#104: the runtime folds media-led cells into one
 *  <p>). */
function cellNodes(cell) {
  let kids = [...cell.children];
  if (kids.length === 1 && kids[0].tagName === 'P' && kids[0].children.length
      && kids[0].querySelector('picture, img')) {
    kids = [...kids[0].childNodes].map((n) => {
      if (n.nodeType === 1) return n;
      // HARNESS-ONLY fallback (EW5): a bare text node inside the wrapper <p> — DA content never has
      // one.
      if (n.textContent.trim()) { const p = document.createElement('p'); p.append(n); return p; }
      return null;
    }).filter(Boolean);
  }
  if (!kids.length && cell.textContent.trim()) {
    // HARNESS-ONLY fallback (EW5): a bare-text cell — wrap the existing text nodes, never copy
    // them.
    const p = document.createElement('p'); p.append(...cell.childNodes); kids = [p];
  }
  return kids;
}

const isLinkPara = (el) => el.tagName === 'P' && el.querySelector('a[href]')
  && text(el) === text(el.querySelector('a'));
const isHeading = (el) => /^H[1-6]$/.test(el.tagName);

function buildColumn(cell) {
  const col = document.createElement('div');
  col.className = 'col';
  const media = pic(cell);
  if (media && !text(cell)) {
    col.classList.add('media-col');
    col.append(wrapNode(media, 'media'));
    return col;
  }
  col.classList.add('text-col');
  const nodes = cellNodes(cell).filter((n) => n !== media && !n.contains(media));
  if (media) col.append(wrapNode(media, 'media'));
  const textBox = document.createElement('div');
  textBox.className = 'text';
  const body = document.createElement('div');
  body.className = 'body';
  const actions = document.createElement('div');
  actions.className = 'actions';
  nodes.forEach((n) => {
    if (isHeading(n)) textBox.append(wrapNode(n, 'title'));
    else if (isLinkPara(n)) actions.append(n);
    else body.append(n);
  });
  if (body.childElementCount) textBox.append(body);
  if (textBox.childElementCount) col.append(textBox);
  if (actions.childElementCount) col.append(actions);
  return col;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  rows.forEach((r) => {
    const cells = [...r.children];
    const row = document.createElement('div');
    row.className = 'row';
    const cols = cells.map(buildColumn);
    if (cols[0] && cols[0].classList.contains('media-col')) row.classList.add('media-first');
    row.append(...cols);
    wrap.append(row);
  });
  block.replaceChildren(wrap);
}
