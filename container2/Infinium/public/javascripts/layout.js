window.addEventListener("DOMContentLoaded", (event) => {

  if (document.querySelector(".dropdown")){
    document.querySelector(".icons_image").addEventListener("click", event => {
      event.preventDefault();
      document.getElementById('myDropdown').classList.toggle("show")
    })


    document.addEventListener('click', event => {
      const drop = document.getElementById('myDropdown');
      //drop only exists for a logged in user
      if(!event.target.matches('.icons_image')) {
        if (drop.classList.contains('show')) {
          drop.classList.remove('show');
        }
      }
    })
  }
  //Check for the dropdown form element for logout
  const dropDownLogout = document.getElementById('dropdown-logout');
  if (dropDownLogout) {
    document.querySelector('.dropdown-logout').addEventListener('click', e =>{
      e.preventDefault()
      dropDownLogout.submit();
    })
  }
});
