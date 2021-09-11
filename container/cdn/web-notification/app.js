"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2019-08-17
 *
 * @description
 * @augments
 * @example
 * @link
 *
 */

let log = console.log;

const webNotificationApp = (debug = false) => {
    try {
        if ("Notification" in window) {
            // let ask = window.Notification.requestPermission();
            let ask = Notification.requestPermission();
            ask.then(
                // Permission
                (permission) => {
                    log(`permission =`, permission);
                    if (permission === "granted") {
                        log(`permission granted`);
                        let msg = new Notification("App Upgrade Info", {
                            body: "a new version app is available, click download: https://app.xgqfrms.xyz/download",
                            icon: "https://cdn.xgqfrms.xyz/logo/icon.png",
                        });
                        msg.addEventListener(`click`, (e) => {
                            let btn = e.target.dataset(`btn-type`);
                            if (btn === "ok") {
                                log(`OK`);
                            } else {
                                log(`Cancel`);
                            }
                            alert(`clicked notification`);
                        });
                    }else {
                        log(`notification permission is denied!`);
                    }
                }
            )
        } else {
            console.warn(`your browser is too old, which not support web notification!`);
        }
    } catch (err) {
        console.error(`error =`, err);
    }
};

document.addEventListener(`DOMContentLoaded`, () => {
    log(`DOMContentLoaded`);
    webNotificationApp();
});

// export default webNotificationApp;

// export {
//     webNotificationApp,
// };
