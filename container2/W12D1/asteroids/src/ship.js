const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Bullet = require('./bullet');


function Ship(options) {
  options.color = Ship.COLOR;
  options.radius = Ship.RADIUS;
  options.vel = Util.randomVec(Ship.SPEED);

  MovingObject.call(this, options);
}

Ship.COLOR = 'green';
Ship.RADIUS = 10;
Ship.SPEED = 0;
Ship.RESPONSIVENESS = 2;

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function relocate() {
  this.pos = this.game.randomPosition();
  this.vel = Util.randomVec(Ship.SPEED);
};

Ship.prototype.power = function power(impulse) {
  this.vel[0] += (impulse[0] * Ship.RESPONSIVENESS);
  this.vel[1] += (impulse[1] * Ship.RESPONSIVENESS);
};

Ship.prototype.fireBullet = function fireBullet() {
  if (this.vel[0] === 0 && this.vel[1] === 0) return;
  const shipSpeed = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
  const shipDir = Util.scale(this.vel, (1 / shipSpeed));
  const bulletVel = Util.scale(shipDir, Bullet.SPEED);

  const bullet = new Bullet({pos: this.pos.slice(), color: this.color, vel: bulletVel, game: this.game});

  this.game.add(bullet);
};

module.exports = Ship;