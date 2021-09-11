"use strict";

/**
 * 
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2020-02-07
 * @modified 
 * 
 * @description js & disabled right click & disabled right menu
 * @augments 
 * @example 
 * @link https://www.cnblogs.com/xgqfrms/p/12275284.html
 * 
 */

let log = console.log;

(() => {
  log('DOM fully loaded and parsed', `disabled copy`);

  document.body.oncontextmenu = 
  document.body.ondragstart = 
  document.body.onselectstart = 
  document.body.onbeforecopy = function() {
    return false;
  };

  document.body.onselect = 
  document.body.oncopy = 
  document.body.onmouseup = function() {
    document.selection.empty();
  };
})();

/*

window.addEventListener('DOMContentLoaded', (event) => {
  log('DOM fully loaded and parsed', `disabled copy`);

  document.body.oncontextmenu = 
  document.body.ondragstart = 
  document.body.onselectstart = 
  document.body.onbeforecopy = function() {
    return false;
  };

  document.body.onselect = 
  document.body.oncopy = 
  document.body.onmouseup = function() {
    document.selection.empty();
  };
});

*/
