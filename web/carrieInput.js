(function() {
  'use strict';

  var carrieInput = function(o) {
    var s = o.socket;

    var handler = function(ev) {
      var symb = ev.keyCode;
      var state = (ev.type === 'keydown') ? 1:  0;
      socket.emit('key', [symb, state]);
    };

    i.addEventListener('keydown', handler);
    i.addEventListener('keyup',   handler);
  };

  window.carrieInput = carrieInput;

})();
