/**
 * anchor-nav — in-page anchor chips under the breadcrumb trail (solutions page-nav;
 *   template-slotted,
 * #95).
 *
 * Schema: stardust/eds-schema/solutions.json § page-nav (DIV.sol-chips__col × 4 — the section also
 *   holds
 * the `breadcrumbs` block, authored before this one).
 * Authoring: ONE row, ONE cell holding a <ul> of in-page links —
 *   <li><a href="#choose-your-solution">Choose Your Solution</a></li> … <li><a
 *   href="#faq">FAQs</a></li>
 *   (hrefs verbatim from the source; the target sections carry a section-metadata `id` row and the
 *   owning block copies `data-id` onto the section id). The list is ONE editable unit (EW5, fourth
 *   shape). The chevron glyph in front of every label is a CSS ::before (the source's inline 15×17
 *   svg
 *   as a data URI) — nothing is injected into the authored list.
 * DOM = solutions.css .sol-chips / .sol-chips__col / .sol-chip with the authored <ul> MOVED into a
 *   <nav>
 *   (EW1); .anchor-nav-wrap is the lifted container (.contain: 1140 / 0 16 / auto). Visual spec:
 *   stardust/prototypes/solutions-proposed.html .sol-nav + solutions.css § 2.
 * Runtime words: none displayed (the <nav> aria-label only).
 */
export default function decorate(block) {
  const list = block.querySelector('ul, ol');
  const leftovers = [...block.querySelectorAll('p, h1, h2, h3, h4, h5, h6')];

  const wrap = document.createElement('div');
  wrap.className = 'anchor-nav-wrap';
  const nav = document.createElement('nav');
  nav.className = 'chips';
  nav.setAttribute('aria-label', 'On this page');

  if (list) nav.append(list);
  leftovers.forEach((n) => nav.append(n)); // off-pipeline shapes degrade to visible default styling

  wrap.append(nav);
  block.replaceChildren(wrap);
}
