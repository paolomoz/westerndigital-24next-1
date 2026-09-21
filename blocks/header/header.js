/**
 * header — westerndigital.com replica chrome (template-slotted, #95).
 *
 * Authored document /nav (content/nav.html), four sections — the stock header contract
 * (brand / sections / tools) plus the promo strip the block slots ABOVE the nav row:
 *   1. brand   : <p><a href="/">:wd-logo:</a></p>
 *   2. sections: ONE <ul>; top-level <li> = trigger text + nested <ul> of groups;
 *                group <li> = label text + one or more <ul> (panel columns) of <li><a>;
 *                a trailing group-less <li> holding <p>s (+ CTA paragraphs) is the promo cell
 *   3. tools   : <p> flyout title · <p><strong><a> Sign In · <p><em><a> Create Account ·
 *                <p> other-accounts title · <ul> other-account links · <p><a> cart link
 *   4. promo   : <p> campaign line (with its link) · <p> shop | business links
 *
 * DOM = stardust/prototypes/index-proposed.html <header> with the authored elements MOVED into the
 * role slots (never copied); CSS = canon.css § header, ported to header.css. Behaviours observed on
 * live (chrome-states.json, index.js): desktop hover → sliding underline only (panels never open on
 * live at 1440); sign-in flyout on click; search expands on click and submits to the source host;
 * ≤767 hamburger drawer with drill (panel expands, group rows expand). The stock hamburger /
 * aria-expanded / isDesktop machinery is kept; isDesktop is the LIFTED chrome breakpoint (768).
 *
 * Words this block adds: search placeholder/labels, "Clear", "Skip to main content" — chrome UI
 * strings (in-code defaults, D14), not page content.
 */
import { getMetadata, loadCSS } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width (lifted chrome breakpoint, canon.css)
const isDesktop = window.matchMedia('(min-width: 768px)');
const SEARCH_ACTION = 'https://www.westerndigital.com/search';
const SEARCH_PLACEHOLDER = 'What can we help you find?';

const SVG = {
  user: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M16.1998 17.1V15.3C16.1998 14.3452 15.8205 13.4296 15.1454 12.7544C14.4702 12.0793 13.5546 11.7 12.5998 11.7H5.3998C4.44502 11.7 3.52935 12.0793 2.85422 12.7544C2.17909 13.4296 1.7998 14.3452 1.7998 15.3V17.1" stroke="black" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.99843 8.10001C10.9867 8.10001 12.5984 6.48824 12.5984 4.50002C12.5984 2.5118 10.9867 0.900024 8.99843 0.900024C7.01021 0.900024 5.39844 2.5118 5.39844 4.50002C5.39844 6.48824 7.01021 8.10001 8.99843 8.10001Z" stroke="black" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cart: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none" aria-hidden="true"><path d="M9.08108 16.625C9.08108 16.9013 8.99915 17.1714 8.84564 17.4012C8.69213 17.6309 8.47393 17.81 8.21866 17.9157C7.96338 18.0215 7.68247 18.0491 7.41147 17.9952C7.14047 17.9413 6.89154 17.8082 6.69615 17.6129C6.50077 17.4175 6.36772 17.1686 6.31381 16.8975C6.2599 16.6265 6.28757 16.3456 6.39331 16.0904C6.49905 15.8351 6.67811 15.6169 6.90786 15.4634C7.13761 15.3099 7.40771 15.2279 7.68402 15.2279C8.05455 15.2279 8.40989 15.3751 8.67189 15.6371C8.93389 15.8991 9.08108 16.2545 9.08108 16.625ZM16.7649 15.2279C16.4886 15.2279 16.2185 15.3099 15.9887 15.4634C15.759 15.6169 15.5799 15.8351 15.4742 16.0904C15.3685 16.3456 15.3408 16.6265 15.3947 16.8975C15.4486 17.1686 15.5817 17.4175 15.777 17.6129C15.9724 17.8082 16.2214 17.9413 16.4924 17.9952C16.7634 18.0491 17.0443 18.0215 17.2995 17.9157C17.5548 17.81 17.773 17.6309 17.9265 17.4012C18.08 17.1714 18.162 16.9013 18.162 16.625C18.162 16.2545 18.0148 15.8991 17.7528 15.6371C17.4908 15.3751 17.1354 15.2279 16.7649 15.2279ZM20.9308 4.23832L18.692 12.2959C18.5689 12.736 18.3056 13.124 17.9421 13.401C17.5786 13.6781 17.1346 13.829 16.6776 13.8309H8.04726C7.58888 13.8307 7.14314 13.6805 6.77803 13.4034C6.41292 13.1263 6.14847 12.7373 6.02502 12.2959L2.96197 1.25735H1.39726C1.212 1.25735 1.03432 1.18375 0.903325 1.05275C0.772325 0.921755 0.69873 0.744081 0.69873 0.55882C0.69873 0.373558 0.772325 0.195885 0.903325 0.0648851C1.03432 -0.0661146 1.212 -0.139709 1.39726 -0.139709H3.49285C3.64557 -0.139739 3.79408 -0.0897196 3.91567 0.00269111C4.03725 0.0951018 4.1252 0.224811 4.16606 0.371963L4.99381 3.35294H20.2576C20.3652 3.35292 20.4715 3.37779 20.568 3.42563C20.6644 3.47346 20.7486 3.54295 20.8137 3.62867C20.8789 3.7144 20.9234 3.81403 20.9437 3.91978C20.964 4.02554 20.9596 4.13456 20.9308 4.23832ZM19.3381 4.75H5.38237L7.37405 11.9221C7.4149 12.0693 7.50285 12.199 7.62444 12.2914C7.74602 12.3838 7.89454 12.4338 8.04726 12.4338H16.6776C16.8303 12.4338 16.9788 12.3838 17.1004 12.2914C17.222 12.199 17.3099 12.0693 17.3508 11.9221L19.3381 4.75Z" fill="black"/></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M8.0999 15.3C12.0763 15.3 15.2999 12.0765 15.2999 8.10002C15.2999 4.12357 12.0763 0.900024 8.0999 0.900024C4.12345 0.900024 0.899902 4.12357 0.899902 8.10002C0.899902 12.0765 4.12345 15.3 8.0999 15.3Z" stroke="black" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.1005 17.1L13.1855 13.185" stroke="black" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  close: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 1.4L12.6 0L7 5.6L1.4 0L0 1.4L5.6 7L0 12.6L1.4 14L7 8.4L12.6 14L14 12.6L8.4 7L14 1.4Z" fill="black"/></svg>',
};

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

function svgButton(className, label, icon, attrs = {}) {
  const b = el('button', className, {
    type: 'button', 'aria-label': label, ...attrs,
  });
  b.innerHTML = SVG[icon];
  return b;
}

// Presentational clones (drawer user bar, drawer business block) keep no editor indices (EW4).
function stripInstrumentation(node) {
  node.querySelectorAll('[data-prose-index], [data-image-index]').forEach((n) => {
    n.removeAttribute('data-prose-index');
    n.removeAttribute('data-image-index');
  });
  node.removeAttribute('data-prose-index');
  return node;
}

// #98: on live the pipeline wraps a list item's leading link in <p>; the harness shape is <li><a>.
function directLink(li) {
  return li.querySelector(':scope > a, :scope > p > a');
}

function leadingTextNodes(li) {
  return [...li.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
}

/* ---------- stock machinery (hamburger / aria-expanded / isDesktop), restyled ---------- */

function toggleAllNavSections(sections, expanded = false) {
  if (!sections) return;
  sections.querySelectorAll('.navbar-menu > li.navbar-item').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
    section.classList.toggle('is-open', expanded === true || expanded === 'true');
  });
}

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const navSections = nav.closest('.navbar-nav');
    const navSectionExpanded = navSections.querySelector('.navbar-item[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      toggleAllNavSections(navSections);
      navSectionExpanded.querySelector('.navbar-trigger').focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      navSections.querySelector('.navbar-hamburger').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  const toHamburger = e.relatedTarget && e.relatedTarget.closest('.navbar-hamburger');
  if (!nav.contains(e.relatedTarget) && !toHamburger) {
    const navSections = nav.closest('.navbar-nav');
    const navSectionExpanded = navSections.querySelector('.navbar-item[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = navSections.querySelector('.navbar-hamburger');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  // source drawer state machine: nav.is-drawer-open + .bar.animate + hamburger aria-expanded
  nav.classList.toggle('is-drawer-open', !expanded && !isDesktop.matches);
  button.setAttribute('aria-expanded', (!expanded && !isDesktop.matches) ? 'true' : 'false');
  button.querySelector('.bar').classList.toggle('animate', !expanded && !isDesktop.matches);
  toggleAllNavSections(navSections, false);
  button.setAttribute('aria-label', expanded ? 'Main Menu' : 'Close navigation');
  if (!expanded || isDesktop.matches) {
    window.addEventListener('keydown', closeOnEscape);
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/* ---------- observed chrome behaviours (index.js), ported ---------- */

function wireSlider(menu) {
  const slider = menu.querySelector('.navbar-slider');
  const contain = menu.closest('.contain');
  const hide = () => {
    slider.classList.remove('is-visible');
    slider.style.width = '0px';
    slider.style.visibility = 'hidden';
  };
  const show = (li) => {
    const r = li.getBoundingClientRect();
    const c = contain.getBoundingClientRect();
    slider.style.left = `${r.left - c.left}px`;
    slider.style.width = `${r.width}px`;
    slider.style.visibility = 'visible';
    slider.classList.add('is-visible');
  };
  hide();
  menu.querySelectorAll(':scope > li.navbar-item').forEach((li) => {
    li.addEventListener('mouseenter', () => { if (isDesktop.matches) show(li); });
    li.addEventListener('mouseleave', () => { if (isDesktop.matches) hide(); });
  });
  return hide;
}

function wireDrill(navSections) {
  navSections.querySelectorAll('.navbar-menu > li.navbar-item').forEach((li) => {
    const trigger = li.querySelector('.navbar-trigger');
    const panel = li.querySelector(':scope > .navbar-panel');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      // live @1440: a click on a trigger opens nothing; ≤767: click drills the drawer
      if (isDesktop.matches) { toggleAllNavSections(navSections); return; }
      const open = li.getAttribute('aria-expanded') === 'true';
      toggleAllNavSections(navSections);
      if (!open) {
        li.setAttribute('aria-expanded', 'true');
        li.classList.add('is-open');
        if (panel) requestAnimationFrame(() => panel.classList.add('is-full-width'));
      }
      if (open && panel) panel.classList.remove('is-full-width');
    });
    trigger.addEventListener('keydown', (e) => {
      if (e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); trigger.click(); }
    });
    li.querySelectorAll('.navbar-group-label').forEach((label) => {
      const toggleGroup = () => {
        if (isDesktop.matches) return;
        const open = label.parentElement.classList.toggle('is-open');
        label.setAttribute('aria-expanded', open ? 'true' : 'false');
      };
      label.addEventListener('click', toggleGroup);
      label.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); toggleGroup(); }
      });
    });
  });
}

function wireFlyout(account) {
  const flyout = account.querySelector('.login-flyout');
  const trigger = account.querySelector('.navbar-login');
  const close = () => { flyout.setAttribute('hidden', ''); trigger.setAttribute('aria-expanded', 'false'); };
  const toggle = (e) => {
    e.preventDefault();
    if (flyout.hasAttribute('hidden')) { flyout.removeAttribute('hidden'); trigger.setAttribute('aria-expanded', 'true'); } else close();
  };
  trigger.addEventListener('click', toggle);
  account.querySelector('.login-flyout-close').addEventListener('click', close);
  return close;
}

function wireSearch(search) {
  const input = search.querySelector('input[name="q"]');
  const clear = search.querySelector('.search-clear');
  const collapse = search.querySelector('.search-collapse');
  const tools = search.closest('.navbar-tools');
  const expand = () => {
    input.classList.add('search-expanded');
    search.classList.add('is-expanded');
    tools.classList.add('has-search-open');
    clear.removeAttribute('hidden');
    collapse.removeAttribute('hidden');
  };
  const shrink = () => {
    input.classList.remove('search-expanded');
    search.classList.remove('is-expanded');
    tools.classList.remove('has-search-open');
    clear.setAttribute('hidden', '');
    collapse.setAttribute('hidden', '');
  };
  search.querySelector('.hero-input').addEventListener('click', (e) => {
    if (e.target.closest('.search-collapse')) { shrink(); return; }
    if (e.target.closest('.search-clear')) { input.value = ''; return; }
    if (e.target.closest('.btn-search') && input.classList.contains('search-expanded')) return; // submit
    e.preventDefault();
    expand();
  });
  return shrink;
}

/* ---------- template slots ---------- */

function buildPromo(section) {
  const paragraphs = [...section.querySelectorAll('p')];
  const promo = el('div', 'promo');
  const contain = el('div', 'contain');
  const row = el('div', 'row');
  const slides = el('div', 'promo-slides');
  const slide = el('div', 'promo-slide');
  if (paragraphs[0]) slide.append(paragraphs[0]);
  slides.append(slide);
  const links = el('div', 'promo-links');
  paragraphs.slice(1).forEach((p) => links.append(p));
  row.append(slides, links);
  contain.append(row);
  promo.append(contain);
  return promo;
}

function buildPanel(groupList) {
  // groupList = the authored nested <ul> under a top-level item
  groupList.classList.add('navbar-panel');
  const groupsLi = el('li', 'navbar-panel-groups');
  const groups = el('ul', 'navbar-groups');
  groupsLi.append(groups);
  [...groupList.children].forEach((li) => {
    const lists = [...li.querySelectorAll(':scope > ul')];
    if (lists.length) {
      li.classList.add('navbar-group');
      const label = el('span', 'navbar-group-label', {
        role: 'button', tabindex: '0', 'aria-expanded': 'false',
      });
      leadingTextNodes(li).forEach((t) => label.append(t));
      const cols = el('div', 'navbar-group-cols');
      lists.forEach((ul) => { ul.classList.add('navbar-group-list'); cols.append(ul); });
      li.prepend(label);
      li.append(cols);
      groups.append(li);
    } else {
      // promo cell: paragraphs + CTA paragraphs (decorateButtons already classed the anchors)
      li.classList.add('navbar-promo');
      const ctas = [...li.querySelectorAll('p.button-wrapper, p:has(> a:only-child)')];
      if (ctas.length) {
        const wrap = el('div', 'navbar-promo-ctas');
        ctas.forEach((p) => wrap.append(p));
        li.append(wrap);
      }
    }
  });
  groupList.prepend(groupsLi);
  return groupList;
}

function buildMenu(section, nav) {
  const list = section.querySelector('ul');
  if (!list) return null;
  list.classList.add('navbar-menu');
  [...list.children].forEach((li) => {
    li.classList.add('navbar-item');
    li.setAttribute('aria-expanded', 'false');
    const trigger = el('button', 'navbar-trigger', { type: 'button' });
    const link = directLink(li);
    if (link && !link.closest('ul ul')) {
      // an authored top-level link (not on this site) still renders as the trigger text
      trigger.append(...link.childNodes);
      (link.closest('p') || link).remove();
    } else {
      leadingTextNodes(li).forEach((t) => trigger.append(t));
    }
    li.prepend(trigger);
    const panel = li.querySelector(':scope > ul');
    if (panel) {
      buildPanel(panel);
      li.classList.add('nav-drop');
    }
  });
  list.append(el('li', 'navbar-slider', { 'aria-hidden': 'true' }));
  nav.append(list);
  return list;
}

function buildTools(section) {
  const paragraphs = [...section.querySelectorAll(':scope > div > p, :scope > p')];
  const list = section.querySelector('ul');
  const plain = paragraphs.filter((p) => !p.querySelector('a'));
  const buttons = paragraphs.filter((p) => p.querySelector('a.button, strong a, em a, a strong, a em'));
  const cartP = paragraphs.filter((p) => p.querySelector('a') && !buttons.includes(p)).pop();

  const tools = el('div', 'navbar-tools nav-tools');

  // sign-in flyout (chrome-states cell menu:Sign in, opensOn click)
  const account = el('div', 'navbar-account');
  account.append(svgButton('navbar-login', 'Sign in', 'user', { 'aria-expanded': 'false' }));
  const flyout = el('div', 'login-flyout', { hidden: '' });
  const box = el('div', 'login-flyout-box');
  box.append(svgButton('login-flyout-close', 'Login flyout close', 'close'));
  const top = el('div', 'login-flyout-top');
  if (plain[0]) { plain[0].classList.add('login-flyout-title'); top.append(plain[0]); }
  const ctas = el('div', 'login-flyout-ctas');
  buttons.forEach((p) => ctas.append(p));
  top.append(ctas);
  const other = el('div', 'login-flyout-other');
  if (plain[1]) { plain[1].classList.add('login-flyout-title'); other.append(plain[1]); }
  if (list) { list.classList.add('login-flyout-links'); other.append(list); }
  box.append(top, other);
  flyout.append(box);
  account.append(flyout);

  // cart: the authored link becomes the icon trigger (live: plain trigger, no panel — dyn #28)
  const cart = el('div', 'navbar-cart');
  if (cartP) {
    const a = cartP.querySelector('a');
    const label = el('span', 'sr-only');
    label.append(...a.childNodes);
    a.innerHTML = SVG.cart;
    a.append(label);
    cart.append(a);
    cartP.remove();
  }

  // search (dyn #16: submits to the source host's results page; predictive dropdown not shipped)
  const search = el('div', 'navbar-search');
  const heroInput = el('div', 'hero-input');
  const form = el('form', 'navbar-search-form', { action: SEARCH_ACTION, method: 'get', role: 'search' });
  const input = el('input', 'navbar-search-input', {
    type: 'text',
    name: 'q',
    placeholder: SEARCH_PLACEHOLDER,
    'aria-label': SEARCH_PLACEHOLDER,
    autocomplete: 'off',
  });
  form.append(input);
  const clear = el('button', 'search-clear', { type: 'button', hidden: '' });
  clear.textContent = 'Clear';
  form.append(clear, svgButton('search-collapse', 'Search Close', 'close', { hidden: '' }));
  const submit = svgButton('btn-search', 'Search', 'search');
  submit.type = 'submit';
  form.append(submit);
  heroInput.append(form);
  search.append(heroInput);

  tools.append(account, cart, search);
  return tools;
}

function buildDrawerExtras(nav, menu, tools) {
  // drawer user bar (fixed top at ≤767) — a presentational copy of the sign-in trigger
  const userbar = el('div', 'drawer-userbar');
  const signIn = tools.querySelector('.login-flyout-ctas a');
  if (signIn) {
    const a = stripInstrumentation(signIn.cloneNode(true));
    a.className = 'drawer-userbar-login';
    a.innerHTML = SVG.user;
    userbar.append(a);
  }
  nav.prepend(userbar);
  // drawer business block (fixed bottom at ≤767) — a presentational copy of the first promo cell
  const promo = menu.querySelector('.navbar-promo');
  if (promo) {
    const biz = el('div', 'drawer-biz');
    const section = el('div', 'drawer-biz-section');
    const contain = el('div', 'contain');
    const copy = stripInstrumentation(promo.cloneNode(true));
    copy.className = 'drawer-biz-copy';
    const ctas = copy.querySelector('.navbar-promo-ctas');
    if (ctas) ctas.className = 'drawer-biz-ctas';
    contain.append(...copy.childNodes);
    section.append(contain);
    const close = el('button', 'drawer-biz-close', { type: 'button', 'aria-label': 'Close' });
    close.textContent = '✕';
    close.addEventListener('click', () => { biz.style.display = 'none'; });
    biz.append(section, close);
    nav.append(biz);
  }
}

function markCurrent(nav) {
  const here = window.location.pathname.replace(/\/$/, '') || '/';
  nav.querySelectorAll('a[href]').forEach((a) => {
    try {
      const u = new URL(a.href, window.location.href);
      if (u.origin === window.location.origin && (u.pathname.replace(/\/$/, '') || '/') === here) a.setAttribute('aria-current', 'page');
    } catch { /* ignore */ }
  });
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  await loadCSS(`${window.hlx.codeBasePath}/blocks/fragment/fragment.css`);
  const fragment = await loadFragment(navPath);
  if (!fragment) return;

  const sections = [...fragment.children];
  const [brandSection, menuSection, toolsSection, promoSection] = sections;

  block.textContent = '';
  const inner = el('div', 'site-header-inner');
  const skip = el('a', 'skip-link', { href: '#main-content' });
  skip.textContent = 'Skip to main content';
  const main = document.querySelector('main');
  if (main && !main.id) main.id = 'main-content';

  if (promoSection && promoSection.querySelector('p')) inner.append(buildPromo(promoSection));

  const navbar = el('div', 'navbar');
  const contain = el('div', 'contain');
  const row = el('div', 'row');

  // brand slot
  const logo = el('div', 'navbar-logo nav-brand');
  if (brandSection) {
    const brandLink = brandSection.querySelector('a');
    if (brandLink && brandLink.classList.contains('button')) {
      brandLink.className = '';
      const wrapper = brandLink.closest('.button-wrapper');
      if (wrapper) wrapper.className = '';
    }
    [...brandSection.querySelectorAll(':scope > div > *, :scope > p')].forEach((n) => logo.append(n));
  }

  // sections slot: hamburger + drawer nav
  const navSections = el('div', 'navbar-nav nav-sections');
  const hamburger = el('button', 'navbar-hamburger', {
    type: 'button', 'aria-label': 'Main Menu', 'aria-expanded': 'false', 'aria-controls': 'nav',
  });
  hamburger.append(el('span', 'bar'));
  const nav = el('nav', 'navbar-drawer', { role: 'navigation', 'aria-label': 'Main' });
  nav.id = 'nav';
  // a click on un-focusable drawer content must not read as focus leaving the nav (focusout)
  nav.tabIndex = -1;
  const menu = menuSection ? buildMenu(menuSection, nav) : null;
  navSections.append(hamburger, nav);

  // tools slot
  const tools = toolsSection ? buildTools(toolsSection) : el('div', 'navbar-tools nav-tools');

  row.append(logo, navSections, tools);
  contain.append(row);
  navbar.append(contain);
  inner.append(navbar);

  if (menu) buildDrawerExtras(nav, menu, tools);
  markCurrent(nav);

  const navWrapper = el('div', 'nav-wrapper');
  navWrapper.append(skip, inner);
  block.append(navWrapper);

  // behaviours
  const hideSlider = menu ? wireSlider(menu) : () => {};
  if (menu) wireDrill(navSections);
  const closeFlyout = tools.querySelector('.login-flyout') ? wireFlyout(tools.querySelector('.navbar-account')) : () => {};
  const collapseSearch = tools.querySelector('.navbar-search') ? wireSearch(tools.querySelector('.navbar-search')) : () => {};
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { hideSlider(); closeFlyout(); collapseSearch(); }
  });

  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));
}
