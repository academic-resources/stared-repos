const Game = require("./game.js");

class GameView {
  constructor(ctx) {
    this.game = new Game(1200, 800, 10);
    this.ctx = ctx;
  }

  start() {
    setInterval( () => {
      this.game.step();
    }, 20);
  }

  bindKeyHandlers() {
    
  }
}

module.exports = GameView;