const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signUpForm);

  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.entries("username");

  const body = { email, password, username };

  try {
    const res = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw res;
    }

    const {
      token,
      user: { id },
    } = await res.json();

    localStorage.setItem("TWITTER_LITE_ACCESS_TOKEN", token);
    localStorage.setItem("TWITTER_LITE_CURRENT_USER_ID", id);
  } catch (err) {
    if (err.status >= 400 && err.status < 600) {
      const errorJSON = await err.json();
      const errorsContainer = document.querySelector(".errors-container");

      let errorsHtml = [
        `
              <div class="alert alert-danger">
                Something went wrong. Please Try again.
              </div>
            `,
      ];

      const { errors } = errorJSON;
      if (errors && Array.isArray(errors)) {
        errorsHtml = errors.map(
          (message) => `<div class="alert alert-danger">${message}</div>`
        );
      }
      errorsContainer.innerHTML = errorsHtml.join("");
    } else {
      alert(
        `Something went wrong. Please check your internet connection and try again!`
      );
    }
  }
});
