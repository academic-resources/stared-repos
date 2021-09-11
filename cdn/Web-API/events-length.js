const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
  console.log('bind click event 1', '✅ URLSearchParams');
  const url = 'http://localhost:9000/api/post';
  const obj = {
      "user": "1",
      "os": "macOS"
  };
  // Content-Type: application/x-www-form-urlencoded
  // URLSearchParams
  let data = new URLSearchParams(obj);
  navigator.sendBeacon(url, data);
});

btn.addEventListener('click', () => {
  console.log('bind click event 2', '✅ FormData');
  const url = 'http://localhost:9000/api/post';
  const obj = {
      "user": "12",
      "os": "macOS"
  };
  // Content-Type: multipart/form-data;boundary="boundary"
  // FormData
  let data = new FormData();
  const keys = Object.keys(obj);
  for (const key of keys) {
      data.append(key, obj[key]);
  }
  navigator.sendBeacon(url, data);
});

btn.addEventListener('click', () => {
  console.log('bind click event 2', '✅ Blob');
  const url = 'http://localhost:9000/api/post';
  const obj = {
      "user": "12",
      "os": "macOS"
  };
  // Blob
  // Content-Type: application/json
  // content-type: application/json; charset=utf-8
  let data = new Blob(
    [
      JSON.stringify(obj)
    ],
    {
      // 'type': 'application/json',
      type: 'application/json',
    },
  );
  navigator.sendBeacon(url, data);
});


// ???
const bindEventsLength = btn.eventsLength ?? 0;
console.log('bindEventsLength =', bindEventsLength);
