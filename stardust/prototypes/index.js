/* index.js — interaction layer for the westerndigital.com home replica.
   Every behaviour here was OBSERVED at runtime (stardust/replica/motion/index.json @1440, index-360.json @360,
   stardust/replica/gates/index-1440/chrome-states/chrome-states.json). Mechanisms mirror the live class/attribute
   state machines. Rest state (t=0, scroll 0, no pointer) is left untouched so the static gate is unaffected.
   NOT implemented (measured dead on live): header scroll-morph (sticky 97px at every y), rail arrows (hidden, no
   track movement on click), product-card hover (no computed change), cart trigger (no panel opens). */
(function () {
  'use strict';
  var mq = window.matchMedia('(max-width: 767px)');
  Array.prototype.forEach.call(document.querySelectorAll('.rail__list, #splide05-list'), function (ul) { ul.style.transform = 'translateX(0px)'; });
  var sd = document.querySelector('.navbar__slider'); if (sd) sd.style.width = '0px';

  /* ---------- hero: autoplay loop + progress fill (observed: span.wd-progress-fill width mutations, ul.splide__list
     translateX stepping one slide at a time). The step interval is not directly measurable from the observe run —
     approximated at 6000 ms and logged in progress-index.json. Timer-driven so the capture instruments' timer clear
     keeps t=0. ---------- */
  var hero = document.getElementById('splide01');
  if (hero) {
    var list = hero.querySelector('.hero__list');
    var slides = Array.prototype.slice.call(list.children);
    var items = Array.prototype.slice.call(document.querySelectorAll('.hero__progress .hero__item'));
    var fills = items.map(function (it) { return it.querySelector('.hero__item-fill'); });
    var COUNT = items.length || 4, INTERVAL = 6000, STEP = 50;
    var idx = 0, elapsed = 0;
    function apply(i, animate) {
      idx = (i + COUNT) % COUNT; elapsed = 0;
      list.classList.toggle('is-moving', !!animate);
      list.style.transform = 'translateX(' + (-(2 + idx) * 100) + '%)';
      slides.forEach(function (li, k) {
        var active = k === idx + 2;
        li.classList.toggle('is-active', active);
        li.classList.toggle('is-visible', active);
        if (active) li.removeAttribute('aria-hidden'); else li.setAttribute('aria-hidden', 'true');
      });
      items.forEach(function (it, k) { it.classList.toggle('is-active', k === idx); if (fills[k]) fills[k].style.width = k < idx ? '100%' : '0%'; });
    }
    items.forEach(function (it, k) {
      it.addEventListener('click', function () { apply(k, true); });
      it.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); apply(k, true); } });
    });
    setInterval(function () {
      elapsed += STEP;
      var p = Math.min(1, elapsed / INTERVAL);
      if (fills[idx]) fills[idx].style.width = (p * 100).toFixed(2) + '%';
      if (p >= 1) apply(idx + 1, true);
    }, STEP);
  }

  /* ---------- category tabs (observed: role=tab aria-expanded false→true, sibling true→false; panels swap) ---------- */
  var tablist = document.querySelector('.store-tabview');
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle('is-active', on);
          t.setAttribute('aria-expanded', on ? 'true' : 'false');
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.parentElement.classList.toggle('active', on);
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) { if (on) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', ''); }
        });
      });
    });
  }

  /* ---------- top nav: hover opens the mega menu (chrome-states: menu:* opensOn hover) and shows the sliding
     underline (observed li.slidingDiv visibility toggles). Mobile: click drills the drawer (drawer-drilled). ---------- */
  var menu = document.querySelector('.navbar__menu');
  var slider = document.querySelector('.navbar__slider');
  var navItems = Array.prototype.slice.call(document.querySelectorAll('.navbar__item'));
  function panelOf(li) { return document.getElementById(li.getAttribute('data-panel')); }
  function closeAll() {
    navItems.forEach(function (li) {
      var p = panelOf(li); if (!p) return;
      p.classList.remove('megaMenuOpen', 'fullWidth'); p.classList.add('hidden');
      li.classList.remove('is-open'); li.setAttribute('aria-expanded', 'false');
    });
    if (slider) { slider.classList.remove('is-visible'); slider.style.width = '0px'; slider.style.visibility = 'hidden'; }
  }
  function openItem(li) {
    closeAll();
    var p = panelOf(li); if (!p) return;
    if (mq.matches) {
      // drawer drill (observed @360: click "Products" → .dropDownContainer.fullWidth, rows shift +192px)
      p.classList.remove('hidden'); p.classList.add('megaMenuOpen');
      li.classList.add('is-open'); li.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(function () { p.classList.add('fullWidth'); });
    }
    // desktop: the live dropdown did not become visible under hover or click (chrome-states region atoms 1,
    // motion trigger 6 aria-expanded false→false) — only the sliding underline fires; the panel stays hidden
    if (slider && !mq.matches) {
      var contain = menu.closest('.contain');
      var r = li.getBoundingClientRect(), c = contain.getBoundingClientRect();
      slider.style.left = (r.left - c.left) + 'px';
      slider.style.width = r.width + 'px';
      slider.style.visibility = 'visible';
      slider.classList.add('is-visible');
    }
  }
  navItems.forEach(function (li) {
    var btn = li.querySelector('.navbar__trigger');
    li.addEventListener('mouseenter', function () { if (!mq.matches) openItem(li); });
    li.addEventListener('mouseleave', function () { if (!mq.matches) closeAll(); });
    if (btn) btn.addEventListener('click', function () {
      // live @1440: a click on the trigger opens nothing and leaves the underline hidden (chrome-states live crop: no bar;
      // motion trigger 6 aria-expanded false→false) — mirror: click closes; mobile: click drills
      if (!mq.matches) { closeAll(); return; }
      if (li.classList.contains('is-open')) { closeAll(); } else { openItem(li); }
    });
    // drawer drill (mobile): group rows expand their link lists
    Array.prototype.forEach.call(li.querySelectorAll('.navbar__group-label'), function (label) {
      label.addEventListener('click', function () { if (mq.matches) label.parentElement.classList.toggle('is-open'); });
    });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeAll(); closeFlyout(); collapseSearch(); } });

  /* ---------- sign-in flyout (chrome-states: menu:Sign in opensOn click) ---------- */
  var flyout = document.getElementById('loginFlyout');
  function closeFlyout() { if (flyout) flyout.setAttribute('hidden', ''); }
  Array.prototype.forEach.call(document.querySelectorAll('.openLoginFlyout, .mob-openLoginFlyout'), function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault(); if (!flyout) return;
      if (flyout.hasAttribute('hidden')) flyout.removeAttribute('hidden'); else flyout.setAttribute('hidden', '');
    });
  });
  var flyClose = document.querySelector('.loginFlyoutClose');
  if (flyClose) flyClose.addEventListener('click', closeFlyout);

  /* ---------- search (chrome-states: search opensOn click of .hero-input; source CSS .search-expanded) ---------- */
  var heroInput = document.querySelector('.navbar__search .hero-input');
  var searchInput = document.getElementById('predictiveSearchTerm');
  var searchClear = document.querySelector('.search-clear');
  var searchCollapse = document.querySelector('.search-collapse');
  var dropdown = document.getElementById('predictiveSearchContainer');
  function expandSearch() {
    if (!searchInput) return;
    searchInput.classList.add('search-expanded');
    var wrap = searchInput.closest('.navbar__search'); if (wrap) { wrap.classList.add('is-expanded'); var tools = wrap.closest('.navbar__tools'); if (tools) tools.classList.add('has-search-open'); }
    if (searchClear) searchClear.classList.remove('hidden');
    if (searchCollapse) searchCollapse.classList.remove('hidden');
    if (dropdown) { Array.prototype.forEach.call(dropdown.querySelectorAll('.search-dropdown__row, .search-dropdown__label, #popularSearches'), function (el) { el.style.display = 'block'; }); }
  }
  function collapseSearch() {
    if (!searchInput) return;
    searchInput.classList.remove('search-expanded');
    var wrap2 = searchInput.closest('.navbar__search'); if (wrap2) { wrap2.classList.remove('is-expanded'); var tools2 = wrap2.closest('.navbar__tools'); if (tools2) tools2.classList.remove('has-search-open'); }
    if (searchClear) searchClear.classList.add('hidden');
    if (searchCollapse) searchCollapse.classList.add('hidden');
    if (dropdown) Array.prototype.forEach.call(dropdown.querySelectorAll('.search-dropdown__row, .search-dropdown__label, #popularSearches'), function (el) { el.style.display = 'none'; });
  }
  if (heroInput) heroInput.addEventListener('click', function (e) {
    if (e.target.closest('.search-collapse')) { collapseSearch(); return; }
    if (e.target.closest('.search-clear')) { searchInput.value = ''; return; }
    if (e.target.closest('#searchBTN') && searchInput.classList.contains('search-expanded')) return; // submit
    e.preventDefault(); expandSearch(); /* live shows no caret in the expanded state crop — no programmatic focus */
  });

  /* ---------- mobile drawer (chrome-states @360: drawer opensOn click "Main Menu"; source .mMenutoggleWidth,
     .hamburger-menu[aria-expanded=true], .bar.animate) ---------- */
  var burger = document.querySelector('.navbar__hamburger');
  var nav = document.querySelector('.navbar__nav nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = !nav.classList.contains('mMenutoggleWidth');
      nav.classList.toggle('mMenutoggleWidth', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      var bar = burger.querySelector('.bar'); if (bar) bar.classList.toggle('animate', open);
      if (!open) closeAll();
    });
    var bizClose = document.querySelector('.drawer-biz__close');
    if (bizClose) bizClose.addEventListener('click', function () { var biz = document.getElementById('mBusinessQuery-ng'); if (biz) biz.style.display = 'none'; });
  }
})();
