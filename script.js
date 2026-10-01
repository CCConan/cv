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

(function () {
  'use strict';

  var KEY = 'cv-lang';
  var body = document.body;
  var root = document.documentElement;
  var btn = document.getElementById('lang-toggle');

  function store(lang) {
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {
      /* storage unavailable */
    }
  }

  function readStored() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function forceReveal(scope) {
    var cards = scope.querySelectorAll('.card');
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.add('is-visible');
    }
  }

  function setLang(lang, opts) {
    var zh = lang === 'zh';
    var shown = document.querySelector(zh ? 'main > [data-l="zh"]' : 'main > [data-l="en"]');

    if (zh) {
      body.classList.add('lang-zh');
    } else {
      body.classList.remove('lang-zh');
    }

    root.lang = zh ? 'zh-Hant' : 'en-GB';
    document.title = zh ? 'Conan Chan — 履歷' : 'Conan Chan — CV';

    if (btn) {
      btn.setAttribute('aria-pressed', zh ? 'true' : 'false');
    }

    if (opts && opts.reveal && shown) {
      forceReveal(shown);
    }
  }

  var stored = readStored();
  var q = String(window.location.search || '') + String(window.location.hash || '');
  var start = (stored === 'zh' || /lang=zh|#zh/i.test(q)) ? 'zh' : 'en';

  setLang(start, { reveal: false });

  if (btn) {
    btn.addEventListener('click', function () {
      var next = body.classList.contains('lang-zh') ? 'en' : 'zh';
      setLang(next, { reveal: true });
      store(next);
    });
  }
})();
