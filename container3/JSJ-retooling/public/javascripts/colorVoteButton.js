export default async ({ dataset: { backendId: id } }) => {
  const upButton = document.querySelector(`i.post-vote-up[data-backend-id='${id}']`);
  const downButton = document.querySelector(`i.post-vote-down[data-backend-id='${id}']`);
  const { authenticated, userId } = await (await fetch('/users/auth')).json();
  if (authenticated) {
    const { vote } = await (await fetch(`/users/${userId}/votes/${id}`)).json();
    if (vote !== null) {
      if (vote) {
        downButton.classList.remove('voted');
        upButton.classList.add('voted');
      } else {
        upButton.classList.remove('voted');
        downButton.classList.add('voted');
      }
    } else document.querySelectorAll(`i.voting-button[data-backend-id='${id}']`).forEach(button => button.classList.remove('voted'));
  }
};
