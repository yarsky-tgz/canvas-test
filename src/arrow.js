(function () {
  'use strict';

  var drawProps = { x1: 1, x2: 1, y1: 1, y2: 1, arrowLength: 1, arrowAngle: 1 };
  var pass = function () {};
  var cacheProperties = fabric.Object.prototype.cacheProperties.concat();
  cacheProperties.push(
    'x1',
    'x2',
    'y1',
    'y2',
    'arrowLength',
    'arrowAngle'
  );
  fabric.Arrow = fabric.util.createClass(fabric.Polygon, {
    type: 'arrow',
    arrowLength: 0,
    arrowAngle: 0,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    cacheProperties: cacheProperties,
    initialize: function(linePoints, options) {
      this.x1 = linePoints[0];
      this.y1 = linePoints[1];
      this.x2 = linePoints[2];
      this.y2 = linePoints[3];
      this.arrowLength = options.arrowLength || 10;
      this.arrowAngle = options.arrowAngle || 45;
      var points = this._getPoints();
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
    _set: function(key, value) {
      this.callSuper('_set', key, value);
      if (typeof drawProps[key] !== 'undefined') {
        this.set('points', this._getPoints());
        this._calcDimensions();
        this.top = this.minY;
        this.left = this.minX;
        this.pathOffset = {
          x: this.minX + this.width / 2,
          y: this.minY + this.height / 2
        };
      }
      return this;
    },
    _getPoints: function () {
      var points = [
        {x: this.x1, y: this.y1},
        {x: this.x2, y: this.y2}
      ];
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
      return points;
    },
    _getArrowOffset: function (position, angle, method) {
      return position + Math.round(this.arrowLength * method(angle));
    }
  });
})();
