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
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js")

const APIUtil = {
    followUser: id => {
        return $.ajax({
            method: 'POST',
            url: `/users/${id}/follow`,
            dataType: 'json',
        })
    },

    unfollowUser: id => {
        return $.ajax({
            url: `/users/${id}/follow`,
            method: 'DELETE',
            dataType: 'json',
        })
    },

    searchUsers: (queryVal, success) => {
        return $.ajax({
            url: '/users/search',
            method: 'GET',
            dataType: 'json',
            data: { query: queryVal },
            success: success
        })
    },

}


module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id')
    this.followState = this.$el.data('initial-follow-state')
    this.render();
    this.$el.on('click', this.handleClick.bind(this));
  }

  render () {
    switch (this.followState) {
      case 'unfollowed':
        this.$el.text('Follow!');
        this.$el.prop('disabled', false)
        break;
      case 'followed':
        this.$el.text('Unfollow!');
        this.$el.prop('disabled', false)
        break;
      case 'unfollowing':
        this.$el.prop('disabled', true)
        this.$el.text('unfollowing')
        break;
      case 'following':
        this.$el.prop('disabled', true)
        this.$el.text('following')
        break;
    }
  }

    // if (this.followState === 'unfollowed') {
    //   this.$el.text('Follow!')
    // } else {
    //   this.$el.text('Unfollow!')
    // }
  

  handleClick (event) {
    event.preventDefault();
    if (this.followState === 'unfollowed') {
      this.followState = 'following';
      this.render();
      APIUtil.followUser(this.userId).then(() => {
        this.followState = 'followed';
        this.render();
      });
    } else {
      this.followState = 'unfollowing'
      this.render();
      APIUtil.unfollowUser(this.userId).then(() => {
        this.followState = 'unfollowed';
        this.render();
      });
    }
  }
}



module.exports = FollowToggle

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js")
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js")

$(() => {
  $('.follow-toggle').each ((i, el) => {
    new FollowToggle(el)
  });
  $('.users-search').each((i, el) => {
      new UsersSearch(el)
  })
});

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// const APIUtil = require('./api_util');
const APIUtil = __webpack_require__(/*! ./util */ "./frontend/util.js")
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js")


class UsersSearch {
    constructor(el) {
        this.$el = $(el)
        this.$input = $('#search-input')
        this.$ul = $('.users')
        this.$el.on('keyup', this.handleInput.bind(this))
    }

    handleInput(event) {
      // event.preventDefault()
      const val = this.$input.val();
      const success = (res) => {
        this.renderResults(res);
      }
      APIUtil.searchUsers(val).then(success)
    } 

    renderResults(res) {
      this.$ul.empty();
      const users = res.map((el) => (el.username))
      users.forEach( (user, i) => {
        const $li = $('<li>');
        const $a = $('<a>').text(user);
        $a.attr('href',`/users/${res[i].id}`);
        $li.append($a);
        this.$ul.append($li)
        const $button = $('<button>')
        // const follow = new FollowToggle($button)
        this.$ul.append($button)
      });
    }
}

module.exports = UsersSearch

/***/ }),

/***/ "./frontend/util.js":
/*!**************************!*\
  !*** ./frontend/util.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js")

const APIUtil = {
    followUser: id => {
        return $.ajax({
            method: 'POST',
            url: `/users/${id}/follow`,
            dataType: 'json',
        })
    },

    unfollowUser: id => {
        return $.ajax({
            url: `/users/${id}/follow`,
            method: 'DELETE',
            dataType: 'json',
        })
    },

    searchUsers: (queryVal) => {
        return $.ajax({
            url: '/users/search',
            method: 'GET',
            dataType: 'json',
            data: { query: queryVal },
        })
    }

}


module.exports = APIUtil;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map