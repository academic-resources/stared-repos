/* eslint-disable require-jsdoc */
class DomNodeCollection {
  constructor(array) {
    this.array = array;
  }

  html(string) {
    if (string) {
      this.array.forEach((el) => {
        el.innerHTML = string;
      });
    } else return this.array[0].innerHTML;
  }

  empty() {
    this.array.forEach((el) => {
      el.innerHTML = '';
    });
  }

  append(html) {
    if (html instanceof DomNodeCollection) {
      this.array.forEach((el1) => {
        // grab every node from html (=DomNodeCollection)
        html.array.forEach((el2) => {
          // append every one of those nodes to el's inner html
          el1.innerHTML += el2.outerHTML;
        });
      });
    } else if (html instanceof HTMLElement) {
      this.array.forEach((el) => {
        el.innerHTML += html.outerHTML;
      });
    } else {
      this.array.forEach((el) => {
        el.innerHTML += html;
      });
    }
  }

  addClass(className) {
    this.array.forEach((el) => {
      el.classList.add(className);
    });
  }

  removeClass(className) {
    this.array.forEach((el) => {
      el.classList.remove(className);
    });
  }

  attr(key) {
    this.array[0].attributes.getNamedItem(key);
  }

  children() {
    const childrenArray = [];
    this.array.forEach((el) => {
      const elChildren = el.children;
      for (let i = 0; i < elChildren.length; i++) {
        childrenArray.push(elChildren[i]);
      }
    });
    return new DomNodeCollection(childrenArray);
  }

  parent() {
    const parentArray = [];
    this.array.forEach((el) => {
      parentArray.push(el.parentElement);
    });
    return new DomNodeCollection(parentArray);
  }

  find(queryString) {
    const foundElements = [];
    this.array.forEach((el) => {
      const innerEls = el.querySelectorAll(queryString);
      innerEls.forEach((inner) => foundElements.push(inner));
    });
    return new DomNodeCollection(foundElements);
  }

  remove() {
    this.array.forEach((el) => {
      el.parentNode.removeChild(el);
    });
  }

  on(eventName, callback) {
    this.array.forEach((el) => {
      el.addEventListener(eventName, callback);
      el.setAttribute('callback', callback);
    });
  }

  off(eventName) {
    this.array.forEach((el) => {
      const targetEvents = getEventListeners(el, eventName)[eventName];
      targetEvents.forEach( (event) => {
        el.removeEventListener(eventName, event.listener);
      });
      // const callback = new Function(el.getAttribute('callback'));
    });
  }
}

module.exports = DomNodeCollection;
