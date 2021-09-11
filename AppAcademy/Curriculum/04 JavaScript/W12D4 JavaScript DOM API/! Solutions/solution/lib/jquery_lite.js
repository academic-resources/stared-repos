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
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter,
        /******/
      });
      /******/
    }
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
  /******/ // Load entry module and return exports
  /******/ return __webpack_require__((__webpack_require__.s = 0));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function (module, exports, __webpack_require__) {
      const DomNodeCollection = __webpack_require__(1);

      const _docReadyCallbacks = [];
      let _docReady = false;

      window.$l = (arg) => {
        switch (typeof arg) {
          case "function":
            return registerDocReadyCallback(arg);
          case "string":
            return getNodesFromDom(arg);
          case "object":
            if (arg instanceof HTMLElement) {
              return new DomNodeCollection([arg]);
            }
        }
      };

      $l.extend = (base, ...otherObjs) => {
        otherObjs.forEach((obj) => {
          for (let prop in obj) {
            base[prop] = obj[prop];
          }
        });
        return base;
      };

      $l.ajax = (options) => {
        const request = new XMLHttpRequest();
        const defaults = {
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          method: "GET",
          url: "",
          success: () => {},
          error: () => {},
          data: {},
        };
        options = $l.extend(defaults, options);
        options.method = options.method.toUpperCase();

        if (options.method === "GET") {
          //data is query string for get
          options.url += "?" + toQueryString(options.data);
        }

        request.open(options.method, options.url, true);
        request.onload = (e) => {
          //NB: Triggered when request.readyState === XMLHttpRequest.DONE ===  4
          if (request.status === 200) {
            options.success(request.response);
          } else {
            options.error(request.response);
          }
        };

        request.send(JSON.stringify(options.data));
      };

      //helper methods
      toQueryString = (obj) => {
        let result = "";
        for (let prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            result += prop + "=" + obj[prop] + "&";
          }
        }
        return result.substring(0, result.length - 1);
      };

      registerDocReadyCallback = (func) => {
        if (!_docReady) {
          _docReadyCallbacks.push(func);
        } else {
          func();
        }
      };

      getNodesFromDom = (selector) => {
        const nodes = document.querySelectorAll(selector);
        const nodes_array = Array.from(nodes);
        return new DomNodeCollection(nodes_array);
      };

      document.addEventListener("DOMContentLoaded", () => {
        _docReady = true;
        _docReadyCallbacks.forEach((func) => func());
      });

      /***/
    },
    /* 1 */
    /***/ function (module, exports) {
      class DomNodeCollection {
        constructor(nodes) {
          // The nodes passed in must always be an Array. NodeList has no
          // #forEach method, so we need to be able to count on the type of
          // `nodes` so that we can prevent TypeErrors later on. We therefore
          // must ensure we only pass the `DomNodeCollection` constructor
          // Arrays in our core function.
          this.nodes = nodes;
        }

        each(cb) {
          // Our each passes in the node and index in traditional 'forEach' order,
          // jquery passes in index first and binds the call to the element.
          this.nodes.forEach(cb);
        }

        on(eventName, callback) {
          this.each((node) => {
            node.addEventListener(eventName, callback);
            const eventKey = `jqliteEvents-${eventName}`;
            if (typeof node[eventKey] === "undefined") {
              node[eventKey] = [];
            }
            node[eventKey].push(callback);
          });
        }

        off(eventName) {
          this.each((node) => {
            const eventKey = `jqliteEvents-${eventName}`;
            if (node[eventKey]) {
              node[eventKey].forEach((callback) => {
                node.removeEventListener(eventName, callback);
              });
            }
            node[eventKey] = [];
          });
        }

        html(html) {
          if (typeof html === "string") {
            this.each((node) => (node.innerHTML = html));
          } else {
            if (this.nodes.length > 0) {
              return this.nodes[0].innerHTML;
            }
          }
        }

        empty() {
          this.html("");
        }

        append(children) {
          if (this.nodes.length === 0) return;

          if (
            typeof children === "object" &&
            !(children instanceof DomNodeCollection)
          ) {
            // ensure argument is coerced into DomNodeCollection
            children = $l(children);
          }

          if (typeof children === "string") {
            this.each((node) => (node.innerHTML += children));
          } else if (children instanceof DomNodeCollection) {
            // You can't append the same child node to multiple parents,
            // so we must duplicate the child nodes here.
            this.each((node) => {
              // The argument to cloneNode indicates whether or not
              // all children should be cloned.
              children.each((childNode) => {
                node.appendChild(childNode.cloneNode(true));
              });
            });
          }
        }

        remove() {
          this.each((node) => node.parentNode.removeChild(node));
        }

        attr(key, val) {
          if (typeof val === "string") {
            this.each((node) => node.setAttribute(key, val));
          } else {
            return this.nodes[0].getAttribute(key);
          }
        }

        addClass(newClass) {
          this.each((node) => node.classList.add(newClass));
        }

        removeClass(oldClass) {
          this.each((node) => node.classList.remove(oldClass));
        }

        toggleClass(toggleClass) {
          this.each((node) => node.classList.toggle(toggleClass));
        }

        find(selector) {
          let foundNodes = [];
          this.each((node) => {
            const nodeList = node.querySelectorAll(selector);
            foundNodes = foundNodes.concat(Array.from(nodeList));
          });
          return new DomNodeCollection(foundNodes);
        }

        children() {
          let childNodes = [];
          this.each((node) => {
            const childNodeList = node.children;
            childNodes = childNodes.concat(Array.from(childNodeList));
          });
          return new DomNodeCollection(childNodes);
        }

        parent() {
          const parentNodes = [];

          this.each(({ parentNode }) => {
            // we apply 'visited' property to prevent adding duplicate parents
            parentNode.visited
              ? parentNodes.push(parentNode)
              : (parentNode.visited = true);
          });

          parentNodes.forEach((node) => {
            node.visited = false;
          });
          return new DomNodeCollection(parentNodes);
        }
      }

      module.exports = DomNodeCollection;

      /***/
    },
    /******/
  ]
);
//# sourceMappingURL=jquery_lite.js.map
