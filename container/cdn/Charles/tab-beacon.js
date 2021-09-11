
const wxRobot = (params = {}, desc = '') => {
    // 1 测试
    const url = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=555a887d-c247-4808-a850-22440c5b25a0';
    const fetchPOST = (url, obj) => {
        return fetch(
            url,
            {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            },
        ).then(res => res.json()).then(json => json).catch(err => console.log('fetch error', err)).finally(() => {
            // callback();
        });
    };
    const obj = {
      msgtype: 'markdown',
      markdown: {
          content: `
desciption: ${desc}\n
data: \n
<pre>
${JSON.stringify(params, null, 4)}
</pre>\n
          `,
      },
  };
  fetchPOST(url, obj);
};

console.log('init beforeunload');

window.addEventListener('beforeunload', () => {
    const url = 'http://localhost:9000/';
    const obj = {
        "user": "eric",
        "group": "",
        "modules": "国际广告-Facebook(海外)-Facebook(海外)",
        "path": "/advertise-2/list/21/1/campaign",
        "host": "10.1.159.45:8088",
        "os": "macOS"
    };
    let data = new FormData();
    const keys = Object.keys(obj);
    for (const key of keys) {
        data.append(key, obj[key]);
    }
    if(text) {
        data.append('desc', 'Beacon API 🔥 数据上报');
    }
    console.log(`Beacon API 🔥 数据上报 = ${JSON.stringify(obj, null, 4)}`);
    navigator.sendBeacon(url, data);
});


// pageshow
// pagehide

document.addEventListener('visibilitychange', () => {
  console.log('document.hidden', document.hidden);
  // false
  console.log('document.visibilityState',  document.visibilityState);
  // "visible"
  const params = {
    "user": "eric",
    "os": "macOS"
  };
  if(document.hidden) {
    wxRobot(params, 'hidden 数据上报 🚀');
  } else {
    wxRobot(params, 'show 数据上报 🚀');
  }
}, false);
