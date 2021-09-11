/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const SnakeView = __webpack_require__(1);
	
	$(function () {
	  const rootEl = $('.snake-game');
	  new SnakeView(rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);
	
	class View {
	  constructor($el) {
	    this.$el = $el;
	
	    this.board = new Board(20);
	    this.setupGrid();
	
	    this.intervalId = window.setInterval(
	      this.step.bind(this),
	      View.STEP_MILLIS
	    );
	
	    $(window).on("keydown", this.handleKeyEvent.bind(this));
	  }
	
	  handleKeyEvent(event) {
	    if (View.KEYS[event.keyCode]) {
	      this.board.snake.turn(View.KEYS[event.keyCode]);
	    }
	  }
	
	  render() {
	    // simple text based rendering
	    // this.$el.html(this.board.render());
	
	    this.updateClasses(this.board.snake.segments, "snake");
	    this.updateClasses([this.board.apple.position], "apple");
	  }
	
	  updateClasses(coords, className) {
	    this.$li.filter(`.${className}`).removeClass();
	
	    coords.forEach( coord => {
	      const flatCoord = (coord.i * this.board.dim) + coord.j;
	      this.$li.eq(flatCoord).addClass(className);
	    });
	  }
	
	  setupGrid() {
	    let html = "";
	
	    for (let i = 0; i < this.board.dim; i++) {
	      html += "<ul>";
	      for (let j = 0; j < this.board.dim; j++) {
	        html += "<li></li>";
	      }
	      html += "</ul>";
	    }
	
	    this.$el.html(html);
	    this.$li = this.$el.find("li");
	  }
	
	  step() {
	    if (this.board.snake.segments.length > 0) {
	      this.board.snake.move();
	      this.render();
	    } else {
	      alert("You lose!");
	      window.clearInterval(this.intervalId);
	    }
	  }
	
	}
	
	View.KEYS = {
	  38: "N",
	  39: "E",
	  40: "S",
	  37: "W"
	};
	
	View.STEP_MILLIS = 100;
	
	module.exports = View;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3);
	const Apple = __webpack_require__(5);
	
	class Board {
	  constructor(dim) {
	    this.dim = dim;
	
	    this.snake = new Snake(this);
	    this.apple = new Apple(this);
	  }
	
	  static blankGrid(dim) {
	    const grid = [];
	
	    for (let i = 0; i < dim; i++) {
	      const row = [];
	      for (let j = 0; j < dim; j++) {
	        row.push(Board.BLANK_SYMBOL);
	      }
	      grid.push(row);
	    }
	
	    return grid;
	  }
	
	  render() {
	    const grid = Board.blankGrid(this.dim);
	
	    this.snake.segments.forEach( segment => {
	      grid[segment.i][segment.j] = Snake.SYMBOL;
	    });
	
	    grid[this.apple.position.i][this.apple.position.j] = Apple.SYMBOL;
	
	    // join it up
	    const rowStrs = [];
	    grid.map( row => row.join("") ).join("\n");
	  }
	
	  validPosition(coord) {
	    return (coord.i >= 0) && (coord.i < this.dim) &&
	      (coord.j >= 0) && (coord.j < this.dim);
	  }
	}
	
	Board.BLANK_SYMBOL = ".";
	
	module.exports = Board;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);
	
	class Snake {
	  constructor(board) {
	    this.dir = "N";
	    this.turning = false;
	    this.board = board;
	
	    const center = new Coord(Math.floor(board.dim/2), Math.floor(board.dim/2));
	    this.segments = [center];
	
	    this.growTurns = 0;
	  }
	
	  eatApple() {
	    if (this.head().equals(this.board.apple.position)) {
	      this.growTurns += 3;
	      return true;
	    } else {
	      return false;
	    }
	  }
	
	  isOccupying(array) {
	    let result = false;
	    this.segments.forEach( segment => {
	      if (segment.i === array[0] && segment.j === array[1]) {
	        result = true;
	        return result;
	      }
	    });
	    return result;
	  }
	
	  head() {
	    return this.segments.slice(-1)[0];
	  }
	
	  isValid() {
	    const head = this.head();
	
	    if (!this.board.validPosition(this.head())) {
	      return false;
	    }
	
	    for (let i = 0; i < this.segments.length - 1; i++) {
	      if (this.segments[i].equals(head)) {
	        return false;
	      }
	    }
	
	    return true;
	  }
	
	  move() {
	    // move snake forward
	    this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));
	
	    // allow turning again
	    this.turning = false;
	
	    // maybe eat an apple
	    if (this.eatApple()) {
	      this.board.apple.replace();
	    }
	
	    // if not growing, remove tail segment
	    if (this.growTurns > 0) {
	      this.growTurns -= 1;
	    } else {
	      this.segments.shift();
	    }
	
	    // destroy snake if it eats itself or runs off grid
	    if (!this.isValid()) {
	      this.segments = [];
	    }
	  }
	
	  turn(dir) {
	    // avoid turning directly back on yourself
	    if (Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[dir]) ||
	      this.turning) {
	      return;
	    } else {
	      this.turning = true;
	      this.dir = dir;
	    }
	  }
	}
	
	Snake.DIFFS = {
	  "N": new Coord(-1, 0),
	  "E": new Coord(0, 1),
	  "S": new Coord(1, 0),
	  "W": new Coord(0, -1)
	};
	
	Snake.SYMBOL = "S";
	Snake.GROW_TURNS = 3;
	
	module.exports = Snake;


/***/ },
/* 4 */
/***/ function(module, exports) {

	class Coord {
	  constructor(i, j) {
	    this.i = i;
	    this.j = j;
	  }
	
	  equals(coord2) {
	      return (this.i == coord2.i) && (this.j == coord2.j);
	  }
	
	  isOpposite(coord2) {
	    return (this.i == (-1 * coord2.i)) && (this.j == (-1 * coord2.j));
	  }
	
	  plus(coord2) {
	    return new Coord(this.i + coord2.i, this.j + coord2.j);
	  }
	}
	
	module.exports = Coord;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);
	
	class Apple {
	  constructor(board) {
	    this.board = board;
	    this.replace();
	  }
	
	  replace() {
	    let x = Math.floor(Math.random() * this.board.dim);
	    let y = Math.floor(Math.random() * this.board.dim);
	
	    // Don't place an apple where there is a snake
	    while (this.board.snake.isOccupying([x, y])) {
	      x = Math.floor(Math.random() * this.board.dim);
	      y = Math.floor(Math.random() * this.board.dim);
	    }
	
	    this.position = new Coord(x, y);
	  }
	
	}
	
	module.exports = Apple;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map