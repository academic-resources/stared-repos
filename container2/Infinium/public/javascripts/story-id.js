import { showModal } from "./modal.js";

window.addEventListener("DOMContentLoaded", (event) => {
 let lightsaber = document.querySelector(".clap-pic")
 lightsaber.addEventListener('click', event => {
   let randomizer = Math.floor(Math.random() * 5);
   lightsaber.src = `/images/lightsaber-${randomizer}.png`
 })

 let clapper = document.getElementById('upvote');

  //Check prevents voting by non-logged in users as no id is set on the clapper
  if (clapper) {
    clapper.addEventListener('click', (e) => {
      const url = window.location.pathname;
      let storyIdArray = url.split('/');
      let storyId = storyIdArray[storyIdArray.length - 1];
      const body = { storyId }
      fetch(`/likes${url}/upvote`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' }
        })
        .then (res => {
            if (!res.ok) throw Error(res.statusText);
            return res.json();
        })
        .then (data => {
            if (data.limitedOut) {
              showModal('You reached your maximum of 50 lightsabers.')
            } else {
              let score = document.getElementById('likesCount');
              //The likesCount is already the new value of +1
              score.innerHTML = data.likesCount;
            }
        })
        .catch (err => {
          showModal(err.message);
        })
    });
  }
  else {
    clapper = document.querySelector('.clap-pic');
    clapper.addEventListener('click', e => {
      if(clapper.id === 'novote') {
        showModal('You cannot ignite a lightsaber for your own story!');
      } else {
        showModal('We\'re sorry, but you must log in to give lightsabers.');
      }
    })
  }

  const commentButton = document.querySelector(".comment_button");
  if (commentButton) {
    commentButton.addEventListener('click', event => {
      event.preventDefault()
      const commentsContainer = document.querySelector('.comments-container');
      if (commentsContainer.classList.contains("hide")) {
        commentsContainer.classList.remove("hide")
      }
      commentsContainer.classList.toggle("reveal")
      commentsContainer.classList.toggle("unreveal")
    })
  }
})
