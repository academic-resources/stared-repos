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

/***/ "./src/amp_envelope.js":
/*!*****************************!*\
  !*** ./src/amp_envelope.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AmpEnvelope; });\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ \"./src/context.js\");\n\n\nclass AmpEnvelope {\n  constructor() {\n    this.gain = _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createGain();\n    this.attackControl = document.getElementById('attack');\n    this.releaseControl = document.getElementById('release');\n    const attackTime = parseFloat(this.attackControl.value);\n    this.releaseTime = parseFloat(this.releaseControl.value);\n    this.gain.gain.cancelScheduledValues(_context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentTime);\n    this.gain.gain.setValueAtTime(0, _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentTime);\n    this.gain.gain.linearRampToValueAtTime(1, _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentTime + attackTime);\n    this.rampDown = this.rampDown.bind(this);\n  }\n\n  rampDown() {\n    this.gain.gain.linearRampToValueAtTime(\n      0,\n      _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentTime + this.releaseTime\n    );\n  }\n}\n\n\n//# sourceURL=webpack:///./src/amp_envelope.js?");

/***/ }),

/***/ "./src/context.js":
/*!************************!*\
  !*** ./src/context.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst AudioContext = window.AudioContext || window.webkitAudioContext;\nconst context = new AudioContext();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (context);\n\n\n//# sourceURL=webpack:///./src/context.js?");

/***/ }),

/***/ "./src/frequency_graph.js":
/*!********************************!*\
  !*** ./src/frequency_graph.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FrequencyGraph; });\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ \"./src/context.js\");\n\n\nclass FrequencyGraph {\n  constructor() {\n    this.analyser = _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createAnalyser();\n    this.analyser.fftSize = 256;\n    this.frequencies = new Uint8Array(this.analyser.frequencyBinCount);\n    this.draw = this.draw.bind(this);\n    this.draw();\n  }\n\n  draw() {\n    const canvas = document.getElementById('frequencies');\n    const ctx = canvas.getContext('2d');\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    canvas.width = 1100;\n    canvas.height = 200;\n    ctx.fillStyle = 'black';\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    this.analyser.getByteFrequencyData(this.frequencies);\n    const barWidth = (canvas.width / this.frequencies.length) * 2.5;\n    let barHeight;\n    let x = 0;\n    for (let i = 0; i < this.frequencies.length; i++) {\n      barHeight = this.frequencies[i] - 100;\n      ctx.fillStyle = `rgb(153, 247, ${barHeight + 100})`;\n      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);\n      x += barWidth + 1;\n    }\n    requestAnimationFrame(this.draw);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/frequency_graph.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _oscillator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oscillator */ \"./src/oscillator.js\");\n/* harmony import */ var _synth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./synth */ \"./src/synth.js\");\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  // document.querySelector('button').addEventListener('click', function() {\n  //   const osc1 = new Oscillator(440, 'sine');\n  //   // const osc2 = new Oscillator(440, 'square');\n  // });\n  new _synth__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/keymappings.js":
/*!****************************!*\
  !*** ./src/keymappings.js ***!
  \****************************/
/*! exports provided: keymappings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"keymappings\", function() { return keymappings; });\nconst keymappings = {\n  '65': 130.8128, //c3\n  '87': 138.5913, //c#3\n  '83': 146.8324, //d3\n  '69': 155.5635, //d#3\n  '68': 164.8128, //e3\n  '70': 174.6141, //f3\n  '84': 184.9972, //f#3\n  '71': 195.9977, //g3\n  '89': 207.6523, //g#3\n  '72': 220.0, //a3,\n  '85': 233.0819, //a#3\n  '74': 246.9417, // b3\n  '75': 261.6256 //c4\n};\n\n\n//# sourceURL=webpack:///./src/keymappings.js?");

/***/ }),

/***/ "./src/oscillator.js":
/*!***************************!*\
  !*** ./src/oscillator.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Oscillator; });\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ \"./src/context.js\");\n/* harmony import */ var _amp_envelope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./amp_envelope */ \"./src/amp_envelope.js\");\n\n\n\nclass Oscillator {\n  constructor(freq, type, ampEnvelope) {\n    this.osc = _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createOscillator();\n    this.osc.type = type;\n    this.gain = _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createGain();\n    this.osc.frequency.value = freq;\n    this.osc.connect(this.gain);\n    this.ampEnvelope = ampEnvelope;\n    this.gain.connect(this.ampEnvelope.gain);\n    // this.gain.connect(context.destination);\n    const gainControl = document.getElementById(`${type}-gain`);\n    this.gain.gain.setValueAtTime(gainControl.value, _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentTime);\n    gainControl.addEventListener('input', e => this.handleGainChange(e));\n  }\n\n  handleGainChange(e) {\n    // this.gain.gain.value = e.target.value;\n    this.gain.gain.setValueAtTime(e.target.value, _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentTime);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/oscillator.js?");

/***/ }),

/***/ "./src/oscilloscope.js":
/*!*****************************!*\
  !*** ./src/oscilloscope.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Oscilloscope; });\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ \"./src/context.js\");\n\n\nclass Oscilloscope {\n  constructor() {\n    this.analyser = _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createAnalyser();\n    this.analyser.fftSize = 2048;\n    this.waveform = new Uint8Array(this.analyser.frequencyBinCount);\n    // this.analyser.getFloatTimeDomainData(this.waveform);\n    this.draw = this.draw.bind(this);\n    this.analyser.smoothingTimeConstant = 0.85;\n    this.draw();\n    // this.updateWaveform();\n  }\n\n  draw() {\n    const canvas = document.getElementById('oscilloscope');\n    const ctx = canvas.getContext('2d');\n    this.analyser.getByteTimeDomainData(this.waveform);\n    canvas.width = 300;\n    canvas.height = 250;\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    ctx.beginPath();\n    const sliceWidth = (canvas.width * 1.0) / this.waveform.length;\n    let x = 0;\n    for (let i = 0; i < this.waveform.length; i++) {\n      let v = this.waveform[i] / 128.0;\n      let y = (v * canvas.height) / 2;\n      if (i === 0) {\n        ctx.moveTo(x, y);\n      } else {\n        ctx.lineTo(x, y);\n      }\n      x += sliceWidth;\n    }\n    ctx.strokeStyle = 'rgb(118, 80, 223)';\n    ctx.lineWidth = 3;\n    ctx.stroke();\n    requestAnimationFrame(this.draw);\n    // setTimeout(this.draw, 100);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/oscilloscope.js?");

/***/ }),

/***/ "./src/synth.js":
/*!**********************!*\
  !*** ./src/synth.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Synth; });\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ \"./src/context.js\");\n/* harmony import */ var _oscillator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./oscillator */ \"./src/oscillator.js\");\n/* harmony import */ var _amp_envelope__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./amp_envelope */ \"./src/amp_envelope.js\");\n/* harmony import */ var _keymappings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keymappings */ \"./src/keymappings.js\");\n/* harmony import */ var _oscilloscope__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./oscilloscope */ \"./src/oscilloscope.js\");\n/* harmony import */ var _frequency_graph__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./frequency_graph */ \"./src/frequency_graph.js\");\n\n\n\n\n\n\n\nclass Synth {\n  constructor() {\n    window.addEventListener('keydown', e => this.handleDown(e));\n    window.addEventListener('keyup', e => this.handleUp(e));\n    const keyboardKeys = document.getElementsByClassName('keys');\n    Array.from(keyboardKeys).forEach(key => {\n      key.addEventListener('mousedown', e => this.handleDown(e));\n      key.addEventListener('mouseup', e => this.handleUp(e));\n    });\n    this.handleDown = this.handleDown.bind(this);\n    this.handleUp = this.handleUp.bind(this);\n    this.play = this.play.bind(this);\n    this.handleFilterChange = this.handleFilterChange.bind(this);\n    this.oscillators = {};\n    this.filter = _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createBiquadFilter();\n    this.gain = _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createGain();\n    this.gain.connect(this.filter);\n    this.gain.gain.setValueAtTime(0, _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentTime);\n    const oscilloscope = new _oscilloscope__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\n    const frequencyGraph = new _frequency_graph__WEBPACK_IMPORTED_MODULE_5__[\"default\"]();\n    this.filter.connect(frequencyGraph.analyser);\n    this.filter.connect(oscilloscope.analyser);\n    this.filter.connect(_context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].destination);\n    // this.attackControl = document.getElementById('attack');\n    // this.releaseControl = document.getElementById('release');\n    const filterControl = document.getElementById('lpf');\n\n    // this.gain.linearRampToValueAtTime(0, context.currentTime + this.attackTime + this.releaseTime);\n    this.filter.frequency.setValueAtTime(\n      filterControl.value,\n      _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentTime\n    );\n    filterControl.addEventListener('input', e => this.handleFilterChange(e));\n    // gainControls = document.getElementsByClassName('gain-slider')\n    // gainControls.addEventListener('change', e => this.handleGainChange(e))\n  }\n\n  handleFilterChange(e) {\n    this.filter.frequency.setValueAtTime(e.target.value, _context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentTime);\n  }\n\n  handleDown(e) {\n    const key = e.type === 'keydown' ? e.which.toString() : e.target.id;\n    // console.log(keymappings);\n    // const attackTime = parseFloat(this.attackControl.value);\n    if (_keymappings__WEBPACK_IMPORTED_MODULE_3__[\"keymappings\"][key] && !this.oscillators[key]) {\n      // this.gain.gain.cancelScheduledValues(context.currentTime);\n      // this.gain.gain.setValueAtTime(0, context.currentTime);\n      document.getElementById(key).classList.add('pressed');\n      this.play(key);\n      // this.gain.gain.linearRampToValueAtTime(\n      //   1,\n      //   context.currentTime + attackTime\n      // );\n    }\n  }\n\n  handleUp(e) {\n    // const key = e.which.toString();\n    const key = e.type === 'keyup' ? e.which.toString() : e.target.id;\n    if (_keymappings__WEBPACK_IMPORTED_MODULE_3__[\"keymappings\"][key]) {\n      document.getElementById(key).classList.remove('pressed');\n      // const releaseTime = parseFloat(this.releaseControl.value);\n      // this.gain.gain.linearRampToValueAtTime(\n      //   0,\n      //   context.currentTime + releaseTime\n      // );\n      this.oscillators[key].forEach(osc => {\n        osc.ampEnvelope.rampDown();\n        osc.osc.stop(_context__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentTime + osc.ampEnvelope.releaseTime);\n      });\n      delete this.oscillators[key];\n    }\n  }\n\n  play(key) {\n    const freq = _keymappings__WEBPACK_IMPORTED_MODULE_3__[\"keymappings\"][key];\n    const ampEnvelope = new _amp_envelope__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    ampEnvelope.gain.connect(this.filter);\n    const osc1 = new _oscillator__WEBPACK_IMPORTED_MODULE_1__[\"default\"](freq, 'sine', ampEnvelope);\n    const osc2 = new _oscillator__WEBPACK_IMPORTED_MODULE_1__[\"default\"](freq, 'sawtooth', ampEnvelope);\n    const osc3 = new _oscillator__WEBPACK_IMPORTED_MODULE_1__[\"default\"](freq, 'square', ampEnvelope);\n    const oscillators = [osc1, osc2, osc3];\n    // const attackTime = parseFloat(this.attackControl.value);\n    // this.gain.gain.cancelScheduledValues(context.currentTime);\n    // this.gain.gain.setValueAtTime(0, context.currentTime);\n    // ampEnvelope.gain.connect(this.gain);\n    oscillators.forEach(osc => {\n      osc.osc.start();\n    });\n    // this.gain.gain.setValueAtTime(0, context.currentTime);\n    // this.gain.gain.linearRampToValueAtTime(1, context.currentTime + attackTime);\n    this.oscillators[key] = oscillators;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/synth.js?");

/***/ })

/******/ });