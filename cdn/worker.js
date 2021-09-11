/* worker 线程  */

// another namespace ??? const css
const css = `
    color: #0ff;
    font-size: 23px;
`;
const css_fd = `
    color: #0f0;
    font-size: 23px;
`;

// callback function
onmessage = function (e){
    // let id = e.data;//通过evt.data获得发送来的数据
    console.log(`主线程 e = `, e);
    // MessageEvent {isTrusted: true, data: "hello world", origin: "", lastEventId: "", source: null, …}
    // data: "https://cdn.xgqfrms.xyz/json/xgqfrms.json"

    // console.log(`主线程 id = `, id);
    // 主线程 id =  hello world
    // fetch data
    const datas = [];// {}
    // const url = `https://cdn.xgqfrms.xyz/json/xgqfrms.json`;
    let url = e.data;
    // decodeURI()
    console.log(`主线程 url = \n`, `"${url}"`);
    fetch(url = `https://cdn.xgqfrms.xyz/json/xgqfrms.json`)
    .then(res => res.json())// SyntaxError: Unexpected token / in JSON at position 0 at fetch.then.res (worker.js:18)
    .then(
        (json) => {
            // console.log(`fetched json = \n`, JSON.stringify(json, null, 4));
            let userInfos = json.user;
            console.log(`userInfos = \n`, JSON.stringify(userInfos, null, 4));
            datas.push(userInfos);
            postMessage(userInfos);
            // 将获取的数据发送到主线程
        }
    )
    .catch(err => console.log(`fetch error = \n`, err));
    // postMessage(datas);// 将获取的数据发送到主线程
    return datas;
}
/* 

??? 动态加载 js modules


*/
