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

eval("const Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nfunction Asteroid(options) {\n  options.color = Asteroid.COLOR;\n  options.radius = Asteroid.RADIUS;\n  options.vel = Util.randomVec(Asteroid.SPEED);\n\n  MovingObject.call(this, options);\n}\n\nAsteroid.COLOR = 'rebeccapurple';\nAsteroid.RADIUS = 20;\nAsteroid.SPEED = 5;\n\nUtil.inherits(Asteroid, MovingObject);\n\nAsteroid.prototype.collideWith = function (otherObject) {\n  if (otherObject instanceof Ship) {\n    otherObject.relocate();\n    return true;\n  } else if (otherObject instanceof Bullet) {\n    this.remove();\n    otherObject.remove();\n    return true;\n  }\n  return false;\n};\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\n\nfunction Bullet(options) {\n  options.radius = Bullet.RADIUS;\n\n  MovingObject.call(this, options);\n}\n\nBullet.RADIUS = 4;\nBullet.SPEED = 10;\n\nUtil.inherits(Bullet, MovingObject);\n\nBullet.prototype.isWrappable = false;\n\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nfunction Game() {\n  this.asteroids = [];\n  this.bullets = [];\n  this.ship = new Ship({pos: this.randomPosition(), game: this});\n\n  this.addAsteroids();\n}\n\nGame.DIM_X = 1000;\nGame.DIM_Y = 600;\nGame.NUM_ASTEROIDS = 6;\nGame.BACKGROUND = new Image();\nGame.BACKGROUND.src = './img/galaxy.jpg';\n\nGame.prototype.add = function add(obj) {\n  if (obj instanceof Asteroid) {\n    this.asteroids.push(obj);\n  } else {\n    this.bullets.push(obj);\n  }\n};\n\nGame.prototype.addAsteroids = function addAsteroids() {\n  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n    const randPos = this.randomPosition();\n    this.add(new Asteroid({pos: randPos, game: this}));\n  }\n};\n\nGame.prototype.randomPosition = function randomPosition() {\n  return [Math.floor(Math.random() * (Game.DIM_X + 1)), Math.floor(Math.random() * (Game.DIM_Y + 1))];\n};\n\nGame.prototype.draw = function draw(ctx) {\n  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  ctx.drawImage(Game.BACKGROUND, 0, 0);\n  this.allObjects().forEach(function (object) {\n    object.draw(ctx);\n  });\n};\n\nGame.prototype.moveObjects = function moveObjects(timeDelta) {\n  this.allObjects().forEach(function(object) {\n    object.move(timeDelta);\n  });\n};\n\nGame.prototype.wrap = function wrap(pos) {\n  return [((pos[0] + Game.DIM_X) % Game.DIM_X), (pos[1] + Game.DIM_Y) % Game.DIM_Y];\n};\n\nGame.prototype.checkCollisions = function checkCollisions() {\n  const objects = this.allObjects();\n  for (let i = 0; i < objects.length; i++) {\n    for (let j = 0; j < objects.length; j++) {\n      const obj1 = objects[i];\n      const obj2 = objects[j];\n      if ( obj1.isCollidedWith(obj2) ){\n        const collided = obj1.collideWith(obj2);\n        if (collided) break;\n      }\n    }\n  }\n};\n\nGame.prototype.step = function step() {\n  this.moveObjects();\n  this.checkCollisions();\n  if (this.asteroids.length === 0) this.addAsteroids();\n};\n\nGame.prototype.remove = function remove(obj) {\n  if (obj instanceof Asteroid) {\n    const index = this.asteroids.indexOf(obj);\n    this.asteroids.splice(index);\n  } else {\n    const index = this.bullets.indexOf(obj);\n    this.bullets.splice(index);\n  }\n};\n\nGame.prototype.allObjects = function allObjects() {\n  return [].concat([this.ship], this.asteroids, this.bullets);\n};\n\nGame.prototype.isOutOfBounds = function isOutOfBounds(pos) {\n  return (pos[0] < 0 || pos[0] > Game.DIM_X || pos[1] < 0 || pos[1] > Game.DIM_Y);\n};\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameView(game, ctx) {\n  this.game = game;\n  this.ctx = ctx;\n}\n\nGameView.DIRS = {\n  w: [0, -1],\n  a: [-1, 0],\n  s: [0, 1],\n  d: [1, 0]\n};\n\nGameView.prototype.start = function() {\n  this.bindKeyHandlers();\n  this.lastTime = Date.now();\n\n  requestAnimationFrame(() => {\n    this.animate.call(this, Date.now());\n  });\n};\n\nGameView.prototype.bindKeyHandlers = function bindKeyHandlers() {\n  const ship = this.game.ship;\n  Object.keys(GameView.DIRS).forEach(function(button){\n    const dir = GameView.DIRS[button];\n    key(button, function () {\n      ship.power(dir);\n    });\n  });\n  key(\"space\", function() {\n    ship.fireBullet();\n  });\n};\n\nGameView.prototype.animate = function animate(time) {\n  const timeDelta = time - this.lastTime;\n\n  requestAnimationFrame( () => {\n    this.animate.call(this, Date.now());\n  });\n  this.game.step(timeDelta);\n  this.game.draw(this.ctx);\n  this.lastTime = time;\n\n\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\n\nwindow.addEventListener('DOMContentLoaded', function() {\n  const canvas = document.getElementById('game-canvas');\n  const ctx = canvas.getContext('2d');\n  \n  const game = new Game();\n  const gameView = new GameView(game, ctx);\n\n  gameView.start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function MovingObject(options){\n  this.pos = options.pos;\n  this.vel = options.vel;\n  this.radius = options.radius;\n  this.color = options.color;\n  this.game = options.game;\n}\n\nMovingObject.prototype.isWrappable = true;\n\nMovingObject.prototype.draw = function(ctx) {\n  ctx.beginPath();\n  ctx.fillStyle = this.color;\n  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);\n  ctx.fill();\n  ctx.stroke();\n};\n\nMovingObject.prototype.move = function(timeDelta) {\n  timeDelta = timeDelta || 1;\n  this.pos[0] += this.vel[0] * timeDelta;\n  this.pos[1] += this.vel[1] * timeDelta;\n  if (this.game.isOutOfBounds(this.pos)) {\n    if (this.isWrappable) {\n      this.pos = this.game.wrap(this.pos);\n    } else {\n      this.game.remove(this);\n    }\n  }\n};\n\nMovingObject.prototype.isCollidedWith = function(otherObject) {\n  const dist = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2) + Math.pow((this.pos[1] - otherObject.pos[1]), 2));\n  return (dist < (this.radius + otherObject.radius));\n};\n\nMovingObject.prototype.collideWith = function(otherObject) {\n};\n\nMovingObject.prototype.remove = function remove() {\n  this.game.remove(this);\n};\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\n\nfunction Ship(options) {\n  options.color = Ship.COLOR;\n  options.radius = Ship.RADIUS;\n  options.vel = Util.randomVec(Ship.SPEED);\n\n  MovingObject.call(this, options);\n}\n\nShip.COLOR = 'green';\nShip.RADIUS = 10;\nShip.SPEED = 0;\nShip.RESPONSIVENESS = 2;\n\nUtil.inherits(Ship, MovingObject);\n\nShip.prototype.relocate = function relocate() {\n  this.pos = this.game.randomPosition();\n  this.vel = Util.randomVec(Ship.SPEED);\n};\n\nShip.prototype.power = function power(impulse) {\n  this.vel[0] += (impulse[0] * Ship.RESPONSIVENESS);\n  this.vel[1] += (impulse[1] * Ship.RESPONSIVENESS);\n};\n\nShip.prototype.fireBullet = function fireBullet() {\n  if (this.vel[0] === 0 && this.vel[1] === 0) return;\n  const shipSpeed = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));\n  const shipDir = Util.scale(this.vel, (1 / shipSpeed));\n  const bulletVel = Util.scale(shipDir, Bullet.SPEED);\n\n  const bullet = new Bullet({pos: this.pos.slice(), color: this.color, vel: bulletVel, game: this.game});\n\n  this.game.add(bullet);\n};\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  inherits(ChildClass, ParentClass) {\n    function Surrogate() {}\n    Surrogate.prototype = ParentClass.prototype;\n    ChildClass.prototype = new Surrogate();\n    ChildClass.prototype.constructor = ChildClass;\n  },\n\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n  \n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });