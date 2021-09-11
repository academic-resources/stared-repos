'use strict';

/**
 * https://cdn.xgqfrms.xyz/es6-modules/crossorigin.js
 * xgqfrms
 * 2017.06.02
 */

// check & add crossorigin="anonymous"

const X_COA = () => {
    // get all scripts 
    let scripts = document.getElementsByTagName('script');
    // console.log() css style
    const this_style = `
        color: #f00;
        background: #000;
        font-size: 12px;
    `;
    const log_style_before = `
        color: #f0f;
        background: #000;
        font-size: 18px;
    `;
    const log_style_after = `
        color: #0f0;
        background: #000;
        font-size: 32px;
    `;
    console.log(`%c this`, `${this_style}`, this);
    // filter
    for (let i = 0; i < scripts.length; i++) {
        // !null == true & null != false
        if (!scripts[i].getAttribute("data-rocketsrc")){
            console.log(`%c scripts[i] before:`, `${log_style_before}`, scripts[i]);
            scripts[i].setAttribute("crossorigin","anonymous");
            console.log(`%c scripts[i] after:`, `${log_style_after}`, scripts[i]);
        }
    }
};


document.addEventListener("DOMContentLoaded",(event) => {
    console.log(`%c DOM fully loaded and parsed`, `${this_style}`, this);
    setTimeout(X_COA, 1000);
});


export default X_COA;







