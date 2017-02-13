(function () {

  function getRandomInt(min, max) {
    return Math.round(min + Math.random() * max);
  }

  $(document).ready(function () {
    var canvas = new fabric.Canvas('sandbox');
    var shapeDefaults = new fabric.ShapeDefaults({
      perPixelTargetFind: true
    });
    canvas.set('selection', false);
    canvas.set('targetFindTolerance', 8);
    canvas.on('object:selected', function (options) {
      shapeDefaults.merge({
        stroke: options.target.stroke,
        fill: options.target.fill,
        strokeWidth: options.target.strokeWidth
      }, 'canvas');
    });
    shapeDefaults.on('defaults:changed', function (options) {
      if (options.sign == 'canvas') {
        return;
      }
      var obj = canvas.getActiveObject();
      if (!obj) {
        return;
      }
      shapeDefaults.configShape(obj);
      canvas.renderAll();
    });

    $('#strokePicker').propertyControl({
      value: '#cccc00',
      shapeDefaults: shapeDefaults,
      name: 'stroke'
    });

    $('#fillPicker').propertyControl({
      value: '#ffffff',
      shapeDefaults: shapeDefaults,
      name: 'fill'
    });

    $('#strokeWidthPicker').propertyControl({
      value: 1,
      shapeDefaults: shapeDefaults,
      name: 'strokeWidth',
      format: parseInt
    });

    $('#drawArrow').drawer({
      create: function (x, y) {
        return new fabric.Arrow([
          x,
          y,
          x + 1,
          y + 1
        ],
        {
          arrowLength: getRandomInt(10, 50),
          arrowAngle: getRandomInt(10, 60)
        });
      },
      sync: function (shape, x, y) {
        shape.set({x2: x, y2: y});
      },
      canvas: canvas,
      cursorHandler: '.upper-canvas',
      defaults: shapeDefaults
    });

    $('#drawRect').drawer({
      create: function (x, y) {
        return new fabric.Rect({
          left: x,
          top: y,
          width: 1,
          height: 1
        });
      },
      sync: function (shape, x, y, startX, startY) {
        var props = {};
        props.left = startX < x ? startX : x;
        props.width = startX < x ? x - startX : startX - x;
        props.top = startY < y ? startY : y;
        props.height = startY < y - startY ? y - startY : startY - y;
        shape.set(props);
      },
      canvas: canvas,
      cursorHandler: '.upper-canvas',
      defaults: shapeDefaults
    });

    $('#drawEllipse').drawer({
      create: function (x, y) {
        return new fabric.Ellipse({
          left: x,
          top: y,
          rx: 1,
          ry: 1
        });
      },
      sync: function (shape, x, y, startX, startY) {
        var props = {};
        props.left = startX < x ? startX : x;
        props.top = startY < y ? startY : y;
        props.rx = Math.round((startX < x ? x - startX : startX - x) / 2);
        props.ry = Math.round((startY < y - startY ? y - startY : startY - y) / 2);
        shape.set(props);
      },
      canvas: canvas,
      cursorHandler: '.upper-canvas',
      defaults: shapeDefaults
    });
  });

})();
