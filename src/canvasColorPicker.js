(function( $ ) {
  'use strict';

  var SIGN = '_picker';

  var defaultOptions = {
    color: '#cc0000',
    shapeDefaults: null,
    name: 'stroke'
  };

  var CanvasColorPicker = function (element, options) {
    var self = this;
    this.options = $.extend({}, defaultOptions, options);
    this.element = element;
    this._changeColor(this.options.color, true);
    self._applyColor();
    this.element.change(function () {
      self._changeColor(this.value, false);
      self._applyColor();
    });
    this.options.shapeDefaults.on('defaults:changed', function (options) {
      var defaults = options.defaults;
      if (options.sign == SIGN) {
        return;
      }
      self._changeColor(defaults[self.options.name], true)
    });
  };

  CanvasColorPicker.prototype._changeColor = function(color, updateElement) {
    this.options.color = color;
    if (updateElement) {
      this.element.val(color);
    }
  };

  CanvasColorPicker.prototype._applyColor = function () {
    var props = {};
    props[this.options.name] = this.options.color
    this.options.shapeDefaults && this.options.shapeDefaults.merge(props, 'picker');
  };

  $.fn.canvasColorPicker = function(options) {
    return this.each(function () {
        if (!$.data(this, 'plugin_canvasColorPicker')) {
          $.data(this, 'plugin_canvasColorPicker',
          new CanvasColorPicker($(this), options));
        }
      });
  };
})( jQuery );
