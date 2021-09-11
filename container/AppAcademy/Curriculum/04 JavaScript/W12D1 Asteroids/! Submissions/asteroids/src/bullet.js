const Util = require('./util.js')
const MovingObject = require('./moving_object.js')
const Ship = require('./ship.js')
const Asteroid = require('./asteroid.js')

function Bullet(game){
    let defaultOptions = {
      pos: game.ship.pos,
      vel: game.ship.vel,
      radius: 5,
      color: 'red',
      game: game
    }

    MovingObject.call(this, defaultOptions)
  }
  
Util.inherits(Bullet, MovingObject)

Bullet.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Asteroid) {
    this.game.remove(otherObject)
  }
}
module.exports = Bullet;