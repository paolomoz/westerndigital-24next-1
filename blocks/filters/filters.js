/**
 * filters — the PLP sidebar: "Shop by" navigation groups + inert facet accordions (dynamics
 * row #17, static snapshot: authored option lists whose links bounce to the source host).
 *
 * Schema: stardust/eds-schema/products.json § listing (block `filters`, the split-aside aside).
 * Authoring: one row per group — [ title | <ul> of <li><a href>label</a></li> ] (shop-by groups
 *   first, then the facets). A group whose options end with a count "(39)" is a FACET (checkbox
 *   list, closed at rest); a group without counts is a shop-by NAVIGATION group (plain links;
 *   the first one is open at rest, as captured).
 * DOM = products.css .plp-side / .clp-nav* / .clp-facet* with the authored title <p> and <ul>
 *   MOVED into the slots (EW1). EW7: a facet title never sits inside the toggle <button> — it
 *   moves into a sibling .clp-facet-title, the head row takes the click, the button is a
 *   chevron-only toggle.
 * Behaviour (observed on live, stardust/prototypes/products.js): a facet head toggles its list;
 *   shop-by groups are exclusive; the ≤767 drawer opens from the toolbar buttons
 *   (body.mob-shop-by-open / body.mob-filters-open — product-listing sets them, this block
 *   closes them).
 * Words this block adds (D14 in-code UI constants, identical on every instance — never page
 *   rows): "Shop", "Filter", "Filter by", "Clear All", "+ More", "- Less", close aria-labels.
 */

const LABELS = {
  shop: 'Shop',
  filter: 'Filter',
  filterBy: 'Filter by',
  clearAll: 'Clear All',
  more: '+ More',
  less: '- Less',
  close: 'Close',
};

const SVG_CLOSE = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" aria-hidden="true"><g transform="translate(0 1)"><g transform="translate(-30.435 -70.217)"><rect width="24" height="25" transform="translate(30.435 69.217)" fill="none"></rect><path d="M19,.5H0A.5.5,0,0,1-.5,0,.5.5,0,0,1,0-.5H19a.5.5,0,0,1,.5.5A.5.5,0,0,1,19,.5Z" transform="translate(36 75) rotate(45)"></path><path d="M19,.5H0A.5.5,0,0,1-.5,0,.5.5,0,0,1,0-.5H19a.5.5,0,0,1,.5.5A.5.5,0,0,1,19,.5Z" transform="translate(36 88.435) rotate(-45)"></path></g></g></svg>';

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

/** UI-only text (a runtime constant, never authored content). */
function label(tag, className, text) {
  const node = el(tag, className);
  node.textContent = text;
  return node;
}

function mobHead(text, closeClass) {
  const head = el('div', 'plp-mobhead sm-hidden');
  head.append(label('span', '', text));
  const btn = el('button', `plp-mobhead-close ${closeClass}`, {
    type: 'button',
    'aria-label': LABELS.close,
  });
  btn.innerHTML = SVG_CLOSE;
  head.append(btn);
  return head;
}

const isFacetList = (list) => !!list && [...list.querySelectorAll('li')]
  .some((li) => /\(\d+\)\s*$/.test(li.textContent));

function closeDrawer() {
  document.body.classList.remove('mob-shop-by-open', 'mob-filters-open');
}

export default function decorate(block) {
  // 1. QUERY: one authored group per row — title (p / heading) + option list (ul / ol).
  const groups = [...block.children].map((row) => {
    const title = row.querySelector('p, h1, h2, h3, h4, h5, h6');
    const list = row.querySelector('ul, ol');
    const owned = (n) => n === title || n === list
      || (title && title.contains(n)) || (list && list.contains(n));
    const rest = [...row.querySelectorAll('p, ul, ol, h1, h2, h3, h4, h5, h6, picture')]
      .filter((n) => !owned(n));
    return { title, list, rest };
  }).filter((g) => g.title || g.list);

  // 2. CREATE the sidebar skeleton (products.css .plp-side).
  const side = el('aside', 'plp-side');
  const sticky = el('div', 'plp-side-sticky', { tabindex: '-1' });
  const nav = el('div', 'clp-nav');
  nav.append(mobHead(LABELS.shop, 'mob-shop-by-close'));
  const navItems = el('div', 'clp-nav-items');
  nav.append(navItems);
  const filters = el('div', 'clp-filters');
  const facetItems = el('div', 'clp-filters-items');
  facetItems.append(mobHead(LABELS.filter, 'mob-filter-close'));
  facetItems.append(label('div', 'clp-filters-title', LABELS.filterBy));
  filters.append(facetItems);
  const clearbar = el('div', 'plp-clearbar sm-hidden');
  const clearBtn = label('button', '', LABELS.clearAll);
  clearBtn.type = 'button';
  clearBtn.setAttribute('aria-label', 'Reset all filters');
  clearBtn.addEventListener('click', closeDrawer);
  clearbar.append(clearBtn);
  filters.append(clearbar);

  // 3. MOVE each group's title + list into its slot.
  let navIndex = 0;
  groups.forEach((g) => {
    if (isFacetList(g.list)) {
      const facet = el('div', 'clp-facet');
      const head = el('div', 'clp-facet-head');
      const titleWrap = el('div', 'clp-facet-title');
      if (g.title) titleWrap.append(g.title);
      const toggle = el('button', 'accordion', { type: 'button', 'aria-expanded': 'false' });
      toggle.setAttribute('aria-label', g.title ? g.title.textContent : LABELS.filter);
      head.append(titleWrap, toggle);
      const listWrap = el('div', 'clp-facet-list');
      const body = el('div', 'accordion-body hidden');
      if (g.list) body.append(g.list);
      g.rest.forEach((n) => body.append(n));
      body.append(
        label('div', 'clp-facet-more', LABELS.more),
        label('div', 'clp-facet-less', LABELS.less),
      );
      listWrap.append(body);
      facet.append(head, listWrap);
      head.addEventListener('click', () => {
        const open = toggle.classList.toggle('active');
        toggle.setAttribute('aria-expanded', String(open));
        body.classList.toggle('hidden', !open);
      });
      facetItems.append(facet);
    } else {
      const open = navIndex === 0; // the first shop-by group is open at rest (lifted state)
      navIndex += 1;
      const item = el('div', 'clp-nav-item');
      const titleWrap = el('div', 'clp-nav-title');
      const toggle = el('a', `accordion${open ? ' active' : ''}`, {
        href: '#',
        'aria-expanded': String(open),
      });
      if (g.title) toggle.append(g.title);
      titleWrap.append(toggle);
      const body = el('div', `clp-nav-list accordion-body${open ? '' : ' hidden'}`);
      if (g.list) body.append(g.list);
      g.rest.forEach((n) => body.append(n));
      item.append(titleWrap, body);
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const wasActive = toggle.classList.contains('active');
        navItems.querySelectorAll('.clp-nav-item').forEach((it) => {
          const link = it.querySelector('a.accordion');
          const list = it.querySelector('.accordion-body');
          const on = it === item && !wasActive;
          link.classList.toggle('active', on);
          link.setAttribute('aria-expanded', String(on));
          if (list) list.classList.toggle('hidden', !on);
        });
      });
      navItems.append(item);
    }
  });

  sticky.append(nav, filters);
  side.append(sticky);
  side.querySelectorAll('.plp-mobhead-close')
    .forEach((b) => b.addEventListener('click', closeDrawer));
  block.replaceChildren(side);
}
