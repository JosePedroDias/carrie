(function() {
  'use strict';

  var sum = function(prev, v) { return prev + v; };

  var r = function(v) { return Math.round(v); };

  var carrie = function(o) {
    var kbProfile = o.kbProfile;
    var kbStyle   = o.kbStyle;
    var socket    = o.socket;
    var keyMap    = o.keyMap;

    var W, H, I, cells, canvasEl, ctx;

    var reinit = function() {
      var firstCall = !canvasEl;

      W = window.innerWidth;
      H = window.innerHeight;

      // if keyboard too tall, keep it 3/1 scale
      if (W/H < 3) { H = ~~(W / 3); }

      if (firstCall) {
        canvasEl = document.createElement('canvas');  
      }

      canvasEl.setAttribute('width',  W);
      canvasEl.setAttribute('height', H);
      
      if (firstCall) {
        document.body.appendChild(canvasEl);  
      }

      ctx = canvasEl.getContext('2d');
      ctx.fillStyle = kbStyle.backgroundColor;
      ctx.fillRect(0, 0, W, H);

      ctx.lineWidth = 1;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
    };    

    var draw = function(c, isDown) {
      ctx.fillStyle = isDown ? kbStyle.keyDownBackgroundColor : kbStyle.keyBackgroundColor;
      ctx.fillRect(c.x0, c.y0, c.w, c.h);
      if (!isDown) {
        ctx.strokeRect(c.x0, c.y0, c.w, c.h);
      }
      ctx.fillStyle = isDown ? kbStyle.keyDownLabelColor : kbStyle.keyLabelColor;

      var l0 = c.l[0];
      var l1 = c.l[1];
      var l2 = c.l[2];

      if (l1 === undefined) {
        ctx.fillText(c.l, c.w/2+c.x0, c.h/2+c.y0);
      }
      else {
        ctx.fillText(l0, c.w/2+c.x0, c.h*3/4+c.y0);

        if (l1 !== undefined) {
          ctx.fillText(l1, c.w/2+c.x0, c.h/4+c.y0);
        }
        
        if (l2 !== undefined) {
          ctx.fillText(l2, c.w*3.5/4+c.x0, c.h/4+c.y0);
        }
      }
    };

    var findCell = function(x, y) {
      var c;
      for (var i = 0; i < I; ++i) {
        c = cells[i];
        if (c.x0 < x && c.x1 > x && c.y0 < y && c.y1 > y) {
          return c;
        }
      }
    };

    var prepareCells = function() {
      cells = [];
      var X, Y = kbProfile.codes.length;
      var x, y, w, h, rowLayout, rowLabels, rowCodes;
      var x0 = 0, y0 = 0;
      var p = 2, P = p*2;
      h = H / Y;

      for (y = 0; y < Y; ++y) {
        rowLayout = kbProfile.factorWidths[y];
        rowLabels = kbProfile.labels[y];
        rowCodes  = kbProfile.codes[y];
        X = rowLayout.reduce(sum, 0);
        for (x = 0; x < rowLayout.length; ++x) {
          w = W * (rowLayout[x] / X);
          cells.push({
            x0: r(x0+p), x1: r(x0+w-P),
            y0: r(y0+p), y1: r(y0+h-P),
            w:  r(w-P), h:r(h-P),
            l:  rowLabels[x].split('\n'),
            c:  rowCodes[x]
          });
          x0 += w;
        }
        x0 = 0;
        y0 += h;
      }
      
      ctx.font = r(h/3) + 'px ' + kbStyle.fontFamily;
      
      I = cells.length;
      
      for (var i = 0; i < I; ++i) {
        draw(cells[i]);
      }

      ctx.font = r(h/3) + 'px ' + kbStyle.fontFamily;
      
      I = cells.length;
      
      for (var i = 0; i < I; ++i) {
        draw(cells[i]);
      }
    };



    init();
    prepareCells();




    var downCell;

    var onDown = function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      if (ev.changedTouches) {
        ev = ev.changedTouches[0];
      }
      var c = findCell(ev.clientX, ev.clientY);
      if (!c) { return; }
      draw(c, true);
      downCell = c;
      //console.log('< %s', c.c);
      var symb = keyMap[c.c];
      socket.emit('key', [symb, 1, c.c, c.l]);
    };

    var onUp = function() {
      var c = downCell;
      if (!c) { return; }
      draw(c);
      //console.log('> %s', c.c);
      var symb = keyMap[c.c];
      socket.emit('key', [symb, 0, c.c, c.l]);
      downCell = undefined;
    };

    window.addEventListener('mousedown',  onDown);
    window.addEventListener('mouseup',    onUp);
    window.addEventListener('touchstart', onDown);
    window.addEventListener('touchend',   onUp);

    window.addEventListener('load', function() {
      setTimeout(function(){
        window.scrollTo(0, 1);
      }, 0);
    });

    window.addEventListener('resize', function() {
      reinit();
      prepareCells();
    });
  };

  window.carrie = carrie;

})();
