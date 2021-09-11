# iPhone 12 Pro Green Screen Checker

https://cdn.xgqfrms.xyz/apple/screen-checker/index.html


1. fullpage

2. dark

```js
  const log = console.log;
  const screen = document.querySelector(`body`)
  screen.addEventListener("click", function(e) {
    toggleFullScreen();
  }, false);
  document.addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
      toggleFullScreen();
    }
  }, false);
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }


```
