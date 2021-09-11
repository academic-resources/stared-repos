"use strict";

/**
 * 
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * 
 * @description config.js
 * @augments 
 * @example 
 * @link 
 * 
 */


let log = console.log;

const getUrl = (debug = false) => {
    let apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com";
    let serverUrl = "im-api.easemob.com";
    let condition = (window.location.href.indexOf("webim-h5.easemob.com") !== -1 || window.location.href.indexOf("localhost") !== -1 || window.location.href.indexOf("172.17.2.168") !== -1);
    if(condition){
        apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com";
        serverUrl = "im-api.easemob.com";
    }
    let result = {
        apiUrl,
        serverUrl,
    };
    if (debug) {
        log(`result = `, JSON.stringify(result, null, 4));
    }
    return result;
}

let config = {
    // XMPP server
    xmppURL: getUrl(true).serverUrl,
    // Backend REST API URL
    apiURL: getUrl().apiUrl,
    // Application AppKey
    appkey: "easemob-demo#chatdemoui",// ???
    // Application Host
    // Host: "easemob.com",
    // Host: "cdn.xgqfrms.xyz",
    Host: "cdn.xgqfrms.xyz",
    // HTTPS
//     https: false,
    https: true,
    isHttpDNS: true,
    // isMultiLoginSessions 是否开启多点登录
    isMultiLoginSessions: false,
    // window.doQuery()
    isWindowSDK: true,
    // isWindowSDK: false,
    // isSandBox
    isSandBox: false,
    // console.log() & strophe.log()
    isDebug: true,
    // show logs
    isStropheLog: false,
    // autoReconnectNumMax times & won't auto connect if autoReconnectNumMax=0.
    autoReconnectNumMax: 5,
    // interval seconds between each atuo reconnectting(autoReconnectMaxNum >= 2) & 每次自动重新连接之间的间隔秒数
    autoReconnectInterval: 2,
    // webrtc supports WebKit and https only
    isWebRTC: window.RTCPeerConnection && /^https\:$/.test(window.location.protocol),
    // cn: chinese / us: english
    i18n: "cn",
    // auto sign-in
    isAutoLogin: true,
    // Size of message cache for person
    p2pMessageCacheSize: 500,
    // message arrived
    delivery: true,
    // Size of message cache for group chating(group, chatroom)
    groupMessageCacheSize: 200,
    // 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR'
    loglevel: "ERROR",
    // enable localstorage for history messages
    enableLocalStorage: true
};

