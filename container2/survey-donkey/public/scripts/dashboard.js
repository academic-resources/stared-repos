document.addEventListener("DOMContentLoaded", () => {
  const dropDownMenu = document.querySelectorAll(".dropdown");
  const optionsButton = document.querySelectorAll(".button");
  const shareAlert = document.querySelectorAll(".shareAlert");
  const linkCopy = document.getElementById("linkCopy");
  const test = document.getElementById("test");
  const copy = document.getElementById('copy');
  const share= document.getElementById('share');
  const input= document.querySelector('#input')
  const goToSurvey= document.getElementById('goToSurvey')

  share.addEventListener('click', e => {
    let copyText = input;
    copyText.select();
    document.execCommand("copy");
    alert("URL copied to clipboard!");
  })


});
