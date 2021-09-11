window.addEventListener('load', (event) => {
  const loginButton = document.getElementById('demoUser');
  const submitButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    usernameInput.value = 'demo_user';
    passwordInput.value = 'password';
    submitButton.click()
  });
});
