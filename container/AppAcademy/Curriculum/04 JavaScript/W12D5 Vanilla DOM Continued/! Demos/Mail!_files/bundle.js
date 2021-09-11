/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	let Router = __webpack_require__(1);
	let Compose = __webpack_require__(2);
	let Inbox = __webpack_require__(4);
	let Sent = __webpack_require__(5);

	let routes = {
	  compose: Compose,
	  inbox: Inbox,
	  sent: Sent
	};


	document.addEventListener("DOMContentLoaded", () => {
	  let content = document.querySelector(".content");
	  router = new Router(content, routes);
	  router.start();
	  window.location.hash = "#inbox";
	  let navItems = Array.from(document.querySelectorAll(".sidebar-nav li"));
	  navItems.forEach(navItem => {
	    navItem.addEventListener("click", () => {
	      let name = navItem.innerText.toLowerCase();
	      location.hash = name;
	    });
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function Router(node, routes) {
	  this.node = node;
	  this.routes = routes;
	}

	Router.prototype.start = function () {
	  this.render();
	  window.addEventListener("hashchange", () => {
	    this.render();
	  });
	};

	Router.prototype.render = function () {
	  this.node.innerHTML = "";
	  let component = this.activeRoute();
	  if(component) {
	    this.node.appendChild(component.render());
	  }
	}

	Router.prototype.activeRoute = function () {
	  let hash = window.location.hash.substr(1);
	  let component = this.routes[hash];
	  return component;
	};

	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	module.exports = {
	  renderForm: function () {
	    let currentMessage = MessageStore.getMessageDraft();
	    let html = `
	    <p class="new-message-header">New Message</p>
	    <form class="compose-form">
	    <input
	      placeholder='Recipient'
	      name='to'
	      type="text"
	      value='${currentMessage.to}'>

	    <input
	      placeholder='Subject'
	      name='subject'
	      type="text"
	      value='${currentMessage.subject}'>

	    <textarea
	      name='body'
	      rows='20'>${currentMessage.body}</textarea>

	    <button type="submit" class="btn btn-primary submit-message">Send</button>
	    </form>
	    `;
	    return html;
	  },
	  render: function () {
	    let container = document.createElement("div");
	    container.className = "new-message";
	    container.innerHTML = this.renderForm();
	    container.addEventListener('change', e => {
	      let target = e.target;
	      MessageStore.updateDraftField(target.name, target.value);
	    });

	    container.addEventListener('submit', e => {
	      e.preventDefault();
	      MessageStore.sendDraft();
	      location.hash = "inbox";
	    });

	    return container;
	  }
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	const user = "2cool4u123@gmail.com";
	function Message (from = user, to = "", subject = "", body = "") {
	  this.from = from;
	  this.to = to;
	  this.subject = subject;
	  this.body = body;
	}

	let messages = JSON.parse(localStorage.getItem('messages'));
	let messageDraft = new Message();

	if(!messages) {
	  messages = {
	    sent: [
	      {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
	      {to: "person@mail.com", subject: "zzz", body: "so booring"}
	    ],
	    inbox: [
	      {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body: "Stay at home mom discovers cure for leg cramps. Doctors hate her"},
	      {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
	    ]
	  };
	}

	const MessageStore = {
	  getInboxMessages: function () {
	    return messages.inbox.slice();
	  },
	  getSentMessages: function () {
	    return messages.sent.slice();
	  },
	  getMessageDraft: function () {
	    return messageDraft;
	  },
	  sendDraft: function () {
	    messages.sent.push(messageDraft);
	    messageDraft = new Message();
	    localStorage.setItem('messages', JSON.stringify(messages));
	  },
	  updateDraftField: function (field, value) {
	    messageDraft[field] = value;
	  }
	};

	module.exports = MessageStore;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	module.exports = {
	  renderMessage: function(message) {
	    let messageEl = document.createElement("li");
	    messageEl.className = "message";
	    messageEl.innerHTML =`
	    <span class='from'>${message.from}</span>
	    <span class="subject">${message.subject}</span> -
	    <span class="body">${message.body}</span>
	    `;
	    return messageEl;
	  },
	  render: function() {
	    let container = document.createElement("ul");
	    container.className = "messages";
	    let messages = MessageStore.getInboxMessages();
	    messages.forEach(message => {
	      container.appendChild(this.renderMessage(message));
	    });
	    return container;
	  }
	};




/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	module.exports = {
	  renderMessage: function (message) {
	    let messageEl = document.createElement("li");
	    messageEl.className = "message";
	    messageEl.innerHTML = `
	    <span class="from">To: ${message.to}</span>
	    <span class="subject">${message.subject}</span> -
	    <span class="body">${message.body}
	    `;
	    return messageEl;
	  },
	  render: function() {
	    let container = document.createElement("ul");
	    container.className = "messages";
	    let messages = MessageStore.getSentMessages();
	    messages.forEach(message => {
	      container.appendChild(this.renderMessage(message));
	    });
	    return container;
	  }
	};



/***/ }
/******/ ]);