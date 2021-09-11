import Pill from './pill';
import Virus from './virus';
import Audio from './audio';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.level = 1;
    this.speed = 1000;
    this.score = 0;
    this.newGame = true;
    this.gameOver = false;
    this.paused = false;
    this.checking = false;
    this.changed = false;
    this.currentPill = null;
    this.virusCount = 0;
    this.board = this.newBoard(ctx);
    this.audio = new Audio;
  }

  newBoard(ctx) {
    const board = new Array(16);
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(8);
    }
    this.randomizeViruses(ctx, board);
    return board;
  }

  randomizeViruses(ctx, board) {
    for (let i = 0; i < this.level * 10; i++) {
      let randomX = Math.floor(Math.random() * 8);
      let randomY = Math.floor(Math.random() * 12) + 4;
      while (board[randomY][randomX] !== undefined) {
        randomX = Math.floor(Math.random() * 8);
        randomY = Math.floor(Math.random() * 12) + 4;
      }
      const virusColor = ["yellow", "blue", "red"][Math.floor(Math.random() * 3)];
      const virus = new Virus(ctx, board, [randomY, randomX], virusColor);
      board[randomY][randomX] = virus;
    }
  }

  newPill(ctx, board) {
    if (this.board[0][3] !== undefined || this.board[0][4] !== undefined) {
      this.gameOver = true;
    }
    const pill = new Pill(ctx, board);
    this.currentPill = pill;
    board[0][3] = pill.pill1;
    board[0][4] = pill.pill2;
  }

  allObjects() {
    return [].concat.apply([], this.board);
  }

  draw(ctx) {
    if (!this.paused && !this.gameOver) {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      this.allObjects().forEach((object) => {
        if (object !== undefined) {
          object.draw();
        }
      });
      document.getElementById("virus").innerHTML = `Viruses Left: ${this.virusCount}`;
      document.getElementById("score").innerHTML = `Score: ${this.score}`;
      document.getElementById("level").innerHTML = `Level: ${this.level}`;
    }
  }

  bindKeyHandlers() {
    Object.keys(Game.MOVES).forEach((k) => {
      const move = Game.MOVES[k];
      key(k, () => {
        this.currentPill.move(k);
        if (!this.currentPill.active) {
          this.checkBoard();
        }
        this.draw(this.ctx);
      });
    });
    key("space", () => { this.space(); });
  }

  space() {
    if (this.newGame) {
      this.newGame = false;
      this.checkBoard();
      this.audio.startGame();
      requestAnimationFrame(this.animate.bind(this));
    } else if (!this.gameOver) {
      this.paused = !this.paused;
      this.currentPill.active = !this.currentPill.active;
      if (this.paused) {
        this.audio.pausebgm();
      } else {
        this.audio.playbgm();
      }
      this.ctx.font = "60px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("PAUSED",25,300);
      this.ctx.strokeStyle = "white";
      this.ctx.lineWidth = 2;
      this.ctx.strokeText("PAUSED",25,300);
      this.draw(this.ctx);
    } else {
      this.level = 1;
      this.speed = 1000;
      this.score = 0;
      this.gameOver = false;
      this.board = this.newBoard(this.ctx);
      this.checkBoard();
      this.audio.startGame();
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  start() {
    this.bindKeyHandlers();
    requestAnimationFrame(this.animate.bind(this));
    this.checkBoard();
  }

  animate() {
    if (this.newGame) {
      document.getElementById("virus").innerHTML = `Viruses Left: ${this.virusCount}`;
      document.getElementById("score").innerHTML = `Score: ${this.score}`;
      document.getElementById("level").innerHTML = `Level: ${this.level}`;
      document.getElementById("mute").addEventListener("click", () => {
        this.audio.toggleMute();
        document.getElementById("mute").blur();
      });
      this.ctx.font = "50px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("Dr Mario JS",15,250);
      this.ctx.strokeStyle = "white";
      this.ctx.lineWidth = 2;
      this.ctx.strokeText("Dr Mario JS",15,250);
      this.ctx.font = "25px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("Hit Space to Start",45,300);
      this.ctx.strokeStyle = "white";
      this.ctx.lineWidth = 1;
      this.ctx.strokeText("Hit Space to Start",45,300);
    } else if (this.paused) {
      setTimeout(() => {requestAnimationFrame(this.animate.bind(this));}, this.speed);
    } else if (this.checking){
      setTimeout(() => {requestAnimationFrame(this.animate.bind(this));}, this.speed);
    } else if (this.virusCount === 0) {
      this.audio.levelClear();
      if (this.level < 10) {
        this.level += 1;
        this.speed -= 100;
      }
      this.board = this.newBoard(this.ctx);
      this.checkBoard();
      requestAnimationFrame(this.animate.bind(this));
    } else if (this.gameOver) {
      this.audio.bgmStop();
      this.audio.gameOver();
      this.ctx.font = "50px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("Game Over",15,250);
      this.ctx.strokeStyle = "white";
      this.ctx.lineWidth = 2;
      this.ctx.strokeText("Game Over",15,250);
      this.ctx.font = "25px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("Hit Space to Restart",30,300);
      this.ctx.strokeStyle = "white";
      this.ctx.lineWidth = 1;
      this.ctx.strokeText("Hit Space to Restart",30,300);
    } else {
      if (!this.currentPill || !this.currentPill.active) {
        this.newPill(this.ctx, this.board);
      } else {
        this.currentPill.drop();
        if (!this.currentPill.active) {
          this.checkBoard();
        }
      }

      this.draw(this.ctx);

      setTimeout(() => {requestAnimationFrame(this.animate.bind(this));}, this.speed);
    }
  }

  checkBoard() {
    this.checking = true;
    this.checkCols();
    this.checkRows();
    if (this.changed) {
      this.changed = false;
      this.dropPills();
      setTimeout(() => {this.checkBoard();}, 500);
    } else {
      this.checking = false;
    }
  }

  dropPills() {
    const transposedBoard = [];
    for (var i = 0; i < 8; i++) {
      const newRow = [];
      for (var j = 15; j >= 0; j--) {
        newRow.push(this.board[j][i]);
      }
      transposedBoard.push(newRow);
    }

    for (i = 0; i < transposedBoard.length; i++) {
      for (j = 1; j < transposedBoard[i].length; j++) {
        if (transposedBoard[i][j] !== undefined &&
          transposedBoard[i][j].type === "pill" &&
          transposedBoard[i][j -1 ] === undefined) {
            if (transposedBoard[i][j].pair === null) {
              transposedBoard[i][j].drop();
              transposedBoard[i][j] = undefined;
              this.draw(this.ctx);
              this.changed = true;
            } else if (transposedBoard[i][j].coords[1] === transposedBoard[i][j].pair.coords[1] ||
                transposedBoard[i][j].coords[0] !== transposedBoard[i][j].pair.coords[0] ||
                this.board[transposedBoard[i][j].pair.coords[0] + 1][transposedBoard[i][j].pair.coords[1]] === undefined) {
                  transposedBoard[i][j].drop();
                  transposedBoard[i][j] = undefined;
                  this.draw(this.ctx);
                  this.changed = true;
            }
        }
      }
    }
  }

  checkRows() {
    let viruses = [];
    let tempRow;
    let currentColor;
    for (var i = 0; i < this.board.length; i++) {
      tempRow = [];
      currentColor = null;
      for (var j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] !== undefined) {
          if (this.board[i][j].type === "virus") {
            viruses.push([i, j]);
          }
          if (currentColor === null) {
            currentColor = this.board[i][j].color;
          }
          if (this.board[i][j].color === currentColor) {
            tempRow.push([i, j]);
          }
          if (this.board[i][j].color !== currentColor || j === 7) {
            currentColor = this.board[i][j].color;
            if (tempRow.length > 3) {
              tempRow.forEach((coord) => {
                if (this.board[coord[0]][coord[1]].type === "virus") {
                  this.score += 100;
                }
                if (this.board[coord[0]][coord[1]].pair) {
                  this.board[coord[0]][coord[1]].pair.pair = null;
                }
                this.board[coord[0]][coord[1]] = undefined;
                this.changed = true;
              });
              this.audio.eatBlocks();
            }
            tempRow = [];
            tempRow.push([i, j]);
          }
        } else {
          if (tempRow.length > 3) {
            tempRow.forEach((coord) => {
              if (this.board[coord[0]][coord[1]].type === "virus") {
                this.score += 100;
              }
              if (this.board[coord[0]][coord[1]].pair) {
                this.board[coord[0]][coord[1]].pair.pair = null;
              }
              this.board[coord[0]][coord[1]] = undefined;
              this.changed = true;
            });
            this.audio.eatBlocks();
          }
          tempRow = [];
          currentColor = null;
        }
      }
    }
    this.virusCount = viruses.length;
  }

  checkCols() {
    const transposedBoard = [];
    for (var i = 0; i < 8; i++) {
      const newRow = [];
      for (var j = 0; j < this.board.length; j++) {
        newRow.push(this.board[j][i]);
      }
      transposedBoard.push(newRow);
    }
    let tempCol = [];
    let currentColor = null;
    for (i = 0; i < transposedBoard.length; i++) {
      tempCol = [];
      currentColor = null;
      for (j = 0; j < transposedBoard[i].length; j++) {
        if (transposedBoard[i][j] !== undefined) {
          if (currentColor === null) {
            currentColor = transposedBoard[i][j].color;
          }
          if (transposedBoard[i][j].color === currentColor) {
            tempCol.push([i, j]);
          }
          if (transposedBoard[i][j].color !== currentColor || j === 15) {
            currentColor = transposedBoard[i][j].color;
            if (tempCol.length > 3) {
              tempCol.forEach((coord) => {
                if (this.board[coord[1]][coord[0]].type === "virus") {
                  this.score += 100;
                }
                if (this.board[coord[1]][coord[0]].pair) {
                  this.board[coord[1]][coord[0]].pair.pair = null;
                }
                this.board[coord[1]][coord[0]] = undefined;
                this.changed = true;
              });
              this.audio.eatBlocks();
            }
            tempCol = [];
            tempCol.push([i, j]);
          }
        } else {
          if (tempCol.length > 3) {
            tempCol.forEach((coord) => {
              if (this.board[coord[1]][coord[0]].type === "virus") {
                this.score += 100;
              }
              if (this.board[coord[1]][coord[0]].pair) {
                this.board[coord[1]][coord[0]].pair.pair = null;
              }
              this.board[coord[1]][coord[0]] = undefined;
              this.changed = true;
            });
            this.audio.eatBlocks();
          }
          tempCol = [];
          currentColor = null;
        }
      }
    }
  }



}

Game.DIM_X = 288;
Game.DIM_Y = 576;
Game.MOVES = {
  left: "left",
  right: "right",
  down: "down",
  z: "z",
  x: "x",
};


export default Game;
