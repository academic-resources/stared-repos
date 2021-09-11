import { prettyNumbers, voteListen, deleteListen, answerSubmit, editListen, colorVoteButton } from './index.js';

window.addEventListener('DOMContentLoaded', () => {
  prettyNumbers();

  // Enable upvote/downvote buttons
  document.querySelectorAll('.voting-button').forEach(button => {
    voteListen(button);
    colorVoteButton(button);
  });

  // Enable edit buttons
  document.querySelectorAll('.edit').forEach(editListen);

  // Enable delete buttons
  document.querySelectorAll('.delete').forEach(deleteListen);

  // Enable answer submit button
  document.getElementById('answer-submit').addEventListener('click', answerSubmit);

  // Select first answer on page. As they're sorted by votes,
  // this will intrinsically be the best answer (asker-selected
  // answers yet to come)
  const bestAnswer = document.querySelector('.answer');

  // Attach CSS best answer properties to top answer, if it exists
  (bestAnswer && bestAnswer.classList.add('best'));

  // Fill answer box with draft if it exists.
  const draft = window.localStorage.getItem(`draft${window.location.href.match(/\d+$/)[0]}`);
  document.getElementById('answerInput').value = draft ? draft.split('$$break$$').join('\n') : '';
});
