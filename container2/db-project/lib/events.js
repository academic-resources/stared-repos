module.exports = function () {

  var windowWidth = document.body.clientWidth;
  var navInfo     = document.querySelectorAll('.nav .data-link');
  var dataList    = document.querySelector('.data-list-wrap .list');
  var menuToggle  = document.querySelector('#menu-toggle');
  var navWrap     = document.querySelector('.nav-wrapper');

  // event listeners
  [].forEach.call(navInfo, function (el, i) {
    el.addEventListener('click', function () {
      dataList[i].classList.toggle('show')

      if (windowWidth <= 768) {
        if (navWrap.classList.contains('show')) { navWrap.classList.remove('show') }
        if (menuToggle.classList.contains('on')) { menuToggle.classList.remove('on') }
      }
    })
  })

  menuToggle.addEventListener('click', function () {
    this.classList.toggle('on')
    navWrap.classList.toggle('show')
  })
}

