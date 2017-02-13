(function( $ ) {
  'use strict';

  $.fn.drawer = function(options) {
    var currentShape = null;
    var createShape = options.create;
    var syncShape = options.sync;
    var canvas = options.canvas;
    var cursorHandler = options.cursorHandler;
    var defaults = options.defaults;
    var startX = 0;
    var startY = 0;

    var drawStart = function (props) {
      var x = startX = props.e.layerX;
      var y = startY = props.e.layerY;
      currentShape = createShape(x, y);
      defaults.configShape(currentShape);
      canvas.add(currentShape);
      canvas.on('mouse:move', drawSync);
      canvas.on('mouse:up', finish);
    }

    var drawSync = function (props) {
      var x = props.e.layerX;
      var y = props.e.layerY;
      syncShape(currentShape, x, y, startX, startY);
      canvas.renderAll();
    }

    var finish = function() {
      canvas.remove(currentShape);
      canvas.add(currentShape);
      $(cursorHandler).removeClass('draw-cursor');
      canvas.off('mouse:down', drawStart);
      canvas.off('mouse:move', drawSync);
      canvas.off('mouse:up', finish);
      canvas.set('skipTargetFind', false);
    };

    $(this).click(function () {
      currentShape = null;
      startY = startX = 0;
      canvas.set('skipTargetFind', true);
      canvas.deactivateAll().renderAll();
      $(cursorHandler).addClass('draw-cursor');
      canvas.on('mouse:down', drawStart);
    });
  };
})( jQuery );
