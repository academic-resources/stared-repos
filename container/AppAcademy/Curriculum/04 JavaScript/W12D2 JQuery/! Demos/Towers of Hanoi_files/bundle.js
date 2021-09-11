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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiView = __webpack_require__(1);
	const HanoiGame = __webpack_require__(2);
	
	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	/* jshint esversion: 6 */
	
	class View {
	  constructor(game, $el) {
	    this.game = game;
	    this.$el = $el;
	
	    this.fromTowerIdx = null;
	
	    this.$el.on(
	      "click",
	      "ul",
	      this.clickTower.bind(this)
	    );
	
	    this.setupTowers();
	    this.render();
	  }
	
	  clickTower(event) {
	    const clickedTowerIdx = $(event.currentTarget).index();
	
	    if (this.fromTowerIdx === null) {
	      this.fromTowerIdx = clickedTowerIdx;
	    } else {
	      if (!this.game.move(this.fromTowerIdx, clickedTowerIdx)) {
	        alert("Invalid Move! Try again.");
	      }
	
	      this.fromTowerIdx = null;
	    }
	
	    this.render();
	
	    if (this.game.isWon()) {
	      // Remove click handler when done.
	      this.$el.off("click");
	      this.$el.addClass("game-over");
	      alert("Good work, you!");
	    }
	  }
	
	  setupTowers() {
	    /*
	    We're setting up the skeleton for our towers
	    here. It consist of three <ul> elements, all
	    floated left, with each three nested <li>s.
	    Because the <ul>s are floated, we need to
	    add the `.group` class, containing the clearfix,
	    to their parent. The <li> elements all will be
	    invisible by default. Adding a disk class to
	    them will make them visible.
	    */
	
	    this.$el.empty();
	    this.$el.addClass("group");
	
	    let $tower, $disk;
	
	    for (let towerIdx = 0; towerIdx < 3; towerIdx++) {
	      $tower = $("<ul>");
	
	      for (let diskIdx = 0; diskIdx < 3; diskIdx++) {
	        $disk = $("<li>");
	        $tower.append($disk);
	      }
	
	      this.$el.append($tower);
	    };
	  }
	
	  render() {
	    /*
	    Rather than removing all our elements from the page
	    and building them up again, we are removing only the
	    classes and re-adding them as necessary. This is a
	    more light-weight approach and will speed up the
	    redrawing in the browser.
	    */
	    const $towers = this.$el.find("ul");
	    $towers.removeClass();
	
	    if (this.fromTowerIdx !== null) {
	      $towers.eq(this.fromTowerIdx).addClass("selected");
	    }
	
	    this.game.towers.forEach( (disks, towerIdx) => {
	      const $disks = $towers.eq(towerIdx).children();
	      $disks.removeClass();
	
	      disks.forEach( (diskWidth, diskIdx) => {
	        /*
	        Since our disks are stacked from bottom to top
	        as [3, 2, 1], we have to select from the back
	        of our jQuery object, using negative indices.
	        */
	        $disks.eq(-1 * (diskIdx + 1)).addClass(`disk-${diskWidth}`);
	      });
	    });
	  }
	
	}
	
	module.exports = View;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }
	
	  isValidMove(startTowerIdx, endTowerIdx) {
	    const startTower = this.towers[startTowerIdx];
	    const endTower = this.towers[endTowerIdx];
	
	    if (startTower.length === 0) {
	      return false;
	    } else if (endTower.length == 0) {
	      return true;
	    } else {
	      const topStartDisc = startTower[startTower.length - 1];
	      const topEndDisc = endTower[endTower.length - 1];
	      return topStartDisc < topEndDisc;
	    }
	  }
	
	  isWon() {
	    // move all the discs to the last or second tower
	    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }
	
	  move(startTowerIdx, endTowerIdx) {
	    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	      return true;
	    } else {
	      return false;
	    }
	  }
	
	  print() {
	    console.log(JSON.stringify(this.towers));
	  }
	
	  promptMove(reader, callback) {
	    this.print();
	    reader.question("Enter a starting tower: ", start => {
	      const startTowerIdx = parseInt(start);
	      reader.question("Enter an ending tower: ", end => {
	        const endTowerIdx = parseInt(end);
	        callback(startTowerIdx, endTowerIdx)
	      });
	    });
	  }
	
	  run(reader, gameCompletionCallback) {
	    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	      if (!this.move(startTowerIdx, endTowerIdx)) {
	        console.log("Invalid move!");
	      }
	
	      if (!this.isWon()) {
	        // Continue to play!
	        this.run(reader, gameCompletionCallback);
	      } else {
	        this.print();
	        console.log("You win!");
	        gameCompletionCallback();
	      }
	    });
	  }
	}
	
	module.exports = Game;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map