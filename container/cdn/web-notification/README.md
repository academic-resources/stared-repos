# web Notification 

> HTTPS (Chrome default mode)

# localhost debug

> HTTP

chrome://settings/content/notifications

https://pushassist.com/knowledgebase/how-to-enable-web-push-notifications-in-google-chrome-non-ssl-site/

1. open `chrome://flags/`, then search `notification`

2. enable notification

[![enter image description here][1]][1]

> demo codes

```js

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

```

https://i.stack.imgur.com/d84rw.png


https://www.cnblogs.com/xgqfrms/p/11169370.html

https://cdn.xgqfrms.xyz/web-notification/index.html
