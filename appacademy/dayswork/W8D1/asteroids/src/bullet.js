/* eslint-disable no-console */
/* eslint-disable no-undef */
const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Asteroid = require("./asteroid.js");


Util.inherits(Bullet, MovingObject);

function Bullet(game) {
    let [vel_x, vel_y] = game.ship.velocity;
    vel_x += Bullet.SPEED;
    vel_y += Bullet.SPEED;
    this.velocity = [vel_x, vel_y];
    MovingObject.call(this, { pos: game.ship.position, vel: this.velocity, color: Bullet.COLOR, radius: Bullet.RADIUS, game: game });
}

Bullet.prototype.collideWith = function(obj) {
    if (obj === this.game.ship ) return;
    this.game.remove(obj);
    this.game.remove(this);
};

Bullet.SPEED = 5;
Bullet.COLOR = 'black';
Bullet.RADIUS = 5;

module.exports = Bullet;