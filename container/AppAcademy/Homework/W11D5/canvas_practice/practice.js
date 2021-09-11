document.addEventListener("DOMContentLoaded", function(){

const canvas = document.getElementById('mycanvas');
canvas.height = 500
canvas.width = 500

const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 500, 500);

ctx.beginPath();
ctx.arc(100, 175, 50, 0, 2 * Math.PI);
ctx.strokeStyle = 'blue';
ctx.stroke();
ctx.fillStyle = 'yellow';
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.moveTo(100,100);
// Set line width
ctx.lineWidth = 10;

// Wall
ctx.fillStyle = 'green';
ctx.strokeRect(75 + 100, 140 + 200, 150, 110);
ctx.fillRect(75 + 100, 140 + 200, 150, 110);


// Door
ctx.fillStyle = 'yellow';
ctx.fillRect(130 + 100, 190 + 200, 40, 60);

// Roof
ctx.moveTo(50 + 100, 140 + 200);
ctx.lineTo(150 + 100, 60 + 200);
ctx.lineTo(250 + 100, 140 + 200);
ctx.closePath();
ctx.stroke();
ctx.fillStyle = 'orange';
ctx.fill()
});


