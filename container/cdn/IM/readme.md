# 调研(环信 Web IM SDK )

http://docs-im.easemob.com/im/web/intro/basic

http://webim-h5.easemob.com/jsdoc/out/connection.html


## Web IM 集成方式

1. npm / CDN 集成 / 本地集成

```html
<body>
    <section>
        <h1>IM</h1>
    </section>
    <section id="demo">
        <!-- IM -->
    </section>
    <!-- libs -->
    <script src="./libs/strophe-1.2.8.js"></script>
    <script src="./libs/websdk-1.11.0.js"></script>
    <!-- js -->
    <script src="./config.js"></script>
    <script src="./app.js"></script>
</body>
```

2. 初始化及登录

```js
var conn = {};
WebIM.config = config;
conn = WebIM.conn = new WebIM.connection({
    isHttpDNS: WebIM.config.isHttpDNS,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: WebIM.config.https,
    url: WebIM.config.xmppURL,
    isAutoLogin: false,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    isStropheLog: WebIM.config.isStropheLog,
    delivery: WebIM.config.delivery
})
// WebIM.config 为之前集成里介绍的WebIMConfig.js

```
3. callback

```js
// 2.初始化连接-回调
conn.listen({
    onOpened: function (msg) {
        // 连接成功回调
        log(`连接成功: `, msg);
        // 如果isAutoLogin设置为false，那么必须调用 conn.setPresence(); 设置手动上线, 否则无法收消息,
        // 如果conn初始化时已将isAutoLogin设置为true
        // 则无需调用conn.setPresence();
        alert("登录成功!");
        // conn.setPresence();
    },  
    onError: function (msg) {
        // 失败回调
        log(`连接失败: `, msg);
    },
    onClosed: function (msg) {
        // 连接关闭回调
        log(`连接关闭: `, msg);
    },
    onOnline: function () {
        // 本机网络连接成功
        log(`连接网络: `, msg);
    },
    onOffline: function () {
        // 本机网络掉线
        log(`网络掉线: `, msg);
    },
    onTextMessage: function (msg) {
        // 收到文本消息
    },
    onEmojiMessage: function (msg) {
        // 收到表情消息
    },
    onPictureMessage: function (msg) {
        // 收到图片消息
    },
    onCmdMessage: function (msg) {
        // 收到命令消息
    },
    onAudioMessage: function (msg) {
        // 收到音频消息
    },
    onLocationMessage: function (msg) {
        // 收到位置消息
    },
    onFileMessage: function (msg) {
        // 收到文件消息
    },
    onVideoMessage: function (msg) {
        // 收到视频消息
        var node = document.getElementById("privateVideo");
        var option = {
            url: msg.url,
            headers: {
              "Accept": "audio/mp4"
            },
            onFileDownloadComplete: function (response) {
                var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                node.src = objectURL;
            },
            onFileDownloadError: function () {
                console.log("File down load error.")
            }
        };
        WebIM.utils.download.call(conn, option);
    },
    onPresence: function (msg) {
        // 处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
    },
    onRoster: function (msg) {
        // 处理好友申请
    },
    onInviteMessage: function (msg) {
        // 处理群组邀请
    },
    onBlacklistUpdate: function (list) {
        // 黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        log(list);
    },
    onReceivedMessage: function(msg){
        // 收到消息送达服务器回执
    },
    onDeliveredMessage: function(msg){
        // 收到消息送达客户端回执
    },
    onReadMessage: function(msg){
        // 收到消息已读回执
    },
    onCreateGroup: function(msg){
        // 创建群组成功回执（需调用createGroupNew）
    },
    onMutedMessage: function(msg){
        // 如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
    },
});

```

4. 注册

根据用户名/密码/昵称注册环信 Web IM :

```js
var options = { 
    username: 'username',
    password: 'password',
    nickname: 'nickname',
    appKey: WebIM.config.appkey,
    success: function () { },  
    error: function () { }, 
    apiUrl: WebIM.config.apiURL
}; 
conn.registerUser(options);

```
5. 登录

用户名/密码登录
使用用户名/密码登录环信 Web IM :

```js

var options = { 
  apiUrl: WebIM.config.apiURL,
  user: 'username',
  pwd: 'password',
  appKey: WebIM.config.appkey
};
conn.open(options);

```

6. 使用 Token 登录

> 使用用户名/密码登录，获取并存储 Token 。本例演示将 Token 存入 cookie 。

```js
var options = {
    apiUrl: WebIM.config.apiURL,
    user: 'username',
    pwd: 'password',
    appKey: WebIM.config.appkey,
    success: function (token) {
        var token = token.access_token;
        WebIM.utils.setCookie('webim_' + encryptUsername, token, 1);
    },
    error: function(){
    }
};
conn.open(options);

```

7. 使用 Token 登录环信 Web IM。

```js
var options = {
    apiUrl: WebIM.config.apiURL,
    user: 'username',
    accessToken: 'token',
    appKey: WebIM.config.appkey
};
conn.open(options);

```

8. 退出

```js
conn.close();

```

## 常见问题

```md
Q: 是否支持 token 登录，是否支持 HTTPS？
A: 支持。

Q: 是否支持重连？
A: 暂不支持，可以使用 token 来实现重连。

Q: 为什么登录后收不到消息？
A: 登录之后需要设置在线状态，才能收到消息。请检查登录成功后是否调用过 conn.setPresence();。

Q: 调试时经常报连接中断。
A: 如果使用 alter 方式调试长时间没有进行操作时，连接超时后服务器会自动断开连接。同样断点等待时间过长时服务器也会断开连接。

Q: ws有上行没有下行？ 
A: 可能是浏览器缓存了错误的ws返回结果，解决办法是加个时间戳参数，强制浏览器不走缓存。
在websdk里面搜
`this.url = _getXmppUrl(options.url, this.https);`
改成
`this.url = _getXmppUrl(options.url, this.https)+'?'+new Date().getTime();`

```

## WebIM 消息的使用方法

构造消息
发送消息
接受消息
处理消息
历史消息
新消息提醒
消息回执

http://docs-im.easemob.com/im/web/basics/message

1. 构造消息

```js

```

2. 发送消息

```js

```

3. 接受消息

```js

```

4. 处理消息

```js

```

5. 历史消息

```js
    

```

6. 新消息提醒

```js

```

7. 消息回执

```js

```
