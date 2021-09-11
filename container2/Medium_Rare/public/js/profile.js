const getFollowers = async () => {
  const id = window.location.href.split("/")[5];
  const res = await fetch(`/users/${id}/followers`);
  const followers = await res.json();
  const res2 = await fetch(`/users/${id}/followedAuthors`);
  const subjects = await res2.json();
  const numOfFollowers = followers.followers.length;
  const numOfPeopleFollowing = subjects.followedAuthors.length;
};

getFollowers();

const followButton = document.querySelector(".followButton");
followButton.addEventListener("click", async (e) => {
  const userId = localStorage.getItem("MEDIUM_USER_ID");
  const authorId = window.location.href.split("/")[5];
  console.log(authorId);
  try {
    console.log(authorId);
    const res = await fetch(`/users/${authorId}/addFollow`, {
      method: "POST",
      body: JSON.stringify({ userId, authorId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("MEDIUM_ACCESS_TOKEN")}`,
      },
    });
    console.log(authorId);
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
  } catch (e) {
    console.log(e);
  }
});
