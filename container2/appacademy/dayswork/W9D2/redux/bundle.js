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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "./store.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducers */ "./reducers.js");

 // const rootReducer = combineReducers({users: userReducer, roles: roleReducer});
// const store = new Store(rootReducer);
// const testAction = { type: 'ADD_USER', user: 'Bill'}
// console.log(store.getState())
// store.dispatch(testAction);
// console.log(store.getState())

var actionCreator1 = function actionCreator1(value) {
  return {
    type: "add",
    value: value
  };
};

var actionCreator2 = function actionCreator2(value) {
  return {
    type: "subtract",
    value: value
  };
};

var actionCreator3 = function actionCreator3(value) {
  return {
    type: "no change",
    value: value
  };
};

var numberReducer = function numberReducer() {
  var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "add":
      return num + action.value;

    case "subtract":
      return num - action.value;

    default:
      return num;
  }
};

var rootReducer = Object(_reducers__WEBPACK_IMPORTED_MODULE_1__["combineReducers"])({
  number: numberReducer
});
var store = new _store__WEBPACK_IMPORTED_MODULE_0__["default"](rootReducer);
store.getState(); // => { number: 0 }

console.log({
  store: store.getState()
});

var announceStateChange = function announceStateChange(nextState) {
  console.log("That action changed the state! Number is now ".concat(nextState.number));
};

store.subscribe(announceStateChange);
store.dispatch(actionCreator1(5)); // => "That action changed the state! Number is now 5"

console.log({
  store: store.getState()
});
store.dispatch(actionCreator1(5)); // => "That action changed the state! Number is now 10"

console.log({
  store: store.getState()
});
store.dispatch(actionCreator2(7)); // => "That action changed the state! Number is now 3"

console.log({
  store: store.getState()
});
store.dispatch(actionCreator3(7)); // => Nothing should happen! The reducer doesn't do anything for type "no change"

console.log({
  store: store.getState()
});
store.dispatch(actionCreator1(0)); // => Nothing should happen here either. Even though the reducer checks for the "add" action type, adding 0 to the number won't result in a state change.

console.log({
  store: store.getState()
}); // => { number: 3 }
// store.getState(); // => { number: 3 }

/***/ }),

/***/ "./reducers.js":
/*!*********************!*\
  !*** ./reducers.js ***!
  \*********************/
/*! exports provided: userReducer, roleReducer, combineReducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userReducer", function() { return userReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roleReducer", function() { return roleReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return combineReducers; });
var userReducer = function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_USER':
      var newState = state.slice();
      newState.push(action.user);
      return newState;

    default:
      return state;
  }
};
var roleReducer = function roleReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'CHANGE_ROLE':
      return state;

    default:
      return state;
  }
}; // reducer
// {
//     users: () => {},
//     roles: () => {}
// }
// state
// {
//     users: {},
//     roles: {}
// }
// [users, roles]

var combineReducers = function combineReducers(obj) {
  var reducerObject = obj;
  return function (prevState, action, subscriptions) {
    var newState = {};
    var changed = false;
    var keys = Object.keys(reducerObject);
    keys.forEach(function (key) {
      newState[key] = reducerObject[key](prevState[key], action);
      if (newState[key] !== prevState[key]) changed = true;
    }); // debugger

    if (changed) {
      subscriptions.forEach(function (s) {
        return s(newState);
      });
      return newState;
    }

    return prevState;
  };
}; // const myNoiseReducer = (prevState = "peace and quiet", action) => {
//     switch (action.type) {
//         case "noisy action":
//             return action.noise;
//         default:
//             return prevState;
//     }
// };
// const myNoisyAction = {
//     type: "noisy action",
//     noise: "Car alarm"
// };
// const myInconsequentialAction = {
//     type: "a type no one cares about",
//     data: {
//         thisThing: "will not get used anyway"
//     }
// };
// const myInitialState = {
//     noise: "peace and quiet"
// };
// const myRootReducer = combineReducers({
//     noise: myNoiseReducer,
// });
// let newState = myRootReducer(myInitialState, myInconsequentialAction);
// console.log({newState});
// // => { noise: "peace and quiet" }
// const ns2 = myRootReducer(newState, myNoisyAction)
// console.log({ ns2});
// // => { noise: "Car alarm" }
// const ns3 = myRootReducer(ns2, myInconsequentialAction)
// console.log({ns3})
// // => { noise: "Car alarm" }

/***/ }),

/***/ "./store.js":
/*!******************!*\
  !*** ./store.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Store =
/*#__PURE__*/
function () {
  function Store(rootReducer) {
    _classCallCheck(this, Store);

    this.rootReducer = rootReducer;
    this.state = {};
    this.subscriptions = [];
  }

  _createClass(Store, [{
    key: "getState",
    value: function getState() {
      var copy = Object.assign({}, this.state);
      return copy;
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      this.subscriptions.push(callback);
    }
  }, {
    key: "dispatch",
    value: function dispatch(action) {
      var newState = this.rootReducer(this.state, action, this.subscriptions);
      this.state = Object.assign(this.state, newState);
    }
  }]);

  return Store;
}();

/* harmony default export */ __webpack_exports__["default"] = (Store);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map