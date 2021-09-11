const content = {
  init: async () => {
    await content.mainArticle();
    await content.mainSideArticles();
    await content.trendingArticles();
    await content.articleBox3();
    await content.suggestedUsers();
    content.following();
    content.linking();
  },

  suggestedUsers: async () => {
    const suggestBox = document.querySelector(".content__users--B");
    try {
      const res = await fetch("/users/userList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "MEDIUM_ACCESS_TOKEN"
          )}`,
        },
      });
      if (!res.ok) {
        throw res;
      }
      const userList = await res.json();
      const usersArr = userList.usersArr;
      let count = 0;

      usersArr.forEach((userobj) => {
        if (count === 5) {
          return;
        }
        const userLink = document.createElement("a");
        userLink.classList.add("suggestedUserClass");
        const liEle = document.createElement("ul");
        let name = userobj.userName;
        let id = userobj.userId;
        userLink.setAttribute("href", `/users/profile/${id}`);
        liEle.innerHTML = `<img src="https://picsum.photos/id/${content.randomNum(
          100
        )}/64/64">${name}<button class="followButton">Follow</button>`;
        userLink.appendChild(liEle);
        suggestBox.appendChild(userLink);
        count++;
      });
    } catch (err) {
      console.log(err);
    }
  },

  mainArticle: async () => {
    try {
      const count = await content.articleCount();
      const id = await content.randomNum(count);

      const res = await fetch(`/articles/${id}`);

      const randomArticle = await res.json();
      const main = randomArticle.article;

      const author = await content.getUser(main.userId);

      document.querySelector(".artA__main--title").innerHTML = main.title;
      document.querySelector(".artA__main--author").innerHTML = author.userName;

      document
        .querySelector(".artA__main--author")
        .setAttribute("id", main.userId);

      document
        .querySelector(".artA__main--author")
        .appendChild(content.followButton(main.userId));

      document
        .querySelector(".artA__main--link")
        .setAttribute("href", `/articles/view/${id}`);
    } catch (err) {
      console.error(err);
    }
  },

  mainSideArticles: async () => {
    const slots = document.querySelectorAll(".artA__side--Article");
    await slots.forEach(async (slot) => {
      try {
        const count = await content.articleCount();
        const id = await content.randomNum(count);
        const res = await fetch(`/articles/${id}`);
        const randomArticle = await res.json();
        const main = randomArticle.article;
        const author = await content.getUser(main.userId);

        const divA = document.createElement("div");
        const divM = document.createElement("div");

        const name = document.createElement("h5");
        name.textContent = author.userName;
        name.setAttribute("id", main.userId);
        const title = document.createElement("h3");
        title.textContent = main.title;
        const image = document.createElement("img");
        image.setAttribute(
          "src",
          `https://picsum.photos/id/${content.randomNum(100)}/100/100`
        );
        image.setAttribute("alt", "Sorry Helen Keller.");
        const button = content.followButton(main.userId);
        name.appendChild(button);
        slot.appendChild(divA);
        slot.appendChild(divM);
        divA.appendChild(name);
        divA.appendChild(title);
        divA.innerHTML += `<a href="/articles/view/${id}">Read More</a>`;
        divM.appendChild(image);
      } catch (err) {
        console.error(err);
      }
    });
  },

  trendingArticles: async () => {
    const slots = document.querySelectorAll(".content__articleB");
    await slots.forEach(async (slot) => {
      try {
        const count = await content.articleCount();
        const id = await content.randomNum(count);
        const res = await fetch(`/articles/${id}`);
        const randomArticle = await res.json();
        const main = randomArticle.article;
        const author = await content.getUser(main.userId);

        const divA = document.createElement("div");
        const divM = document.createElement("div");

        const name = document.createElement("h5");
        name.textContent = author.userName;
        name.setAttribute("id", main.userId);
        const title = document.createElement("h3");
        title.textContent = main.title;
        const image = document.createElement("img");
        image.setAttribute(
          "src",
          `https://picsum.photos/id/${content.randomNum(100)}/80/80`
        );

        name.appendChild(content.followButton(main.userId));
        slot.appendChild(divA);
        slot.appendChild(divM);
        divA.appendChild(name);
        divA.appendChild(title);
        divA.innerHTML += `<a href="/articles/view/${id}">Read More</a>`;
        divM.appendChild(image);
      } catch (err) {
        console.error(err);
      }
    });
  },

  articleBox3: async () => {
    const slots = document.querySelectorAll(".content__articleC--Article");
    for (let slot of slots) {
      try {
        const count = await content.articleCount();
        const id = await content.randomNum(count);
        const res = await fetch(`/articles/${id}`);
        const randomArticle = await res.json();
        const main = randomArticle.article;
        const author = await content.getUser(main.userId);

        const divA = document.createElement("div");
        const divM = document.createElement("div");

        const name = document.createElement("h4");
        name.textContent = author.userName;
        name.setAttribute("id", main.userId);
        const title = document.createElement("h2");
        title.textContent = main.title;
        const image = document.createElement("img");
        image.setAttribute(
          "src",
          `https://picsum.photos/id/${content.randomNum(100)}/200/133`
        );

        name.appendChild(content.followButton(main.userId));
        slot.appendChild(divA);
        slot.appendChild(divM);
        divA.appendChild(name);
        divA.appendChild(title);
        divA.innerHTML += `<a href="/articles/view/${id}">Read More</a>`;
        divM.appendChild(image);
      } catch (err) {
        console.error(err);
      }
    }
    // await slots.forEach(async (slot) => {
    //   try {
    //     const count = await content.articleCount();
    //     const id = await content.randomNum(count);
    //     const res = await fetch(`http://localhost:8080/articles/${id}`);
    //     const randomArticle = await res.json();
    //     const main = randomArticle.article;
    //     const author = await content.getUser(main.userId);

    //     const divA = document.createElement('div');
    //     const divM = document.createElement('div');

    //     const name = document.createElement('h4');
    //     name.textContent = author.userName;
    //     const title = document.createElement('h2');
    //     title.textContent = main.title;
    //     const image = document.createElement('img');
    //     image.setAttribute('src', `https://picsum.photos/id/${content.randomNum(100)}/200/133`);

    //     name.appendChild(content.followButton(main.userId));
    //     slot.appendChild(divA);
    //     slot.appendChild(divM);
    //     divA.appendChild(name);
    //     divA.appendChild(title);
    //     divA.innerHTML += `<a href="http://localhost:8080/articles/${id}">Read More</a>`;
    //     divM.appendChild(image);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // });
    //content.following();
  },

  getUser: async (id) => {
    try {
      const res = await fetch(`/users/publicinfo/${id}`);
      const data = await res.json();
      const user = data.user;
      return user;
    } catch (err) {
      console.error(err);
    }
  },

  articleCount: async () => {
    try {
      const res = await fetch("/articles");
      const data = await res.json();
      const count = data.articles.length;
      return count;
    } catch (err) {
      console.error(err);
    }
  },

  randomNum: (n) => {
    const num = Math.floor(Math.random() * Math.floor(n));
    if (num === 0) {
      return n;
    } else {
      return num;
    }
  },

  followButton: (id) => {
    const button = document.createElement("button");
    button.setAttribute("id", id);
    button.classList.add("followButton");
    button.textContent = "Follow";
    return button;
  },

  linking: async () => {
    const followLinks = document.querySelectorAll("h4, h5");
    console.log(followLinks);
    followLinks.forEach((link) => {
      link.addEventListener("click", async (e) => {
        console.log(e.target.id);
        window.location.href = `/users/profile/${e.target.id}`;
      });
    });
  },

  following: async () => {
    const followButtons = document.querySelectorAll(".followbutton");
    // console.log(followButtons);
    followButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        if (e.target.className === "followButtonClicked") {
          button.classList.remove("followButtonClicked");
          button.classList.add("followButton");
          return;
        }
        const userId = localStorage.getItem("MEDIUM_USER_ID");
        const authorId = e.target.id;
        console.log(authorId);
        button.className = "followButtonClicked";
        try {
          const res = await fetch(`/users/${authorId}/addFollow`, {
            method: "POST",
            body: JSON.stringify({ userId, authorId }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem(
                "MEDIUM_ACCESS_TOKEN"
              )}`,
            },
          });
          if (!res.ok) {
            throw res;
          }
          const data = await res.json();
        } catch (e) {
          console.log(e);
        }
      });
    });
  },
};

document.addEventListener("DOMContentLoaded", async () => content.init());
