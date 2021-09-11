function MovingObject(options){
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.isWrappable = true;

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.stroke();
};

MovingObject.prototype.move = function(timeDelta) {
  timeDelta = timeDelta || 1;
  this.pos[0] += this.vel[0] * timeDelta;
  this.pos[1] += this.vel[1] * timeDelta;
  if (this.game.isOutOfBounds(this.pos)) {
    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    } else {
      this.game.remove(this);
    }
  }
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  const dist = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2) + Math.pow((this.pos[1] - otherObject.pos[1]), 2));
  return (dist < (this.radius + otherObject.radius));
};

MovingObject.prototype.collideWith = function(otherObject) {
};

MovingObject.prototype.remove = function remove() {
  this.game.remove(this);
};

module.exports = MovingObject;