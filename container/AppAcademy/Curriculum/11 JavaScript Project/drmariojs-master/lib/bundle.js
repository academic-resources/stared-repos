/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Audio {

  toggleMute() {
    const sounds = document.getElementsByTagName("audio");
    for (let i = 0; i < sounds.length; i++) {
      sounds[i].muted = !sounds[i].muted;
    }
    const muteButton = document.getElementById("muteicon");
    if (sounds[0].muted) {
      muteButton.classList.remove("fa-volume-up");
      muteButton.classList.add("fa-volume-off");
    } else {
      muteButton.classList.remove("fa-volume-off");
      muteButton.classList.add("fa-volume-up");
    }
  }
  startGame() {
    const sounds = document.getElementsByTagName("audio");
    for (let i = 0; i < sounds.length; i++) {
      sounds[i].pause();
      sounds.currentTime = 0;
    }
    const sound = document.getElementById("bgm");
    sound.play();
  }

  bgmStop() {
    const sound = document.getElementById("bgm");
    sound.pause();
    sound.currentTime = 0;
  }

  pausebgm() {
    const sound = document.getElementById("bgm");
    sound.pause();
  }

  playbgm() {
    const sound = document.getElementById("bgm");
    sound.play();
  }

  movePill() {
    const sound = document.getElementById("movepill");
    sound.currentTime = 0;
    sound.play();
  }

  rotatePill() {
    const sound = document.getElementById("rotatepill");
    sound.currentTime = 0;
    sound.play();
  }

  eatBlocks() {
    const sound = document.getElementById("eatblocks");
    sound.currentTime = 0;
    sound.play();
  }

  levelClear() {
    const bgm = document.getElementById("bgm");
    const sound = document.getElementById("levelclear");
    bgm.pause();
    bgm.currentTime = 0;
    sound.play();
    setTimeout(() => {
      bgm.play();
    }, 2500);
  }

  gameOver() {
    const sound = document.getElementById("gameover");
    sound.play();
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Audio);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(2);


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_X;
  canvasEl.height = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_Y;
  const ctx = canvasEl.getContext("2d");

  let game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](ctx);
  game.start();
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pill__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__virus__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audio__ = __webpack_require__(0);




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
    this.audio = new __WEBPACK_IMPORTED_MODULE_2__audio__["a" /* default */];
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
      const virus = new __WEBPACK_IMPORTED_MODULE_1__virus__["a" /* default */](ctx, board, [randomY, randomX], virusColor);
      board[randomY][randomX] = virus;
    }
  }

  newPill(ctx, board) {
    if (this.board[0][3] !== undefined || this.board[0][4] !== undefined) {
      this.gameOver = true;
    }
    const pill = new __WEBPACK_IMPORTED_MODULE_0__pill__["a" /* default */](ctx, board);
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


/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__audio__ = __webpack_require__(0);


class Pill {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.board1 = [0, 3];
    this.board2 = [0, 4];
    this.active = true;
    this.horizontal = true;
    this.audio = new __WEBPACK_IMPORTED_MODULE_0__audio__["a" /* default */];

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


/* harmony default export */ __webpack_exports__["a"] = (Pill);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Virus);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map