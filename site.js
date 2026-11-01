(function () {
  // Remember the language the visitor picks; on a first visit send Portuguese browsers to /pt/.
  var links = document.querySelectorAll('.lang a');
  for (var k = 0; k < links.length; k++) {
    links[k].addEventListener('click', function () {
      try { localStorage.setItem('ag-lang', this.getAttribute('data-lang')); } catch (e) {}
    });
  }
  try {
    var saved = localStorage.getItem('ag-lang');
    var isPt = document.documentElement.lang.indexOf('pt') === 0;
    if (!saved && !isPt && (navigator.language || '').toLowerCase().indexOf('pt') === 0) {
      localStorage.setItem('ag-lang', 'pt');
      location.replace('pt/' + location.hash);
    }
  } catch (e) {}
  // Copy buttons
  var btns = document.querySelectorAll('button.copy');
  for (var j = 0; j < btns.length; j++) {
    btns[j].addEventListener('click', function () {
      var b = this, done = function (ok) {
        b.textContent = ok ? b.getAttribute('data-ok') : b.getAttribute('data-fail');
        setTimeout(function () { b.textContent = b.getAttribute('data-label'); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function () { done(true); }, function () { done(false); });
      } else { done(false); }
    });
  }
  // Only one video plays at a time
  document.addEventListener('play', function (ev) {
    var vids = document.querySelectorAll('video');
    for (var v = 0; v < vids.length; v++) if (vids[v] !== ev.target) vids[v].pause();
  }, true);
})();
