export default backendId => async submit => {
  submit.preventDefault();
  const inputBox = document.querySelector('#edit-box');
  const { success, body } = await (await window.fetch(`/posts/${backendId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ body: inputBox.value, _csrf: document.getElementById('csrf').value })
  })).json();
  if (success) {
    const modalControl = document.querySelector('.edit-screen');
    modalControl.parentNode.removeChild(modalControl);
    document.querySelector(`div#post-${backendId}.post .bodyContainer`).innerHTML = body;
  }
  document.body.style.overflow = 'auto';
};
