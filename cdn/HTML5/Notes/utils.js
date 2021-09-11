
"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2018.12.29
 * @modified 2018.12.29
 *
 * @description
 * @augments
 * @example
 *
 */

const d = new Date();
let yyyy = d.getFullYear(),
    mm = d.getMonth() + 1,
    dd = d.getDate(),
    ts = d.getTime();
// today & new Date().toLocaleDateString(); // "12/28/2018"
const TODAY = `${yyyy}-${mm > 9 ? mm : `0${mm}`}-${dd > 9 ? dd : `0${dd}`}`;

// const TODAY_with_HMS = `${TODAY} 00:00:00`;
const TODAY_Begin = `${TODAY} 00:00:00`;
const TODAY_End = `${TODAY} 23:59:59`;

const TODAY_TimeStamp = `${ts}`;

const urlQueryStringToObject = (query = ``) => {
    let result = {};
    result = window.location.search.slice(1).split(`&`)
    .map(
        (item, i) => {
            let arr = item.split(`=`);
            let obj = {};
            obj[arr[0]] = arr[1];
            return obj;
        }
    );
    return result;
};

const UQSTO = urlQueryStringToObject;


const getPosition = (e) => {
    var x = 0;
    var y = 0;
    if (!e) {
        let e = window.event;
    }
    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    } else if (e.clientX || e.clientY) {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return {
        x: x,
        y: y
    }
};

const positionMenu = (e, menu) => {
    let clickCoords = getPosition(e);
    // point coords
    let clickCoordsX = clickCoords.x;
    let clickCoordsY = clickCoords.y;
    // menus wh
    let menuWidth = menu.offsetWidth + 12;
    let menuHeight = menu.offsetHeight + 12;
    // let menuWidth = menu.offsetWidth + 4;
    // let menuHeight = menu.offsetHeight + 4;
    // window wh
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    // ???
    if ((windowWidth - clickCoordsX) < menuWidth ) {
        menu.style.left = windowWidth - menuWidth + "px";
    } else {
        menu.style.left = clickCoordsX + "px";
    }
    //
    if ( (windowHeight - clickCoordsY) < menuHeight ) {
        menu.style.top = windowHeight - menuHeight + "px";
    } else {
        menu.style.top = clickCoordsY + "px";
    }
};

const globalBindKeyboardShortcuts = () => {
    let body = document.querySelector(`body`);
    let bindFlag = body.dataset.bindFlag;
    let isCtrlPressed = false;
    let isAltPressed = false;
    if (bindFlag === "true") {
        console.log(`review, body no need binding again!`);
    } else {
        console.log(`review, body only need binding once!`);
        body.dataset.bindFlag = "true";
        // bind once
        body.addEventListener("keyup", function(e) {
            let key = e.which || e.keyCode;
            if(e.which === 17) {
                isCtrlPressed = false;
            }
            if(e.which === 18) {
                isAltPressed = false;
            }
        }, false);
        body.addEventListener("keydown", function(e) {
            let key = e.which || e.keyCode;
            if(e.which === 17) {
                isCtrlPressed = true;
            }
            if(e.which === 18) {
                isAltPressed = true;
            }
            let isCtrl = isCtrlPressed;
            let isAlt = isAltPressed;
            let KSN_Obj = JSON.parse(window.sessionStorage.getItem(`keyboard_shortcuts_names_obj`));
            let {
                prev_name,
                next_name
            } = KSN_Obj;
            let prev_btn = document.querySelector(`[data-btn="${prev_name}"]`);
            let next_btn = document.querySelector(`[data-btn="${next_name}"]`);
            // let save_btn = document.querySelector(`[data-btn="${save_name}"]`);
            // let passed_btn = document.querySelector(`[data-btn="${passed_name}"]`);
            if(e.which === 83 && isCtrl && isAlt) {
                // if (save_btn) {
                //     save_btn.click();
                // }
            }
            if(e.which === 68 && isCtrl && isAlt) {
                if (prev_btn) {
                    prev_btn.click();
                }
            }
            if(e.which === 70 && isCtrl && isAlt) {
                if (next_btn) {
                    next_btn.click();
                }
            }
            if(e.which === 88 && isCtrl && isAlt) {
                // if (passed_btn) {
                //     passed_btn.click();
                // }
            }
        }, false);
    }
};

// const replaceAll = (str = ``, key = `` , replacer = ``) => {
//     // regex variable bug
//     return str.replace(/key/ig , replacer);
// };

const replaceAll = (str = ``, key = `` , replacer = ``) => {
    // regex variable bug
    let reg = new RegExp(key , `ig`);
    return str.replace(reg , replacer);
};


const fetchDelete = (url= ``, id="") => {
    let trueUrl = `${url}/${item}`;
    return fetch(trueUrl, {
        method: 'delete'
    })
    .then(res => res.json());
};


const Utils = {
    fetchDelete,
    TODAY,
    TODAY_Begin,
    TODAY_End,
    TODAY_TimeStamp,
    UQSTO,
    getPosition,
    positionMenu,
    globalBindKeyboardShortcuts,
};

export default Utils;

export {
    fetchDelete,
    TODAY,
    TODAY_Begin,
    TODAY_End,
    TODAY_TimeStamp,
    UQSTO,
    getPosition,
    positionMenu,
    globalBindKeyboardShortcuts,
};

