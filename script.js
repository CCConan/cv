(function () {
  'use strict';

  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    return;
  }

  document.documentElement.classList.add('js-reveal');

  var cards = document.querySelectorAll('.card');
  if (!cards.length) {
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  for (var j = 0; j < cards.length; j++) {
    observer.observe(cards[j]);
  }
})();
