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
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id =>
    $.ajax({
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: 'json'
    }),
  unfollowUser: id =>
    $.ajax({
      method: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: 'json'
    }),
  searchUsers: (queryVal, success) => {
    $.ajax({
      method: 'GET',
      url: `/users/search`,
      data: { query: queryVal },
      dataType: 'json',
      success: success
    })
  },
  createTweet: data =>
    $.ajax({
      method: 'POST',
      url: `/tweets`,
      data: data,
      dataType: 'json'
    })
}

module.exports = APIUtil


/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js")

class FollowToggle {
  constructor($el) {
    this.userId = $el.data('user-id')
    this.followState = $el.data('initial-follow-state')
    this.$el = $el
    this.render()
    $el.click(event => this.handleClick(event))
  }

  render() {
    if (this.followState === 'followed') {
      this.$el.text('Unfollow!')
    } else {
      this.$el.text('Follow!')
    }
  }

  handleClick(event) {
    event.preventDefault()
    if (this.followState === 'following' || this.followState === 'unfollowing')
      return
    if (this.followState === 'unfollowed') {
      this.followState === 'following'
      this.$el.prop('disabled', true)
      APIUtil.followUser(this.userId).then(
        () => {
          this.$el.prop('disabled', false)
          this.followState = 'followed'
          this.render()
        },
        () => {
          debugger
        }
      )
    } else {
      this.followState === 'unfollowing'
      this.$el.prop('disabled', true)
      APIUtil.unfollowUser(this.userId).then(
        () => {
          this.$el.prop('disabled', false)
          this.followState = 'unfollowed'
          this.render()
        },
        () => {
          debugger
        }
      )
    }
  }
}

module.exports = FollowToggle


/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js")

class TweetCompose {
  constructor($el) {
    this.$el = $el
    this.$ta = $el.find('textarea')
    this.$ta.on('input', () => {
      $charsLeft = $('strong')
      let chars = $ta.length
      let left = 140 - chars
      $charsLeft.text(`${left}`)
    })
    this.$el.submit(this.submitHandler.bind(this))
  }

  submitHandler(event) {
    event.preventDefault()
    const data = this.$el.serializeJSON()
    this.$el.find(':input').prop('disabled', true)
    APIUtil.createTweet(data).then(this.handleSuccess.bind(this))
  }

  clearInput() {
    this.$el.find(':input').prop('disabled', false)
    this.$el.find(':input').val('')
  }

  handleSuccess(data) {
    debugger
    this.clearInput()
    const ul_id = this.$el.data('tweets-ul')
    const $ul = $(ul_id)
    // data = JSON.stringify(data)
    const $li = $(`<li> ${data.content} - ${data.user.username} </li>`)
    $ul.append($li)
  }
}

module.exports = TweetCompose


/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js")
const UserSearch = __webpack_require__(/*! ./users_search */ "./frontend/users_search.js")
const TweetCompose = __webpack_require__(/*! ./tweet_compose */ "./frontend/tweet_compose.js")

$(() => {
  $('.follow-toggle').each((i, el) => {
    new FollowToggle($(el))
  })

  $('.users-search').each((i, el) => {
    new UserSearch($(el))
  })

  $('.tweet-compose').each((i, el) => {
    new TweetCompose($(el))
  })
})


/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js")
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js")

class UsersSearch {
  constructor($el) {
    this.$el = $el
    this.$input = $el.find('input')
    this.$ul = $el.find('.users')
    this.$input.on('input', this.handleInput.bind(this))
  }

  handleInput(event) {
    // debugger
    APIUtil.searchUsers(
      event.currentTarget.value,
      this.processUsersFound.bind(this)
    )
  }

  processUsersFound(data) {
    this.$ul.find('li').remove()
    debugger
    data.forEach((el, i) => {
      const uname = el.username
      const uid = el.id
      const follow_state = el.followed ? 'followed' : 'unfollowed'
      const $li = $(`<li><a href="/users/${uid}">${uname}</a></li>`)
      const $btn = $(
        `<button data-user-id=${uid} data-initial-follow-state=${follow_state} class="follow-toggle" ></button >`
      )
      new FollowToggle($btn)
      $li.append($btn)
      this.$ul.append($li)
    })
  }
}

module.exports = UsersSearch


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map