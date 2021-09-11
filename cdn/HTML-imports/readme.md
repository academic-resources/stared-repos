# HTML imports

> once bug ???


```js
    
// 

"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright gildata
 *
 * @description Template Loader
 * @augments
 * @example
 *
 */

const HTMLGenerator = (module_uid = ``, debug = false) => {
    // let result = ``;
    let templatesBox = document.querySelector(`[data-template="template-container"`),
        link = document.querySelector(`link[data-rel="${module_uid}"]`),
        template = link.import,
        // #document
        div = template.querySelector(`[data-div="templates-${module_uid}"]`);
    templatesBox.appendChild(div);
    let js = document.querySelector(`[data-template="template-script-${module_uid}"]`),
        css = document.querySelector(`[data-template="template-style-${module_uid}"]`);
    js.src = js.dataset.src;
    css.href = css.dataset.href;
    // return result;
};

// html imports & only can read once bug ???

// templatesBox = document.querySelector(`[data-template="template-container"`);
// link = document.querySelector(`link[data-rel="latest-news"]`);
// template = link.import;
// div = template.querySelector(`[data-div="templates-latest-news"]`);

// container = document.querySelector(`[data-html="html-container"]`);
// template = document.querySelector(`[data-template="template-latest-news"]`);
// clone = template.content.cloneNode(true);

// container.appendChild(clone);

const supportImport = ("import" in document.createElement("link"));

export default HTMLGenerator;
export {
    HTMLGenerator,
    supportImport
};





```


