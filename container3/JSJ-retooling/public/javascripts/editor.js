import { editSubmit } from './index.js';

export default function (editIcon) {
  editIcon.addEventListener('click', editPost);
}

const editPost = ({ target }) => {
  const { dataset: { backendId } } = target;
  const original = document.querySelector(`#post-${backendId} div.bodyContainer`);
  const editModal = document.createElement('div');
  const screen = document.createElement('div');
  const editForm = document.createElement('form');
  const editBox = document.createElement('textarea');
  const submit = document.createElement('button');

  screen.classList.add('edit-screen');
  editModal.classList.add('edit-modal');
  editForm.classList.add('edit-form');
  editBox.setAttribute('id', 'edit-box');
  submit.innerText = 'Update';

  editBox.innerHTML = original.innerHTML;

  editForm.appendChild(editBox);
  editForm.appendChild(submit);
  editModal.appendChild(editForm);
  screen.appendChild(editModal);
  document.body.appendChild(screen);
  submit.addEventListener('click', editSubmit(backendId));
  [editModal, editForm, editBox].forEach(piece => {
    piece.addEventListener('click', e => e.stopPropagation());
  });
  const deconstruct = () => {
    screen.parentNode.removeChild(screen);
    screen.removeEventListener('click', deconstruct);
  };
  screen.addEventListener('click', deconstruct);
  document.body.style.overflow = 'hidden';
};
