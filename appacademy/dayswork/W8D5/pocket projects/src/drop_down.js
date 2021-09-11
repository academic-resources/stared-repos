const dogs = {
  Corgi: 'https://www.akc.org/dog-breeds/cardigan-welsh-corgi/',
  'Australian Shepherd': 'https://www.akc.org/dog-breeds/australian-shepherd/',
  Affenpinscher: 'https://www.akc.org/dog-breeds/affenpinscher/',
  'American Staffordshire Terrier':
    'https://www.akc.org/dog-breeds/american-staffordshire-terrier/',
  Tosa: 'https://www.akc.org/dog-breeds/tosa/',
  'Labrador Retriever': 'https://www.akc.org/dog-breeds/labrador-retriever/',
  'French Bulldog': 'https://www.akc.org/dog-breeds/french-bulldog/'
}

export const dogLinkCreator = () => {
  const listOfDogs = []
  Object.keys(dogs).forEach(dog => {
    const li = document.createElement('li')
    const anchor = document.createElement('a')
    anchor.innerHTML = dog
    anchor.setAttribute('href', dogs[dog])
    li.classList.add('dog-link')
    li.append(anchor)
    listOfDogs.push(li)
  })

  return listOfDogs
}

export const attachDogLinks = htmlEl => {
  const links = dogLinkCreator()
  links.forEach(link => {
    htmlEl.appendChild(link)
  })
}
