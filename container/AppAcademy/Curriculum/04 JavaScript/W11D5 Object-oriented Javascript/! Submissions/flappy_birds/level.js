class Level {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drawBackground(context) {
    context.fillStyle = "blue";
    context.fillRect(0, 0, this.width, this.height);
  }

  animate(context) {
    this.drawBackground(context);
  }
}


module.exports = Level