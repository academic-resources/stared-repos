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

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DomNodesCollection {\n  constructor (elemArray) {\n    this.elemArray = elemArray\n  }\n\n  applyToElems(func) {\n      this.elemArray.forEach(el => {\n          func(el)\n      });\n  }\n\n  html(string = null) {\n    if (string) {\n        this.applyToElems(el => el.innerHTML = string)\n    } else {\n        return this.elemArray[0].innerHTML\n    }\n  }\n\n  empty() {\n      this.applyToElems(el => el.innerHTML = '')\n  }\n\n  append(arg) {\n    if (arg instanceof DomNodesCollection ) {\n        const outerArgs = arg.elemArray.map( el => el.outerHTML ).join('')\n        this.applyToElems(el => el.innerHTML = outerArgs)\n    } else if (arg instanceof HTMLElement) {\n        this.applyToElems(el => el.innerHTML = arg.outerHTML)\n    } else {\n        this.applyToElems(el => el.innerHTML = arg)\n    }\n  }\n\n  attr (key, val = null) {\n    if (val) {\n        this.applyToElems(el => el.setAttribute(key, val))\n    } else {\n      return this.elemArray[0].getAttribute(key)\n    }\n  }\n\n  addClass (arg) {\n    let classesToAdd\n    if (arg instanceof Function) {\n        this.elemArray.forEach( (el, idx) => {\n            classesToAdd = arg(idx, el.classList).split(' ')\n            el.classList.add(...classesToAdd)\n        });\n    } else {\n        this.elemArray.forEach((el) => {\n            classesToAdd = arg.split(' ')\n            el.classList.add(...classesToAdd)\n        });\n    }\n  }\n\n  removeClass (arg) {\n    let classesToRemove\n    if (arg instanceof Function) {\n        this.elemArray.forEach( (el, idx) => {\n            classesToRemove = arg(idx, el.classList).split(' ')\n            el.classList.remove(...classesToRemove)\n        });\n    } else {\n        this.elemArray.forEach((el) => {\n            classesToRemove = arg.split(' ')\n            el.classList.remove(...classesToRemove)\n        });\n    }\n  }\n\n  children () {\n    let allChildren = []\n    this.elemArray.forEach ((el) => {\n      allChildren = allChildren.concat(Array.from(el.children))\n    })\n    return new DomNodesCollection(allChildren)\n  }\n\n  parent () {\n    let allParents = []\n    this.elemArray.forEach ((el) => {\n        if (allParents.indexOf(el.parentElement) === -1) \n            allParents.push(el.parentElement)\n    })\n    return new DomNodesCollection(allParents)\n  }\n\n  find(selector) {\n      let matches = []\n      if (typeof selector === \"string\") {\n        this.elemArray.forEach ( el => {\n          matches = matches.concat(Array.from(el.querySelectorAll(selector)))\n        })\n      } else if (selector instanceof HTMLElement) {\n          this.elemArray.forEach(el => {\n              if (el === selector) matches = [el] // not working\n          })\n      }\n      return new DomNodesCollection(matches)\n  } \n\n  remove () {\n      const removed = this\n      this.elemArray.forEach(el => {\n        el.parentElement.removeChild(el)\n      })\n      return this\n  }\n\n  on (event, cb) {\n    this.elemArray.forEach ( el => {\n      el._cb = {event, cb}\n      el.addEventListener(event, cb)\n    })\n  }\n\n  off (event) {\n    this.elemArray.forEach ( el => {\n      if (el._cb && el._cb.event === event) {\n        el.removeEventListener(event, el._cb.cb)\n      }\n    })\n  }\n\n  \n\n}\n\n\nmodule.exports = DomNodesCollection\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DomNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\")\n\n// function $l (arg) {\n//   let nodes\n//   if (typeof arg === \"string\") {\n//     nodes = Array.from(document.querySelectorAll(arg))\n//   } \n//   if (arg instanceof HTMLElement) {\n//       nodes = [arg]\n//   }\n\n//   return new DomNodeCollection(nodes)\n// }\n\nconst allFuncs = []\n\n// $l(() => '2')\n// $l(() => '3')\n// $l(() => alert('1'))\n\nfunction $l (arg) {\n  if (arg instanceof Function) {\n    allFuncs.push(arg)\n  } else {\n    let nodes\n    if (typeof arg === \"string\") {\n      nodes = Array.from(document.querySelectorAll(arg))\n    } \n    if (arg instanceof HTMLElement) {\n        nodes = [arg]\n    }\n    return new DomNodeCollection(nodes)\n  }\n}\n\nwindow.addEventListener('DOMContentLoaded', (event) => {\n    allFuncs.forEach( func => func())\n})\nwindow.$l = $l\nwindow.DomNodeCollection = DomNodeCollection\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });