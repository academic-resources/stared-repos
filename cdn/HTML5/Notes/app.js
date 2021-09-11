"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 *
 * @description H5Notes
 * @augments
 * @example
 * @link
 *
 */

let isEmptySearch = false;
let selectedText = ``;


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
    if ((windowWidth - clickCoordsX) < menuWidth ) {
        menu.style.left = windowWidth - menuWidth + "px";
    } else {
        menu.style.left = clickCoordsX + "px";
    }
    if ( (windowHeight - clickCoordsY) < menuHeight ) {
        menu.style.top = windowHeight - menuHeight + "px";
    } else {
        menu.style.top = clickCoordsY + "px";
    }
};

const getSelectionText = () => {
    let selectedTextWithTrim = ``;
    if (window.getSelection){
        // all modern browsers and IE9+
        selectedTextWithTrim = window.getSelection().toString().trim();
        console.log(`you selected text with trim() =`, selectedTextWithTrim);
    } else {
        console.error(`鼠标滑词 selectedText is empty!`);
    }
    return selectedTextWithTrim;
};

const autoMark = () => {
    let box = document.querySelector(`[data-box="main-conatiner"]`);
    if (selectedText) {
        // do mark
        let boxText = box.innerText;
        let boxHTML = box.innerHTML;
        console.log(`boxText =`, boxText);
        console.log(`boxHTML =`, boxHTML);
        let regex = new RegExp(selectedText, "ig");
        box.innerHTML = boxHTML.replace(regex, `<span class="highlight-marked">${selectedText}</span>`)
    }
};

const menusHandler = () => {
    let btns = [...document.querySelectorAll(`[data-uid^="btn-"]`)];
    btns.forEach(
        (btn, i) => {
            // bind once
            let isBinded = btn.dataset.bind || false;
            if (!isBinded) {
                btn.dataset.bind = true;
                btn.addEventListener(`click`, () => {
                    switch (i) {
                        case 0:
                            console.log(`click 标注!`);
                            autoMark();
                            break;
                        case 1:
                            console.log(`click 笔记!`);
                            break;
                        case 2:
                            console.log(`click 分享!`);
                            break;
                        default:
                            break;
                    }
                });
            } else {
                console.log(`only need bind once!`);
            }
        }
    );
};

const clickAutoClose = () => {
    let menus = document.querySelector(`[data-uid="menus"]`);
    menus.style.display = "none";
};

// 鼠标滑词
const mouseSlipGetWords = () => {
    let textBox = document.querySelector(`[data-box="main-conatiner"]`);
    // let that = this;
    textBox.addEventListener("mousedown", function(e) {
        if (e.button === 0) {
            // console.log("Left mouse button pressed!");
            clickAutoClose();
        } else if (e.button === 1) {
            // console.log("Middle mouse button pressed!");
            clickAutoClose();
        } else if (e.button === 2) {
            // console.log("Right mouse button pressed!");
            // show menu
        }
    }, false);
    if (document.addEventListener) {
        // IE >= 9; other browsers
        textBox.addEventListener("contextmenu", function(e) {
            let value = getSelectionText() || "";
            if (value) {
                isEmptySearch = false;
            } else {
                isEmptySearch = true;
            }
            let menus = document.querySelector(`[data-uid="menus"]`);
            positionMenu(e, menus);
            if (value) {
                // alert(`滑动选取的单词: ${value}`);
                menus.style.display = "block";
                menusHandler();
                selectedText = value.trim();
            } else {
                // console.log(`selected text is empty!`);
                alert(`滑动选取的单词不可为空`);
                clickAutoClose();
            }
            e.preventDefault();
        }, false);
    } else {
        // IE < 9
        document.attachEvent("oncontextmenu", function() {
            // alert("You are tried to open context menu");
            window.event.returnValue = false;
        });
    }
};


window.addEventListener(`DOMContentLoaded`, (e) => {
    console.log("DOM fully loaded and parsed", e);
    mouseSlipGetWords();
    // this.mouseSlipGetWords();
});


// const H5Notes = (datas = [], debug = false) => {
//     let result = ``;
//     // do something...
//     return result;
// };

// export default H5Notes;

// export {
//     H5Notes,
// };

