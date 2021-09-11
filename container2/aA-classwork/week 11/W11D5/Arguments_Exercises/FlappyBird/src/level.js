const Game = require("./game.js");
class Level {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    const canvas = document.getElementById("bird-game");
    canvas.width = width;
    canvas.height = height;
    this.ctx = canvas.getContext("2d");
    this.game = new Game(canvas);
  }

  drawBackground() {
    this.ctx.beginPath();
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "blue";
    this.ctx.fill();
  }

  animate() {
    this.drawBackground();
  }
}

module.exports = Level;
