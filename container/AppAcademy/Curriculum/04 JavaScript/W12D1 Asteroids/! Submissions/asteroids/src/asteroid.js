const Util = require('./util.js')
const MovingObject = require('./moving_object.js')
const Ship = require('./ship.js')

function Asteroid(pos, game){
    let defaultOptions = {
      pos: pos,
      vel: Util.randomVec(3),
      radius: 20,
      color: 'brown',
      game: game
    }

    MovingObject.call(this, defaultOptions)
  }
  
Util.inherits(Asteroid, MovingObject)

Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate()
  }
}
module.exports = Asteroid;