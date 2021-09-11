// redirection.js
window.onload = (() => {
    const arr = ["www", "es6", "ajax", "app", "blogs", "ng2-app", "cdn", "abc"];
    const redirection = () => {
        let http = `http`,
            https = `https`,
            regex = /^https:\/\/[a-zA-Z]{3,}\.xgqfrms\.xyz$/gi,
            // result = regex.test(window.location);
            result = regex.test(window.location.origin);
        if (!result) {
            // window.location = https;
            window.location.protocol = https;
        } else {
            console.log(`window.location.protocol = \n`, window.location.protocol);
        }
    };
    redirection();
})();
// https://regexper.com/#%2F%5Ehttps%3A%5C%2F%5C%2F%5Ba-zA-Z%5D%7B3%2C%7D%5C.xgqfrms%5C.xyz%24%2Fgi

/*
    if (result) {
        console.log(`window.location=https`);
    } else {
        console.log(`window.location=http`);
    }
*/
/*
    null == false;
    null === false;
    null == null;
    null === null;
*/
