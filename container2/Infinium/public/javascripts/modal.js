export function showModal (msg) {
  const modal = document.getElementById('modal');
  const message = document.getElementById('modal-message');
  message.innerHTML = msg;
  modal.classList.add('transitioning');
  setTimeout(() => {
    modal.classList.add('show');
    setTimeout(() => {
      modal.classList.remove('transitioning');
    }, 250);
  },0)
}

window.addEventListener('DOMContentLoaded', e => {
  const closeButton = document.getElementById('modal-close');
  closeButton.addEventListener('click', e => hideModal())

  function hideModal () {
    const modal = document.getElementById('modal');
    const message = document.getElementById('modal-message');
    modal.classList.add('transitioning');
    modal.classList.remove('show');
    setTimeout(() => {
      message.innerHTML = '';
      modal.classList.remove('transitioning');
    }, 250);
  }
});
