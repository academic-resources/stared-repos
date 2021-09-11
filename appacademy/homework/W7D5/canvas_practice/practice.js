document.addEventListener("DOMContentLoaded", function() {
  const can = document.getElementById("mycanvas");
  const dimension = 500;
  const two_pi_radians = 2 * Math.PI;
  can.width = dimension;
  can.height = dimension;
  const ctx = can.getContext("2d");

  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, dimension, dimension);

  ctx.beginPath();
  // void ctx.arc(x, y, radius, startAngle, endAngle[, anticlockwise]);
  ctx.arc(200, 200, 100, 0, two_pi_radians);
  ctx.strokeStyle = "gray";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "red";
  ctx.fill();

  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.moveTo(250, 50);
  ctx.lineTo(100, 250);
  ctx.lineTo(100, 25);
  ctx.fill();
});
