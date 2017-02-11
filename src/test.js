(function () {
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
      stroke: $('#colorPicker').val(),
      arrowLength: getRandomInt(10, 50),
      arrowAngle: getRandomInt(10, 60),
      strokeWidth: getRandomInt(1, 5)
    });
  }

  $(document).ready(function () {
    var canvas = new fabric.Canvas('sandbox');
    $('#colorPicker').canvasColorPicker({
      color: '#cccc00',
      canvas: canvas
    });
    $('#addRandomArrow').click(function () {
      var arrow = getRandomArrow();
      canvas.add(arrow);
    });
  });

})();
