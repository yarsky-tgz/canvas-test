(function( $ ) {
  'use strict';
  
  var defaultOptions = {
    color: '#cc0000',
    canvas: null
  };

  var CanvasColorPicker = function (element, options) {
    var self = this;
    this.options = $.extend({}, defaultOptions, options);
    this.selectedShape = null;
    this.element = element;
    this._changeColor(this.options.color, true);
    this.element.change(function () {
      self._changeColor(this.value, false);
      self._applyColor();
    });
    this.options.canvas.on('object:selected', function (options) {
      self._selectShape(options.target);
    });
    this.options.canvas.on('selection:cleared', function () {
      self._clearShape();
    });
  };

  CanvasColorPicker.prototype._selectShape = function (shape) {
    this.selectedShape = shape;
    this._changeColor(this.selectedShape.get('stroke'), true);
  };

  CanvasColorPicker.prototype._clearShape = function () {
    this.selectedShape = null;
  };

  CanvasColorPicker.prototype._changeColor = function(color, updateElement) {
    this.options.color = color;
    if (updateElement) {
      this.element.val(color);
    }
  };

  CanvasColorPicker.prototype._applyColor = function () {
    if (this.selectedShape !== null) {
      this.selectedShape.set('stroke', this.options.color);
      this.options.canvas.renderAll();
    }
  };

  $.fn.canvasColorPicker = function(options) {
    return this.each(function () {
        if (!$.data(this, 'plugin_canvasColorPicker')) {
          $.data(this, 'plugin_canvasColorPicker',
          new CanvasColorPicker($(this), options));
        }
      });
  }
})( jQuery );
