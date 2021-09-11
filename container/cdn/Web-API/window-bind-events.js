
const html = document.querySelector('html');
// const body = document.querySelector('body');

// window;
// document;

const pre = document.querySelector('#pre');
const textArea = document.querySelector('#events-order');
const reload = document.querySelector('#reload');

reload.addEventListener('click', (e) => {
  textArea.textContent = '';
  pre.innerHTML = '';
  // pre.innerText = '';
  window.setTimeout(() => {
    window.location.reload(true);
  }, 0);
});

document.addEventListener('readystatechange', (event) => {
  const order = document.readyState === 'complete' ? 3 : 1;
  console.log('readyState', order);
  textArea.textContent += `readyState: ${document.readyState}, ${order}\n`;
  pre.insertAdjacentHTML('beforeend', `<span>readyState: ${document.readyState, order}</span><br/>`);
  // pre.insertAdjacentText('beforeend', `<span>${}</span><br/>`);
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 2);
  textArea.textContent += `DOMContentLoaded, 2\n`;
  pre.insertAdjacentHTML('beforeend', `<span>DOMContentLoaded, 2</span><br/>`);
});

window.addEventListener('load', () => {
  console.log('load', 4);
  textArea.textContent += 'load, 4\n';
  pre.insertAdjacentHTML('beforeend', `<span>load, 4</span><br/>`);
});

window.addEventListener('beforeunload', (e) => {
  // e.preventDefault();
  console.log('beforeunload', 7);
  textArea.textContent += 'beforeunload\n';
  pre.insertAdjacentHTML('beforeend', `<span>beforeunload, 7</span><br/>`);
  // Beacon API
  // delay close tab
  for (let i = 0; i < 10**7; i++) {
    if(i % 100 === 0) {
      console.log(`i`, i);
    }
  }
  // for (let i = 0; i < 10**7; i++) {
  //   for (const item of [new Uint8Array(5).map((item, i) => i + 3)]) {
  //     if(i === 10**item ) {
  //       console.log(`${10**item}`, i);
  //     }
  //   }
  // }
});

window.addEventListener('unload', () => {
  console.log('unload', 8);
  textArea.textContent += 'unload\n';
  pre.insertAdjacentHTML('beforeend', `<span>unload, 8</span><br/>`);
});

window.addEventListener('pageshow', () => {
  console.log('pageshow', 5);
  textArea.textContent += 'pageshow, 5\n';
  pre.insertAdjacentHTML('beforeend', `<span>pageshow, 5</span><br/>`);
});

window.addEventListener('pagehide', () => {
  console.log('pagehide', 6);
  textArea.textContent += 'pagehide\n';
  pre.insertAdjacentHTML('beforeend', `<span>pagehide</span><br/>`);
});

// Page Visibility API
document.addEventListener('visibilitychange', () => {
  console.log('visibilityChange', );
  console.log('document.hidden', document.hidden);
  console.log('document.visibilityState', document.visibilityState);
  textArea.textContent += `document.hidden ${document.hidden}\n`;
  textArea.textContent += `document.visibilityState ${document.visibilityState}\n`;
  pre.insertAdjacentHTML('beforeend', `<span>document.hidden ${document.hidden}</span><br/>`);
  pre.insertAdjacentHTML('beforeend', `<span>document.visibilityState ${document.visibilityState}</span><br/>`);
}, false);


// ???
const bindEventsLength = html.eventsLength ?? 0;
console.log('bindEventsLength =', bindEventsLength);
