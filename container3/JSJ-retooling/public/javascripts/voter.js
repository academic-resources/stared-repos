import { tryCastVote, prettyNumbers, colorVoteButton } from './index.js';

export default function (voteIcon) {
  voteIcon.addEventListener('click', voter);
}

async function voter (voteClick) {
  const voteCaster = voteClick.target;
  const postId = voteCaster.dataset.backendId;
  if (voteCaster.classList.toString().match(/post-vote-up/g)) {
    await tryCastVote('up', postId);
  } else if (voteCaster.classList.toString().match(/post-vote-down/g)) {
    await tryCastVote('down', postId);
  }
  await colorVoteButton(voteClick.target);
  setTimeout(prettyNumbers, 1250);
}
