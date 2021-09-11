const demoButton = document.querySelector(".demoButton");
demoButton.addEventListener("click", async (e) => {
    const loginDemo = async () => {
        try {
            const res = await fetch("/users/token", {
                method: "POST",
                body: JSON.stringify({ userName: "Demo", password: "test" }),
                headers: {
                    "Content-Type": "application/json"
                }
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

        } catch {
            console.log(err);
        }
    }
    loginDemo();

});

document.querySelector(".signIn_button").addEventListener("click", () => {
    document.querySelector(".loginPage").classList.remove("unauthorized");
});
document.querySelector(".demoButton").addEventListener("click", () => {
    document.querySelector(".loginPage").classList.remove("unauthorized");
})

document.getElementById("signIn__return").addEventListener("click", () => {
    document.querySelector(".loginPage").classList.add("unauthorized");
    document.querySelector(".loginPrompt").classList.remove("unauthorized");
});
