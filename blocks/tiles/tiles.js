/**
 * tiles — icon-or-image tiles in a wrapping grid: ONE decode, four skins (D9 / cards-like,
 *   conversion log
 * § inventory — the solutions worker owns every variant; products authors `buy` rows only).
 *   usecase  (solutions / choose)          [icon | <p><strong>use case</strong></p> +
 *   <p><a>Solution</a></p>]   7 tiles, 2-up, icon left of the text
 *   explore  (solutions / explore)         [picture | h3 + p + <p><a>Learn More</a></p>]
 *               8 cards, 3-up, image 300px r16
 *   tile     (solutions / industry, compare-learn) [icon | h3 + p + <p><a>Learn More</a></p>]
 *               3 / 6 tiles, 3-up, CTA pinned to the bottom
 *   buy      (products / buy-direct)       [picture (svg) | h3 + p (+ <p><a>Shop Now</a></p>)]
 *               4 tiles, centred strip on grey
 *
 * Schema: stardust/eds-schema/solutions.json § choose (DIV.sol-usecases__col × 7), § explore
 * (DIV.sol-explore__col × 8), § industry (DIV.sol-tiles__col × 3), § compare-learn (× 6);
 * stardust/eds-schema/products.json § buy-direct (× 4). Visual specs:
 *   stardust/prototypes/solutions-proposed.html
 * + solutions.css §§ 3–6; products-proposed.html .buy-direct + products.css § Buy Direct.
 *
 * Icons: the per-tile icons are inline SVGs on the source with no URL, so they are authored as
 *   `:sol-<slug>:`
 * icon tokens (icons/sol-*.svg, pure-vector) — the runtime delivers <span class="icon
 *   icon-sol-…"><img></span>;
 * the buy icons are captured <img src> svgs. Both are MEDIA for this block. An empty media cell
 *   renders the
 * tile without an icon (nothing else moves).
 *
 * Decode (classified by content, never by index — #48 / #62): each row is one tile. A cell whose
 *   only
 * content is a picture/img or an icon span is the MEDIA cell; the other cell is the TEXT cell. A
 *   single-cell
 * row is split the same way on its flat siblings. In the text cell: a heading → .title; a <p> led
 *   by
 * <strong> that IS the whole paragraph (and no heading in the tile) → .title; a sole-link <p> →
 *   .actions
 * (EW3 — the <p> moves; text links, never buttons: the runtime's formatted-only buttonisation
 *   leaves a
 * plain <a> alone); everything else → .copy. Nothing is rebuilt; every authored element is moved
 *   (EW1).
 * Section head (h2 [+ intro p] / trailing foot p) = default content styled in place by tiles.css
 * (`.tiles-container .default-content-wrapper`), no reabsorb. The section's `data-id`
 *   (section-metadata `id`
 * row) is copied onto the section id so the anchor-nav chips land on it.
 * HARNESS-ONLY fallback (EW5): a bare-text cell has its text nodes wrapped into a fresh <p>.
 */

// ── Experience Workspace helpers (EW1–EW4) — copied into every block, no shared import ──
function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}
function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}
const text = (node) => (node ? node.textContent.trim() : '');

/** Authored elements of one cell, in order (#104: media-led cells are folded into one <p>). */
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

const MEDIA = 'picture, img, span.icon';
const hasMedia = (node) => node.matches(MEDIA) || !!node.querySelector(MEDIA);
const isMediaOnly = (node) => hasMedia(node) && !text(node);
const isHeading = (node) => /^H[1-6]$/.test(node.tagName);
const isLinkPara = (node) => node.tagName === 'P' && !!node.querySelector('a[href]')
  && text(node) === text(node.querySelector('a[href]'));
const isBoldPara = (node) => node.tagName === 'P' && node.firstElementChild
  && node.firstElementChild.tagName === 'STRONG' && text(node) === text(node.firstElementChild);

const VARIANTS = ['usecase', 'explore', 'tile', 'buy'];

function buildTile(mediaNodes, textNodes) {
  const col = el('div', 'tile-col');
  const tile = el('div', 'tile');
  const inner = el('div', 'tile-inner');
  if (mediaNodes.length) {
    const media = el('div', 'tile-media');
    mediaNodes.forEach((n) => media.append(n));
    inner.append(media);
  }
  const body = el('div', 'tile-body');
  let title = null; let copy = null; let actions = null;
  const heading = textNodes.find(isHeading);
  textNodes.forEach((n) => {
    if (n === heading || (!heading && !title && isBoldPara(n))) {
      title = wrapNode(n, 'title');
    } else if (isLinkPara(n)) {
      actions = actions || el('div', 'actions');
      actions.append(n); // EW3: the CTA moves as its paragraph
    } else {
      copy = copy || el('div', 'copy');
      copy.append(n);
    }
  });
  [title, copy, actions].forEach((w) => { if (w) body.append(w); });
  inner.append(body);
  tile.append(inner);
  col.append(tile);
  return col;
}

export default function decorate(block) {
  const variant = VARIANTS.find((v) => block.classList.contains(v)) || 'tile';
  if (!block.classList.contains(variant)) block.classList.add(variant);
  const section = block.closest('.section');
  if (section && !section.id && section.dataset.id) section.id = section.dataset.id;

  const rows = [...block.children];
  if (!rows.length) return;

  const wrap = el('div', 'tiles-wrap');
  const grid = el('div', 'grid');
  rows.forEach((row) => {
    const cells = [...row.children];
    const mediaNodes = []; const textNodes = [];
    if (cells.length >= 2) {
      const mediaCell = cells.find(isMediaOnly) || null;
      cells.forEach((c) => (c === mediaCell ? mediaNodes : textNodes).push(...cellNodes(c)));
    } else if (cells.length === 1) {
      cellNodes(cells[0]).forEach((n) => (isMediaOnly(n) ? mediaNodes : textNodes).push(n));
    }
    if (mediaNodes.length || textNodes.length) grid.append(buildTile(mediaNodes, textNodes));
  });
  wrap.append(grid);
  block.replaceChildren(wrap);
}
