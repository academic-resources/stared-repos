# auto-dwonload-images

> image auto downloader


https://cdn.xgqfrms.xyz/HTML5/auto-dwonload-images/index.html


## html5 download all in one

https://www.cnblogs.com/xgqfrms/p/10082870.html

```js
"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2020-10-01
 * @modified
 *
 * @description image auto downloader
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

let divs = [...document.querySelectorAll(`.learn-path-item`)];

for (let i = 0; i < divs.length; i++) {
  const div = divs[i];
  const img = div.firstElementChild;
  // log(`img src =`, img.src);
  // window.open(img.src);
  autoDownloader(img.src, 1000);
}

const autoDownloader = (url = ``, timer = 0) => {
  const body = document.querySelector(`body`);
  const a = document.createElement(`a`);
  // ❌👎 only read property
  // a.src = url;
  // 👍✅
  a.setAttribute(`href`, url);
  // a.setAttribute(`src`, url);
  // VM17:9 Uncaught TypeError: Failed to execute 'setAttribute' on 'Element': 2 arguments required, but only 1 present.
  // a.setAttribute(`download`);
  a.setAttribute(`download`, true);
  // a.setAttribute(`download`, ``);
  // a.setAttribute(`style`, `display:none;`);
  // a.setAttribute(`style`, `visibility: hidden;`);
  body.insertAdjacentElement(`beforeend`, a);
  // body.insertAdjacentHTML(``);
  // a.addEventListener(`click`, (e) => {
  //   e.preventDefault();
  // });
  a.click();
  // a.click();
  setTimeout(() => {
    // DOM remove
    body.removeChild(a);
    // a.remove();
    // delete a;
  }, timer);
}

// Downloader(`https://dn-simplecloud.shiyanlou.com/1487741005890.png`, 1000)

/*

const divs = [...document.querySelectorAll(`a`)];

for (let i = 0; i < divs.length; i++) {
  const div = divs[i];
  autoDownloader(div.href, 1000);
}

*/


```

https://github.com/xgqfrms/HTML5/issues/11
