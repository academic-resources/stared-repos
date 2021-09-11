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

/***/ "./src/bird.js":
/*!*********************!*\
  !*** ./src/bird.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const CONSTANTS = {\n    GRAVITY: 0.8,\n    FLAP_SPEED: -8,\n    TERMINAL_VEL: 12,\n    BIRD_WIDTH: 40,\n    BIRD_HEIGHT: 30\n};\n\nclass Bird {\n    constructor(width, height){\n        this.velocity = 0;\n        this.width = width;\n        this.height = height;\n        this.x = width / 3\n        this.y = height / 2\n    }\n\n    drawBird( context ) {\n        context.fillStyle = 'purple';\n        context.fillRect(this.x, this.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);\n    }\n\n    animate(context) {\n        this.move()\n        this.drawBird(context)\n    }\n\n    move() {\n        this.velocity += this.y\n        this.velocity += CONSTANTS.GRAVITY\n    }\n\n    flap() {\n        this.velocity = CONSTANTS.FLAP_SPEED\n    }\n}\n\nmodule.exports = Bird\n\n//# sourceURL=webpack:///./src/bird.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Level = __webpack_require__(/*! ./level */ \"./src/level.js\")\nconst Bird = __webpack_require__(/*! ./bird */ \"./src/bird.js\")\n\n\nclass Game {\n    constructor(canvas) {\n\n        this.animate = this.animate.bind(this)\n        this.restart = this.restart.bind(this)\n        this.play = this.play.bind(this)\n        this.click = this.click.bind(this)\n\n        this.canvas = canvas\n        this.context = canvas.getContext('2d')\n        this.width = canvas.width\n        this.height = canvas.height\n        this.canvas.addEventListener('mousedown',() => this.click());\n        // this.canvas.addEventListener('mousedown',() => alert(\"ssss\"));\n        console.log(this.canvas);\n        \n        this.restart()\n\n    }\n\n    animate() {\n        this.level.animate(this.context)\n        this.bird.animate(this.context)\n        if(this.running) requestAnimationFrame(this.animate)\n    }\n\n    restart() {\n        this.level = new Level(this.width, this.height)\n        this.bird = new Bird(this.width, this.height);\n        this.animate()\n        this.running = false\n    }\n\n    play() {\n        this.running = true\n        this.animate()\n    }\n\n    click(){\n        \n        if (!this.running){\n            this.play();    \n        }\n        this.bird.flap();\n\n    }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const node = document.getElementById(\"bird-game\");\n    const game = new Game(node)\n\n});\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Level {\n\n    constructor(width, height) {\n        this.width = width\n        this.height = height\n    }\n\n    drawBackground(context) {\n        context.fillStyle = 'pink';\n        context.fillRect(0,0, this.width, this.height)\n    }\n\n    animate(context) {\n        this.drawBackground(context)\n    }\n} \n\nmodule.exports = Level;\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ })

/******/ });