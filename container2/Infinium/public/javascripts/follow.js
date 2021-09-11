/* POST request to create a follow relationship */

import { showModal } from "./modal.js";

//Follow links will not be visible to non-logged in users
export async function postFollow(follow, following, followersCount, aboutFollowersCount) {
      let urlPath = window.location.pathname
      const urlArray = urlPath.split("/")
      const currentUserId = urlArray[2];
      if (urlArray.length === 5) { //from stories page
        urlPath = urlArray.slice(0, 3).join('/');
      }
      const body = { currentUserId };
      try {
        const res = await fetch(`${urlPath}/follows`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error('Failed to complete request.');
        }
        follow.classList.toggle("hide");
        following.classList.toggle("hide");
        const liveCountUpdate = parseInt(followersCount.innerHTML, 10) + 1;
        followersCount.innerHTML = liveCountUpdate;
        aboutFollowersCount.innerHTML = liveCountUpdate;
      } catch (err) {
        showModal(err.message);
      }
}


  /* DELETE request to remove a follow relationship */
export async function deleteFollow(follow, following, followersCount) {
    let urlPath = window.location.pathname
    const urlArray = urlPath.split("/")
    const currentUserId = urlArray[2];
    if (urlArray.length === 5) { //from stories page
      urlPath = urlArray.slice(0, 3).join('/');
    }
    const body = { currentUserId };
    try {
      const res = await fetch(`${urlPath}/follows`, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error('Failed to complete request.');
      }
      follow.classList.toggle("hide")
      following.classList.toggle("hide")
      followersCount.innerHTML = parseInt(followersCount.innerHTML, 10) - 1;
    } catch (err) {
      showModal(err.message);
    }
  }
