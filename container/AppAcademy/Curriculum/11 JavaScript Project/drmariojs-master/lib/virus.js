class Virus {
  constructor(ctx, board, coords, color){
    this.ctx = ctx;
    this.board = board;
    this.coords = coords;
    this.color = color;
    this.type = "virus";
    this.pair = null;
  }

  draw() {
    this.board[this.coords[0]][this.coords[1]] = this;

    let img = new Image();
    img.src = `images/virus${this.color}.png`;
    this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 36, 36);
    img.onload = () => {
      this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 36, 36);
    };
  }
}

export default Virus;
