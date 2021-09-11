/* eslint-disable no-console */
/* eslint-disable no-undef */
const Util = require("./util.js");

function MovingObject(options) {
    //   { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00" }
    this.position = options.pos;
    this.velocity = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
}

MovingObject.prototype.draw = function (ctx) {
  // circle: 
  let [x, y] = this.position;
    
  ctx.beginPath();
  ctx.arc(x, y, this.radius, 0, (Math.PI*2));
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = this.color;
  ctx.fill();
}

MovingObject.prototype.move = function() {
    [current_x, current_y]  = this.position;
    [velocity_x, velocity_y]  = this.velocity;
    new_x = current_x + velocity_x;
    new_y = current_y + velocity_y;
    this.position = [new_x, new_y];
    this.position = this.game.wrap(this.position);
}

MovingObject.prototype.isCollidedWith = function(otherObject) {
    const sum_of_radii = this.radius + otherObject.radius;
    return ( Util.distance(this.position, otherObject.position) < sum_of_radii) 
};

MovingObject.prototype.collideWith = function(otherObject) {
    
};

module.exports = MovingObject;
