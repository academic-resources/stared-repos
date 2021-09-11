

function MovingObject(options) {
  // console.log(options)
  this.pos = options.pos
  this.vel = options.vel
  this.radius = options.radius
  this.color = options.color
  this.game = options.game
}
  
MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
  ctx.stroke();
  ctx.fill();
}

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0]
  this.pos[1] += this.vel[1]
  this.pos = this.game.wrap(this.pos)
}

MovingObject.prototype.isCollideWith = function (otherObject) {
  let collideDist = this.radius + otherObject.radius
  let [x_1, y_1] = this.pos
  let [x_2, y_2] = otherObject.pos

  if (Math.sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2) <= collideDist) {
    return true
  } else {
    return false;
  }
}

MovingObject.prototype.collideWith = function (otherObject) {
  // this.game.remove(otherObject);
  // this.game.remove(this);
}

// Dist([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)


module.exports = MovingObject
