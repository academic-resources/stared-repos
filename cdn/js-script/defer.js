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

// IIFE
(() => {
    const log = console.log;
    log(`this is defer.js`);
    const app = document.getElementById("app");
    if (app) {
        app.insertAdjacentHTML(`beforeend`, `<p>defer.js loaded!</p>`);
    }
})();
