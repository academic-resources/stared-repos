
const log = console.log;

const btn = document.querySelector(`#btn`);

document.addEventListener('click', () => {
  const params = {
    "user": "Eric",
    "os": "macOS",
    "browser": "Chrome",
  };
  log('click send beacon api json', JSON.stringify(params, null, 4));
  const desc = '✅ beacon api & json';
  wxRobot(params, desc);
}, false);
