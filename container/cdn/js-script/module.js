"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2020-10-0
 * @modified
 *
 * @description
 * @difficulty Easy Medium Hard
 * @complexity O(n)
 * @augments
 * @example
 * @link
 * @solutions
 *
 * @best_solutions
 *
 */

const log = console.log;

// IIFE
(() => {
  const log = console.log;
  log(`this is module.js`);
  const app = document.getElementById("app");
  if(app) {
    app.insertAdjacentHTML(`beforeend`, `<p>module.js loaded!</p>`);
  }
})();


const sum = (a, b) => {
  // const log = console.log;
  const result = a + b;
  log(`result =`, result);
  return result;
}

export {
  sum,
};

export default sum;

