export default function (question) {
  const outerDiv = document.createElement('div');
  question.timeStamp = `asked ${new Date(question.createdAt).toLocaleString({}, { timeStyle: 'short', dateStyle: 'short' }).split(',').join(' |')} by `;
  outerDiv.classList.add('question');
  outerDiv.innerHTML = `
    <div class='answerNumber'>
      ${question.numberOfAnswers} <div>answer${question.numberOfAnswers === 1 ? '' : 's'}</div>
    </div>
    <div class='score'>
      ${question.score} <div>Score</div>
    </div>
    <div class='titleDiv'>
      <a href=/questions/${question.id} class='title'>
        ${question.title}
      </a>
    </div>
    <div class='author'>
      ${question.timeStamp} <span><a href='/users/${question.userId}' class='userLink'>${question.User.userName}</a></span>
    </div>
  `;
  document.getElementById('questions').appendChild(outerDiv);
}
