"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2020-05-19
 * @modified
 *
 * @description prefetch
 * @augments
 * @example
 * @link
 *
 */

// const log = console.log;

if(log) {
  log(`prefetch.js`);
} else {
  console.log(`prefetch.js`);
}

(() => {
  const prefetch = document.querySelector(`[data-uid="prefetch"]`);
  if(prefetch) {
    prefetch.innerText = `prefetch.js 预获取`;
  }
  if(log) {
    log(`prefetch.js OK`);
  } else {
    console.log(`prefetch.js OK`);
  }
})();

