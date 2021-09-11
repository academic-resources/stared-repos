"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 *
 * @description iframe for eapp tesing
 * @augments
 * @example
 *
 */

const iframeForEapp = (debug = false) => {
    let iframe = document.querySelector(`[data-dom="iframe"]`);
    let hash_url = window.parent.location.hash.slice(1);
    if (iframe && hash_url) {
        iframe.src = `http://${hash_url}`;
    } else {
        if (debug) {
            console.log(`hash_url =`, hash_url);
        }
    }
};

let iframe = document.querySelector(`[data-dom="iframe"]`);
if (iframe) {
    let hash_url = window.parent.location.hash.slice(1);
    // iframe.src = `https://${hash_url}`;
    // iframe.src = `http://${hash_url}`;
    iframe.src = hash_url;
}
