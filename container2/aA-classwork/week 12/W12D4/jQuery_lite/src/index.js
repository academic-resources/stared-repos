/* eslint-disable no-unused-vars */
const DomNodeCollection = require('./dom_node_collection.js');

const functions = [];

window.$1 = function(arg) {
  if (typeof arg === 'string') {
    const nodeList = document.querySelectorAll(arg);
    const nodeListArray = [];
    nodeList.forEach((el) => {
      nodeListArray.push(el);
    });
    const collection = new DomNodeCollection(nodeListArray);
    return collection;
  } else if (typeof arg === 'function') {
    if (loaded) {
      arg();
    } else {
      functions.push(arg);
    }
  } else if (typeof arg === 'object') {
    const nodeListArray = [];
    nodeListArray.push(arg);
    const collection = new DomNodeCollection(nodeListArray);
    return collection;
  }
};

$1.extend = function(...objects) {
  const extendedObject = {};
  objects.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      extendedObject[key] = obj[key];
    });
  });
  return extendedObject;
};

$1.ajax = function(options) {
  const defaults = {
    success: new Function(),
    error: new Function(),
    url: window.location,
    method: 'GET',
    data: {},
    contentType: 'json',
  };
  options = $1.extend(defaults, options);
  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);
  xhr.onload = function() {
    if (xhr.status === 200) {
      options.success(JSON.parse(xhr.response));
    } else {
      options.error(JSON.parse(xhr.response));
    }
  };
  xhr.send(options.data);
};

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-var
  var loaded = true;
  functions.forEach( (func) => {
    func();
  });
});

