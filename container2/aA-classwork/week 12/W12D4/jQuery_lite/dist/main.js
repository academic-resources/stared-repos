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

eval("/* eslint-disable require-jsdoc */\nclass DomNodeCollection {\n  constructor(array) {\n    this.array = array;\n  }\n\n  html(string) {\n    if (string) {\n      this.array.forEach((el) => {\n        el.innerHTML = string;\n      });\n    } else return this.array[0].innerHTML;\n  }\n\n  empty() {\n    this.array.forEach((el) => {\n      el.innerHTML = '';\n    });\n  }\n\n  append(html) {\n    if (html instanceof DomNodeCollection) {\n      this.array.forEach((el1) => {\n        // grab every node from html (=DomNodeCollection)\n        html.array.forEach((el2) => {\n          // append every one of those nodes to el's inner html\n          el1.innerHTML += el2.outerHTML;\n        });\n      });\n    } else if (html instanceof HTMLElement) {\n      this.array.forEach((el) => {\n        el.innerHTML += html.outerHTML;\n      });\n    } else {\n      this.array.forEach((el) => {\n        el.innerHTML += html;\n      });\n    }\n  }\n\n  addClass(className) {\n    this.array.forEach((el) => {\n      el.classList.add(className);\n    });\n  }\n\n  removeClass(className) {\n    this.array.forEach((el) => {\n      el.classList.remove(className);\n    });\n  }\n\n  attr(key) {\n    this.array[0].attributes.getNamedItem(key);\n  }\n\n  children() {\n    const childrenArray = [];\n    this.array.forEach((el) => {\n      const elChildren = el.children;\n      for (let i = 0; i < elChildren.length; i++) {\n        childrenArray.push(elChildren[i]);\n      }\n    });\n    return new DomNodeCollection(childrenArray);\n  }\n\n  parent() {\n    const parentArray = [];\n    this.array.forEach((el) => {\n      parentArray.push(el.parentElement);\n    });\n    return new DomNodeCollection(parentArray);\n  }\n\n  find(queryString) {\n    const foundElements = [];\n    this.array.forEach((el) => {\n      const innerEls = el.querySelectorAll(queryString);\n      innerEls.forEach((inner) => foundElements.push(inner));\n    });\n    return new DomNodeCollection(foundElements);\n  }\n\n  remove() {\n    this.array.forEach((el) => {\n      el.parentNode.removeChild(el);\n    });\n  }\n\n  on(eventName, callback) {\n    this.array.forEach((el) => {\n      el.addEventListener(eventName, callback);\n      el.setAttribute('callback', callback);\n    });\n  }\n\n  off(eventName) {\n    this.array.forEach((el) => {\n      const targetEvents = getEventListeners(el, eventName)[eventName];\n      targetEvents.forEach( (event) => {\n        el.removeEventListener(eventName, event.listener);\n      });\n      // const callback = new Function(el.getAttribute('callback'));\n    });\n  }\n}\n\nmodule.exports = DomNodeCollection;\n\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-disable no-unused-vars */\nconst DomNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nconst functions = [];\n\nwindow.$1 = function(arg) {\n  if (typeof arg === 'string') {\n    const nodeList = document.querySelectorAll(arg);\n    const nodeListArray = [];\n    nodeList.forEach((el) => {\n      nodeListArray.push(el);\n    });\n    const collection = new DomNodeCollection(nodeListArray);\n    return collection;\n  } else if (typeof arg === 'function') {\n    if (loaded) {\n      arg();\n    } else {\n      functions.push(arg);\n    }\n  } else if (typeof arg === 'object') {\n    const nodeListArray = [];\n    nodeListArray.push(arg);\n    const collection = new DomNodeCollection(nodeListArray);\n    return collection;\n  }\n};\n\n$1.extend = function(...objects) {\n  const extendedObject = {};\n  objects.forEach((obj) => {\n    Object.keys(obj).forEach((key) => {\n      extendedObject[key] = obj[key];\n    });\n  });\n  return extendedObject;\n};\n\n$1.ajax = function(options) {\n  const defaults = {\n    success: new Function(),\n    error: new Function(),\n    url: window.location,\n    method: 'GET',\n    data: {},\n    contentType: 'json',\n  };\n  options = $1.extend(defaults, options);\n  const xhr = new XMLHttpRequest();\n  xhr.open(options.method, options.url);\n  xhr.onload = function() {\n    if (xhr.status === 200) {\n      options.success(JSON.parse(xhr.response));\n    } else {\n      options.error(JSON.parse(xhr.response));\n    }\n  };\n  xhr.send(options.data);\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  // eslint-disable-next-line no-var\n  var loaded = true;\n  functions.forEach( (func) => {\n    func();\n  });\n});\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });