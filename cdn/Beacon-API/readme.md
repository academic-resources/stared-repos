# Beacon API

https://cdn.xgqfrms.xyz/Beacon-API/beacon-api-json.html


## refs

https://www.cnblogs.com/xgqfrms/p/14635214.html


> Content-Type header that Beacon API use, depend on type of instance you pass to sendBeacon second parameter.

1. application/x-www-form-urlencoded

To send application/x-www-form-urlencoded, use UrlSearchParams instance.

```js
const url = `https://cdn.xgqfrms.xyz/Beacon-API/test`;

const data = {
   key : 'apples',
   values : 100,
};

const params = new URLSearchParams(data);

navigator.sendBeacon(url, params);

```

2. multipart/form-data

To send multipart/form-data header, use FormData instance.

```js
const url = `https://cdn.xgqfrms.xyz/Beacon-API/test`;

const params = new FormData();

params.append('key', 'apples');
params.append('value', 100);

navigator.sendBeacon(url, params);

```

3. application/json

To send application/json header, use Blob and set its type.

```js
const url = `https://cdn.xgqfrms.xyz/Beacon-API/test`;

const data = {
   key : 'apples',
   values : 100,
};

const params = new Blob(
    [JSON.stringify(data)], 
    {
      type : 'application/json',
    },
);

navigator.sendBeacon(url, params);


```
