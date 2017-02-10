(function () {
  var selectedObject = null;
  var strokeColor = '#ff0000';

  function getRandomInt(min, max) {
    return Math.round(min + Math.random() * max);
  }

  function getRandomArrow() {
    return new fabric.Arrow([
      getRandomInt(1, 600),
      getRandomInt(1, 400),
      getRandomInt(1, 600),
      getRandomInt(1, 400)
    ],
    {
      stroke: strokeColor,
      arrowLength: getRandomInt(10, 50),
      arrowAngle: getRandomInt(10, 60),
      strokeWidth: getRandomInt(1, 5)
    });
  }

  $(document).ready(function () {
    var colorPicker = $('#colorPicker');
    colorPicker.val(strokeColor);
    var canvas = new fabric.Canvas('sandbox');
    canvas.selection = false;
    canvas.on('object:selected', function (options) {
      selectedObject = options.target;
      colorPicker.val(selectedObject.get('stroke'));
    });
    canvas.on('selection:cleared', function () {
      selectedObject = null;
    });
    colorPicker.change(function () {
      if (selectedObject !== null) {
        selectedObject.set('stroke', this.value);
        canvas.renderAll();
      }
      strokeColor = this.value;
    });
    $('#addRandomArrow').click(function () {
      var arrow = getRandomArrow();
      canvas.add(arrow);
    });
  });

})();
