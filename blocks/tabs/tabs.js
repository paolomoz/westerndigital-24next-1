/**
 * tabs — home "Shop by Category / Solutions / Industries" tablist (variant `category`): a centred
 * tab strip and one panel per tab holding a grid of picture + label tiles and a "See All" CTA.
 *
 * Schema: stardust/eds-schema/index.json § category-tabs (repeat unit DIV.tabs__panel × 3; hasH1 —
 * the page <h1> is default content BEFORE this block in the same section, styled in place by
 * tabs.css `.tabs-container .default-content-wrapper`, no reabsorption).
 * Visual spec: stardust/prototypes/index-proposed.html .band--tabs, index.css § category tabs;
 * behaviour: index.js § category tabs (dynamics row #15, rebuild-native).
 *
 * Authoring rows — ONE row per tab, two cells:
 *   1. tab label: <p>Shop by Category</p>
 *   2. panel: <ul><li><a href><img alt="">Label</a></li> …</ul> (one tile per item, the picture
 *    inside
 *      the link) followed by <p><em><a>See All …</a></em></p> (secondary = outline button); a tab
 *      without a CTA is fine.
 * Tab controls are div[role=tab] (never <button> — EW7: a button cannot host the editor); the
 * authored label <p> moves into the control. Inactive panels carry `hidden`; the first tab is
 * active at rest (observed). Arrow keys move between tabs; Enter/Space activate.
 */

// ── Experience Workspace helpers (EW1–EW4) — copied into every block, no shared import ──
const text = (el) => (el ? el.textContent.trim() : '');

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

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;
  const uid = `tabs-${Math.random().toString(36).slice(2, 8)}`;

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const strip = document.createElement('div');
  strip.className = 'tab-list';
  strip.setAttribute('role', 'tablist');
  const panels = [];
  const tabs = [];

  rows.forEach((row, i) => {
    const cells = [...row.children];
    // the label cell is the short text-only cell; the panel cell holds the list (order-agnostic)
    const labelCell = cells.find((c) => !c.querySelector('ul, ol, picture, img')) || cells[0];
    const panelCells = cells.filter((c) => c !== labelCell);
    const labelNodes = cellNodes(labelCell);
    const label = labelNodes.find((n) => text(n)) || null;

    const holder = document.createElement('div');
    holder.className = 'tab-item';
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.id = `${uid}-tab-${i + 1}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `${uid}-panel-${i + 1}`);
    tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    tab.tabIndex = i === 0 ? 0 : -1;
    if (label) tab.append(label);
    holder.append(tab);
    strip.append(holder);

    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.id = `${uid}-panel-${i + 1}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    if (i !== 0) panel.hidden = true;
    const inner = document.createElement('div');
    inner.className = 'panel-inner';
    const grid = document.createElement('div');
    grid.className = 'grid';
    const more = document.createElement('div');
    more.className = 'more';
    const leftovers = document.createElement('div');
    leftovers.className = 'panel-text';
    panelCells.forEach((c) => cellNodes(c).forEach((node) => {
      if (node.matches('ul, ol')) grid.append(node);
      else if (node.matches('p') && node.querySelector('a')
        && text(node) === text(node.querySelector('a'))) more.append(node);
      else leftovers.append(node);
    }));
    if (leftovers.childElementCount) inner.append(leftovers);
    inner.append(grid);
    if (more.childElementCount) inner.append(more);
    panel.append(inner);
    panels.push(panel);
    tabs.push(tab);
  });

  wrap.append(strip, ...panels);
  block.replaceChildren(wrap);

  // ── behaviour (observed: aria-selected/aria-expanded flip on the tab, panels swap by `hidden`)
  // ──
  const activate = (k, focus) => {
    tabs.forEach((t, j) => {
      const on = j === k;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      panels[j].hidden = !on;
    });
    if (focus) tabs[k].focus();
  };
  tabs.forEach((t, k) => {
    t.addEventListener('click', () => activate(k, false));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(k, false); return; }
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const d = e.key === 'ArrowRight' ? 1 : -1;
        activate((k + d + tabs.length) % tabs.length, true);
      }
    });
  });
}
