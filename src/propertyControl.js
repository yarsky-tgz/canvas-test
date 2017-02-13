(function( $ ) {
  'use strict';

  var SIGN = '_picker';

  var defaultOptions = {
    value: null,
    shapeDefaults: null,
    name: 'stroke',
    format: null
  };

  var PropertyControl = function (element, options) {
    var self = this;
    this.options = $.extend({}, defaultOptions, options);
    this.element = element;
    this._changeValue(this.options.value, true);
    self._applyValue();
    this.element.change(function () {
      self._changeValue(this.value, false);
      self._applyValue();
    });
    this.options.shapeDefaults.on('defaults:changed', function (options) {
      var defaults = options.defaults;
      if (options.sign == SIGN) {
        return;
      }
      self._changeValue(defaults[self.options.name], true)
    });
  };

  PropertyControl.prototype._changeValue = function(color, updateElement) {
    this.options.value = color;
    if (updateElement) {
      this.element.val(color);
    }
  };

  PropertyControl.prototype._applyValue = function () {
    var props = {};
    props[this.options.name] = !!this.options.format ? this.options.format(this.options.value) : this.options.value;
    this.options.shapeDefaults && this.options.shapeDefaults.merge(props, SIGN);
  };

  $.fn.propertyControl = function(options) {
    return this.each(function () {
        if (!$.data(this, 'plugin_PropertyControl')) {
          $.data(this, 'plugin_PropertyControl',
          new PropertyControl($(this), options));
        }
      });
  };
})( jQuery );
