var fscope = require('frequency-viewer');

module.exports = function () {
    addEventListener('message', function (ev) {
        postMessage(fscope.worker(ev.data));
    });
};
