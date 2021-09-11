const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

function Bullet(options) {
  options.radius = Bullet.RADIUS;

  MovingObject.call(this, options);
}

Bullet.RADIUS = 4;
Bullet.SPEED = 10;

Util.inherits(Bullet, MovingObject);

Bullet.prototype.isWrappable = false;

module.exports = Bullet;