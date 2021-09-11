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

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nconst a = {\n    COLOR: \"green\",\n    RADIUS: 10\n\n};\n\n\nclass Asteroid extends MovingObject {\n  constructor(options){\n    options.color = a.COLOR;\n    options.radius = a.RADIUS;\n    options.vel = Util.randomVec(3);\n    super(options);\n  }\n}\n\nmodule.exports = Asteroid;\n\n\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\nclass Game {\n  constructor(dim_x, dim_y, num_asteroids) {\n    this.dim_x = dim_x;\n    this.dim_y = dim_y;\n    this.num_asteroids = num_asteroids;\n    this.asteroids = [];\n    this.addAsteroids();\n    this.ship = new Ship({pos: this.randomPosition()});\n    this.allObjects = this.allObjects();\n    // debugger\n  }\n\n  addAsteroids() {\n    for (let i = 0; i < this.num_asteroids; i++) {\n    //   this.asteroids.push(this.randomPosition());\n    this.asteroids.push(new Asteroid({pos: this.randomPosition()}));\n    }\n  }\n\n  randomPosition() {\n    let x = Math.floor((Math.random() * this.dim_x) + 1);\n    let y = Math.floor((Math.random() * this.dim_y) + 1);\n    return [x, y];\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, 1200, 800);\n    ctx.fillStyle = \"black\";\n    ctx.fillRect(0, 0, 1200, 800);\n    this.allObjects.forEach(object => {\n        object.draw(ctx);\n    });\n  }\n\n  moveObjects() {\n    ctx.clearRect(0, 0, 1200, 800);\n    ctx.fillStyle = \"black\";\n    ctx.fillRect(0, 0, 1200, 800);\n    this.allObjects.forEach(object => {\n        object.move();\n    });\n  }\n\n  dist(pos1, pos2) {\n      return Math.sqrt(Math.pow((pos1[0] - pos2[0]), 2) + Math.pow((pos1[1] - pos2[1]), 2));\n  }\n\n  checkCollisions() {\n    let isShip = false;\n    for (let i = 0; i < this.allObjects.length; i++) {\n      for (let j = 0; j < this.allObjects.length; j++) {\n        if (this.allObjects[i] instanceof Ship || this.allObjects[j] instanceof Ship) {\n            isShip = true;\n        }\n        if (i !== j) {\n            // debugger\n          let distance = this.dist(this.allObjects[i].pos, this.allObjects[j].pos);\n          let radii = this.allObjects[i].radius + this.allObjects[j].radius;\n        //   debugger\n          if (distance < radii && isShip) {\n            // this.remove(this.allObjects[i], this.allObjects[j]);\n            this.ship.pos = this.randomPosition(); \n          }\n        }\n      }\n    }\n  }\n\n  step() {\n      this.moveObjects();\n      this.checkCollisions();\n  }\n\n  remove(asteroid1, asteroid2){\n      this.asteroids = this.asteroids.filter(el => el !== asteroid1 && el!== asteroid2);\n  }\n\n  allObjects() {\n    // debugger;\n    return this.asteroids.concat(this.ship);\n  }\n\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\nclass GameView {\n  constructor(ctx) {\n    this.game = new Game(1200, 800, 10);\n    this.ctx = ctx;\n  }\n\n  start() {\n    setInterval( () => {\n      this.game.step();\n    }, 20);\n  }\n\n  bindKeyHandlers() {\n    \n  }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// const MovingObject = require(\"./moving_object.js\");\n// const Asteroid = require(\"./asteroid.js\");\n// const Game = require(\"./game.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function() {\n  const canvas = document.getElementById(\"game-canvas\");\n  canvas.width = 1200;\n  canvas.height = 800;\n  const ctx = canvas.getContext(\"2d\");\n  window.ctx = ctx;\n  window.ctx.fillStyle = \"black\";\n  window.ctx.fillRect(0, 0, 1200, 800);\n  window.gameView = new GameView(ctx);\n  window.gameView.start();\n}); \n\n\n\nconsole.log(\"webpack working!\");\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\nclass MovingObject {\n    constructor(options){\n        this.pos = options.pos;\n        this.vel = options.vel;\n        this.radius = options.radius;\n        this.color = options.color;\n    }\n\n    draw(ctx) {\n      ctx.beginPath();\n      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);\n      ctx.fillStyle = this.color;\n      ctx.stroke();\n      ctx.fill();\n    }\n\n    move() {\n        // this.pos[0] += this.vel[0];\n        // this.pos[1] += this.vel[1];\n        this.pos[0] += this.vel[0];\n        this.pos[0] = this.pos[0] % 1200;\n        this.pos[1] += this.vel[1];\n        this.pos[1] = this.pos[1] % 800;\n        this.draw(ctx);\n    }\n\n    isCollidedWith(otherObject) {\n      let distance = this.dist(this.pos, otherObject.pos);\n      let radii = this.radius + otherObject.radius;\n      return (distance < radii);\n    }\n\n    dist(pos1, pos2) {\n      return Math.sqrt(Math.pow((pos1[0] - pos2[0]), 2) + Math.pow((pos1[1] - pos2[1]), 2));\n    }\n\n    collideWith(otherObject) {\n      \n    }\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\nconst s = {\n    COLOR: \"yellow\",\n    RADIUS: 25\n\n};\n\nclass Ship extends MovingObject {\n    constructor(options) {\n        options.color = s.COLOR;\n        options.radius = s.RADIUS;\n        options.vel = [0, 0];\n        super(options);\n    }\n\n    // relocate() {\n    //     let newPos = game.randomPosition();\n    //     this.pos = newPos; \n    // }\n\n    power(impulse) {\n      this.vel[0] += impulse[0];\n      this.vel[1] += impulse[1];\n    }\n\n   \n}\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n    inherits: function inherits(childClass, parentClass) {\n        function Surrogate() {}\n        Surrogate.prototype = parentClass.prototype;\n        childClass.prototype = new Surrogate();\n        childClass.prototype.constructor = childClass;\n    },\n\n    randomVec: function randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n  \n    scale: function scale(vec, m) {\n      return [vec[0] * m, vec[1] * m];\n    }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });