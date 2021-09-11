const Util = require('./util.js')
const MovingObject = require('./moving_object.js')
const Bullet = require("./bullet.js")

function Ship(pos, game){
    let defaultOptions = {
      pos: pos,
      vel: [0,0],
      radius: 10,
      color: 'blue',
      game: game
    }

    MovingObject.call(this, defaultOptions)
  }
Util.inherits(Ship, MovingObject)

Ship.prototype.relocate = function () {
    this.pos = this.game.randomPos()
    this.vel = [0,0]
}

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
}
  
Ship.prototype.fireBullet = function () {
  this.game.add( new Bullet(this.game) )
}

module.exports = Ship;