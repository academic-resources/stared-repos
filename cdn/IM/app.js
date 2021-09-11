"use strict";

/**
 * 
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * 
 * @description app.js
 * @augments 
 * @example 
 * @link 
 * 
 */

const IMKeys = {
    // AppKey: "109190610065547#qt",
    appkey: "109190610065547#qt",
    Orgname: "1109190610065547",
    appname: "qt",
    "Client ID": "YXA6ZnrOCotmEemPehm-tw6UmQ",
    "Client Secret": "YXA6yooYJ219J-2pS6fqjV5dQY7KHAg",
};

Object.assign(config, IMKeys);
log(config);

// init DOMParser / document for strophe and sdk
let WebIM = window.WebIM || {}

// 0. config
WebIM.config = config;
WebIM.loglevel = config.loglevel;

// 1. 创建连接
let conn = WebIM.conn = new WebIM.connection({
    url: WebIM.config.xmppURL,
    apiUrl: WebIM.config.apiURL,
    https: WebIM.config.https,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    isHttpDNS: WebIM.config.isHttpDNS,
    isWindowSDK: WebIM.config.isWindowSDK,
    isAutoLogin: true,
    encrypt: WebIM.config.encrypt,
    delivery: WebIM.config.delivery,
    saveLocal: WebIM.config.saveLocal,
    heartBeatWait: WebIM.config.heartBeatWait,
});

// WebIM.conn.api.render(document.getElementById("demo"));

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

const login = (username, password) => {
    // if (WebIM.conn.isOpened()) {
    //     WebIM.conn.close("logout")
    // }
    WebIM.conn.open({
        apiUrl: WebIM.config.apiURL,
        user: username.trim().toLowerCase(),
        pwd: password,
        accessToken: password,
        appKey: WebIM.config.appkey,
        success(token) {
            // let I18N = i18n.translations[i18n.locale];
            // Creators.setLoginToken(username, token.access_token);
            // Creators.setLoginSuccess(username);
            log(`token =`, token);
        },
        error: err => {
            log(`error =`, err);
        }
    });
};

login("admin", "123456");