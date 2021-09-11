// *** Creates new Quill Editor ***
var quill = new Quill("#editor", {
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  },
  placeholder: "Tell Your Story...",
  theme: "snow",
});

quill.setContents([
  { attributes: { bold: true }, insert: "dddddwadaw" },
  { insert: "\n\n" },
  { attributes: { bold: true }, insert: "dwdd" },
  { attributes: { background: "#ff9900", bold: true }, insert: "dwww" },
  { attributes: { header: 1 }, insert: "\n" },
]);

// *** Fetches Image to Fill Cover Photo ***
document.getElementById("image_fetch").addEventListener("click", async (e) => {
  e.preventDefault();
  const search = document.getElementById("Cover__Search").value;
  const request = `https://source.unsplash.com/random/1200x550/?${search}`;
  const url = await fetch(request).then((data) => data.url);
  const container = document.getElementById("article__background");
  container.setAttribute("style", `background-image: url(${url})`);
  container.setAttribute("value", url);
});

// *** Submit Handler for Article Form Data ***
document
  .getElementById("article__submit")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const title = document.getElementById("article__title").value;
    const cover = document
      .getElementById("article__background")
      .getAttribute("value");
    const body = JSON.stringify(quill.root.innerHTML);
    const delta = JSON.stringify(quill.getContents());

    const newArticle = {
      title: title,
      userId: 1,
      cover: cover,
      body: body,
      delta: delta,
    };

    const response = await fetch("/articles", {
      method: "POST",
      body: JSON.stringify(newArticle),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("MEDIUM_ACCESS_TOKEN")}`,
      },
    });

    if (response.ok) {
      window.location.href = "/";
    }
  });
