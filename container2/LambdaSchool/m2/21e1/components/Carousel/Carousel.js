/* If You've gotten this far, you're on your own! Although we will give you some hints:
    1. You will need to write a function that creates the carousel component, you will find the HTML below.
    2. You will need to grab a reference to all of the images
    3. Create a current index
    4. Those buttons are gonna need some click handlers.
    5. Think of how you would animate this component. Make the cards slide in and out, or fade. It's up to you!
    6. Have fun!
*/

/* HTML:
  <div class="carousel">
    <div class="left-button"> < </div>
    <img src="./assets/carousel/mountains.jpeg" />
    <img src="./assets/carousel/computer.jpeg" />
    <img src="./assets/carousel/trees.jpeg" />
    <img src="./assets/carousel/turntable.jpeg" />
    <div class="right-button"> > </div>
  </div>
*/

function carouselMaker() {
  let carouselCTR = document.querySelector('.carousel-container');
  let divCarousel = carouselCTR.appendChild(document.createElement('div'));
  divCarousel.classList.add('carousel');
  let divLeftButton = divCarousel.appendChild(document.createElement('div'));
  divLeftButton.classList.add('left-button');
  let imgMountains = divCarousel.appendChild(document.createElement('img'));
  imgMountains.src = "./assets/carousel/mountains.jpeg";
  imgMountains.classList.add('imgCarousel');
  imgMountains.style.display = "block";
  imgMountains.id = "0";
  let imgComputer = divCarousel.appendChild(document.createElement('img'));
  imgComputer.src = "./assets/carousel/computer.jpeg";
  imgComputer.classList.add('imgCarousel');
  imgComputer.style.display = "none";
  imgComputer.id = "1";
  let imgTrees = divCarousel.appendChild(document.createElement('img'));
  imgTrees.src = "./assets/carousel/trees.jpeg";
  imgTrees.classList.add('imgCarousel');
  imgTrees.style.display = "none";
  imgTrees.id = "2";
  let imgTurntable = divCarousel.appendChild(document.createElement('img'));
  imgTurntable.src = "./assets/carousel/turntable.jpeg";
  imgTurntable.classList.add('imgCarousel');
  imgTurntable.style.display = "none";
  imgTurntable.id = "3";
  let divRightButton = divCarousel.appendChild(document.createElement('div'));
  divRightButton.classList.add('right-button');

  // get all images
  let carouselImages = document.querySelectorAll('.imgCarousel');
  let currentImage = 0;


  function previousImage() {
    fadeOut(carouselImages[currentImage], 5);
    carouselImages[currentImage].style.display = "none";
    currentImage -= 1;
    if (currentImage === -1) {currentImage = 3;}
    fadeIn(carouselImages[currentImage], 5);
    carouselImages[currentImage].style.display = "block";
  }

  function nextImage() {
    fadeOut(carouselImages[currentImage], 5);
    carouselImages[currentImage].style.display = "none";
    currentImage += 1;    
    if (currentImage === 4) {currentImage = 0;}
    fadeIn(carouselImages[currentImage], 5);
    carouselImages[currentImage].style.display = "block";
  }

  
  divLeftButton.addEventListener(
    "click", () => {
      previousImage();
    });
  divRightButton.addEventListener(
    "click", () => {
      nextImage();
    });

}

function fadeIn(id, spd) {
  console.log("fading in");
	if(id.style.opacity == ""){
		id.style.opacity = 1;
		id.style.filter = "alpha(opacity=" + 100 + ")";
	}
	if(id.style.opacity < 1){
		var opac = 0; // initial opacity
		var cycle = setInterval(increaseOpacity,spd);
		function increaseOpacity() {
			opac += 0.01;
			if(opac >= 1){
				id.style.opacity = 1;
				opac = 1;
				clearInterval(cycle);
			}
			id.style.opacity = opac;
			id.style.filter = "alpha(opacity=" + (opac * 100) + ")"; // IE fallback
		}
	} else {
		clearInterval(cycle);
	}
}

function fadeOut(id,spd){
  console.log("fading out");
	if(id.style.opacity == ""){
		id.style.opacity = 1;
		id.style.filter = "alpha(opacity=" + 100 + ")";
	}
	if(id.style.opacity > 0){
		var opac = 1;
		var cycle = setInterval(decreaseOpacity,spd);
		function decreaseOpacity() {
			opac -= 0.01;
			if(opac <= 0){
				id.style.opacity = 0;
				opac = 0;
				clearInterval(cycle);
			}
			id.style.opacity = opac;
			id.style.filter = "alpha(opacity=" + (opac * 100) + ")";
		}
	} else {
		clearInterval(cycle);
	}
}

carouselMaker();