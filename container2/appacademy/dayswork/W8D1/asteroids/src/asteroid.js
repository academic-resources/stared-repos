/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');


Util.inherits(Asteroid, MovingObject);
function Asteroid(pos, game) {
    this.velocity = Util.randomVec(.25);
    MovingObject.call(this, { pos: pos, vel: this.velocity, color: Asteroid.COLOR, radius: Asteroid.RADIUS, game: game });
}

Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Ship) {
        otherObject.relocate();
    }
};

Asteroid.COLOR = 'red';
Asteroid.RADIUS = 20;

module.exports = Asteroid;