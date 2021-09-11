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

eval("/* eslint-disable no-console */\n/* eslint-disable no-unused-vars */\n/* eslint-disable no-undef */\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\n\nUtil.inherits(Asteroid, MovingObject);\nfunction Asteroid(pos, game) {\n    this.velocity = Util.randomVec(.25);\n    MovingObject.call(this, { pos: pos, vel: this.velocity, color: Asteroid.COLOR, radius: Asteroid.RADIUS, game: game });\n}\n\nAsteroid.prototype.collideWith = function(otherObject) {\n    if (otherObject instanceof Ship) {\n        otherObject.relocate();\n    }\n};\n\nAsteroid.COLOR = 'red';\nAsteroid.RADIUS = 20;\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-disable no-console */\n/* eslint-disable no-undef */\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\n\n\nUtil.inherits(Bullet, MovingObject);\n\nfunction Bullet(game) {\n    let [vel_x, vel_y] = game.ship.velocity;\n    vel_x += Bullet.SPEED;\n    vel_y += Bullet.SPEED;\n    this.velocity = [vel_x, vel_y];\n    MovingObject.call(this, { pos: game.ship.position, vel: this.velocity, color: Bullet.COLOR, radius: Bullet.RADIUS, game: game });\n}\n\nBullet.prototype.collideWith = function(obj) {\n    if (obj === this.game.ship ) return;\n    this.game.remove(obj);\n    this.game.remove(this);\n};\n\nBullet.SPEED = 5;\nBullet.COLOR = 'black';\nBullet.RADIUS = 5;\n\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-disable no-console */\n/* eslint-disable no-undef */\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nfunction Game () {\n  this.asteroids = [];\n  this.addAsteroids();\n  this.bullets = [];\n  let shipPos = this.randomPosition();\n  this.ship = new Ship(shipPos, this);\n}\n\nGame.DIM_X = 500;\nGame.DIM_Y = 500;\nGame.NUM_ASTEROIDS = 20;\n\nGame.prototype.addAsteroids = function() {\n  for (let i = 0; i <= Game.NUM_ASTEROIDS; i++) {\n    this.asteroids.push(new Asteroid(this.randomPosition(), this));\n  }\n};\n\nGame.prototype.randomPosition = function () {\n  let x = Math.random() * Game.DIM_X;\n  let y = Math.random() * Game.DIM_Y;\n  return [x,y];\n};\n\nGame.prototype.draw = function (ctx) {\n  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  this.allObjects().forEach((a) => {\n    a.draw(ctx);\n  });\n};\n\nGame.prototype.move = function () {\n  this.allObjects().forEach((a) => {\n    a.move();\n  });\n};\n\nGame.prototype.wrap = function (pos) {\n  if (pos[0] < 0) {\n    pos[0] = Game.DIM_X;\n  }\n  if (pos[0] > Game.DIM_X) {\n    pos[0] = 0;\n  }\n  if (pos[1] < 0) {\n    pos[1] = Game.DIM_Y;\n  }\n  if (pos[0] > Game.DIM_Y) {\n    pos[0] = 0;\n  }\n  return pos;\n};\n\nGame.prototype.checkCollisions = function() {\n    // this.asteroids.forEach( (a, idx1) => {\n    //     this.asteroids.forEach( (b, idx2) => {\n    //         if (idx1 !== idx2) {\n    //             if (a.isCollidedWith(b)) {\n    //                 a.collideWith(b);\n    //             }\n    //         }\n    //     });\n    // });\n    const allObjects = this.allObjects()\n    for (let i = allObjects.length - 1; i >= 0; i--) {\n      for (let j = allObjects.length - 1; j >= 0; j--) {\n        if (i !== j) {\n          let a = allObjects[i];\n          let b = allObjects[j];\n          if (a.isCollidedWith(b)) {\n            a.collideWith(b);\n          }\n        }\n      }\n    }\n};\n\nGame.prototype.step = function () {\n  this.move();\n  this.checkCollisions();\n};\n\nGame.prototype.remove = function(obj) {\n    if (obj instanceof Bullet) {\n      this.bullets = this.bullets.filter( b => b !== obj);\n    } else {\n        this.asteroids = this.asteroids.filter( a => a !== obj );\n    }\n    delete obj;\n};\n\nGame.prototype.allObjects = function() {\n    let results = this.asteroids.slice()\n    results.push(this.ship);\n    results = results.concat(this.bullets);\n    return results;\n};\n\nGame.prototype.add = function (obj) {\n  if (obj instanceof Bullet) {\n    this.bullets.push(obj);\n  } else {\n    this.asteroids.push(obj);\n  }\n};\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-disable no-console */\n/* eslint-disable no-unused-vars */\n/* eslint-disable no-undef */\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\nfunction GameView (ctx) {\n  this.context = ctx;\n  this.game = new Game(ctx);\n}\n\nGameView.prototype.start = function () {\n    const that = this;\n    this.bindKeyHandlers();\n  setInterval( () => {\n      \n    that.game.step();\n    that.game.draw(that.context);\n  }, 16);\n};\n\nGameView.prototype.bindKeyHandlers = function () {\n    key('w', () => {\n        this.game.ship.power([0, -1]);\n    });\n\n    key('a', () => {\n        this.game.ship.power([-1, 0]);\n    });\n\n    key('s', () => {\n        this.game.ship.power([0, 1]);\n    });\n\n    key('d', () => {\n        this.game.ship.power([1, 0]);\n    });\n\n    key('space', () => {\n        this.game.ship.fireBullet(this.game);\n    });\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-disable no-undef */\n/* eslint-disable no-unused-vars */\n\n/* eslint-disable no-console */\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\n\nconsole.log('Webpack is working');\n\nwindow.MovingObject = MovingObject;\nwindow.Asteroid = Asteroid;\nwindow.Game = Game;\nwindow.GameView = GameView;\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  let canvas = document.getElementById(\"game-canvas\");\n  let ctx = canvas.getContext(\"2d\");\n  window.ctx = ctx;\n\n  let gv = new GameView(ctx);\n  \n  gv.start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-disable no-console */\n/* eslint-disable no-undef */\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nfunction MovingObject(options) {\n    //   { pos: [30, 30], vel: [10, 10], radius: 5, color: \"#00FF00\" }\n    this.position = options.pos;\n    this.velocity = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n    this.game = options.game;\n}\n\nMovingObject.prototype.draw = function (ctx) {\n  // circle: \n  let [x, y] = this.position;\n    \n  ctx.beginPath();\n  ctx.arc(x, y, this.radius, 0, (Math.PI*2));\n  ctx.strokeStyle = this.color;\n  ctx.lineWidth = 1;\n  ctx.stroke();\n  ctx.fillStyle = this.color;\n  ctx.fill();\n}\n\nMovingObject.prototype.move = function() {\n    [current_x, current_y]  = this.position;\n    [velocity_x, velocity_y]  = this.velocity;\n    new_x = current_x + velocity_x;\n    new_y = current_y + velocity_y;\n    this.position = [new_x, new_y];\n    this.position = this.game.wrap(this.position);\n}\n\nMovingObject.prototype.isCollidedWith = function(otherObject) {\n    const sum_of_radii = this.radius + otherObject.radius;\n    return ( Util.distance(this.position, otherObject.position) < sum_of_radii) \n};\n\nMovingObject.prototype.collideWith = function(otherObject) {\n    \n};\n\nmodule.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-disable no-undef */\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nUtil.inherits(Ship, MovingObject);\n\nfunction Ship(pos, game) {\n  this.velocity = [0,0];\n  MovingObject.call(this, { pos: pos, vel: this.velocity, color: Ship.COLOR, radius: Ship.RADIUS, game: game });\n}\n\nShip.prototype.relocate = function() {\n  this.position = this.game.randomPosition();\n  this.velocity = [0,0];\n};\n\nShip.prototype.power = function(impulse) {\n  const [dx, dy] = impulse;\n  this.velocity[0] += dx;\n  this.velocity[1] += dy;\n}\n\nShip.prototype.fireBullet = function() {\n    \n    const new_bullet = new Bullet(this.game);\n    this.game.add(new_bullet);\n    \n};\n\nShip.RADIUS = 10;\nShip.COLOR = \"blue\";\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* eslint-disable no-undef */\n/* eslint-disable no-unused-vars */\nconst Util = {\n    inherits: function inherits( ChildClass, ParentClass ) {\n        function Surrogate() {}\n        Surrogate.prototype = ParentClass.prototype;\n        ChildClass.prototype = new Surrogate();\n        ChildClass.prototype.constructor = ChildClass;\n    },\n    randomVec: function randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n    scale: function scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    },\n    distance: function distance(pos_1, pos_2) {\n        // sqrt((x1 - x2) ^ 2 + (y1- 22) ^ 2)\n        const [x1, y1] = pos_1;\n        const [x2, y2] = pos_2;\n        const diff_x = Math.pow((x1 - x2), 2);\n        const diff_y = Math.pow((y1 - y2), 2);\n        return Math.sqrt( diff_x + diff_y );\n    }\n};\n\nmodule.exports = Util;\n\n\n\n\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });