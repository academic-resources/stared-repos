# sweetalert

https://cdn.xgqfrms.xyz/sweetalert/sweetalert.min.js

> `<script src="./libs/sweetalert.min.js"></script>`

```js

    swal({
        title: "模块只能托放到容器中!",
        text: `
            请先拖放容器，再拖放模块!\n
            1 秒后自动关闭.
        `,
        icon: "warning",
        className: "warning-alert-style",
        timer: 2000,
        button: {
            text: "关闭",
            value: true,
            visible: true,
            closeModal: true
        }
    });

```
