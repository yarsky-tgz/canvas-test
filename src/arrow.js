(function() {
  fabric.Arrow = fabric.util.createClass(fabric.Line, {
    type: 'arrow',
    arrowLength: 0,
    arrowAngle: 0,
    initialize: function(points, options) {
      options = options || {};
      this.callSuper('initialize', points, options);
      this.set('arrowLength', options.arrowLength || 10);
      this.set('arrowAngle', options.arrowAngle || 45);
    },
    _render: function(ctx, noTransform) {
      this.callSuper('_render', ctx, noTransform);
      ctx.beginPath();
      if (noTransform) {
        var cp = this.getCenterPoint();
        ctx.translate(
          cp.x - this.strokeWidth / 2,
          cp.y - this.strokeWidth / 2
        );
      }
      var p = this.calcLinePoints();
      var arrowPoints = this._getArrowPoints();
      ctx.moveTo(arrowPoints.left.x, arrowPoints.left.y);
      ctx.lineTo(p.x2, p.y2);
      ctx.lineTo(arrowPoints.right.x, arrowPoints.right.y);
      ctx.lineWidth = this.strokeWidth;
      var origStrokeStyle = ctx.strokeStyle;
      ctx.strokeStyle = this.stroke || ctx.fillStyle;
      this.stroke && this._renderStroke(ctx);
      ctx.strokeStyle = origStrokeStyle;
    },
    _getNonTransformedDimensions: function() {
      var p = this.calcLinePoints();
      var ap = this._getArrowPoints();
      var coords = {
        x: [p.x1, p.x2, ap.left.x, ap.right.x],
        y: [p.y1, p.y2, ap.left.y, ap.right.y]
      }
      var minX = fabric.util.array.min(coords.x);
      var maxX = fabric.util.array.max(coords.x);
      var minY = fabric.util.array.min(coords.y);
      var maxY = fabric.util.array.max(coords.y);
      return {
        x: maxX - minX + this.strokeWidth,
        y: maxY - minY + this.strokeWidth
      }
    },
    _getArrowPoints: function() {
      var p = this.calcLinePoints();
      var arrowRadAngle = this.arrowAngle * Math.PI / 180;
      var lineAngle = Math.atan2(p.y1 - p.y2, p.x1 - p.x2);
      var leftAngle = lineAngle - arrowRadAngle;
      var rightAngle = lineAngle + arrowRadAngle;
      return {
        left: {
          x: this._getArrowOffset(p.x2, leftAngle, Math.cos),
          y: this._getArrowOffset(p.y2, leftAngle, Math.sin)
        },
        right: {
          x: this._getArrowOffset(p.x2, rightAngle, Math.cos),
          y: this._getArrowOffset(p.y2, rightAngle, Math.sin),
        }
      };
    },
    _getArrowOffset: function (position, angle, method) {
      return position + Math.round(this.arrowLength * method(angle));
    }
  });
})();
