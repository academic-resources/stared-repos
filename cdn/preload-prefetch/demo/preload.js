"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2020-05-19
 * @modified
 *
 * @description preload
 * @augments
 * @example
 * @link
 *
 */

// const log = console.log;

log(`preload.js`);
// if(log) {
//   log(`preload.js`);
// } else {
//   console.log(`preload.js`);
// }

(() => {
  const preload = document.querySelector(`[data-uid="preload"]`);
  preload.innerText = `preload.js 预加载`;
  log(`preload.js OK`);
  // if(log) {
  //   log(`preload.js OK`);
  // } else {
  //   console.log(`preload.js OK`);
  // }
})();

