# History API All In One


## rewrite function

https://cdn.xgqfrms.xyz/HTML5/history-api/url-change-event.html

```js
    (function(history){
      var pushState = history.pushState;
      history.pushState = function(state) {
        // YOUR CUSTOM HOOK / FUNCTION
        log('called from pushStateHook', state, arguments);
        // func();
        return pushState.apply(history, arguments);
      };
    })(window.history);
```


## old

https://cdn.xgqfrms.xyz/HTML5/history-api/pushstate-event.html


```js
    function rewriteHistory(type) {
        const origin = window.history[type];
        return function () {
            console.log(`arguments =`, arguments);
            console.log(`type =`, type, type.toLocaleLowerCase());
            const rs = origin.apply(this, arguments);
            // custom event
            const e = new Event(type.toLocaleLowerCase());
            e.arguments = arguments;
            // 手动触发事件 
            window.dispatchEvent(e);
            return rs;
        };
    }

```

## new

https://cdn.xgqfrms.xyz/HTML5/history-api/rewirte-pushstate-event.html

```js
    _rewriteHistory (type) {
        const origin = window.history[type];
        return function () {
            const rs = origin.apply(this, arguments);
            // ✅ 1. 添加自定义事件
            const e = new Event(type.toLocaleLowerCase());
            e.arguments = arguments;
            // ✅ 2. 自动触发自定义事件
            window.dispatchEvent(e);
            return rs;
        };
    }

```

```js
    changeRouter (cb) {
        // rewrite function 🚀, why❓
        window.history.pushState = this._rewriteHistory('pushState');
        window.history.replaceState = this._rewriteHistory('replaceState');
        window.addEventListener('popstate', () => {
            this._emit(cb, '浏览器的前进后退 popstate');
        });
        // ✅ 3. 监听自定义事件(原本不存在 pushstate event )
        window.addEventListener('pushstate', () => {
            this._emit(cb, '单页路由变化 pushstate');
        });
        window.addEventListener('replacestate', () => {
            this._emit(cb, '单页路由替换 replacestate');
        });
    }
```


## refs

https://www.cnblogs.com/xgqfrms/p/14434635.html





