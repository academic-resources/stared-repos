import { create } from './index.js';

export default function throwPageError (error, id) {
  const extantErr = document.getElementById(id);
  if (!extantErr) {
    let errDiv = document.getElementById('errorDiv');
    const err = create('li');
    err.innerHTML = error;
    if (errDiv) {
      document.querySelector('.errorsList').appendChild(err);
    } else {
      errDiv = create('div');
      errDiv.setAttribute('id', 'errorDiv');
      const errList = create('ul');
      errList.classList.add('errorsList');
      errDiv.appendChild(errList);
      errList.appendChild(err);
      document.querySelector('.threadContainer')
        .prepend(errDiv);
    }
  } else {
    extantErr.innerHTML = error;
  }
}
