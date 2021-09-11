"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2020-08-0
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
 */


// new version, 2021.07.13
setTimeout(() => {
    (() => {
        const flagBox = document.querySelector(`[data-uid="seo-flag"]`);
        const domStr = `
            <a href="https://s11.flagcounter.com/count2/QIXi" data-flagcounter="a">
            <img data-flagcounter="img" src="https://s11.flagcounter.com/count2/QIXi/bg_000000/txt_00FF00/border_FF00FF/columns_3/maxflags_12/viewers_0/labels_1/pageviews_1/flags_0/percent_1/" alt="cnblogs" border="0" />
            </a>
        `;
        flagBox.insertAdjacentHTML(`beforeend`, domStr);
        const log = console.log;
        log(` 🎉 flagcounter.com finished!`);
    })();
}, 1000);
    
    
// const log = console.log;

// window.SEO_FALG_FINISHED = window.SEO_FALG_FINISHED || false;
/*
window.SEO_FALG_FINISHED = false;

const SEO_FALG = () => {
  const log = console.log;
  // let finished = false;
  let counter = 1;
  function auto() {
    const img = document.querySelector(`[data-flagcounter="img"]`);
    const a = document.querySelector(`[data-flagcounter="a"]`);
    if(a && img && !window.SEO_FALG_FINISHED) {
      log(`❓flagcounter.com trying ${counter} times`);
      a.href = `https://info.flagcounter.com/QIXi`;
      img.src = `https://s11.flagcounter.com/count2/QIXi/bg_000000/txt_00FF00/border_FF00FF/columns_3/maxflags_12/viewers_0/labels_1/pageviews_1/flags_0/percent_1/`;
      window.SEO_FALG_FINISHED = true;
    } else {
      log(` 🎉 flagcounter.com finished!`);
    }
    counter += 1;
  }
  let timer = setInterval(() => {
    if(!window.SEO_FALG_FINISHED) {
      auto();
    } else {
      log(` ✅ clearInterval, after ${counter} times`);
      clearInterval(timer);
    }
  }, 1000);
}

// IIFE
(() => SEO_FALG())();

*/
