/**
 * company-cards — the company page's two card bands, ONE decode with two skins (D9):
 *   values    (company / values)  "Our Values": the h2 is DEFAULT CONTENT before the block and
 *                                 is reabsorbed (EW8 — the head sits ON the photo ground); row 1
 *                                 [picture] = the band background (editorial, ENCODE § Images);
 *                                 then one row per value [picture icon | h3 + p]
 *   overview  (company / overview-cards, more-cards)
 *                                 one row per card [picture | h3 + p + <p><em><a>CTA</a></em></p>]
 *
 * Schema: stardust/eds-schema/company.json § values (DIV.co-value × 5), § overview-cards /
 * § more-cards (DIV.co-card-col × 3 + 3). Visual spec: stardust/prototypes/company-proposed.html
 * + company.css § values band / § overview cards (values lifted verbatim into company-cards.css).
 *
 * Decode — classified by content, never by index (#42 / #48 / #52):
 *   - values: a row whose cells hold a picture and no text (before any unit) is the band
 *     background; a leading text-only row carrying an h2 is an in-table head (defensive fallback —
 *     the locked shape authors the head as default content, reabsorbed from
 *     `.default-content-wrapper`, EW8)
 *   - every other row is one unit; a single-row block holding several unit headings (the
 *     DA-flattened shape, #52) is segmented on its most frequent heading tag, a text-less picture
 *     before a heading travelling with the unit that heading opens (#73)
 *   - inside a unit: picture → .media, heading → .title, link-only <p> → .actions (EW3 — the <p>
 *     moves), everything else → .body; nothing is rebuilt from text (EW1), wrappers carry the
 *     layout classes and the authored elements are styled through them (EW2); decorate() adds no
 *     words (#100).
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

// Read-only classification helpers — decisions only, never displayed text (EW1).
const text = (node) => (node ? node.textContent.trim() : '');
const isHeading = (node) => /^H[1-6]$/.test(node.tagName);
const media = (node) => (node.matches('picture, img') ? node : node.querySelector('picture, img'));
const isLinkPara = (node) => node.tagName === 'P'
  && !!node.querySelector('a[href]')
  && text(node) === text(node.querySelector('a'));

/** Authored elements of one cell, in order (#104: the runtime folds media-led cells into one p). */
function cellNodes(cell) {
  let kids = [...cell.children];
  if (kids.length === 1 && kids[0].tagName === 'P' && kids[0].children.length
      && kids[0].querySelector('picture, img')) {
    kids = [...kids[0].childNodes].map((n) => {
      if (n.nodeType === 1) return n;
      // HARNESS-ONLY fallback (EW5): a bare text node inside the wrapper <p> — DA content
      // never has one. Move the text node, never copy it.
      if (n.textContent.trim()) { const p = document.createElement('p'); p.append(n); return p; }
      return null;
    }).filter(Boolean);
  }
  if (!kids.length && cell.textContent.trim()) {
    // HARNESS-ONLY fallback (EW5): a bare-text cell — wrap the existing text nodes, never copy.
    const p = document.createElement('p');
    p.append(...cell.childNodes);
    kids = [p];
  }
  return kids;
}

/** #52: split a flat sibling list into units on the most frequent heading tag. */
function segment(nodes) {
  const counts = {};
  nodes.filter(isHeading).forEach((h) => { counts[h.tagName] = (counts[h.tagName] || 0) + 1; });
  const tag = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
  if (!tag || counts[tag] < 2) return [nodes];
  const groups = [];
  let cur = [];
  nodes.forEach((n) => {
    if (n.tagName === tag && cur.some((x) => x.tagName === tag)) {
      const carry = [];
      const last = () => cur[cur.length - 1];
      while (cur.length && media(last()) && !text(last())) carry.unshift(cur.pop());
      groups.push(cur);
      cur = carry;
    }
    cur.push(n);
  });
  if (cur.length) groups.push(cur);
  return groups;
}

function buildUnit(nodes) {
  const item = el('div', 'item');
  const card = el('div', 'card');
  const content = el('div', 'content');
  const textBox = el('div', 'text');
  const body = el('div', 'body');
  const actions = el('div', 'actions');
  nodes.forEach((n) => {
    const m = media(n);
    if (m && !text(n)) card.append(wrapNode(m, 'media'));
    else if (isHeading(n)) textBox.append(wrapNode(n, 'title'));
    else if (isLinkPara(n)) actions.append(n); // EW3: the CTA moves as its paragraph
    else body.append(n);
  });
  if (body.childElementCount) textBox.append(body);
  if (textBox.childElementCount) content.append(textBox);
  if (actions.childElementCount) content.append(actions);
  if (content.childElementCount) card.append(content);
  item.append(card);
  return item;
}

export default function decorate(block) {
  const variant = block.classList.contains('values') ? 'values' : 'overview';
  block.classList.add(variant);
  const rows = [...block.children];
  if (!rows.length) return;

  // 1. QUERY + capture before moving anything.
  const head = el('div', 'head');
  const bg = el('div', 'bg');
  const list = el('div', 'list');
  const wrapper = block.parentElement ? block.parentElement.previousElementSibling : null;

  // 2. EW8 — the values head is default content in the same section; MOVE its children onto the
  //    photo ground and drop the emptied wrapper (they are already editable as default content).
  if (variant === 'values' && wrapper && wrapper.classList.contains('default-content-wrapper')) {
    head.append(...wrapper.childNodes);
    wrapper.remove();
  }

  // 3. Classify rows.
  let units = [];
  rows.forEach((row) => {
    const nodes = [...row.children].flatMap(cellNodes);
    if (!nodes.length) return;
    const pics = nodes.filter((n) => media(n) && !text(n));
    const hasText = nodes.some((n) => text(n));
    if (variant === 'values' && !units.length) {
      if (pics.length && !hasText && !bg.childElementCount) { bg.append(media(pics[0])); return; }
      if (!pics.length && !head.childElementCount && nodes.some((n) => n.tagName === 'H2')) {
        head.append(...nodes);
        return;
      }
    }
    units.push(nodes);
  });
  if (units.length === 1 && rows.length === 1) units = segment(units[0]);

  // 4. Build wrappers, MOVE authored nodes, replace.
  const wrap = el('div', 'wrap');
  if (head.childElementCount) wrap.append(head);
  units.forEach((u) => list.append(buildUnit(u)));
  wrap.append(list);
  block.replaceChildren(...(bg.childElementCount ? [bg, wrap] : [wrap]));
}
