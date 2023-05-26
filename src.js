<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Animar un polígono en D3.js</title>
  <script src="https://d3js.org/d3.v6.min.js"></script>
  <style>
    svg {
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <svg id="visualization">
    <rect width="100%" height="100%" fill="white"></rect>
    <polygon id="polygon" fill="red" stroke="black" stroke-width="2"></polygon>
  </svg>

  <script>
    var sides = 300;
    var angles = new Array(sides);
    var cosines = new Array(sides);
    var sines = new Array(sides);
    for (var i = 0; i < sides; i++) {
      angles[i] = (i / sides) * 2 * Math.PI;
      cosines[i] = Math.cos(angles[i]);
      sines[i] = Math.sin(angles[i]);
    }

    var svg = d3.select("#visualization");
    var polygon = d3.select("#polygon");

    function drawPolygon(x, y, radius, time) {
      var points = [];
      for (var i = 0; i < sides; i++) {
        var angle = angles[i];
        var r2 = radius - Math.sin(angle * 6.0 + time*10.) * 10 + Math.sin(angle * 12.0 + time*10.) * 20;
        var pointX = x + r2 * cosines[i];
        var pointY = y + r2 * sines[i];
        points.push(pointX + "," + pointY);
      }
      polygon.attr("points", points.join(" "));
    }

    function animate() {
      var time = d3.now() * 0.001; // Convertir milisegundos a segundos
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;

      var x = windowWidth / 2; // Posición X en la mitad de la pantalla
      var y = windowHeight / 2; // Posición Y en la mitad de la pantalla
      drawPolygon(x, y, 100, time);
      requestAnimationFrame(animate);
    }

    animate();
  </script>
</body>
</html>
