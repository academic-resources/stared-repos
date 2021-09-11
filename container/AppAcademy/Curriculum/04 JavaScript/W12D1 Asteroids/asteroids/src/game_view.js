const Game = require('./game.js')
const Ship = require('./ship.js')

function GameView (ctx) {
  this.game = new Game();
  this.ctx = ctx
}

GameView.prototype.start = function () {
  const that = this
  setInterval( function () {
    
    that.game.step()
    that.game.draw(ctx);
  }, 20)
  this.bindKeyHandlers();
}

GameView.prototype.bindKeyHandlers = function () {
    const that = this
  key('a', function(){that.game.ship.power([-3, 0])})
  key('d', function(){that.game.ship.power([3, 0])})
  key('w', function(){that.game.ship.power([0, -3])})
  key('s', function(){that.game.ship.power([0, 3])})
  key('space', function(){ that.game.ship.fireBullet() })

}
//function(){this.game.ship.power}
module.exports = GameView