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

/***/ "./src/clock.js":
/*!**********************!*\
  !*** ./src/clock.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Clock {\n  constructor(rootEl) {}\n\n  currentTime() {\n    const date = new Date()\n    const hours = this.padNums(this.convertFromMilitary(date.getHours()))\n    const mins = this.padNums(date.getMinutes())\n    const secs = this.padNums(date.getSeconds())\n    return `${hours}:${mins}:${secs} ${this.timeOfDay}`\n  }\n\n  padNums(number) {\n    if (number > 9) return '' + number\n    else return '0' + number\n  }\n\n  convertFromMilitary(number) {\n    if (number > 12) {\n      this.timeOfDay = 'P.M.'\n    } else {\n      this.timeOfDay = 'A.M.'\n    }\n    return number % 12\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Clock);\n\n//# sourceURL=webpack:///./src/clock.js?");

/***/ }),

/***/ "./src/drop_down.js":
/*!**************************!*\
  !*** ./src/drop_down.js ***!
  \**************************/
/*! exports provided: dogLinkCreator, attachDogLinks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dogLinkCreator\", function() { return dogLinkCreator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"attachDogLinks\", function() { return attachDogLinks; });\nconst dogs = {\n  Corgi: 'https://www.akc.org/dog-breeds/cardigan-welsh-corgi/',\n  'Australian Shepherd': 'https://www.akc.org/dog-breeds/australian-shepherd/',\n  Affenpinscher: 'https://www.akc.org/dog-breeds/affenpinscher/',\n  'American Staffordshire Terrier':\n    'https://www.akc.org/dog-breeds/american-staffordshire-terrier/',\n  Tosa: 'https://www.akc.org/dog-breeds/tosa/',\n  'Labrador Retriever': 'https://www.akc.org/dog-breeds/labrador-retriever/',\n  'French Bulldog': 'https://www.akc.org/dog-breeds/french-bulldog/'\n}\n\nconst dogLinkCreator = () => {\n  const listOfDogs = []\n  Object.keys(dogs).forEach(dog => {\n    const li = document.createElement('li')\n    const anchor = document.createElement('a')\n    anchor.innerHTML = dog\n    anchor.setAttribute('href', dogs[dog])\n    li.classList.add('dog-link')\n    li.append(anchor)\n    listOfDogs.push(li)\n  })\n\n  return listOfDogs\n}\n\nconst attachDogLinks = htmlEl => {\n  const links = dogLinkCreator()\n  links.forEach(link => {\n    htmlEl.appendChild(link)\n  })\n}\n\n\n//# sourceURL=webpack:///./src/drop_down.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _clock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clock */ \"./src/clock.js\");\n/* harmony import */ var _drop_down__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drop_down */ \"./src/drop_down.js\");\n/* harmony import */ var _slide_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slide_scroll */ \"./src/slide_scroll.js\");\n/* harmony import */ var _warmup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./warmup */ \"./src/warmup.js\");\n\n\n\n\n\nconst h1 = document.getElementById('party')\n\nObject(_warmup__WEBPACK_IMPORTED_MODULE_3__[\"htmlGenerator\"])('Hello from Index', h1)\nconst clock = document.getElementById('clock')\n\nconst clockLogic = new _clock__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\nsetInterval(() => {\n  Object(_warmup__WEBPACK_IMPORTED_MODULE_3__[\"htmlGenerator\"])(clockLogic.currentTime(), clock)\n})\n\nconst dogList = document.getElementsByClassName('drop-down-dog-list')[0]\n\nObject(_drop_down__WEBPACK_IMPORTED_MODULE_1__[\"attachDogLinks\"])(dogList)\n\nconst h3 = document.querySelector('h3')\n\nlet visited_h3 = false\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  dogList.setAttribute('style', 'display: none')\n})\n\nh3.addEventListener('mouseenter', () => {\n  dogList.setAttribute('style', 'display: block')\n  visited_h3 = true\n})\n\ndogList.addEventListener('mouseleave', () => {\n  dogList.setAttribute('style', 'display: none')\n  visited_h3 = false\n})\n\ndogList.addEventListener('mouseenter', () => {\n  if (visited_h3) dogList.setAttribute('style', 'display: block')\n})\n\nconst toDos = JSON.parse(localStorage.getItem('todos')) || []\nconst ul = document.getElementsByClassName('todos')[0]\nconst form = document.getElementsByClassName('add-todo-form')[0]\nconst submitButton = form.querySelector('[type=\"submit\"]')\nsubmitButton.addEventListener('click', event => {\n  event.preventDefault()\n  addTodo()\n  populateList()\n})\n\nul.addEventListener('click', event => {\n  const target = event.target\n  if (target.hasAttribute('data-task')) {\n    // { value: todoInput.value, done: false }\n    const todo = toDos.filter(t => t.value === target.dataset.task)[0]\n    todo.done = !todo.done\n    populateList()\n  }\n})\n\nconst addTodo = () => {\n  const todoInput = form.querySelector('[name=\"add-todo\"]')\n  const newTodo = { value: todoInput.value, done: false }\n  toDos.push(newTodo)\n  todoInput.value = ''\n}\n\nconst populateList = () => {\n  localStorage.setItem('todos', JSON.stringify(toDos))\n  ul.innerHTML = ''\n  const lis = toDos.map(todo => {\n    const label = document.createElement('label')\n    label.innerHTML = todo.value\n    const input = document.createElement('input')\n    input.setAttribute('type', 'checkbox')\n    input.setAttribute('data-task', todo.value)\n    if (todo.done) input.setAttribute('checked', 'checked')\n    const li = document.createElement('li')\n    li.appendChild(label)\n    li.appendChild(input)\n    return li\n  })\n  lis.forEach(li => {\n    ul.appendChild(li)\n  })\n}\npopulateList()\n\nconst images = document.querySelectorAll('img')\nwindow.addEventListener('scroll', e => {\n  images.forEach(img => {\n    const verticalDiff = Math.abs(img.y - window.scrollY)\n    if (verticalDiff < 100) Object(_slide_scroll__WEBPACK_IMPORTED_MODULE_2__[\"debounce\"])(img.classList.add('active'))\n  })\n})\n\nconst input = document.getElementsByClassName('search')[0]\n\n// debounce missing\ninput.addEventListener('input', e =>\n  fetch('https://pokeapi.co/api/v2/pokemon/?offset=150&limit=150')\n    .then(function(response) {\n      return response.json()\n    })\n    .then(function(myJson) {\n      console.log(JSON.stringify(myJson))\n    })\n)\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/slide_scroll.js":
/*!*****************************!*\
  !*** ./src/slide_scroll.js ***!
  \*****************************/
/*! exports provided: debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"debounce\", function() { return debounce; });\nconst debounce = (func, wait = 20, immediate = true) => {\n  \n\n  let timeout\n\n  // This is the function that is actually executed when\n  // the DOM event is triggered.\n  return function executedFunction() {\n    // Store the context of this and any\n    // parameters passed to executedFunction\n    const context = this\n    const args = arguments\n\n    // The function to be called after debounce time has elapsed\n    const later = function() {\n      // null timeout to indicate the debounce ended\n      timeout = null\n\n      // Call function now if you did not in the beginning\n      if (!immediate) {\n        func.apply(context, args)\n      }\n    }\n\n    // Determine if you should call the function\n    // on the leading or trail end\n    const callNow = immediate && !timeout\n\n    // This will reset the waiting every function execution.\n    clearTimeout(timeout)\n\n    // Restart the debounce waiting period - returns true\n    console.log({ later, wait })\n\n    timeout = setTimeout(later, wait)\n\n    // Call immediately if you're doing a leading end execution\n    if (callNow) func.apply(context, args)\n  }\n}\n\n\n//# sourceURL=webpack:///./src/slide_scroll.js?");

/***/ }),

/***/ "./src/warmup.js":
/*!***********************!*\
  !*** ./src/warmup.js ***!
  \***********************/
/*! exports provided: htmlGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"htmlGenerator\", function() { return htmlGenerator; });\nconst partyHeader = document.getElementById('party')\n\nconst htmlGenerator = (string, htmlElement) => {\n  htmlElement.innerHTML = '<p>' + string + '</p>'\n}\n\nhtmlGenerator('Party Time.', partyHeader)\n\n\n//# sourceURL=webpack:///./src/warmup.js?");

/***/ })

/******/ });