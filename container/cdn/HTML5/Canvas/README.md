# Canvas

https://cdn.xgqfrms.xyz/HTML5/Canvas/safety-canvas.html


https://github.com/xgqfrms/HTML5/blob/gh-pages/Canvas/safety-canvas.html


https://html5.xgqfrms.xyz/Canvas/safety-canvas.html



## Progressive Web App: PhotoBooth

https://learning.xgqfrms.xyz/000projects/pwa-photo/index.html

file:///Users/xgqfrms-mbp/Documents/GitHub/2019-AFES/pwa-demo/index.html



```js


navigator.getMedia = (
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia
);

// video捕获摄像头画面
navigator.getMedia({
  video: true,
}, async function (stream) {
    const mediaStream = await navigator.mediaDevices.getUserMedia({video: true});
    video.srcObject = mediaStream;
    video.play();
    video.onplay = function () {
      // showVideo();
    };
}, error);

```
