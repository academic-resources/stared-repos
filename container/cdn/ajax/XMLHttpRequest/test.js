// https://cdn.xgqfrms.xyz/json/cats.json


const loadJSON = (callback) => {
  let xObj = new XMLHttpRequest();
  xObj.overrideMimeType("application/json");
  xObj.open('GET', './data.json', true);
  // 1. replace './data.json' with the local path of your file
  xObj.onreadystatechange = () => {
      if (xObj.readyState === 4 && xObj.status === 200) {
          // console.log('xObj =', xObj);
          // console.log('xObj.responseText =', xObj.responseText, JSON.stringify(xObj.responseText, null, 4));
          callback(xObj.responseText);
          // const json = JSON.parse(xObj.responseText);
          // callback(json);
      }
  };
  // xObj.open('GET', './data.json', true);
  xObj.send(null);
}

const init = () => {
  loadJSON((response) => {
      // Parse JSON string into object
      console.log('response =', response);
      let actual_JSON = JSON.parse(response);
      console.log('actual_JSON =', JSON.stringify(actual_JSON, null, 4));
      const app = document.querySelector('#app');
      app.innerHTML = `<pre>${JSON.stringify(actual_JSON, null, 4)}</pre>`;
  });
}

init();


