"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 *
 * @description HTMLImportsTest
 * @augments
 * @example
 *
 */

// no need jQuery
let $$ = {
    qs: function qs(uid) {
        return document.querySelector(uid);
    },
    qsa: function qsa(uid) {
        return document.querySelectorAll(uid);
    },
};

window.$ = $$;

// if (window.$) {
//     window.$ = Object.assign($, $$);
// } else {
//     window.$ = Object.assign({}, $$);
// }

function loadTemplate ()  {
    let templatesBox = document.querySelector('[data-template="template-container"'),
        link = document.querySelector('link[data-rel="containers"]'),
        // #document
        template = link ? link.import : null,
        div = template ? template.querySelector('[data-div="templates-containers"]') : null;
    if (div) {
        // read template once
        templatesBox.appendChild(div);
    } else {
        // exsit template
    }
};

function showDOM () {
    let container = $.qs('[data-test="html-template"]'),
        temp = $.qs('[data-template="template-containers-full-width"]'),
        clone = temp ? temp.content.cloneNode(true) : null;
    if (clone) {
        container.appendChild(clone);
    }
};

let uid = document.querySelector('[data-uid="result"]');

if (Modernizr.htmlimports) {
    // supported
    uid.innerHTML = '<span class="htmlimports">supported<span>';
} else {
    // not-supported
    uid.innerHTML = '<span class="no-htmlimports">not-supported<span>';
}


// DOM fully loaded and parsed!
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        if (Modernizr.htmlimports) {
            // preload && delay
            loadTemplate();
            // init
            showDOM();
        } else {
            // not-supported
           alert("template is not supported!");
        }
    }, 100);
});
