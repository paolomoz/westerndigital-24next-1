/**
 * hero — full-bleed background picture + heading / title + lede (+ CTA / media column).
 *
 * Shared core (ONE owner: the products worker). The skin is a VARIANT CLASS on the block, never
 * a per-variant JS file (deploy reference/block-agents-brief.md § Shared cores and variants):
 *   banner — products category banner   (products.json § hero;       products.css  .plp-hero*)
 *   photo  — solutions program hero     (solutions.json § hero;      solutions.css .sol-hero*)
 *   split  — company hero, text | media (company.json § hero;        company.css   .co-hero*)
 *   band   — solutions innovation band  (solutions.json § innovation; solutions.css .sol-innov*)
 *
 * Authoring (any row / cell layout — content is QUERIED, never indexed, #42 / #62):
 *   picture 1                  → background layer (.hero-bg; eager LCP image, reserved min-height)
 *   picture 2 (split only)     → the media column's stacked mobile image (.hero-media)
 *   h1                         → .headline — the page's single <h1>, moved as authored (#55, EW1)
 *   band: first link-free <p>  → .headline (the band title is a bold paragraph on the source)
 *   remaining link-free <p>    → .lede
 *   <p> holding <a>            → .actions — banner: plain text link (underlined, no button marks);
 *                                band: <em><a> secondary button (decorateButtons ran before us)
 *   any other authored element → appended to .hero-text (leftovers pass — nothing vanishes)
 *
 * Editability (EW1–EW3): every authored element is MOVED into generated wrappers; the wrappers
 * carry the layout classes and are styled with descendant selectors; CTAs move as their <p>.
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

const VARIANTS = ['banner', 'photo', 'split', 'band'];

export default function decorate(block) {
  const variant = VARIANTS.find((v) => block.classList.contains(v)) || 'banner';
  if (!block.classList.contains(variant)) block.classList.add(variant);

  // 1. QUERY content and capture every traversal start before moving anything (#42, EW1).
  let pics = [...block.querySelectorAll('picture')];
  if (!pics.length) pics = [...block.querySelectorAll('img')];
  const heading = block.querySelector('h1, h2, h3, h4, h5, h6');
  const paragraphs = [...block.querySelectorAll('p')]
    .filter((p) => !p.querySelector('picture, img'));
  const ctas = paragraphs.filter((p) => p.querySelector('a'));
  const texts = paragraphs.filter((p) => !p.querySelector('a'));
  let title = heading;
  let ledes = texts;
  if (!title && texts.length) [title, ...ledes] = texts; // band: bold-paragraph title
  const others = [...block.querySelectorAll('ul, ol, blockquote, table')];

  // 2. CREATE the wrappers that carry the prototype's layout classes.
  const bg = el('div', 'hero-bg');
  const wrap = el('div', 'hero-wrap');
  const row = el('div', 'hero-row');
  const col = el('div', 'hero-col');
  const text = el('div', 'hero-text');

  // 3. MOVE the authored nodes (never textContent / innerHTML / cloneNode).
  const [bgPic, mediaPic] = pics;
  if (bgPic) {
    const img = bgPic.matches('img') ? bgPic : bgPic.querySelector('img');
    if (img) {
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
    }
    bg.append(bgPic);
  }
  if (title) text.append(wrapNode(title, 'headline'));
  ledes.forEach((p) => text.append(wrapNode(p, 'lede')));
  others.forEach((n) => text.append(n));
  col.append(text);
  if (ctas.length) {
    const actions = el('div', 'actions');
    ctas.forEach((p) => actions.append(p)); // EW3: the CTA moves as its paragraph
    col.append(actions);
  }
  row.append(col);
  if (variant === 'split') {
    const media = el('div', 'hero-media');
    const inner = el('div', 'hero-media-inner');
    if (mediaPic) inner.append(mediaPic);
    media.append(inner);
    row.append(media);
  }
  wrap.append(row);

  // 4. Assemble. The band keeps its image inside the rounded box (sol-innov: bg is a flex child).
  if (variant === 'band') {
    row.prepend(bg);
    block.replaceChildren(wrap);
  } else {
    block.replaceChildren(bg, wrap);
  }
}
