
const dogs = {
  "Corgi": "https://www.akc.org/dog-breeds/cardigan-welsh-corgi/",
  "Australian Shepherd": "https://www.akc.org/dog-breeds/australian-shepherd/",
  "Affenpinscher": "https://www.akc.org/dog-breeds/affenpinscher/",
  "American Staffordshire Terrier": "https://www.akc.org/dog-breeds/american-staffordshire-terrier/",
  "Tosa": "https://www.akc.org/dog-breeds/tosa/",
  "Labrador Retriever": "https://www.akc.org/dog-breeds/labrador-retriever/",
  "French Bulldog": "https://www.akc.org/dog-breeds/french-bulldog/" 
};

const dogLinkCreator = function() {
  const dogLinks = [];

  const dogNames = Object.keys(dogs);
  dogNames.forEach(dog => {
    const a = document.createElement('a');
    a.innerHTML = dog;
    a.href = dogs[dog];
    const li = document.createElement('li');
    li.className = 'dog-link';
    li.appendChild(a);
    dogLinks.push(li);
  });
  return dogLinks;
}

const attachedDogLinks = function() {
  const dogLinks = dogLinkCreator();
  const dropDown = document.querySelector(".drop-down-dog-list");
  dogLinks.forEach( link => {
    dropDown.appendChild(link);
  })
}

const handleEnter = function() {
  const dropDown = document.querySelector(".drop-down-dog-list");
  dropDown.classList.remove('hidden');
}

const handleLeave = function() {
  const dropDown = document.querySelector(".drop-down-dog-list");
  dropDown.classList.add('hidden');
}

attachedDogLinks();

const dropDownDogNav = document.querySelector(".drop-down-dog-nav");
dropDownDogNav.addEventListener('mouseenter', handleEnter);
dropDownDogNav.addEventListener('mouseleave', handleLeave);