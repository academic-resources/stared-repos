window.addEventListener("DOMContentLoaded", async () => {
  try {
    const id = localStorage.getItem("TWITTER_LITE_CURRENT_USER_ID");
    const res = await fetch(`http://localhost:8080/users/${id}/tweets`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "TWITTER_LITE_ACCESS_TOKEN"
        )}`,
      },
    });

    const data = await res.json();
    const output = data["tweets"];
    const output2 = output["tweets"];

    const tweetsHtml = output2.map(
      ({ message, id }) => `
        <div class="card" id="tweet-${id}">
          <div class="card-body">
            <p class="card-text">${message}</p>
          </div>
        </div>
      `
    );

    const tweetsContainer = document.querySelector(".tweets-container");

    tweetsContainer.innerHTML = tweetsHtml.join(" ");

    if (!res.ok) {
      throw res;
    }
  } catch (err) {
    if (err.status === 401) {
      window.location.href = "/log-in";
      return;
    } else {
      console.error(err);
    }
  }
});
