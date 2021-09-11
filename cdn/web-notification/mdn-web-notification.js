"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2019-08-17
 *
 * @description MDN web Notification demo
 * @augments
 * @example
 * @link https://mdn.github.io/to-do-notifications/scripts/todo.js
 *
 */

let log = console.log;

// function for creating the notification
function createNotification(title) {
    // Let's check if the browser supports notifications
    if (!"Notification" in window) {
        console.log("This browser does not support notifications.");
    } else if (Notification.permission === "granted") {
        // Let's check if the user is okay to get some notification
        // If it's okay let's create a notification
        var img = '/to-do-notifications/img/icon-128.png';
        var text = 'HEY! Your task "' + title + '" is now overdue.';
        var notification = new Notification('To do list', {
            body: text,
            icon: img,
        });
        window.navigator.vibrate(500);
    } else if (Notification.permission !== 'denied') {
        // Otherwise, we need to ask the user for permission
        // Note, Chrome does not implement the permission static property
        // So we have to check for NOT 'denied' instead of 'default'
        Notification.requestPermission(function (permission) {
            // Whatever the user answers, we make sure Chrome stores the information
            if(!('permission' in Notification)) {
                Notification.permission = permission;
            }
            // If the user is okay, let's create a notification
            if (permission === "granted") {
                var img = '/to-do-notifications/img/icon-128.png';
                var text = 'HEY! Your task "' + title + '" is now overdue.';
                var notification = new Notification('To do list', {
                    body: text,
                    icon: img,
                });
                window.navigator.vibrate(500);
            }
        });
    }
}

// At last, if the user already denied any notification, and you
// want to be respectful there is no need to bother him any more.

// now we need to update the value of notified to "yes" in this particular data object,
// so the notification won't be set off on it again.
