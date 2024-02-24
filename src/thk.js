'use strict';

!(function (root, name, definition) {
  if (typeof module !== 'undefined' && module.exports) module.exports = definition();
  else if (typeof define === 'function' && define.amd) define(name, definition);
  else root[name] = definition();
}(this, 'thk', function (options) {
  return function (options) {    
    options = options || {};

    options.element = options.element || document;

    var lock;
    var mwX1 = 0;
    var mwX2 = 0;
    var mwY1 = 0;
    var mwY2 = 0;

    function onScroll (e) {
      var deltaX = e.deltaX ? e.deltaX : e.detail;
      var deltaY = e.deltaY ? e.deltaY : e.detail;

      lock = true;

      window.setTimeout(function () {
        lock = false;
      }, 500);

      if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        if (deltaX < 0) {
          if (options.right) options.right();
        } else {
          if (options.left) options.left();
        }
      } else {
        if (deltaY < 0) {
          if (options.down) options.down();
        } else {
          if (options.up) options.up();
        }
      }

      mwX1 = mwX2;
      mwX2 = deltaX;
      mwY1 = mwY2;
      mwY2 = deltaY;

      e.preventDefault();
      e.stopPropagation();
    }

    options.element.addEventListener('mousewheel', onScroll, false);
    options.element.addEventListener('DOMMouseScroll', onScroll, false);
  };
}));
