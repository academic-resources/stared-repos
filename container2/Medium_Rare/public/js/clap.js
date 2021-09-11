document
  .getElementById("add_clap")
  .addEventListener("click", async (e) => {
    e.preventDefault()
    // const title = document.getElementById("article__title").value;
    const paramsId = window.location.href.split('/')[4]
    console.log(paramsId)

    const response = await fetch(`/articles/${paramsId}/clap`, {
      method: "PUT",
    //   body: JSON.stringify(newArticle),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("MEDIUM_ACCESS_TOKEN")}`,
      },
    });

    if (response.ok) {
      window.location.href = "/";
    }
  });
