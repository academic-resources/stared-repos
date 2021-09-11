const log = console.log;
// setTimeout(() => document.write(navigator.userAgent), 1000);

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector(`#app`);
  log('DOMContentLoaded');
  app.insertAdjacentHTML('beforeend', `<span>${navigator.userAgent}</span><br/>`);
  // UA
  const UA = new UAChecker();
  const obj = {
    ua: UA.ua ?? navigator.userAgent,
    os: UA.getOS() ?? 'unknown os',
    osVersion: UA.getOSVersion() ?? 'unknown os version',
    browser: UA.getBrowser() ?? 'unknown browser',
    browserVersion: UA.getBrowserVersion() ?? 'unknown browser version',
  };
  // pre
  app.insertAdjacentHTML('beforeend', `<pre>${JSON.stringify(obj, null, 4)}</pre><br/>`);
  // all
  app.insertAdjacentHTML('beforeend', `<pre>${JSON.stringify(UA.getAll(), null, 4)}</pre><br/>`);
});


/*

class UA {
  constructor() {
    this.ua = navigator.userAgent;
  }
}

UA.ua;
// undefined

ua = new UA();
UA {ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…TML, like Gecko) Chrome/91.0.4455.2 Safari/537.36"}
ua.ua;
// "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4455.2 Safari/537.36"

*/
