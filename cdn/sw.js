// navigator.serviceWorker
// https://gist.github.com/xgqfrms-GitHub/03ddb6154c5d68cd39315dc8260884d1

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('https://cdn.xgqfrms.xyz/sw.js').then(function(reg) {
        console.log('Yey!', reg);
    }).catch(function(err) {
        console.log('Boo!', err);
    });
}
