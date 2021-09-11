# js-hacks

> js & disabled right click & disabled right menu

https://www.cnblogs.com/xgqfrms/p/12275284.html

```js

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  document.body.oncontextmenu = 
  document.body.ondragstart = 
  document.body.onselectstart = 
  document.body.onbeforecopy = function() {
    return false;
  };

  document.body.onselect = 
  document.body.oncopy = 
  document.body.onmouseup = function() {
    document.selection.empty();
  };
});

```
