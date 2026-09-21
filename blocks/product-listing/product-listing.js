/**
 * product-listing — the PLP grid: result count + sort toolbar, one card per product, the warranty
 * promo modal and the pagination. Dynamics row #17: a STATIC SNAPSHOT of the captured first page
 * (sort / pagination are inert UI, their links bounce to the source host); row #28 (compare):
 * decided-out — the cards ship without the compare control.
 *
 * Schema: stardust/eds-schema/products.json § listing (block `product-listing`, split-aside main).
 * Authoring rows (classified by CONTENT, never by index — #42 / #48):
 *   count row   — one cell: <p>89 Items</p>
 *   product row — [ <picture> | <h3><a href="…">Name</a></h3> <p>Capacity: <strong>…</strong></p>
 *                 <p>Starting at $…</p> (+ <p>warranty promo text <a href="…">Learn More</a></p>) ]
 *                 The whole card is the link (EW6: the inner anchor is unwrapped after its href
 *                 is read, the h3 keeps its index).
 *   modal row   — [ <picture> | <p>title</p> <p>body</p> <p>Have Questions? <a>Learn More</a></p>
 *                 <p>footnote</p> ] — a picture plus paragraphs, no heading → the warranty modal
 *                 (hidden at rest, opened by the promo link).
 *   pagination  — one cell: <ul><li><a>PREV</a></li> <li><a>1</a></li> … <li>...</li> …
 *                 <li><a>NEXT</a></li></ul>
 * DOM = products.css .plp-toolbar* / .plp-grid / .product-card* / .green-promo / .wd-modal* /
 *   .plp-pag* with every authored element MOVED into its slot (EW1); the sort <select>, the
 *   mobile toolbar buttons and the pagination arrows are generated UI.
 * Behaviour (observed on live, stardust/prototypes/products.js): the promo "Learn More" opens the
 *   warranty modal (close ✕ / backdrop / Escape); the ≤767 "Shop" / "Filter" buttons open the
 *   filters drawer (body.mob-shop-by-open / body.mob-filters-open — the filters block closes them).
 * Runtime values (allowed generated state): the active page and the disabled PREV derive from
 *   location.search (page 1 on the snapshot).
 * Words this block adds (D14 in-code UI constants, identical on every instance — never page
 *   rows): "Shop", "Filter", "Sort", "Sort by :", the six sort options, "✕", button aria-labels.
 */

const LABELS = {
  shop: 'Shop',
  filter: 'Filter',
  sort: 'Sort',
  sortBy: 'Sort by :',
  close: '✕',
};

const SORT_OPTIONS = [
  ['relevance', 'Most Popular'],
  ['launchDate', 'Latest Products'],
  ['name-asc', 'Title A-Z'],
  ['name-desc', 'Title Z-A'],
  ['price-asc', 'Price Low-High'],
  ['price-desc', 'Price High-Low'],
];

const SVG = {
  shopBy: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" class="absolute" aria-hidden="true"><g transform="translate(-125 -399.518)"><rect width="20" height="20" transform="translate(125 399.518)" fill="none"></rect><g transform="translate(0.393 0.395)"><path d="M5.887,0A2.119,2.119,0,0,1,7.5,2.421c0,.98.009,1.96,0,2.94A2.017,2.017,0,0,1,5.358,7.507c-.979.011-1.959,0-2.938,0A2.12,2.12,0,0,1,0,5.89V1.527A2.411,2.411,0,0,1,1.526,0Zm.329,3.709c0-.563-.011-1.127,0-1.69.012-.5-.219-.74-.715-.739q-1.771,0-3.541,0c-.442,0-.682.2-.682.654,0,1.2,0,2.4,0,3.6a.612.612,0,0,0,.707.691c1.162-.008,2.325,0,3.487,0,.54,0,.735-.209.74-.764,0-.581,0-1.163,0-1.745" transform="translate(126.606 401.123)"></path><path d="M85.617,0a2.223,2.223,0,0,1,1.534,2.482c-.051.978-.006,1.961-.012,2.941A1.948,1.948,0,0,1,85.12,7.5q-1.714.042-3.429,0a1.958,1.958,0,0,1-2.032-2.025c-.03-1.143-.02-2.288,0-3.432A2.026,2.026,0,0,1,81.256,0Zm-2.18,1.28h-1.8c-.46,0-.713.208-.712.689q0,1.772,0,3.544a.618.618,0,0,0,.7.706c1.181,0,2.361-.007,3.542,0a.622.622,0,0,0,.711-.7c.01-1.181,0-2.363,0-3.544,0-.5-.259-.718-.753-.706-.563.013-1.126,0-1.689,0" transform="translate(55.705 401.123)"></path><path d="M0,81.381a2.106,2.106,0,0,1,2.426-1.606c.98,0,1.96-.01,2.94,0A2,2,0,0,1,7.5,81.923q.016,1.607,0,3.214a1.976,1.976,0,0,1-2.137,2.131c-.962,0-1.926-.04-2.885.011A2.221,2.221,0,0,1,0,85.744Zm1.279,2.127c0,.582.01,1.164,0,1.745-.011.495.206.753.706.753,1.181,0,2.361.006,3.542,0a.622.622,0,0,0,.695-.712c-.01-1.181,0-2.363,0-3.544a.617.617,0,0,0-.706-.7c-1.163,0-2.325,0-3.488,0-.547,0-.732.2-.741.764s0,1.127,0,1.69" transform="translate(126.606 330.107)"></path><path d="M87.141,83.5a18.46,18.46,0,0,1-.131,2.218A1.767,1.767,0,0,1,85.2,87.2q-1.823.032-3.647,0a1.9,1.9,0,0,1-1.929-1.995q-.048-1.742,0-3.486a1.945,1.945,0,0,1,2.046-2q1.687-.035,3.375,0A1.95,1.95,0,0,1,87.1,81.86c0,.545,0,1.089,0,1.634l.036,0m-6.25-.052c0,.582.011,1.164,0,1.745a.641.641,0,0,0,.713.753c1.181.007,2.362,0,3.543,0a.627.627,0,0,0,.7-.713c0-1.182.006-2.363,0-3.545a.625.625,0,0,0-.711-.7c-1.181.007-2.362,0-3.543,0a.62.62,0,0,0-.695.709c0,.582,0,1.164,0,1.745" transform="translate(55.741 330.168)"></path></g></g></svg>',
  filterBy: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" class="absolute" aria-hidden="true"><g transform="translate(-125 -399.518)"><rect width="20" height="20" transform="translate(125 399.518)" fill="none"></rect><path d="M5.525,2.641a1.993,1.993,0,0,1-1.865,1.4A1.982,1.982,0,0,1,1.717,2.833a.407.407,0,0,0-.275-.183c-.221-.028-.448,0-.672-.011a.6.6,0,0,1-.612-.571A.578.578,0,0,1,.7,1.41c.243-.028.493,0,.735-.028A.41.41,0,0,0,1.715,1.2,1.981,1.981,0,0,1,3.593,0,2,2,0,0,1,5.464,1.218a.451.451,0,0,0,.345.165c1.838.01,3.675.007,5.513.007,1.036,0,2.073,0,3.109,0,.489,0,.742.235.733.645a.605.605,0,0,1-.549.6,2.516,2.516,0,0,1-.288,0h-8.8Zm-1.944.464A1.114,1.114,0,0,0,4.7,2.03a1.116,1.116,0,1,0-2.233,0A1.1,1.1,0,0,0,3.581,3.106" transform="translate(126.854 402.518)" fill="#1a1818"></path><path d="M13.575,79.324c.277,0,.555,0,.832,0a.608.608,0,1,1,0,1.216c-.267,0-.534,0-.729,0a6.7,6.7,0,0,1-.868,1.007A1.987,1.987,0,0,1,9.79,80.8a.394.394,0,0,0-.422-.266q-4.359.011-8.718,0a.625.625,0,0,1-.628-.436.6.6,0,0,1,.3-.707,1.053,1.053,0,0,1,.431-.072q4.3-.006,8.59,0a.415.415,0,0,0,.452-.273,1.908,1.908,0,0,1,1.84-1.14,1.958,1.958,0,0,1,1.814,1.14c.025.047.042.1.064.146s.037.074.062.123m-.863.594a1.1,1.1,0,1,0-1.095,1.13,1.116,1.116,0,0,0,1.095-1.13" transform="translate(127.002 329.617)" fill="#1a1818"></path><path d="M9.246,157.1c1.746,0,3.476,0,5.207,0a.624.624,0,0,1,.643.427.573.573,0,0,1-.269.716,1.084,1.084,0,0,1-.461.082q-2.4.008-4.808,0a.4.4,0,0,0-.432.264,1.919,1.919,0,0,1-1.835,1.149,1.926,1.926,0,0,1-1.829-1.161.378.378,0,0,0-.4-.253c-1.432.009-2.863.007-4.3,0a.591.591,0,0,1-.651-.707.623.623,0,0,1,.693-.517c1.432,0,2.863,0,4.3-.008a.419.419,0,0,0,.321-.16,2,2,0,0,1,1.987-1.232,1.972,1.972,0,0,1,1.8,1.318c.008.02.019.038.04.082m-1.929-.462A1.062,1.062,0,0,0,6.2,157.726a1.107,1.107,0,0,0,1.083,1.108,1.079,1.079,0,0,0,1.106-1.072,1.043,1.043,0,0,0-1.071-1.12" transform="translate(126.902 256.84)" fill="#1a1818"></path></g></svg>',
  sortBy: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" class="absolute" aria-hidden="true"><g transform="translate(-125 -399.518)"><rect width="20" height="20" transform="translate(125 399.518)" fill="none"></rect><g transform="translate(-9 -0.109)"><path d="M107.848,9.876V9.307c0-2.472,0-4.945.008-7.417,0-.215.08-.592.181-.613a2.841,2.841,0,0,1,1.067.015c.075.014.129.347.13.533.008,2.491.006,4.981.006,7.472v.579l.146.1c.378-.4.767-.8,1.131-1.217.238-.274.454-.294.656,0,.19.282.806.443.309.946-.781.789-1.558,1.582-2.354,2.355a.7.7,0,0,1-1.143.008c-.813-.782-1.6-1.591-2.4-2.384-.21-.207-.233-.394,0-.6a3.492,3.492,0,0,0,.347-.347c.213-.252.4-.251.628,0,.375.411.771.8,1.158,1.2l.136-.058" transform="translate(41.2 402.53)" fill="#1a1818"></path><path d="M6.662,2.387q-2.6,0-5.194,0c-.62,0-.738-.14-.752-.727C.7,1.121.976.982,1.466.984Q6.633,1,11.8.984c.488,0,.766.144.765.672,0,.557-.163.729-.763.73-1.713,0-3.426,0-5.139,0" transform="translate(134.362 402.752)" fill="#1a1818"></path><path d="M5.561,36.156c-1.366,0-2.733-.011-4.1.006-.492.006-.759-.148-.746-.682.015-.589.129-.722.752-.723,2.751,0,5.5,0,8.253-.005.484,0,.768.153.765.68,0,.544-.177.722-.771.724-1.385,0-2.769,0-4.154,0" transform="translate(134.363 372.705)" fill="#1a1818"></path><path d="M4.146,69.953c-.91,0-1.821-.011-2.731,0-.485.008-.7-.192-.692-.68.012-.563.138-.718.7-.72q2.758-.008,5.517,0c.573,0,.7.152.718.706.018.526-.23.706-.731.7-.928-.019-1.857-.006-2.786-.006" transform="translate(134.356 342.627)" fill="#1a1818"></path><path d="M3.158,102.378c.583,0,1.167,0,1.75,0,.5,0,.658.265.65.729s-.188.667-.655.663q-1.777-.016-3.555,0c-.476,0-.639-.222-.646-.669-.008-.465.145-.732.651-.724.6.009,1.2,0,1.8,0" transform="translate(134.376 312.531)" fill="#1a1818"></path></g></g></svg>',
  chevDown20: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><g transform="translate(21.999 22) rotate(180)" opacity="0.5"><rect width="20" height="20" transform="translate(21.999 22) rotate(-180)" fill="none"></rect><path d="M0,0,5,5l5-5Z" transform="translate(16.999 14.5) rotate(180)" opacity="0.995"></path></g></svg>',
  chevDown23: '<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" aria-hidden="true"><g transform="translate(23.432 23.058) rotate(180)" opacity="0.5"><rect width="23" height="23" transform="translate(0.432 0.058)" fill="none"></rect><path d="M0,0,4.989,4.989,9.978,0Z" transform="translate(16.432 14.601) rotate(180)" opacity="0.995"></path></g></svg>',
  pagePrev: '<svg style="transform: rotate(180deg);" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><g transform="translate(-0.872)"><path d="M0,0H24V24H0Z" transform="translate(0.872)" fill="none"></path><path stroke="black" d="M17.818,23.015,12.7,17.875l.725-.725,4.393,4.393,4.393-4.393.725.747Z" transform="translate(-7.143 29.7) rotate(-90)"></path></g></svg>',
  pageNext: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><g transform="translate(-0.872)"><path d="M0,0H24V24H0Z" transform="translate(0.872)" fill="none"></path><path stroke="black" d="M17.818,23.015,12.7,17.875l.725-.725,4.393,4.393,4.393-4.393.725.747Z" transform="translate(-7.143 29.7) rotate(-90)"></path></g></svg>',
};

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

function wrapNode(node, className) {
  const w = el('div', className);
  w.append(node);
  return w;
}

/** UI-only text (a runtime constant, never authored content). */
function label(tag, className, text) {
  const node = el(tag, className);
  node.textContent = text;
  return node;
}

function svgNode(markup) {
  const tpl = document.createElement('template');
  tpl.innerHTML = markup;
  return tpl.content.firstElementChild;
}

function mobButton(kind, text, icon) {
  const btn = el('button', `plp-mobbtn ${kind} sm-hidden`, { type: 'button' });
  const inner = el('div');
  inner.append(svgNode(icon), label('span', 'plp-mobbtn-label', text));
  const chev = el('span', 'plp-mobbtn-chev');
  chev.append(svgNode(SVG.chevDown20));
  inner.append(chev);
  btn.append(inner);
  return btn;
}

function buildToolbar(countNode) {
  const toolbar = el('div', 'plp-toolbar');
  const count = el('div', 'plp-toolbar-count');
  const qty = el('div', 'plp-quantity');
  if (countNode) qty.append(countNode);
  count.append(qty);
  const controls = el('div', 'plp-toolbar-controls');
  const shopBtn = mobButton('mob-shop-by-btn', LABELS.shop, SVG.shopBy);
  shopBtn.addEventListener('click', () => document.body.classList.add('mob-shop-by-open'));
  const filterBtn = mobButton('mob-filters-btn', LABELS.filter, SVG.filterBy);
  filterBtn.addEventListener('click', () => document.body.classList.add('mob-filters-open'));
  const sort = el('div', 'sort-by-filter');
  sort.append(label('div', 'sort-by-label sm-inline-flex', LABELS.sortBy));
  const mob = el('div', 'sort-by-mob sm-hidden');
  mob.append(svgNode(SVG.sortBy), label('span', 'plp-mobbtn-label', LABELS.sort));
  const mobChev = el('span', 'plp-mobbtn-chev');
  mobChev.append(svgNode(SVG.chevDown20));
  mob.append(mobChev);
  sort.append(mob);
  const select = el('select', 'sort-drop-down', { 'aria-label': 'Sort By' });
  SORT_OPTIONS.forEach(([value, text], i) => {
    const opt = label('option', '', text);
    opt.value = value;
    if (i === 0) opt.selected = true;
    select.append(opt);
  });
  sort.append(select);
  const chev = el('div', 'sort-by-chev sm-flex');
  chev.append(svgNode(SVG.chevDown23));
  sort.append(chev);
  controls.append(shopBtn, filterBtn, sort);
  toolbar.append(count, controls);
  return toolbar;
}

function buildCard({
  picture, heading, texts, promos,
}, openModal) {
  const col = el('div', 'plp-col');
  const card = el('div', 'product-card');
  const inner = heading.querySelector('a');
  const href = inner ? inner.getAttribute('href') : null;
  const link = href ? el('a', 'product-card-link', { href }) : el('div', 'product-card-link');
  if (inner) inner.replaceWith(...inner.childNodes); // EW6: no nested anchors, h3 keeps its index
  const top = el('div', 'product-card-top');
  const media = el('div', 'product-card-media');
  const frame = el('div', 'product-card-frame');
  if (picture) frame.append(picture);
  media.append(frame);
  top.append(media, wrapNode(heading, 'product-card-title'));
  const meta = el('div', 'product-card-meta');
  const metaInner = el('div');
  const [capacity, price, ...more] = texts;
  if (capacity) metaInner.append(wrapNode(capacity, 'product-card-capacity'));
  if (price) metaInner.append(wrapNode(price, 'product-card-price'));
  more.forEach((p) => metaInner.append(wrapNode(p, 'product-card-price')));
  meta.append(metaInner);
  link.append(top, meta);
  card.append(link);
  promos.forEach((p) => {
    const promo = el('div', 'green-promo');
    promo.append(wrapNode(p, 'green-promo-inner'));
    p.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', (e) => {
        if (openModal()) e.preventDefault(); // no modal authored → the link navigates instead
      });
    });
    card.append(promo);
  });
  col.append(card);
  return col;
}

function buildModal({ picture, texts }) {
  const modal = el('div', 'wd-modal hidden', { role: 'dialog', 'aria-modal': 'true' });
  const dialog = el('div', 'wd-modal-dialog');
  const content = el('div', 'wd-modal-content');
  const close = label('div', 'wd-modal-close', LABELS.close);
  close.setAttribute('role', 'button');
  close.setAttribute('tabindex', '0');
  close.setAttribute('aria-label', 'Close');
  const body = el('div', 'wd-modal-body');
  const center = el('div', 'wd-modal-center');
  if (picture) center.append(wrapNode(picture, 'wd-modal-img'));
  texts.forEach((p, i) => {
    let cls = 'wd-modal-p';
    if (i === 0) cls = 'wd-modal-title';
    else if (i === texts.length - 1 && texts.length > 2) cls = 'wd-modal-foot';
    center.append(wrapNode(p, cls));
  });
  body.append(center);
  content.append(close, body);
  dialog.append(content);
  modal.append(dialog);
  return modal;
}

function decoratePagination(list) {
  const pag = el('div', 'plp-pag');
  const outer = el('div');
  const inner = el('div', 'plp-pag-inner');
  inner.append(list);
  outer.append(inner);
  pag.append(outer);
  const params = new URLSearchParams(window.location.search);
  const current = params.get('page') || '1';
  if (current === '1') pag.classList.add('is-first-page');
  const items = [...list.children];
  items.forEach((li, i) => {
    const a = li.querySelector('a');
    if (i === 0 && a) li.prepend(svgNode(SVG.pagePrev));
    else if (i === items.length - 1 && a && items.length > 1) li.append(svgNode(SVG.pageNext));
    else if (a && a.textContent.trim() === current) a.setAttribute('aria-current', 'page');
  });
  return pag;
}

export default function decorate(block) {
  // 1. QUERY: classify every authored row by content.
  let countNode = null;
  const products = [];
  let modalRow = null;
  let pagination = null;
  const leftovers = [];
  [...block.children].forEach((row) => {
    const list = row.querySelector('ul, ol');
    const heading = row.querySelector('h1, h2, h3, h4, h5, h6');
    const picture = row.querySelector('picture, img');
    const paragraphs = [...row.querySelectorAll('p')]
      .filter((p) => !p.querySelector('picture, img'));
    if (list && !heading) {
      if (!pagination) pagination = list; else leftovers.push(list);
      paragraphs.forEach((p) => leftovers.push(p));
    } else if (heading) {
      products.push({
        picture,
        heading,
        texts: paragraphs.filter((p) => !p.querySelector('a')),
        promos: paragraphs.filter((p) => p.querySelector('a')),
      });
    } else if (picture) {
      if (!modalRow) modalRow = { picture, texts: paragraphs };
      else leftovers.push(picture, ...paragraphs);
    } else if (paragraphs.length) {
      if (!countNode) {
        [countNode] = paragraphs;
        paragraphs.slice(1).forEach((p) => leftovers.push(p));
      } else {
        paragraphs.forEach((p) => leftovers.push(p));
      }
    }
  });

  // 2. CREATE the layout (products.css .productListcontainer).
  const container = el('div', 'product-list-container');
  const grid = el('div', 'plp-grid');
  const modal = modalRow ? buildModal(modalRow) : null;
  const openModal = () => {
    if (!modal) return false;
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    return true;
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  // 3. MOVE the authored elements into their slots.
  container.append(buildToolbar(countNode));
  products.forEach((p) => grid.append(buildCard(p, openModal)));
  container.append(grid);
  if (modal) {
    container.append(modal);
    const close = modal.querySelector('.wd-modal-close');
    close.addEventListener('click', closeModal);
    close.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') closeModal(); });
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  }
  if (pagination) container.append(decoratePagination(pagination));
  if (leftovers.length) {
    const rest = el('div', 'plp-leftovers');
    leftovers.forEach((n) => rest.append(n));
    container.append(rest);
  }
  block.replaceChildren(container);
}
