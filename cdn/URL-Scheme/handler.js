
"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2020-10-01
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

const app = document.querySelector(`#msg`);
try {
  const url = location.href;
  const search = location.search;
  // const msg = decodeURIComponent(search).replace(`?uri=web+xgqfrms:`, ``);
  const msg = decodeURIComponent(search).slice(decodeURIComponent(search).indexOf(`:`) + 1);
  log(`handler OK ✅`, msg)
  app.insertAdjacentHTML(`beforeend`, msg);
} catch (error) {
  log(`hanlder error ❌`, error)
  app.insertAdjacentHTML(`beforeend`, `❌❓👻⚠️🤣💩🐞`);
}

/*

https://cdn.xgqfrms.xyz/?uri=web%2Bxgqfrms%3Aopen-web-app

href: "https://cdn.xgqfrms.xyz/?uri=web%2Bxgqfrms%3Aopen-web-app"

search: "?uri=web%2Bxgqfrms%3Aopen-web-app"

decodeURIComponent(search);
"?uri=web+xgqfrms:open-web-app"

decodeURI(search);
"?uri=web%2Bxgqfrms%3Aopen-web-app"


*/
