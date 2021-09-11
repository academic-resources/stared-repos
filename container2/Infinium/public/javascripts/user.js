import {postFollow, deleteFollow} from './follow.js';

window.addEventListener("DOMContentLoaded", (event) => {
  const url = window.location.pathname;
  const urlArray = url.split('/');
  let userId;
  if (urlArray.length === 3) {
    userId = urlArray[urlArray.length - 1];
  } else {
    userId = urlArray[2];
  }
  let showAbout = false;

  document.querySelector(".about").addEventListener("click", event => {
    event.preventDefault();
    showAbout = !showAbout;
    const question = document.querySelector(".question");
    const aboutButton = document.querySelector('.about');
    const aboutBlock = document.querySelector('.about_me');
    const storiesBlock = document.querySelector('.recentStories');

    if (question) {
      if (showAbout) {
        question.classList.add("hide")
      }
      else {
        question.classList.remove("hide")
      }
    }

    if (showAbout) {
      aboutButton.innerHTML = 'Stories';
      if (aboutBlock) aboutBlock.classList.remove("hide")
      if (storiesBlock) storiesBlock.classList.add("hide")
    }
    else {
      aboutButton.innerHTML = 'About';
      if (aboutBlock) aboutBlock.classList.add("hide")
      if (storiesBlock) storiesBlock.classList.remove("hide")
    }
  })

  /* Edit the user description */
  document.querySelector(".nameplate_bio_edit").addEventListener("click", event => {
    //remove the original text and add a new text box for editing
    const description = document.querySelector(".nameplate_bio");
    const originalText = description.innerHTML;
    description.style.display = "none";
    const newDescription = document.querySelector(".nameplate_bio_edit_textbox");
    newDescription.style.display = "block";
    newDescription.setAttribute("rows", "7");
    newDescription.setAttribute("cols", "40");
    newDescription.setAttribute("maxlength", "250");
    newDescription.value = originalText;
    const editButton = document.querySelector(".nameplate_bio_edit");
    editButton.style.display = "none";
    //add cancel & save button
    const cancelButton = document.querySelector(".nameplate_bio_cancel");
    cancelButton.style.display = "inline-block";
    const saveButton = document.querySelector(".nameplate_bio_save");
    saveButton.style.display = "inline-block";
  });

  //cancel editing
  document.querySelector(".nameplate_bio_cancel").addEventListener('click', event => {
    const cancelButton = document.querySelector(".nameplate_bio_cancel");
    cancelButton.style.display = "none";
    const saveButton = document.querySelector(".nameplate_bio_save");
    saveButton.style.display = "none";
    const textBox = document.querySelector(".nameplate_bio_edit_textbox");
    textBox.style.display = "none";
    const editButton = document.querySelector(".nameplate_bio_edit");
    editButton.style.display = "inline-block";
    const description = document.querySelector(".nameplate_bio");
    description.style.display = "block";
  });

  //save description
  document.querySelector(".nameplate_bio_save").addEventListener('click', async event => {
    const cancelButton = document.querySelector(".nameplate_bio_cancel");
    cancelButton.style.display = "none";
    const saveButton = document.querySelector(".nameplate_bio_save");
    saveButton.style.display = "none";
    const textBox = document.querySelector(".nameplate_bio_edit_textbox");
    const newDescription = textBox.value;
    textBox.style.display = "none";
    const editButton = document.querySelector(".nameplate_bio_edit");
    editButton.style.display = "inline-block";
    const description = document.querySelector(".nameplate_bio");
    description.innerHTML = newDescription;
    description.style.display = "block";
    const body = {'description': newDescription};
    try {
        const res = await fetch(`/users/${userId}/description`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
          throw res;
        }
    } catch (err) {
        console.log(err);
    }
  });

  /* PUT request to upload new user image */
  const form = document.getElementById("image-form");
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    //append file to form data obj to send
    const inpFile = document.getElementById('avatar');
    const formData = new FormData();
    formData.append('inpFile', inpFile.files[0]);
    formData.append('userId', userId);
    //check to see actual file has been chosen
    const imageData = new FormData(form).get('avatar');
    if (!imageData.name) return;
    try {
      const res = await fetch('/users/image', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      const image = document.querySelector(".profilePic_pic");
      image.src = `${data.image}`;
      const headerImages = document.querySelectorAll(".header img.icons_image");
      headerImages.forEach(img => img.src = `${data.image}`);
    } catch (err) {
        console.log(err);
    }
  });

  /* POST request to create a follow relationship */

  const follow = document.querySelector('.follow');
  const following = document.querySelector('.following');
  const followersCount = document.querySelector('.followers_count > span');
  const aboutFollowersCount = document.querySelector('.person_info_follower > span')

  //Follow links will not be visible to non-logged in users

  if (follow) {
    follow.addEventListener('click', async (event) => {
      event.preventDefault()
      postFollow(follow, following, followersCount, aboutFollowersCount);
    })
  }

/* DELETE request to remove a follow relationship */
  if (following) {
    following.addEventListener('click', async (event) => {
      event.preventDefault()
      deleteFollow(follow, following, followersCount)
    })
  }
})
