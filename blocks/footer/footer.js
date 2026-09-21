/**
 * footer — westerndigital.com replica chrome (template-slotted, #95).
 *
 * Authored document /footer (content/footer.html), one section per band:
 *   1. top     : <p><a>:wd-footer-logo:</a></p> ·
 *                <p>Country/Region: <strong><a>United States</a></strong></p>
 *   2. columns : four (<p> title, <ul> links) pairs — Shopping / Programs / Company / Support
 *   3. support : <p> store-support lines · <ul> social icon links (:instagram: …)
 *   4. badge   : <p><a><img Ethisphere badge></a></p>
 *   5. legal   : <ul> legal links · <p> copyright
 *
 * DOM = stardust/prototypes/index-proposed.html <footer> with the authored elements MOVED into
 * the
 * role slots; CSS = canon.css § footer, ported to footer.css. The support text, social row and
 * badge
 * live inside the fourth column on the source (lift) — the block slots sections 3 and 4 there.
 * No behaviour: the source footer accordion is dead on live (chrome matrix footer-accordion: dead).
 */
import { getMetadata, loadCSS } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function contentOf(section) {
  // the authored elements of a fragment section (inside its default-content-wrapper)
  return section ? [...section.querySelectorAll(':scope > div > *, :scope > p, :scope > ul')] : [];
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  await loadCSS(`${window.hlx.codeBasePath}/blocks/fragment/fragment.css`);
  const fragment = await loadFragment(footerPath);
  if (!fragment) return;

  const [
    topSection, colsSection, supportSection, badgeSection, legalSection,
  ] = [...fragment.children];
  block.textContent = '';

  const footer = el('div', 'site-footer');

  // band 1: brand + region
  const main = el('div', 'footer-main');
  const contain = el('div', 'contain');
  const top = el('div', 'footer-top');
  const brand = el('div', 'footer-top-brand');
  const logo = el('div', 'footer-logo');
  const region = el('div', 'footer-top-region');
  const regionRow = el('div', 'row');
  const topNodes = contentOf(topSection);
  topNodes.forEach((n, i) => { if (i === 0) logo.append(n); else regionRow.append(n); });
  brand.append(logo);
  region.append(regionRow);
  top.append(brand, region);
  contain.append(top);

  // band 2: link columns (title p + ul pairs)
  const cols = el('div', 'footer-cols');
  const columns = [];
  let current = null;
  contentOf(colsSection).forEach((n) => {
    if (n.tagName !== 'UL' || !current) {
      current = el('div', 'footer-col');
      const inner = el('div', 'footer-col-inner');
      current.append(inner);
      columns.push(current);
    }
    if (n.tagName === 'P') n.classList.add('footer-col-title');
    if (n.tagName === 'UL') n.classList.add('footer-col-list');
    current.firstElementChild.append(n);
  });
  columns.forEach((c, i) => {
    if (i === 0) c.classList.add('footer-col-first');
    if (i === columns.length - 1) c.classList.add('footer-col-support');
    cols.append(c);
  });
  contain.append(cols);

  // band 3 + 4 slot into the last column (lift: support text, social row, award badge)
  const last = columns.length ? columns[columns.length - 1].firstElementChild : cols;
  const supportNodes = contentOf(supportSection);
  supportNodes.forEach((n) => {
    if (n.tagName === 'UL') {
      const wrap = el('div', 'footer-social-wrap');
      const social = el('div', 'footer-social');
      n.classList.add('footer-social-list');
      social.append(n);
      wrap.append(social);
      last.append(wrap);
    } else {
      const support = el('div', 'footer-support');
      n.classList.add('footer-support-text');
      support.append(n);
      last.append(support);
    }
  });
  const badgeNodes = contentOf(badgeSection);
  if (badgeNodes.length) {
    const award = el('div', 'footer-award');
    badgeNodes.forEach((n) => award.append(n));
    last.append(award);
  }

  main.append(contain);
  footer.append(main);

  // band 5: legal
  const legal = el('div', 'footer-legal');
  const legalContain = el('div', 'contain');
  contentOf(legalSection).forEach((n) => {
    if (n.tagName === 'UL') {
      const links = el('div', 'footer-legal-links');
      links.append(n);
      legalContain.append(links);
    } else {
      const copy = el('div', 'footer-legal-copy');
      copy.append(n);
      legalContain.append(copy);
    }
  });
  legal.append(legalContain);
  footer.append(legal);

  block.append(footer);
}
