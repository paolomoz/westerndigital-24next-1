/**
 * cards — the home page's card units in a horizontal rail (variants `content`, `promo`, `resource`)
 * and the "About WD" link-tile row (variant `about`). ONE decode, four skins (D9).
 *
 * Schema: stardust/eds-schema/index.json § content-rail / promo-rail / resource-rail
 *    (LI.rail__slide)
 * and § about (DIV.about__item). Visual spec: stardust/prototypes/index-proposed.html bands 3–5 and
 *    7,
 * index.css § card carousels / business / about. The section head (<h2>) is default content BEFORE
 * the block in the same section, styled in place by cards.css (`.cards-container .default-content-
 * wrapper`) — no reabsorption. The source's rail arrows are dead on live and are not rendered.
 *
 * Authoring rows — ONE row per card, [picture (optional) | text]; the text cell's shape decides the
 * unit (classified by content, never by index):
 *   content  <p>EYEBROW</p> <h3>Title</h3> <p><em><a>CTA</a></em></p>   — a card WITHOUT a picture
 *            paints the navy ground (the source's ccard--navy)
 *   promo    editorial card: <p><strong>Title</strong></p> <p>lede</p> <p><a>Learn More</a></p>
 *            product card:   <p><a href>Product name</a></p> <p>Capacity:
 *    <strong>4TB-26TB</strong></p>
 *                            <p>Starting at <strong>$299.99</strong></p>  — the FIRST paragraph is
 *    a
 *            link and there is no heading → the whole card becomes that link (EW6: the inner anchor
 *    is
 *            unwrapped in the live DOM, the paragraph stays editable)
 *   resource <p>Case Study</p> <h3>Title</h3> <p><a>Read More</a></p>  (picture = the icon)
 *   about    <p><a href>Label</a></p>  — whole-tile link (EW6)
 * A link paragraph that FOLLOWS other text is the card's CTA and moves as its <p> (EW3).
 * The `promo` rail ends with an empty 64 px spacer slide on the source (Splide lastSlide,
 *    off-screen
 * at 1440 and 360) — rendered as a presentational <li class="spacer"> with no content.
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

function readCard(row) {
  const cells = [...row.children];
  const mediaCell = cells.find((c) => pic(c) && !text(c)) || null;
  const media = mediaCell ? pic(mediaCell) : (cells.map((c) => pic(c)).find(Boolean) || null);
  const nodes = cells.filter((c) => c !== mediaCell).flatMap(cellNodes)
    .filter((n) => n !== media && !n.contains(media));
  const heading = nodes.find(isHeading) || null;
  const first = nodes[0] || null;
  const cardLink = first && !heading && isLinkPara(first) ? first : null;
  const rest = nodes.filter((n) => n !== heading && n !== cardLink);
  const cta = !cardLink ? (rest.find(isLinkPara) || null) : null;
  const prose = rest.filter((n) => n !== cta);
  // a leading paragraph before the heading (or a leading <strong>-led paragraph) is the eyebrow /
  // title
  const titlePara = !heading && !cardLink && prose[0] && prose[0].querySelector(':scope > strong')
    ? prose[0] : null;
  const eyebrow = heading && prose[0] && nodes.indexOf(prose[0]) < nodes.indexOf(heading)
    ? prose[0] : null;
  const body = prose.filter((n) => n !== titlePara && n !== eyebrow);
  return {
    media, heading, eyebrow, titlePara, cardLink, cta, body,
  };
}

function buildCard(c, variant) {
  let card;
  if (c.cardLink) {
    const a = c.cardLink.querySelector('a');
    card = document.createElement('a');
    card.href = a.getAttribute('href');
    if (a.getAttribute('title')) card.title = a.getAttribute('title');
    const external = /^https?:/.test(card.href) && new URL(card.href).origin !== window.location.origin;
    if (external) card.rel = 'noopener';
    a.replaceWith(...a.childNodes); // EW6: the indexed <p> survives inside the card link
  } else {
    card = document.createElement('div');
  }
  card.className = 'card';
  if (variant === 'content' && !c.media) card.classList.add('navy');
  if (c.cardLink) card.classList.add('linked');
  if (c.titlePara) card.classList.add('editorial');

  const layered = variant === 'content' || (variant === 'promo' && !c.cardLink);
  if (layered) {
    const bg = document.createElement('div');
    bg.className = 'card-bg';
    if (c.media) bg.append(c.media);
    card.append(bg);
  } else if (c.media) {
    card.append(wrapNode(c.media, 'card-media'));
  }

  const bodyEl = document.createElement('div');
  bodyEl.className = 'card-body';
  if (c.eyebrow) bodyEl.append(wrapNode(c.eyebrow, 'eyebrow'));
  if (c.heading) bodyEl.append(wrapNode(c.heading, 'title'));
  if (c.titlePara) bodyEl.append(wrapNode(c.titlePara, 'title'));
  if (c.cardLink) bodyEl.append(wrapNode(c.cardLink, c.body.length ? 'name' : 'label'));
  if (c.body.length) {
    if (c.cardLink) c.body.forEach((n) => bodyEl.append(wrapNode(n, 'meta')));
    else {
      const b = document.createElement('div');
      b.className = 'body';
      b.append(...c.body);
      bodyEl.append(b);
    }
  }
  if (c.cta) bodyEl.append(wrapNode(c.cta, 'actions'));
  card.append(bodyEl);
  return card;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;
  const variant = ['content', 'promo', 'resource', 'about']
    .find((v) => block.classList.contains(v)) || 'content';
  const cards = rows.map(readCard);

  const list = document.createElement('ul');
  list.className = 'list';
  list.setAttribute('role', 'presentation');
  cards.forEach((c, i) => {
    const li = document.createElement('li');
    li.className = 'unit';
    li.setAttribute('aria-label', `${i + 1} of ${cards.length}`);
    li.append(buildCard(c, variant));
    list.append(li);
  });
  if (variant === 'promo') {
    const spacer = document.createElement('li');
    spacer.className = 'unit spacer';
    spacer.setAttribute('aria-hidden', 'true');
    list.append(spacer);
  }

  if (variant === 'about') {
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    wrap.append(list);
    block.replaceChildren(wrap);
    return;
  }
  const rail = document.createElement('div');
  rail.className = 'rail';
  const inner = document.createElement('div');
  inner.className = 'rail-inner';
  const track = document.createElement('div');
  track.className = 'track';
  track.append(list);
  inner.append(track);
  rail.append(inner);
  block.replaceChildren(rail);
}
