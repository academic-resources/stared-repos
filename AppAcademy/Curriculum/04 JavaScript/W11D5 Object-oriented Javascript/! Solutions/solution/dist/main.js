/******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Flag the module as loaded
    /******/ module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/ __webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      });
      /******/
    }
    /******/
  };
  /******/
  /******/ // define __esModule on exports
  /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module",
      });
      /******/
    }
    /******/ Object.defineProperty(exports, "__esModule", { value: true });
    /******/
  };
  /******/
  /******/ // create a fake namespace object
  /******/ // mode & 1: value is a module id, require it
  /******/ // mode & 2: merge all properties of value into the ns
  /******/ // mode & 4: return value when already ns object
  /******/ // mode & 8|1: behave like require
  /******/ __webpack_require__.t = function (value, mode) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === "object" &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value,
    });
    /******/ if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    /******/ return ns;
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/ __webpack_require__.p = "";
  /******/
  /******/
  /******/ // Load entry module and return exports
  /******/ return __webpack_require__(
    (__webpack_require__.s = "./src/index.js")
  );
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ "./src/bird.js":
      /*!*********************!*\
  !*** ./src/bird.js ***!
  \*********************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          "__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bird; });\nconst CONSTANTS = {\n  GRAVITY:  0.4,\n  FLAP_SPEED:  8,\n  TERMINAL_VEL:  12,\n  BIRD_WIDTH:  40,\n  BIRD_HEIGHT:  30\n};\n\nclass Bird {\n\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n    this.x = this.dimensions.width / 3;\n    this.y = this.dimensions.height / 2;\n    this.vel = 0;\n  }\n\n  flap() {\n    //if this were a more realistic bird simulation, we would be adding to the velocity\n    //instead of just assigning it outright\n    //to make the experience more fun and 'bouncy' we just set it directly\n    this.vel = -1 * CONSTANTS.FLAP_SPEED;\n  }\n\n  moveBird() {\n    //for each frame, the bird should move by it's current velocity\n    //velocity is 'pixels per frame', so each frame it should update position by vel\n    this.y += this.vel;\n    //the acceleration of gravity is in pixels per second per second\n    //so each second, it changes the velocity by whatever the gravity constant is\n    this.vel += CONSTANTS.GRAVITY;\n    //we set a 'terminal velocity', a maximum speed the bird can travel\n    //this keeps the game from becoming too wild because the bird is moving too fast to control\n    if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {\n      //if the terminal velocity is exceeded, we set it to the terminal velicty\n      if (this.vel > 0) {\n        this.vel = CONSTANTS.TERMINAL_VEL;\n      } else {\n        this.vel = CONSTANTS.TERMINAL_VEL * -1;\n      }\n    }\n  }\n  animate(ctx) {\n    this.moveBird();\n    this.drawBird(ctx);\n  }\n\n  drawBird(ctx){\n    ctx.fillStyle = \"yellow\";\n    ctx.fillRect(this.x, this.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);\n  }\n\n  bounds() {\n    return {\n      left: this.x,\n      right: this.x + CONSTANTS.BIRD_WIDTH,\n      top: this.y,\n      bottom: this.y + CONSTANTS.BIRD_HEIGHT\n    };\n  }\n\n  outOfBounds() {\n    const aboveTheTop = this.y < 0;\n    const belowTheBottom = this.y + CONSTANTS.BIRD_HEIGHT > this.dimensions.height;\n    return aboveTheTop || belowTheBottom;\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmlyZC5qcz82OTk1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9zcmMvYmlyZC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IENPTlNUQU5UUyA9IHtcbiAgR1JBVklUWTogIDAuNCxcbiAgRkxBUF9TUEVFRDogIDgsXG4gIFRFUk1JTkFMX1ZFTDogIDEyLFxuICBCSVJEX1dJRFRIOiAgNDAsXG4gIEJJUkRfSEVJR0hUOiAgMzBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpcmQge1xuXG4gIGNvbnN0cnVjdG9yKGRpbWVuc2lvbnMpIHtcbiAgICB0aGlzLmRpbWVuc2lvbnMgPSBkaW1lbnNpb25zO1xuICAgIHRoaXMueCA9IHRoaXMuZGltZW5zaW9ucy53aWR0aCAvIDM7XG4gICAgdGhpcy55ID0gdGhpcy5kaW1lbnNpb25zLmhlaWdodCAvIDI7XG4gICAgdGhpcy52ZWwgPSAwO1xuICB9XG5cbiAgZmxhcCgpIHtcbiAgICAvL2lmIHRoaXMgd2VyZSBhIG1vcmUgcmVhbGlzdGljIGJpcmQgc2ltdWxhdGlvbiwgd2Ugd291bGQgYmUgYWRkaW5nIHRvIHRoZSB2ZWxvY2l0eVxuICAgIC8vaW5zdGVhZCBvZiBqdXN0IGFzc2lnbmluZyBpdCBvdXRyaWdodFxuICAgIC8vdG8gbWFrZSB0aGUgZXhwZXJpZW5jZSBtb3JlIGZ1biBhbmQgJ2JvdW5jeScgd2UganVzdCBzZXQgaXQgZGlyZWN0bHlcbiAgICB0aGlzLnZlbCA9IC0xICogQ09OU1RBTlRTLkZMQVBfU1BFRUQ7XG4gIH1cblxuICBtb3ZlQmlyZCgpIHtcbiAgICAvL2ZvciBlYWNoIGZyYW1lLCB0aGUgYmlyZCBzaG91bGQgbW92ZSBieSBpdCdzIGN1cnJlbnQgdmVsb2NpdHlcbiAgICAvL3ZlbG9jaXR5IGlzICdwaXhlbHMgcGVyIGZyYW1lJywgc28gZWFjaCBmcmFtZSBpdCBzaG91bGQgdXBkYXRlIHBvc2l0aW9uIGJ5IHZlbFxuICAgIHRoaXMueSArPSB0aGlzLnZlbDtcbiAgICAvL3RoZSBhY2NlbGVyYXRpb24gb2YgZ3Jhdml0eSBpcyBpbiBwaXhlbHMgcGVyIHNlY29uZCBwZXIgc2Vjb25kXG4gICAgLy9zbyBlYWNoIHNlY29uZCwgaXQgY2hhbmdlcyB0aGUgdmVsb2NpdHkgYnkgd2hhdGV2ZXIgdGhlIGdyYXZpdHkgY29uc3RhbnQgaXNcbiAgICB0aGlzLnZlbCArPSBDT05TVEFOVFMuR1JBVklUWTtcbiAgICAvL3dlIHNldCBhICd0ZXJtaW5hbCB2ZWxvY2l0eScsIGEgbWF4aW11bSBzcGVlZCB0aGUgYmlyZCBjYW4gdHJhdmVsXG4gICAgLy90aGlzIGtlZXBzIHRoZSBnYW1lIGZyb20gYmVjb21pbmcgdG9vIHdpbGQgYmVjYXVzZSB0aGUgYmlyZCBpcyBtb3ZpbmcgdG9vIGZhc3QgdG8gY29udHJvbFxuICAgIGlmIChNYXRoLmFicyh0aGlzLnZlbCkgPiBDT05TVEFOVFMuVEVSTUlOQUxfVkVMKSB7XG4gICAgICAvL2lmIHRoZSB0ZXJtaW5hbCB2ZWxvY2l0eSBpcyBleGNlZWRlZCwgd2Ugc2V0IGl0IHRvIHRoZSB0ZXJtaW5hbCB2ZWxpY3R5XG4gICAgICBpZiAodGhpcy52ZWwgPiAwKSB7XG4gICAgICAgIHRoaXMudmVsID0gQ09OU1RBTlRTLlRFUk1JTkFMX1ZFTDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmVsID0gQ09OU1RBTlRTLlRFUk1JTkFMX1ZFTCAqIC0xO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBhbmltYXRlKGN0eCkge1xuICAgIHRoaXMubW92ZUJpcmQoKTtcbiAgICB0aGlzLmRyYXdCaXJkKGN0eCk7XG4gIH1cblxuICBkcmF3QmlyZChjdHgpe1xuICAgIGN0eC5maWxsU3R5bGUgPSBcInllbGxvd1wiO1xuICAgIGN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgQ09OU1RBTlRTLkJJUkRfV0lEVEgsIENPTlNUQU5UUy5CSVJEX0hFSUdIVCk7XG4gIH1cblxuICBib3VuZHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZnQ6IHRoaXMueCxcbiAgICAgIHJpZ2h0OiB0aGlzLnggKyBDT05TVEFOVFMuQklSRF9XSURUSCxcbiAgICAgIHRvcDogdGhpcy55LFxuICAgICAgYm90dG9tOiB0aGlzLnkgKyBDT05TVEFOVFMuQklSRF9IRUlHSFRcbiAgICB9O1xuICB9XG5cbiAgb3V0T2ZCb3VuZHMoKSB7XG4gICAgY29uc3QgYWJvdmVUaGVUb3AgPSB0aGlzLnkgPCAwO1xuICAgIGNvbnN0IGJlbG93VGhlQm90dG9tID0gdGhpcy55ICsgQ09OU1RBTlRTLkJJUkRfSEVJR0hUID4gdGhpcy5kaW1lbnNpb25zLmhlaWdodDtcbiAgICByZXR1cm4gYWJvdmVUaGVUb3AgfHwgYmVsb3dUaGVCb3R0b207XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/bird.js\n"
        );

        /***/
      },

    /***/ "./src/game.js":
      /*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FlappyBird; });\n/* harmony import */ var _bird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bird */ "./src/bird.js");\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level */ "./src/level.js");\n\n\n\nclass FlappyBird {\n  constructor(canvas) {\n    this.ctx = canvas.getContext("2d");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n    this.registerEvents();\n    this.restart();\n  }\n\n  play() {\n    this.running = true;\n    this.animate();\n  }\n\n  restart() {\n    this.running = false;\n    this.score = 0;\n    this.bird = new _bird__WEBPACK_IMPORTED_MODULE_0__["default"](this.dimensions);\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_1__["default"](this.dimensions);\n\n    this.animate();\n  }\n\n  registerEvents() {\n    this.boundClickHandler = this.click.bind(this);\n    this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);\n  }\n\n  click(e) {\n    if (!this.running) {\n      this.play();\n    } \n    this.bird.flap();\n  }\n\n  gameOver() {\n    return (\n      this.level.collidesWith(this.bird.bounds()) || this.bird.outOfBounds(this.height)\n    );\n  }\n\n  //this is the key method of gaming action\n  //animate tells the game to advance one bit\n  //the bird moves, the level moves\n  //everything is redrawn to the screen\n  animate() {\n    //first we move and draw the level\n    this.level.animate(this.ctx);\n    //then we move and draw the bird\n    this.bird.animate(this.ctx);\n    //then we check to see if the game is over and let the player know\n    if (this.gameOver()) {\n      alert(this.score);\n      this.restart();\n    }\n\n    //we see if they have scored a point by passing a pipe\n    this.level.passedPipe(this.bird.bounds(), () => {\n      this.score += 1;\n      console.log(this.score);\n    });\n\n    //and draw the score\n    this.drawScore();\n\n    //if the game is NOT running, we do not animate the next frame\n    if (this.running) {\n      //This calls this function again, after around 1/60th of a second\n      requestAnimationFrame(this.animate.bind(this));\n    }\n  }\n\n  drawScore() {\n    //loc will be the location \n    const loc = {x: this.dimensions.width / 2, y: this.dimensions.height / 4}\n    this.ctx.font = "bold 50pt serif";\n    this.ctx.fillStyle = "white";\n    this.ctx.fillText(this.score, loc.x, loc.y);\n    this.ctx.strokeStyle = "black";\n    this.ctx.lineWidth = 2;\n    this.ctx.strokeText(this.score, loc.x, loc.y);\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5qcz83ZGUwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTBCO0FBQ0U7O0FBRWI7QUFDZjtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNkNBQUk7QUFDeEIscUJBQXFCLDhDQUFLOztBQUUxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEs7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vc3JjL2dhbWUuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmlyZCBmcm9tIFwiLi9iaXJkXCI7XG5pbXBvcnQgTGV2ZWwgZnJvbSBcIi4vbGV2ZWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmxhcHB5QmlyZCB7XG4gIGNvbnN0cnVjdG9yKGNhbnZhcykge1xuICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmRpbWVuc2lvbnMgPSB7IHdpZHRoOiBjYW52YXMud2lkdGgsIGhlaWdodDogY2FudmFzLmhlaWdodCB9O1xuICAgIHRoaXMucmVnaXN0ZXJFdmVudHMoKTtcbiAgICB0aGlzLnJlc3RhcnQoKTtcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmFuaW1hdGUoKTtcbiAgfVxuXG4gIHJlc3RhcnQoKSB7XG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5iaXJkID0gbmV3IEJpcmQodGhpcy5kaW1lbnNpb25zKTtcbiAgICB0aGlzLmxldmVsID0gbmV3IExldmVsKHRoaXMuZGltZW5zaW9ucyk7XG5cbiAgICB0aGlzLmFuaW1hdGUoKTtcbiAgfVxuXG4gIHJlZ2lzdGVyRXZlbnRzKCkge1xuICAgIHRoaXMuYm91bmRDbGlja0hhbmRsZXIgPSB0aGlzLmNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jdHguY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5ib3VuZENsaWNrSGFuZGxlcik7XG4gIH1cblxuICBjbGljayhlKSB7XG4gICAgaWYgKCF0aGlzLnJ1bm5pbmcpIHtcbiAgICAgIHRoaXMucGxheSgpO1xuICAgIH0gXG4gICAgdGhpcy5iaXJkLmZsYXAoKTtcbiAgfVxuXG4gIGdhbWVPdmVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmxldmVsLmNvbGxpZGVzV2l0aCh0aGlzLmJpcmQuYm91bmRzKCkpIHx8IHRoaXMuYmlyZC5vdXRPZkJvdW5kcyh0aGlzLmhlaWdodClcbiAgICApO1xuICB9XG5cbiAgLy90aGlzIGlzIHRoZSBrZXkgbWV0aG9kIG9mIGdhbWluZyBhY3Rpb25cbiAgLy9hbmltYXRlIHRlbGxzIHRoZSBnYW1lIHRvIGFkdmFuY2Ugb25lIGJpdFxuICAvL3RoZSBiaXJkIG1vdmVzLCB0aGUgbGV2ZWwgbW92ZXNcbiAgLy9ldmVyeXRoaW5nIGlzIHJlZHJhd24gdG8gdGhlIHNjcmVlblxuICBhbmltYXRlKCkge1xuICAgIC8vZmlyc3Qgd2UgbW92ZSBhbmQgZHJhdyB0aGUgbGV2ZWxcbiAgICB0aGlzLmxldmVsLmFuaW1hdGUodGhpcy5jdHgpO1xuICAgIC8vdGhlbiB3ZSBtb3ZlIGFuZCBkcmF3IHRoZSBiaXJkXG4gICAgdGhpcy5iaXJkLmFuaW1hdGUodGhpcy5jdHgpO1xuICAgIC8vdGhlbiB3ZSBjaGVjayB0byBzZWUgaWYgdGhlIGdhbWUgaXMgb3ZlciBhbmQgbGV0IHRoZSBwbGF5ZXIga25vd1xuICAgIGlmICh0aGlzLmdhbWVPdmVyKCkpIHtcbiAgICAgIGFsZXJ0KHRoaXMuc2NvcmUpO1xuICAgICAgdGhpcy5yZXN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLy93ZSBzZWUgaWYgdGhleSBoYXZlIHNjb3JlZCBhIHBvaW50IGJ5IHBhc3NpbmcgYSBwaXBlXG4gICAgdGhpcy5sZXZlbC5wYXNzZWRQaXBlKHRoaXMuYmlyZC5ib3VuZHMoKSwgKCkgPT4ge1xuICAgICAgdGhpcy5zY29yZSArPSAxO1xuICAgICAgY29uc29sZS5sb2codGhpcy5zY29yZSk7XG4gICAgfSk7XG5cbiAgICAvL2FuZCBkcmF3IHRoZSBzY29yZVxuICAgIHRoaXMuZHJhd1Njb3JlKCk7XG5cbiAgICAvL2lmIHRoZSBnYW1lIGlzIE5PVCBydW5uaW5nLCB3ZSBkbyBub3QgYW5pbWF0ZSB0aGUgbmV4dCBmcmFtZVxuICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgIC8vVGhpcyBjYWxscyB0aGlzIGZ1bmN0aW9uIGFnYWluLCBhZnRlciBhcm91bmQgMS82MHRoIG9mIGEgc2Vjb25kXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIGRyYXdTY29yZSgpIHtcbiAgICAvL2xvYyB3aWxsIGJlIHRoZSBsb2NhdGlvbiBcbiAgICBjb25zdCBsb2MgPSB7eDogdGhpcy5kaW1lbnNpb25zLndpZHRoIC8gMiwgeTogdGhpcy5kaW1lbnNpb25zLmhlaWdodCAvIDR9XG4gICAgdGhpcy5jdHguZm9udCA9IFwiYm9sZCA1MHB0IHNlcmlmXCI7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRoaXMuc2NvcmUsIGxvYy54LCBsb2MueSk7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gMjtcbiAgICB0aGlzLmN0eC5zdHJva2VUZXh0KHRoaXMuc2NvcmUsIGxvYy54LCBsb2MueSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/game.js\n'
        );

        /***/
      },

    /***/ "./src/index.js":
      /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
      /*! no exports provided */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");\n\n\nconst canvas = document.getElementById(\'bird-game\');\nnew _game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQWdDOztBQUVoQztBQUNBLElBQUksNkNBQVUiLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmxhcHB5QmlyZCBmcm9tICcuL2dhbWUnO1xuXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmlyZC1nYW1lJyk7XG5uZXcgRmxhcHB5QmlyZChjYW52YXMpOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n'
        );

        /***/
      },

    /***/ "./src/level.js":
      /*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Level; });\nconst CONSTANTS = {\n  PIPE_SPEED: 2,\n  GAP_HEIGHT: 150,\n  PIPE_WIDTH: 50,\n  EDGE_BUFFER: 50,\n  PIPE_SPACING: 220,\n  WARM_UP_SECONDS: 1\n};\n\nclass Level {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n    \n    const firstPipeDistance = \n      this.dimensions.width + \n      (CONSTANTS.WARM_UP_SECONDS * 60 * CONSTANTS.PIPE_SPEED);\n\n    this.pipes = [\n      this.randomPipe(firstPipeDistance),\n      this.randomPipe(firstPipeDistance + CONSTANTS.PIPE_SPACING),\n      this.randomPipe(firstPipeDistance + (CONSTANTS.PIPE_SPACING * 2)),\n    ];\n  }\n\n  randomPipe(x) {\n    const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.GAP_HEIGHT;\n    const gapTop = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;\n    const pipe = {\n      topPipe: {\n        left: x, \n        right: CONSTANTS.PIPE_WIDTH + x, \n        top: 0, \n        bottom: gapTop\n      },\n      bottomPipe: {\n        left: x, \n        right: CONSTANTS.PIPE_WIDTH + x, \n        top: gapTop + CONSTANTS.GAP_HEIGHT, \n        bottom: this.dimensions.height\n      },\n      passed: false\n    };\n    return pipe\n  }\n\n  animate(ctx) {\n    this.drawBackground(ctx);\n    this.movePipes();\n    this.drawPipes(ctx);\n  }\n\n  drawBackground(ctx) {\n    ctx.fillStyle = "skyblue";\n    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);\n  }\n\n  passedPipe(bird, callback) {\n    this.eachPipe((pipe) => {\n      if (pipe.topPipe.right < bird.left) {\n        if (!pipe.passed) {\n          pipe.passed = true;\n          callback();\n        }\n      }\n    });\n  }\n\n  movePipes() {\n    this.eachPipe(function(pipe) {\n      pipe.topPipe.left -= CONSTANTS.PIPE_SPEED;\n      pipe.topPipe.right -= CONSTANTS.PIPE_SPEED;\n      pipe.bottomPipe.left -= CONSTANTS.PIPE_SPEED;\n      pipe.bottomPipe.right -= CONSTANTS.PIPE_SPEED;\n    });\n\n    //if a pipe has left the screen add a new one to the end\n    if (this.pipes[0].topPipe.right <= 0) {\n      this.pipes.shift();\n      const newX = this.pipes[1].topPipe.left + CONSTANTS.PIPE_SPACING;\n      this.pipes.push(this.randomPipe(newX));\n    }\n  }\n\n  drawPipes(ctx) {\n    this.eachPipe(function(pipe) {\n      ctx.fillStyle = "green";\n\n      //draw top pipe\n      ctx.fillRect(\n        pipe.topPipe.left, \n        pipe.topPipe.top, \n        CONSTANTS.PIPE_WIDTH, \n        pipe.topPipe.bottom - pipe.topPipe.top\n      );\n      //draw bottom pipe\n      ctx.fillRect(\n        pipe.bottomPipe.left, \n        pipe.bottomPipe.top, \n        CONSTANTS.PIPE_WIDTH, \n        pipe.bottomPipe.bottom - pipe.bottomPipe.top\n      );\n    });\n  }\n\n  eachPipe(callback) {\n    this.pipes.forEach(callback.bind(this));\n  }\n  //This method shall return true if the bird passed in is currently\n  //colliding with any pipe.\n  collidesWith(bird) {\n      //this function returns true if the the rectangles overlap\n    const _overlap = (rect1, rect2) => {\n      //check that they don\'t overlap in the x axis\n      if (rect1.left > rect2.right || rect1.right < rect2.left) {\n        return false;\n      }\n      //check that they don\'t overlap in the y axis\n      if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {\n        return false;\n      }\n      return true;\n    };\n    let collision = false;\n    this.eachPipe((pipe) => {\n      if ( \n        //check if the bird is overlapping (colliding) with either pipe\n        _overlap(pipe.topPipe, bird) || \n        _overlap(pipe.bottomPipe, bird)\n      ) { collision = true; }\n    });\n    return collision;\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGV2ZWwuanM/NmM5ZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGtCQUFrQjtBQUMzQixLQUFLO0FBQ0w7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vc3JjL2xldmVsLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ09OU1RBTlRTID0ge1xuICBQSVBFX1NQRUVEOiAyLFxuICBHQVBfSEVJR0hUOiAxNTAsXG4gIFBJUEVfV0lEVEg6IDUwLFxuICBFREdFX0JVRkZFUjogNTAsXG4gIFBJUEVfU1BBQ0lORzogMjIwLFxuICBXQVJNX1VQX1NFQ09ORFM6IDFcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsIHtcbiAgY29uc3RydWN0b3IoZGltZW5zaW9ucykge1xuICAgIHRoaXMuZGltZW5zaW9ucyA9IGRpbWVuc2lvbnM7XG4gICAgXG4gICAgY29uc3QgZmlyc3RQaXBlRGlzdGFuY2UgPSBcbiAgICAgIHRoaXMuZGltZW5zaW9ucy53aWR0aCArIFxuICAgICAgKENPTlNUQU5UUy5XQVJNX1VQX1NFQ09ORFMgKiA2MCAqIENPTlNUQU5UUy5QSVBFX1NQRUVEKTtcblxuICAgIHRoaXMucGlwZXMgPSBbXG4gICAgICB0aGlzLnJhbmRvbVBpcGUoZmlyc3RQaXBlRGlzdGFuY2UpLFxuICAgICAgdGhpcy5yYW5kb21QaXBlKGZpcnN0UGlwZURpc3RhbmNlICsgQ09OU1RBTlRTLlBJUEVfU1BBQ0lORyksXG4gICAgICB0aGlzLnJhbmRvbVBpcGUoZmlyc3RQaXBlRGlzdGFuY2UgKyAoQ09OU1RBTlRTLlBJUEVfU1BBQ0lORyAqIDIpKSxcbiAgICBdO1xuICB9XG5cbiAgcmFuZG9tUGlwZSh4KSB7XG4gICAgY29uc3QgaGVpZ2h0UmFuZ2UgPSB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0IC0gKDIgKiBDT05TVEFOVFMuRURHRV9CVUZGRVIpIC0gQ09OU1RBTlRTLkdBUF9IRUlHSFQ7XG4gICAgY29uc3QgZ2FwVG9wID0gKE1hdGgucmFuZG9tKCkgKiBoZWlnaHRSYW5nZSkgKyBDT05TVEFOVFMuRURHRV9CVUZGRVI7XG4gICAgY29uc3QgcGlwZSA9IHtcbiAgICAgIHRvcFBpcGU6IHtcbiAgICAgICAgbGVmdDogeCwgXG4gICAgICAgIHJpZ2h0OiBDT05TVEFOVFMuUElQRV9XSURUSCArIHgsIFxuICAgICAgICB0b3A6IDAsIFxuICAgICAgICBib3R0b206IGdhcFRvcFxuICAgICAgfSxcbiAgICAgIGJvdHRvbVBpcGU6IHtcbiAgICAgICAgbGVmdDogeCwgXG4gICAgICAgIHJpZ2h0OiBDT05TVEFOVFMuUElQRV9XSURUSCArIHgsIFxuICAgICAgICB0b3A6IGdhcFRvcCArIENPTlNUQU5UUy5HQVBfSEVJR0hULCBcbiAgICAgICAgYm90dG9tOiB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICB9LFxuICAgICAgcGFzc2VkOiBmYWxzZVxuICAgIH07XG4gICAgcmV0dXJuIHBpcGVcbiAgfVxuXG4gIGFuaW1hdGUoY3R4KSB7XG4gICAgdGhpcy5kcmF3QmFja2dyb3VuZChjdHgpO1xuICAgIHRoaXMubW92ZVBpcGVzKCk7XG4gICAgdGhpcy5kcmF3UGlwZXMoY3R4KTtcbiAgfVxuXG4gIGRyYXdCYWNrZ3JvdW5kKGN0eCkge1xuICAgIGN0eC5maWxsU3R5bGUgPSBcInNreWJsdWVcIjtcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5kaW1lbnNpb25zLndpZHRoLCB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0KTtcbiAgfVxuXG4gIHBhc3NlZFBpcGUoYmlyZCwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmVhY2hQaXBlKChwaXBlKSA9PiB7XG4gICAgICBpZiAocGlwZS50b3BQaXBlLnJpZ2h0IDwgYmlyZC5sZWZ0KSB7XG4gICAgICAgIGlmICghcGlwZS5wYXNzZWQpIHtcbiAgICAgICAgICBwaXBlLnBhc3NlZCA9IHRydWU7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbW92ZVBpcGVzKCkge1xuICAgIHRoaXMuZWFjaFBpcGUoZnVuY3Rpb24ocGlwZSkge1xuICAgICAgcGlwZS50b3BQaXBlLmxlZnQgLT0gQ09OU1RBTlRTLlBJUEVfU1BFRUQ7XG4gICAgICBwaXBlLnRvcFBpcGUucmlnaHQgLT0gQ09OU1RBTlRTLlBJUEVfU1BFRUQ7XG4gICAgICBwaXBlLmJvdHRvbVBpcGUubGVmdCAtPSBDT05TVEFOVFMuUElQRV9TUEVFRDtcbiAgICAgIHBpcGUuYm90dG9tUGlwZS5yaWdodCAtPSBDT05TVEFOVFMuUElQRV9TUEVFRDtcbiAgICB9KTtcblxuICAgIC8vaWYgYSBwaXBlIGhhcyBsZWZ0IHRoZSBzY3JlZW4gYWRkIGEgbmV3IG9uZSB0byB0aGUgZW5kXG4gICAgaWYgKHRoaXMucGlwZXNbMF0udG9wUGlwZS5yaWdodCA8PSAwKSB7XG4gICAgICB0aGlzLnBpcGVzLnNoaWZ0KCk7XG4gICAgICBjb25zdCBuZXdYID0gdGhpcy5waXBlc1sxXS50b3BQaXBlLmxlZnQgKyBDT05TVEFOVFMuUElQRV9TUEFDSU5HO1xuICAgICAgdGhpcy5waXBlcy5wdXNoKHRoaXMucmFuZG9tUGlwZShuZXdYKSk7XG4gICAgfVxuICB9XG5cbiAgZHJhd1BpcGVzKGN0eCkge1xuICAgIHRoaXMuZWFjaFBpcGUoZnVuY3Rpb24ocGlwZSkge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiZ3JlZW5cIjtcblxuICAgICAgLy9kcmF3IHRvcCBwaXBlXG4gICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgIHBpcGUudG9wUGlwZS5sZWZ0LCBcbiAgICAgICAgcGlwZS50b3BQaXBlLnRvcCwgXG4gICAgICAgIENPTlNUQU5UUy5QSVBFX1dJRFRILCBcbiAgICAgICAgcGlwZS50b3BQaXBlLmJvdHRvbSAtIHBpcGUudG9wUGlwZS50b3BcbiAgICAgICk7XG4gICAgICAvL2RyYXcgYm90dG9tIHBpcGVcbiAgICAgIGN0eC5maWxsUmVjdChcbiAgICAgICAgcGlwZS5ib3R0b21QaXBlLmxlZnQsIFxuICAgICAgICBwaXBlLmJvdHRvbVBpcGUudG9wLCBcbiAgICAgICAgQ09OU1RBTlRTLlBJUEVfV0lEVEgsIFxuICAgICAgICBwaXBlLmJvdHRvbVBpcGUuYm90dG9tIC0gcGlwZS5ib3R0b21QaXBlLnRvcFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGVhY2hQaXBlKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5waXBlcy5mb3JFYWNoKGNhbGxiYWNrLmJpbmQodGhpcykpO1xuICB9XG4gIC8vVGhpcyBtZXRob2Qgc2hhbGwgcmV0dXJuIHRydWUgaWYgdGhlIGJpcmQgcGFzc2VkIGluIGlzIGN1cnJlbnRseVxuICAvL2NvbGxpZGluZyB3aXRoIGFueSBwaXBlLlxuICBjb2xsaWRlc1dpdGgoYmlyZCkge1xuICAgICAgLy90aGlzIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSBpZiB0aGUgdGhlIHJlY3RhbmdsZXMgb3ZlcmxhcFxuICAgIGNvbnN0IF9vdmVybGFwID0gKHJlY3QxLCByZWN0MikgPT4ge1xuICAgICAgLy9jaGVjayB0aGF0IHRoZXkgZG9uJ3Qgb3ZlcmxhcCBpbiB0aGUgeCBheGlzXG4gICAgICBpZiAocmVjdDEubGVmdCA+IHJlY3QyLnJpZ2h0IHx8IHJlY3QxLnJpZ2h0IDwgcmVjdDIubGVmdCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvL2NoZWNrIHRoYXQgdGhleSBkb24ndCBvdmVybGFwIGluIHRoZSB5IGF4aXNcbiAgICAgIGlmIChyZWN0MS50b3AgPiByZWN0Mi5ib3R0b20gfHwgcmVjdDEuYm90dG9tIDwgcmVjdDIudG9wKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgbGV0IGNvbGxpc2lvbiA9IGZhbHNlO1xuICAgIHRoaXMuZWFjaFBpcGUoKHBpcGUpID0+IHtcbiAgICAgIGlmICggXG4gICAgICAgIC8vY2hlY2sgaWYgdGhlIGJpcmQgaXMgb3ZlcmxhcHBpbmcgKGNvbGxpZGluZykgd2l0aCBlaXRoZXIgcGlwZVxuICAgICAgICBfb3ZlcmxhcChwaXBlLnRvcFBpcGUsIGJpcmQpIHx8IFxuICAgICAgICBfb3ZlcmxhcChwaXBlLmJvdHRvbVBpcGUsIGJpcmQpXG4gICAgICApIHsgY29sbGlzaW9uID0gdHJ1ZTsgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb2xsaXNpb247XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/level.js\n'
        );

        /***/
      },

    /******/
  }
);
