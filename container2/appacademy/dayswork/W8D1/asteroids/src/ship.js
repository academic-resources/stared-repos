/* eslint-disable no-undef */
const Util = require("./util.js");
const MovingObject = require("./moving_object");
const Bullet = require("./bullet");

Util.inherits(Ship, MovingObject);

function Ship(pos, game) {
  this.velocity = [0,0];
  MovingObject.call(this, { pos: pos, vel: this.velocity, color: Ship.COLOR, radius: Ship.RADIUS, game: game });
}

Ship.prototype.relocate = function() {
  this.position = this.game.randomPosition();
  this.velocity = [0,0];
};

Ship.prototype.power = function(impulse) {
  const [dx, dy] = impulse;
  this.velocity[0] += dx;
  this.velocity[1] += dy;
}

Ship.prototype.fireBullet = function() {
    
    const new_bullet = new Bullet(this.game);
    this.game.add(new_bullet);
    
};

Ship.RADIUS = 10;
Ship.COLOR = "blue";

module.exports = Ship;