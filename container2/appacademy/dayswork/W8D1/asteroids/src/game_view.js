/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Game = require("./game.js");

function GameView (ctx) {
  this.context = ctx;
  this.game = new Game(ctx);
}

GameView.prototype.start = function () {
    const that = this;
    this.bindKeyHandlers();
  setInterval( () => {
      
    that.game.step();
    that.game.draw(that.context);
  }, 16);
};

GameView.prototype.bindKeyHandlers = function () {
    key('w', () => {
        this.game.ship.power([0, -1]);
    });

    key('a', () => {
        this.game.ship.power([-1, 0]);
    });

    key('s', () => {
        this.game.ship.power([0, 1]);
    });

    key('d', () => {
        this.game.ship.power([1, 0]);
    });

    key('space', () => {
        this.game.ship.fireBullet(this.game);
    });
};

module.exports = GameView;