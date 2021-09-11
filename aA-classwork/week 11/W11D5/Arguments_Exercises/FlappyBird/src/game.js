
class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.ctx.width = 640;
    this.ctx.height = 480;
    let width = this.ctx.width;
    let height = this.ctx.height;
  }
}

module.exports = Game;