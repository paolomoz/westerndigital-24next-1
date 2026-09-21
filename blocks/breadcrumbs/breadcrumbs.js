/**
 * breadcrumbs — the page trail (template-slotted, #95). Shared by products and solutions.
 *
 * Schema: stardust/eds-schema/products.json § breadcrumbs · solutions.json § page-nav.
 * Authoring: ONE row, ONE cell holding a <ul> — <li><a href="/">Home</a></li> … <li>Current</li>.
 *   The last item is plain text (the current page). The list is one editable unit (EW5, fourth
 *   shape).
 * DOM = products.css .crumbs__row / .crumbs__item / .crumbs__current with the authored <ul> MOVED
 *   into the container (EW1); the chevron between items is a CSS ::after (the source chevron svg
 *   as a data URI).
 * D1 BREADCRUMB advisory accepted in the conversion log (replica fidelity; follow-up: a
 *   buildAutoBlocks
 * builder with the /nav label map — outside this wave's remit).
 */
export default function decorate(block) {
  const list = block.querySelector('ul, ol');
  const leftovers = [...block.querySelectorAll('p, h1, h2, h3, h4, h5, h6')];

  const wrap = document.createElement('div');
  wrap.className = 'breadcrumbs-wrap';
  const nav = document.createElement('nav');
  nav.className = 'crumbs';
  nav.setAttribute('aria-label', 'Breadcrumb');

  if (list) nav.append(list);
  leftovers.forEach((n) => nav.append(n)); // off-pipeline shapes degrade to visible default styling

  wrap.append(nav);
  block.replaceChildren(wrap);
}
