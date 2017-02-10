(function () {
  'use strict';
  var pass = function () {};
  fabric.Arrow = fabric.util.createClass(fabric.Polygon, {
    type: 'arrow',
    arrowLength: 0,
    arrowAngle: 0,
    initialize: function(linePoints, options) {
      var points = [
        {x: linePoints[0], y: linePoints[1]},
        {x: linePoints[2], y: linePoints[3]}
      ];
      this.set('arrowLength', options.arrowLength || 10);
      this.set('arrowAngle', options.arrowAngle || 45);
      var arrowRadAngle = this.arrowAngle * Math.PI / 180;
      var lineAngle = Math.atan2(points[0].y - points[1].y, points[0].x - points[1].x);
      var leftAngle = lineAngle - arrowRadAngle;
      var rightAngle = lineAngle + arrowRadAngle;
      points.push({
        x: this._getArrowOffset(points[1].x, leftAngle, Math.cos),
        y: this._getArrowOffset(points[1].y, leftAngle, Math.sin)
      });
      points.push(points[1]);
      points.push({
        x: this._getArrowOffset(points[1].x, rightAngle, Math.cos),
        y: this._getArrowOffset(points[1].y, rightAngle, Math.sin)
      });
      this.callSuper('initialize', points, options);
    },
    commonRender: function(ctx, noTransform) {
      var allPoints = this.points.concat();
      var arrowPoints = this.points.splice(2, 3);
      this.callSuper('commonRender', ctx, noTransform);
      this.points = arrowPoints;
      this.callSuper('commonRender', {moveTo: ctx.moveTo.bind(ctx), lineTo: ctx.lineTo.bind(ctx), beginPath: pass}, noTransform);
      this.points = allPoints;
      this._renderStroke(ctx);
      return false;
    },
    _getArrowOffset: function (position, angle, method) {
      return position + Math.round(this.arrowLength * method(angle));
    }
  });
})();
