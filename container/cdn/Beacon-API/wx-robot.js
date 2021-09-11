
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
  ).then(res => res.json())
  .then(json => json)
  .catch(err => console.log('fetch error', err))
  .finally(() => {
    // this.loading = false;
  });
};

const wxRobot = (params = {}, desc = '') => {
  // 测试 robot
  // beacon-api-json
  const url = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=a3c59735-ad11-4f6a-93fa-3b0dd9b6802c';
  const obj = {
      msgtype: 'markdown',
      markdown: {
          content: `
desciption: ${desc}\n
data: ${JSON.stringify(params, null, 4)}\n
          `,
      },
  };
  const options = new Blob(
      [JSON.stringify(obj)],
      {type : 'application/json'}
  );
  const flag = navigator.sendBeacon(url, options);
  if(!flag) {
      // fallback
      let data = new FormData();
      // data.append(`start`, startTime);
      // data.append(`end`, performance.now());
      // data.append(`url`, document.URL);
      const keys = Object.keys(obj);
      for (const key of keys) {
          data.append(key, obj[key]);
      }
      if(desc) {
          data.append('desc', desc);
      }
      fetchPOST(url, obj);
  }
  // navigator.sendBeacon(url, data);
};

// wxRobot(params, desc);
