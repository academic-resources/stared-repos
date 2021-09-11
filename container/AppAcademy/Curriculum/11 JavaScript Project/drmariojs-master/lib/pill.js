import Audio from './audio';

class Pill {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.board1 = [0, 3];
    this.board2 = [0, 4];
    this.active = true;
    this.horizontal = true;
    this.audio = new Audio;

    this.pill1 = new PillBlock(ctx, board, [0, 3], ["yellow", "blue", "red"][Math.floor(Math.random() * 3)], "left");
    this.pill2 = new PillBlock(ctx, board, [0, 4], ["yellow", "blue", "red"][Math.floor(Math.random() * 3)], "right");
    this.pill1.pair = this.pill2;
    this.pill2.pair = this.pill1;
  }

  drop() {
    if (
      this.board1[0] < 15 &&
      this.board2[0] < 15 &&
      (this.board[this.board1[0] + 1][this.board1[1]] === undefined || this.board1[0] + 1 === this.board2[0] ) &&
      (this.board[this.board2[0] + 1][this.board2[1]] === undefined || this.board2[0] + 1=== this.board1[0] )
    ) {

        this.board[this.board1[0]][this.board1[1]] = undefined;
        this.board[this.board2[0]][this.board2[1]] = undefined;

        this.board1[0] = this.board1[0] + 1;
        this.board2[0] = this.board2[0] + 1;

        this.board[this.board1[0]][this.board1[1]] = this.pill1;
        this.board[this.board2[0]][this.board2[1]] = this.pill2;

        this.pill1.coords = [this.board1[0], this.board1[1]];
        this.pill2.coords = [this.board2[0], this.board2[1]];
    } else {
      this.active = false;
    }
  }

  move(k) {
    if (this.active) {
      if (k === "down") {
        this.drop();
        this.audio.movePill();
      }
      if (k === "right") {
        if (
          this.board1[1] < 7 &&
          this.board2[1] < 7 &&
          (this.board[this.board1[0]][this.board1[1] + 1] === undefined || this.board1[1] + 1 == this.board2[1]) &&
          (this.board[this.board2[0]][this.board2[1] + 1] === undefined || this.board2[1] + 1 == this.board1[1])
          ) {
            this.board[this.board1[0]][this.board1[1]] = undefined;
            this.board[this.board2[0]][this.board2[1]] = undefined;

            this.board1[1] = this.board1[1] + 1;
            this.board2[1] = this.board2[1] + 1;

            this.board[this.board1[0]][this.board1[1]] = this.pill1;
            this.board[this.board2[0]][this.board2[1]] = this.pill2;

            this.pill1.coords = [this.board1[0], this.board1[1]];
            this.pill2.coords = [this.board2[0], this.board2[1]];

            this.audio.movePill();
          }
        }
        if (k === "left") {
          if (
            this.board1[1] > 0 &&
            this.board2[1] > 0 &&
            (this.board[this.board1[0]][this.board1[1] - 1] === undefined || this.board1[1] - 1 == this.board2[1]) &&
            (this.board[this.board2[0]][this.board2[1] - 1] === undefined || this.board2[1] - 1 == this.board1[1])
            ) {

              this.board[this.board1[0]][this.board1[1]] = undefined;
              this.board[this.board2[0]][this.board2[1]] = undefined;

              this.board1[1] = this.board1[1] - 1;
              this.board2[1] = this.board2[1] - 1;

              this.board[this.board1[0]][this.board1[1]] = this.pill1;
              this.board[this.board2[0]][this.board2[1]] = this.pill2;

              this.pill1.coords = [this.board1[0], this.board1[1]];
              this.pill2.coords = [this.board2[0], this.board2[1]];

              this.audio.movePill();
            }
          }
        if (k === "z") {
          if (this.horizontal) {
            if (this.board2[0] > 0 && this.board[this.board1[0] - 1][this.board1[1]] === undefined) {

              this.board[this.board2[0]][this.board2[1]] = undefined;
              this.board2[0] = this.board2[0] - 1;
              this.board2[1] = this.board2[1] - 1;
              this.board[this.board2[0]][this.board2[1]] = this.pill2;
              this.pill2.coords = [this.board2[0], this.board2[1]];

              this.pill1.side = "bottom";
              this.pill2.side = "top";

              this.horizontal = false;

              this.audio.rotatePill();
            }
          } else {
            if (this.board[this.board1[0]][this.board1[1] + 1] === undefined && this.board1[1] < 7) {
              this.board[this.board2[0]][this.board2[1]] = undefined;
              this.board2[0] = this.board2[0] + 1;
              this.board2[1] = this.board2[1] + 1;
              this.board[this.board2[0]][this.board2[1]] = this.pill2;
              this.pill2.coords = [this.board2[0], this.board2[1]];

              const tempColor = this.pill1.color;
              this.pill1.color = this.pill2.color;
              this.pill2.color = tempColor;

              this.pill1.side = "left";
              this.pill2.side = "right";

              this.horizontal = true;

              this.audio.rotatePill();
            }
          }
        }
        if (k === "x") {
          if (this.horizontal) {
            if (this.board2[0] > 0 && this.board[this.board1[0] - 1][this.board1[1]] === undefined) {
              this.board[this.board2[0]][this.board2[1]] = undefined;
              this.board2[0] = this.board2[0] - 1;
              this.board2[1] = this.board2[1] - 1;
              this.board[this.board2[0]][this.board2[1]] = this.pill2;
              this.pill2.coords = [this.board2[0], this.board2[1]];

              const tempColor = this.pill1.color;
              this.pill1.color = this.pill2.color;
              this.pill2.color = tempColor;

              this.pill1.side = "bottom";
              this.pill2.side = "top";

              this.horizontal = false;

              this.audio.rotatePill();
            }
          } else {
            if (this.board[this.board1[0]][this.board1[1] + 1] === undefined && this.board1[1] < 7) {
              this.board[this.board2[0]][this.board2[1]] = undefined;
              this.board2[0] = this.board2[0] + 1;
              this.board2[1] = this.board2[1] + 1;
              this.board[this.board2[0]][this.board2[1]] = this.pill2;
              this.pill2.coords = [this.board2[0], this.board2[1]];

              this.pill1.side = "left";
              this.pill2.side = "right";

              this.horizontal = true;

              this.audio.rotatePill();
            }
          }
        }
    }

  }
}

class PillBlock {
  constructor(ctx, board, coords, color, side){
    this.ctx = ctx;
    this.board = board;
    this.coords = coords;
    this.color = color;
    this.type = "pill";
    this.pair = null;
    this.side = side;
  }

  draw() {
    let img = new Image();
    let x = (this.coords[1] * 36);
    let y = (this.coords[0] * 36);
    let w = 32;
    let h = 32;
    let degrees = -90;
    if (this.pair === null) {
      img.src = `images/pill${this.color}.png`;
      this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 32, 32);
      img.onload = () => {
        this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 32, 32);
      };
    } else if (this.side === "left") {
      img.src = `images/pill${this.color}left.png`;
      this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 32, 32);
      img.onload = () => {
        this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 32, 32);
      };
    } else if (this.side === "right"){
      img.src = `images/pill${this.color}right.png`;
      this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 32, 32);
      img.onload = () => {
        this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 32, 32);
      };
    } else if (this.side === "top"){
      img.src = `images/pill${this.color}right.png`;

      this.ctx.save();
      this.ctx.translate(x+w/2, y+h/2);
      this.ctx.rotate(degrees*Math.PI/180.0);
      this.ctx.translate(-x-w/2, -y-h/2);
      this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 32, 32);
      this.ctx.restore();
      img.onload = () => {
        this.ctx.save();
        this.ctx.translate(x+w/2, y+h/2);
        this.ctx.rotate(degrees*Math.PI/180.0);
        this.ctx.translate(-x-w/2, -y-h/2);
        this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 32, 32);
        this.ctx.restore();
      };
    } else if (this.side === "bottom"){
      img.src = `images/pill${this.color}left.png`;

      this.ctx.save();
      this.ctx.translate(x+w/2, y+h/2);
      this.ctx.rotate(degrees*Math.PI/180.0);
      this.ctx.translate(-x-w/2, -y-h/2);
      this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 32, 32);
      this.ctx.restore();
      img.onload = () => {
        this.ctx.save();
        this.ctx.translate(x+w/2, y+h/2);
        this.ctx.rotate(degrees*Math.PI/180.0);
        this.ctx.translate(-x-w/2, -y-h/2);
        this.ctx.drawImage(img, this.coords[1] * 36, this.coords[0] * 36, 32, 32);
        this.ctx.restore();
      };
    }
  }

  drop() {
    if (
      this.coords[0] < 15 &&
      this.board[this.coords[0] + 1][this.coords[1]] === undefined
    ) {
        this.board[this.coords[0]][this.coords[1]] = undefined;
        this.coords[0] = this.coords[0] + 1;
        this.board[this.coords[0]][this.coords[1]] = this;
    }
  }
}


export default Pill;
