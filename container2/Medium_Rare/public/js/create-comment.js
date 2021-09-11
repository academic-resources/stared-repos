
const createComment = document.querySelector(".create-comment-form");

createComment.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(createComment);
    const message = formData.get("message");
    const userId = localStorage.getItem("MEDIUM_USER_ID");

    const paramsId = window.location.href.split('/')[4]

    try {
      const res = await fetch(`/comments/${paramsId}/`, {
          method: "POST",
          body: JSON.stringify({ message, userId }),
          headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('MEDIUM_ACCESS_TOKEN')}`
          },
      });
      if (!res.ok) {
        throw res;
      }
      window.location.href = `/articles/${paramsId}`;
    } catch (err) {
        console.error(err);
  }
});
