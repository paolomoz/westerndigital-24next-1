/* products.js — interaction parity for the `products` archetype.
   Every behaviour below was OBSERVED firing on the live page by motion-observe
   (stardust/replica/motion/products-run1-clicks.json @1440, products-360.json @360); nothing inferred.
   - facet accordion: button.filterHeader +active, its ul.accordion-body -hidden (max-height .5s, li a visibility .2s)
   - shop-by nav accordion: a.accordion toggles active + its accordion-body hidden; exclusive (the other group closes)
   - Compare button: #compare-tray-modal -hidden, body +overflow-hidden, tray populated with picture + name (childList)
   - green-promo "Learn More": a +wd-modal-active, #warrantyCtaModal -hidden
   - 360 drawer: .mob-shopBy-btn → body +mob-shopBy-open, .mob-filters-btn → body +mob-filters-open (left-filter transform/opacity .3s)
   Header scroll morph (body.minHeader) is chrome — owned by canon. */
(function () {
  var root = document.querySelector('section.mainContainWrap');
  if (!root) return;
  var body = document.body;
  function on(sel, fn) { root.querySelectorAll(sel).forEach(function (el) { el.addEventListener('click', fn); }); }

  // facet accordions
  on('.clp-facet__head', function (e) {
    e.preventDefault();
    var head = e.currentTarget; var list = head.parentElement.querySelector('.accordion-body');
    head.classList.toggle('active'); if (list) list.classList.toggle('hidden');
  });

  // shop-by nav accordions (exclusive)
  on('.clp-nav__title a.accordion', function (e) {
    e.preventDefault();
    var a = e.currentTarget; var item = a.closest('.clp-nav__item'); var wasActive = a.classList.contains('active');
    root.querySelectorAll('.clp-nav__item').forEach(function (it) {
      var link = it.querySelector('a.accordion'); var bodyEl = it.querySelector('.accordion-body');
      var open = it === item && !wasActive;
      link.classList.toggle('active', open); link.parentElement.classList.toggle('active', open);
      if (bodyEl) bodyEl.classList.toggle('hidden', !open);
    });
  });

  // modals (compare tray, warranty)
  function openModal(m) { if (!m) return; m.classList.remove('hidden'); body.classList.add('overflow-hidden'); }
  function closeModal(m) { if (!m) return; m.classList.add('hidden'); body.classList.remove('overflow-hidden'); }
  on('.product-card__compare', function (e) {
    e.preventDefault();
    var card = e.currentTarget.closest('.product-card'); var tray = root.querySelector('#compare-tray-modal');
    var cols = tray.querySelectorAll('.wd-modal__cols > div');
    var img = card.querySelector('img'); var title = card.querySelector('h2');
    cols[0].innerHTML = '<picture><img class="flex-no-shrink" src="' + img.getAttribute('src') + '" alt="' + (img.getAttribute('alt') || '') + '"></picture>';
    cols[1].innerHTML = '<div class="mb-4">' + (title ? title.textContent.trim() : '') + '</div>';
    openModal(tray);
  });
  on('.green-promo a.wd-modal-btn', function (e) {
    e.preventDefault(); e.currentTarget.classList.add('wd-modal-active');
    openModal(root.querySelector('#warrantyCtaModal'));
  });
  on('.wd-modal__close, .wd-modal__cta', function (e) {
    var m = e.currentTarget.closest('.wd-modal'); closeModal(m);
    root.querySelectorAll('.wd-modal-active').forEach(function (a) { a.classList.remove('wd-modal-active'); });
  });
  root.querySelectorAll('.wd-modal').forEach(function (m) { m.addEventListener('click', function (e) { if (e.target === m) closeModal(m); }); });

  // mobile drawer
  on('.mob-shopBy-btn', function () { body.classList.add('mob-shopBy-open'); });
  on('.mob-filters-btn', function () { body.classList.add('mob-filters-open'); });
  on('.mob-shopBy-close, .mob-filter-close, .plp-clearbar button', function () { body.classList.remove('mob-shopBy-open'); body.classList.remove('mob-filters-open'); });
})();
