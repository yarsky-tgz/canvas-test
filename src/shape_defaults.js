
(function(global) {
  'use strict';

  var fabric = global.fabric || (global.fabric = { });
  var extend = fabric.util.object.extend;

  fabric.ShapeDefaults = fabric.util.createClass(fabric.Observable, {
    defaults: {},
    initialize: function (defaults) {
      extend(this.defaults, defaults);
    },
    merge: function (defaults, sign) {
      extend(this.defaults, defaults);
      this.fire('defaults:changed', {defaults: this.defaults, sign: sign});
    },
    configShape: function (shape) {
      shape.set(this.defaults);
    }
  });

})(this);
