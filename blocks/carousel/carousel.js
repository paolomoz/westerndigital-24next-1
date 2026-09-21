/**
 * carousel — home hero rotator (variant `hero`): full-bleed slides with a background picture,
 * a title, a lede and one CTA; a four-item progress bar over the lower band drives the slide
 * (click / Enter / Space) and fills over the 6 s autoplay interval.
 *
 * Schema: stardust/eds-schema/index.json § hero-carousel (repeat unit LI.hero__slide +
 *    DIV.hero__item).
 * Visual spec: stardust/prototypes/index-proposed.html #hero, index.css § hero carousel, index.js §
 *    hero.
 *
 * Authoring rows — ONE row per slide, three cells (classified by content, never by index):
 *   1. background picture (optional — a slide without a picture paints the black ground, no scrim)
 *   2. copy: <p>title</p> <p>lede</p> <p><em><strong><a>CTA</a></strong></em></p>
 *      (accent = the source's white button; decorateButtons has already classed it a.button.accent)
 *   3. progress label: <p><strong>short title</strong></p> <p>one-line description</p>
 * The source renders the slide titles as <p class="h1-hero"> (no heading semantics), so they are
 * authored as <p>; the page <h1> is default content in the tabs section (schema hasH1).
 * DA-flattened fallback: when copy and label arrive in ONE cell, the paragraphs up to and including
 * the CTA are the copy, the rest is the label.
 *
 * Loop clones (two each side, as the source's Splide loop) are IMAGE-ONLY: no text, alt "", no href
 * (AI-readability #100) and stripped of editor indices (EW4). Autoplay: 6000 ms per slide (observed
 * stepping, stardust/replica/motion/index.json), fill width 0→100 %, list translateX steps of one
 * slide with a 0.4 s ease (`.is-moving`); off under prefers-reduced-motion and while the document
 *    is
 * hidden. The source's arrows are dead on live and are not rendered. Nothing is measured in
 * decorate() (transforms are percentages).
 */

const INTERVAL = 6000;
const STEP = 50;
const CLONES = 2;

// ── Experience Workspace helpers (EW1–EW4) — copied into every block, no shared import ──
function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}
function stripInstrumentation(el) {
  el.querySelectorAll('[data-prose-index], [data-image-index]').forEach((n) => {
    n.removeAttribute('data-prose-index');
    n.removeAttribute('data-image-index');
  });
  el.removeAttribute('data-prose-index');
  return el;
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

function readSlide(row) {
  const cells = [...row.children];
  const mediaCell = cells.find((c) => pic(c) && !text(c)) || null;
  const media = mediaCell ? pic(mediaCell) : (cells.map((c) => pic(c)).find(Boolean) || null);
  // an EMPTY picture cell (slide without a background) must not shift the copy/label cells
  const textCells = cells.filter((c) => c !== mediaCell && (text(c) || pic(c)));
  const isCta = (el) => el.tagName === 'P' && el.querySelector('a')
    && text(el) === text(el.querySelector('a'));
  let copy = [];
  let label = [];
  if (textCells.length >= 2) {
    copy = cellNodes(textCells[0]).filter((n) => n !== media && !n.contains(media));
    label = cellNodes(textCells[1]);
  } else if (textCells.length === 1) {
    const nodes = cellNodes(textCells[0]).filter((n) => n !== media && !n.contains(media));
    const ctaAt = nodes.findIndex(isCta);
    copy = ctaAt >= 0 ? nodes.slice(0, ctaAt + 1) : nodes;
    label = ctaAt >= 0 ? nodes.slice(ctaAt + 1) : [];
  }
  const cta = copy.find(isCta) || null;
  const prose = copy.filter((n) => n !== cta);
  return {
    media, title: prose[0] || null, lede: prose.slice(1), cta, label,
  };
}

function buildSlide(s, i, n) {
  const li = document.createElement('li');
  li.className = 'slide';
  li.setAttribute('role', 'group');
  li.setAttribute('aria-roledescription', 'slide');
  li.setAttribute('aria-label', `${i + 1} of ${n}`);
  const panel = document.createElement('div');
  panel.className = 'panel';
  if (s.media) {
    const bg = wrapNode(s.media, 'bg');
    if (i === 0) s.media.querySelectorAll('img').forEach((img) => { img.loading = 'eager'; });
    panel.append(bg);
  }
  const contain = document.createElement('div');
  contain.className = 'contain';
  const row = document.createElement('div');
  row.className = 'row';
  const col = document.createElement('div');
  col.className = 'col';
  if (s.title) col.append(wrapNode(s.title, 'title'));
  if (s.lede.length) {
    const lede = document.createElement('div');
    lede.className = 'lede';
    lede.append(...s.lede);
    col.append(lede);
  }
  if (s.cta) col.append(wrapNode(s.cta, 'actions'));
  row.append(col);
  contain.append(row);
  panel.append(contain);
  li.append(panel);
  return li;
}

function buildClone(li) {
  const c = document.createElement('li');
  c.className = 'slide clone';
  c.setAttribute('aria-hidden', 'true');
  const panel = document.createElement('div');
  panel.className = 'panel';
  const bg = li.querySelector('.bg');
  if (bg) {
    const copy = stripInstrumentation(bg.cloneNode(true));
    copy.querySelectorAll('img').forEach((img) => { img.alt = ''; img.loading = 'lazy'; });
    panel.append(copy);
  }
  c.append(panel);
  return c;
}

function buildItem(s, i) {
  const item = document.createElement('div');
  item.className = 'item';
  item.setAttribute('role', 'button');
  item.tabIndex = 0;
  const track = document.createElement('span');
  track.className = 'item-track';
  const fill = document.createElement('span');
  fill.className = 'item-fill';
  track.append(fill);
  item.append(track);
  if (s.label.length) {
    const label = document.createElement('div');
    label.className = 'item-label';
    label.append(wrapNode(s.label[0], 'item-title'));
    if (s.label.length > 1) {
      const desc = document.createElement('div');
      desc.className = 'item-desc';
      desc.append(...s.label.slice(1));
      label.append(desc);
    }
    item.append(label);
  }
  item.dataset.slide = String(i);
  return item;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;
  const slides = rows.map(readSlide);
  const n = slides.length;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const track = document.createElement('div');
  track.className = 'track';
  const list = document.createElement('ul');
  list.className = 'list';
  list.setAttribute('role', 'presentation');
  const real = slides.map((s, i) => buildSlide(s, i, n));
  const before = real.slice(-CLONES).map(buildClone);
  const after = real.slice(0, CLONES).map(buildClone);
  list.append(...before, ...real, ...after);
  track.append(list);

  const progress = document.createElement('div');
  progress.className = 'progress';
  const bars = document.createElement('div');
  bars.className = 'bars';
  const items = slides.map(buildItem);
  bars.append(...items);
  progress.append(bars);

  block.replaceChildren(track, progress);

  // ── state machine (mirrors index.js § hero: translateX steps, is-active/is-visible, fill widths)
  // ──
  const offset = before.length;
  let idx = 0;
  let elapsed = 0;
  let wrapping = false;
  const paint = (animate) => {
    list.classList.toggle('is-moving', !!animate && !reduced.matches);
    real.forEach((li, k) => {
      const active = k === idx;
      li.classList.toggle('is-active', active);
      li.classList.toggle('is-visible', active);
      if (active) li.removeAttribute('aria-hidden'); else li.setAttribute('aria-hidden', 'true');
    });
    items.forEach((it, k) => {
      it.classList.toggle('is-active', k === idx);
      it.setAttribute('aria-pressed', k === idx ? 'true' : 'false');
      const fill = it.querySelector('.item-fill');
      if (fill) fill.style.width = k < idx ? '100%' : '0%';
    });
  };
  const goTo = (i, animate) => {
    elapsed = 0;
    if (i >= n && after.length) {
      // forward wrap: slide into the first clone, then jump to the real first slide without motion
      idx = 0;
      wrapping = true;
      paint(animate);
      list.style.transform = `translateX(${-(offset + n) * 100}%)`;
      const settle = () => {
        if (!wrapping) return;
        wrapping = false;
        list.classList.remove('is-moving');
        list.style.transform = `translateX(${-offset * 100}%)`;
      };
      if (animate && !reduced.matches) {
        list.addEventListener('transitionend', settle, { once: true });
        window.setTimeout(settle, 600);
      } else settle();
      return;
    }
    idx = ((i % n) + n) % n;
    wrapping = false;
    paint(animate);
    list.style.transform = `translateX(${-(offset + idx) * 100}%)`;
  };
  goTo(0, false);

  items.forEach((it, k) => {
    it.addEventListener('click', () => goTo(k, true));
    it.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(k, true); }
    });
  });

  if (n > 1 && !reduced.matches) {
    const timer = window.setInterval(() => {
      if (!block.isConnected) { window.clearInterval(timer); return; }
      if (document.hidden || wrapping) return;
      elapsed += STEP;
      const p = Math.min(1, elapsed / INTERVAL);
      const fill = items[idx] && items[idx].querySelector('.item-fill');
      if (fill) fill.style.width = `${(p * 100).toFixed(2)}%`;
      if (p >= 1) goTo(idx + 1, true);
    }, STEP);
  }
}
