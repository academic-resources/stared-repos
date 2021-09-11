import { create, editListen, voteListen, deleteListen } from './index.js';

export default async function (event) {
  event.preventDefault();
  const threadId = window.location.href.match(/\d+$/)[0];
  const inputBox = document.getElementById('answerInput');

  const response = await window.fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ answerInput: inputBox.value, _csrf: document.getElementById('csrf').value, threadId })
  });
  const { success, id, reason, body } = await response.json();

  if (success) {
    const scoreLabel = create('p', null, 'label');
    const innerBody = create('div', null, 'body');
    const bodyScore = create('div', null, 'bodyScore');
    const div = create('div', `post-${id}`, 'post', 'answer');
    const innerBodyContainer = create('div', null, 'bodyContainer');
    const innerScore = create('p', `score-${id}`, 'scoreThreadPage');
    const editButton = create('i', `new-edit-${id}`, 'edit-answer', 'edit', 'fas', 'fa-edit');
    const deleteButton = create('i', `new-answer-delete-${id}`, 'delete-answer', 'delete', 'far', 'fa-trash-alt');
    const upVote = create('i', null, `new-answer-vote-${id}`, 'post-vote-up', 'voting-button', 'fas', 'fa-chevron-up');
    const downVote = create('i', null, `new-answer-vote-${id}`, 'post-vote-up', 'voting-button', 'fas', 'fa-chevron-down');
    [deleteButton, editButton, upVote, innerScore, downVote].forEach(button => button.setAttribute('data-backend-id', id));
    [deleteButton, editButton, innerBody, bodyScore].forEach(child => div.appendChild(child));
    [upVote, innerScore, downVote, scoreLabel].forEach(child => bodyScore.appendChild(child));
    innerBody.appendChild(innerBodyContainer);
    innerBodyContainer.innerHTML = body;
    scoreLabel.innerText = 'Likes';
    innerScore.innerText = 0;
    inputBox.value = '';
    document.querySelector('.threadContainer').appendChild(div);
    editListen(editButton);
    deleteListen(deleteButton);
    [upVote, downVote].forEach(voteListen);
    window.localStorage.removeItem(`draft${threadId}`);
  } else if (reason === 'anon') {
    window.localStorage.setItem(`draft${threadId}`, inputBox.value.split('\n').join('$$break$$'));
    window.location = `/users/login?pref=${window.location}`;
  }
}
