
const dogs = {
  "Corgi": "https://www.akc.org/dog-breeds/cardigan-welsh-corgi/",
  "Australian Shepherd": "https://www.akc.org/dog-breeds/australian-shepherd/",
  "Affenpinscher": "https://www.akc.org/dog-breeds/affenpinscher/",
  "American Staffordshire Terrier": "https://www.akc.org/dog-breeds/american-staffordshire-terrier/",
  "Tosa": "https://www.akc.org/dog-breeds/tosa/",
  "Labrador Retriever": "https://www.akc.org/dog-breeds/labrador-retriever/",
  "French Bulldog": "https://www.akc.org/dog-breeds/french-bulldog/" 
};

function dogLinkCreator (dogs) {
  const dogArray = []

  Object.keys(dogs).forEach ((dog) => {
    const a = document.createElement('a')
    a.innerHTML = dog
    a.setAttribute('href', dogs[dog])
    const li = document.createElement('li')
    li.className += ' dog-link'
    li.appendChild(a)
    dogArray.push(li)
  })
  return dogArray
}

export function attachDogLinks() {
  const dogLinks = dogLinkCreator(dogs);
  let ul = document.getElementsByClassName('drop-down-dog-list')[0]
  dogLinks.forEach(li => {
    ul.appendChild(li)
  })
  dogLinksEventListener()
}

function handleEnter () {
  let lis = Array.from(document.getElementsByClassName('dog-link'))
  lis.forEach( li => {
    li.className += ' visible'
  })
}

function handleLeave () {
  let lis = Array.from(document.getElementsByClassName('dog-link'))
  const liAllClasses = lis[0].className
  let liClassNames = liAllClasses.split(' ')
  let liVisibleIdx = liClassNames.indexOf('visible')
  liClassNames.splice(liVisibleIdx, 1)
  let liClassName = liClassNames.join(' ')
  lis.forEach( li => {
    li.className = liClassName
  })
}

function dogLinksEventListener () {
  let nav = document.getElementsByClassName('drop-down-dog-nav')[0]
  nav.addEventListener('mouseenter', handleEnter)
  nav.addEventListener('mouseleave', handleLeave)
}

attachDogLinks();