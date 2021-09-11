const signUpForm = document.querySelector(".create-user-form");

const userField = document.getElementById("userField");
const bioField = document.getElementById("bioField");
const emailField = document.getElementById("emailField");
const passwordField = document.getElementById("passwordField");
const cpField = document.getElementById("cpField");

demoButton.addEventListener("click", (e) => {
  userField.value = "Tom2020";
  bioField.innerHTML =
    "I'm just here for the BABE vibes. I heard there was going to be cake.";
  emailField.value = "tomloan@gmail.com";
  passwordField.value = "tomloan2020";
  cpField.value = "tomloan2020";
});

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signUpForm);
  const userName = formData.get("userName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmedPassword = formData.get("confirmedPassword");
  const bio = formData.get("bio");
  const body = { userName, email, password, confirmedPassword, bio };

  try {
    const res = await fetch("/users", {
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

    localStorage.setItem("MEDIUM_ACCESS_TOKEN", token);
    localStorage.setItem("MEDIUM_USER_ID", id);

    window.location.href = "/";
  } catch (err) {
    if (err.status >= 400 && err.status < 600) {
      const errorJSON = await err.json();
      // console.log(errorJSON);
      // const errorsContainer = document.querySelector(".errors-container");
      const signUpHeader = document.querySelector(".new-user-page");
      const signUpErr = document.querySelector(".signUpErr");
      const invalidCred = document.createElement("div");
      signUpErr.innerHTML = "";
      let errorsHTML = [
        `
                <div>
                    Something went wrong. Please try again.
                </div>
                `,
      ];
      const { errors } = errorJSON;
      console.log(errors);
      if (errors && Array.isArray(errors)) {
        errorsHTML = errors.map((message) => {
          `<li>${message}</li>`;
        });
        invalidCred.setAttribute("style", "font-size: 20px");
        for (let i = 0; i < errorsHTML.length; i++) {
          let errMsg = errorsHTML[i];
          invalidCred.appendChild(errMsg);
        }
        signUpHeader.appendChild(invalidCred);
      } else {
        const invalidCred2 = document.createElement("li");
        invalidCred2.setAttribute("style", "font-size: 20px");
        invalidCred2.innerHTML = errors;
        signUpErr.appendChild(invalidCred2);
        // console.log(errDiv);
      }
    }
  }
});

document.querySelector(".signIn_button").addEventListener("click", () => {
  document.querySelector(".loginPage").classList.remove("unauthorized");
});

document.getElementById("signIn__return").addEventListener("click", () => {
  document.querySelector(".loginPage").classList.add("unauthorized");
  document.querySelector(".loginPrompt").classList.remove("unauthorized");
});
