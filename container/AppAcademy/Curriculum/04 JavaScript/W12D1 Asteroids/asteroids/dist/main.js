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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\")\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\")\n\nfunction Asteroid(pos, game){\n    let defaultOptions = {\n      pos: pos,\n      vel: Util.randomVec(3),\n      radius: 20,\n      color: 'brown',\n      game: game\n    }\n\n    MovingObject.call(this, defaultOptions)\n  }\n  \nUtil.inherits(Asteroid, MovingObject)\n\nAsteroid.prototype.collideWith = function (otherObject) {\n  if (otherObject instanceof Ship) {\n    otherObject.relocate()\n  }\n}\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\")\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\")\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\")\n\nfunction Bullet(game){\n    let defaultOptions = {\n      pos: game.ship.pos,\n      vel: game.ship.vel,\n      radius: 5,\n      color: 'red',\n      game: game\n    }\n\n    MovingObject.call(this, defaultOptions)\n  }\n  \nUtil.inherits(Bullet, MovingObject)\n\nBullet.prototype.collideWith = function (otherObject) {\n  if (otherObject instanceof Asteroid) {\n    this.game.remove(otherObject)\n  }\n}\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\")\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\")\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\")\n\n\nconst GAME_CONSTANTS = {\n  DIM_X: 640,\n  DIM_Y: 480,\n  NUM_ASTEROIDS: 7,\n  NUM_BULLETS: 2\n}\n\nfunction Game () {\n  this.ship = new Ship(this.randomPos(),this);\n  this.asteroids = [];\n  this.bullets = [];\n  this.addAsteroids();\n}\n\nGame.prototype.addAsteroids = function () {\n  for (let i = 0; i < GAME_CONSTANTS.NUM_ASTEROIDS; i++) {\n    this.asteroids.push( new Asteroid(this.randomPos(), this) )\n\n  }\n}\n\nGame.prototype.randomPos = function () {\n  let x = Math.floor(Math.random() * GAME_CONSTANTS.DIM_X)\n  let y = Math.floor(Math.random() * GAME_CONSTANTS.DIM_Y)\n  return [x, y]\n}\n\nGame.prototype.draw = function (ctx) {\n  ctx.clearRect(0, 0, GAME_CONSTANTS.DIM_X, GAME_CONSTANTS.DIM_Y);\n  this.allObjects().forEach( (a) => {\n    a.draw(ctx);\n  })\n}\n\nGame.prototype.moveObjects = function () {\n  this.allObjects().forEach( (a) => {\n    a.move();\n  })\n}\n\nGame.prototype.wrap = function (pos){\n  let [x, y] = pos\n  if( x > GAME_CONSTANTS.DIM_X ) {\n      x -= GAME_CONSTANTS.DIM_X\n  } \n  if( y > GAME_CONSTANTS.DIM_Y ) {\n      y -= GAME_CONSTANTS.DIM_Y\n  }\n  if (x < 0) {\n      x += GAME_CONSTANTS.DIM_X\n  }\n  if (y < 0) {\n      y += GAME_CONSTANTS.DIM_Y\n  }\n  return [x, y]\n}\n\nGame.prototype.checkCollisions = function () {\n  let allObjs = this.allObjects()\n  for (let i = 0; i < allObjs.length - 1; i++) {\n    for (let j = i + 1; j < allObjs.length; j++) {\n      if (allObjs[i].isCollideWith(allObjs[j])) {\n        allObjs[i].collideWith(allObjs[j])\n        return;\n      }\n    }\n  }\n}\n\nGame.prototype.step = function () {\n  this.moveObjects();\n  this.checkCollisions();\n}\n\nGame.prototype.remove = function (asteroid) {\n    idx = this.asteroids.indexOf(asteroid)\n    this.asteroids.splice(idx, 1)\n}\n\nGame.prototype.allObjects = function () {\n    let allObjects = []\n    allObjects = allObjects.concat(this.asteroids)\n    allObjects = allObjects.concat(this.bullets)\n    allObjects.push(this.ship)\n    return allObjects\n}\n\nGame.prototype.add = function (obj) {\n  if (obj instanceof Bullet) this.bullets.push(obj)\n  if (obj instanceof Asteroid) this.asteroids.push(obj)\n}\n\nmodule.exports = Game\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\")\n\nfunction GameView (ctx) {\n  this.game = new Game();\n  this.ctx = ctx\n}\n\nGameView.prototype.start = function () {\n  const that = this\n  setInterval( function () {\n    \n    that.game.step()\n    that.game.draw(ctx);\n  }, 20)\n  this.bindKeyHandlers();\n}\n\nGameView.prototype.bindKeyHandlers = function () {\n    const that = this\n  key('a', function(){that.game.ship.power([-3, 0])})\n  key('d', function(){that.game.ship.power([3, 0])})\n  key('w', function(){that.game.ship.power([0, -3])})\n  key('s', function(){that.game.ship.power([0, 3])})\n  key('space', function(){ that.game.ship.fireBullet() })\n\n}\n//function(){this.game.ship.power}\nmodule.exports = GameView\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\")\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\")\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\")\n// const Ship = require(\"./ship.js\")\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  const canvas = document.getElementById('game-canvas');\n  const ctx = canvas.getContext('2d');\n  // const obj = new MovingObject({ pos: [30, 30], vel: [10, 10], radius: 5, color: \"#00FF00\"})\n  // const obj = new Asteroid([100, 100])\n  const game = new GameView(ctx);\n  // obj.draw(ctx);\n  // game.addAsteroids();\n  // console.log(\"just before start\")\n  game.start();\n  // game.draw(ctx);\n  window.game = game;\n  window.ctx = ctx;\n})\n\nwindow.MovingObject = MovingObject\n\n// { pos: [30, 30], vel: [10, 10], radius: 5, color: \"#00FF00\"}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\nfunction MovingObject(options) {\n  // console.log(options)\n  this.pos = options.pos\n  this.vel = options.vel\n  this.radius = options.radius\n  this.color = options.color\n  this.game = options.game\n}\n  \nMovingObject.prototype.draw = function(ctx) {\n  ctx.fillStyle = this.color\n  ctx.beginPath();\n  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);\n  ctx.stroke();\n  ctx.fill();\n}\n\nMovingObject.prototype.move = function () {\n  this.pos[0] += this.vel[0]\n  this.pos[1] += this.vel[1]\n  this.pos = this.game.wrap(this.pos)\n}\n\nMovingObject.prototype.isCollideWith = function (otherObject) {\n  let collideDist = this.radius + otherObject.radius\n  let [x_1, y_1] = this.pos\n  let [x_2, y_2] = otherObject.pos\n\n  if (Math.sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2) <= collideDist) {\n    return true\n  } else {\n    return false;\n  }\n}\n\nMovingObject.prototype.collideWith = function (otherObject) {\n  // this.game.remove(otherObject);\n  // this.game.remove(this);\n}\n\n// Dist([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)\n\n\nmodule.exports = MovingObject\n\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\")\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\")\n\nfunction Ship(pos, game){\n    let defaultOptions = {\n      pos: pos,\n      vel: [0,0],\n      radius: 10,\n      color: 'blue',\n      game: game\n    }\n\n    MovingObject.call(this, defaultOptions)\n  }\nUtil.inherits(Ship, MovingObject)\n\nShip.prototype.relocate = function () {\n    this.pos = this.game.randomPos()\n    this.vel = [0,0]\n}\n\nShip.prototype.power = function (impulse) {\n  this.vel[0] += impulse[0];\n  this.vel[1] += impulse[1];\n}\n  \nShip.prototype.fireBullet = function () {\n  this.game.add( new Bullet(this.game) )\n}\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  inherits(childClass, parentClass) {\n    //...\n    function Surrogate(){}\n    Surrogate.prototype = parentClass.prototype;\n    childClass.prototype = new Surrogate()\n    childClass.prototype.constructor = childClass\n  },\n\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n  // Scale the length of a vector by the given amount.\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  }\n}\n\nmodule.exports = Util;\n\n// Function.prototype.inherits = function (SuperClass) {\n//     function Surrogate () {}\n//     Surrogate.prototype = SuperClass.prototype\n//     this.prototype = new Surrogate()\n//     this.prototype.constructor = this\n// }\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });