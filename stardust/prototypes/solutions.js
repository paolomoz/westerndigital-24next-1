/* solutions.js — interaction layer for the `solutions` archetype.
   Every behaviour below was OBSERVED firing on the live page by motion-observe
   (stardust/replica/motion/solutions.json @1440, solutions-360.json @360); nothing inferred.
   - FAQ accordion (stateMachines[]: aria-expanded flips per button, independent items; classMutations: the two
     svg icons and .accordion-content toggle `hidden`; content transitions max-height/opacity .4s — live body.disabledOutine
     keeps .hidden content display:block so the collapse animates)
   - contact modal (classMutations: a.wd-modal-btn +wd-modal-active, #contact-form -hidden, body +overflow-hidden; close reverses)
   Hovers: only .bread-crumbs a fired (color + underline) — CSS in solutions.css. All other hover families measured no change (dead).
   Rest state (t=0, scroll 0, no pointer) is untouched: the static gate number must not move. */
(function () {
  'use strict';
  var root = document.querySelector('section.mainContainWrap');
  if (!root) return;

  /* ---------- FAQ accordion ---------- */
  Array.prototype.forEach.call(root.querySelectorAll('.sol-faq__q'), function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var icons = btn.querySelectorAll('svg');
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (panel) panel.classList.toggle('hidden', open);
      if (icons[0]) icons[0].classList.toggle('hidden', !open);   /* plus: visible when collapsed */
      if (icons[1]) icons[1].classList.toggle('hidden', open);    /* minus: visible when expanded */
    });
  });

  /* ---------- contact-form modal ---------- */
  var modal = document.getElementById('contact-form');
  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    Array.prototype.forEach.call(root.querySelectorAll('.wd-modal-active'), function (a) { a.classList.remove('wd-modal-active'); });
  }
  Array.prototype.forEach.call(root.querySelectorAll('a.wd-modal-btn[href="#contact-form"]'), function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (!modal) return;
      a.classList.add('wd-modal-active');
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  });
  if (modal) {
    Array.prototype.forEach.call(modal.querySelectorAll('.wd-modal__close, .sol-modal__close'), function (b) { b.addEventListener('click', closeModal); });
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); });
  }
})();
