var stats = new Stats();
stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
// 被监测的Canvas 对象
var canvas = document.createElement('canvas');
canvas.width = 100;
canvas.height = 100;
document.body.appendChild(canvas);
// document.getElementsByTagName(canvas).style.border="1px solid #f00";
var context = canvas.getContext('2d');
context.fillStyle = 'rgba(255,0,255,0.3)';
//
function animate() {
    stats.begin();
    // monitored code goes here
    var time = performance.now() / 1000;
  context.clearRect( 0, 0, 100, 100 );
    //
    for ( var i = 0; i < 2000; i ++ ) {
    var x = Math.cos( time + i * 0.01 ) * 20 + 50;
    var y = Math.sin( time + i * 0.01234 ) * 20 + 50;
    context.beginPath();
    context.arc( x, y, 5, 0, Math.PI * 1, true );
    context.fill();
  }
    stats.end();
    requestAnimationFrame( animate );
}
requestAnimationFrame( animate );
