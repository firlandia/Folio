// Folio — idioma del sitio.
// Usa el idioma del navegador; si la persona elige otro, se recuerda sólo en su navegador.
(function () {
  var KEY = 'folio.lang';
  var root = document.documentElement;

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function remember(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }
  function fromBrowser() {
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'es'];
    for (var i = 0; i < list.length; i++) {
      var l = String(list[i]).toLowerCase();
      if (l.indexOf('es') === 0) return 'es';
      if (l.indexOf('en') === 0) return 'en';
    }
    return 'en';
  }
  function fromURL() {
    var m = /[?&]lang=(es|en)\b/.exec(location.search);
    return m ? m[1] : null;
  }

  function apply(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    var t = root.getAttribute('data-title-' + lang);
    if (t) document.title = t;
  }

  apply(fromURL() || saved() || fromBrowser());

  document.addEventListener('DOMContentLoaded', function () {
    var btns = document.querySelectorAll('[data-switch-lang]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var next = root.getAttribute('data-lang') === 'es' ? 'en' : 'es';
        apply(next);
        remember(next);
      });
    }
    var y = document.querySelectorAll('[data-year]');
    for (var j = 0; j < y.length; j++) y[j].textContent = new Date().getFullYear();
  });
})();
