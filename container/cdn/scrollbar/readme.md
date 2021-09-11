# iscroll

https://github.com/cubiq/iscroll


```sh
# browser-sync start --server --files './demos/*.*' && start http://localhost:3000/demos/index.html
$ npm run open

```

http://localhost:3000/demos/index.html
http://localhost:3000/demos/simple/index.html


## HTML

```html
<div id="wrapper">
    <ul>
        <li>...</li>
        <li>...</li>
        ...
    </ul>
</div>
```

```html
<script type="text/javascript">
    var myScroll = new IScroll('#wrapper');
</script>
```


```js
var wrapper = document.getElementById('wrapper');
var myScroll = new IScroll(wrapper);

// OR

var myScroll = new IScroll('.wrapper');
```


```html
<head>
    <!-- libs -->
    <script type="text/javascript" src="iscroll.js"></script>
    <!-- js -->
    <script type="text/javascript">
        var myScroll;
        function loaded() {
            myScroll = new IScroll('#wrapper');
        }
    </script>
</head>

<body onload="loaded()">
<div id="wrapper">
    <ul>
        <li>...</li>
        <li>...</li>
        ...
    </ul>
</div>
</body>
```
## Configures

```js
var myScroll = new IScroll('#wrapper', {
    mouseWheel: true,
    scrollbars: true
});
```

```js
console.dir(myScroll.options);
```


```js
var myScroll = new IScroll('#wrapper', {
    disableMouse: true,
    disablePointer: true
});
```


```js
element.addEventListener('tap', doSomething, false);
// Native

$('#element').on('tap', doSomething);
// jQuery
```



```js
tap: 'myCustomTapEvent'
```


```js
var myScroll = new IScroll('#wrapper', {
    scrollbars: true
});
```


```js
var myScroll = new IScroll('#wrapper', {
    scrollbars: 'custom'
});
```


```js
var myScroll = new IScroll('#wrapper', {
    indicators: {
        el: [element|element selector]
        fade: false,
        ignoreBoundaries: false,
        interactive: false,
        listenX: true,
        listenY: true,
        resize: true,
        shrink: false,
        speedRatioX: 0,
        speedRatioY: 0,
    }
});
```


```js
indicators: {
    el: document.getElementById('indicator')
}

// OR

indicators: {
    el: '#indicator'
}
```


```js
myScroll.scrollTo(0, -100);
```


```js
myScroll.scrollTo(0, -100, 1000, IScroll.utils.ease.elastic);
```

> `quadratic`, `circular`, `back`, `bounce`, `elastic`.



```js
myScroll.scrollBy(0, -10);
```


```js
var myScroll = new IScroll('#wrapper', {
    snap: true
});
```

```js
var myScroll = new IScroll('#wrapper', {
    snap: 'li'
});
```

```js
myScroll.goToPage(10, 0, 1000);
```



```js
myScroll = new IScroll('#wrapper', {
    zoom: true,
    mouseWheel: true,
    wheelAction: 'zoom'
});
```


```js
bounceEasing: {
    style: 'cubic-bezier(0,0,1,1)',
    fn: function (k) { return k; }
}
```

```js
preventDefaultException: { className: /(^|\s)formfield(\s|$)/ }
```


```js
ajax('page.php', onCompletion);

function onCompletion () {
    // Update here your DOM

    setTimeout(function () {
        myScroll.refresh();
    }, 0);
};
```


```js
myScroll = new IScroll('#wrapper');
myScroll.on('scrollEnd', doSomething);
```

```js
keyBindings: {
    pageUp: 33,
    pageDown: 34,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40
}
```


```js
myScroll = new IScroll('#wrapper');
myScroll.on('scrollEnd', function () {
    if ( this.x < -1000 ) {
        // do something
    }
});
```

```js
myScroll.destroy();
myScroll = null;
```
