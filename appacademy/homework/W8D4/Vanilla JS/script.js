document.addEventListener('DOMContentLoaded', () => {
  // toggling restaurants

  const toggleLi = e => {
    const li = e.target
    if (li.className === 'visited') {
      li.className = ''
    } else {
      li.className = 'visited'
    }
  }

  document.querySelectorAll('#restaurants li').forEach(li => {
    li.addEventListener('click', toggleLi)
  })

  // adding SF places as list items

  const input = document.querySelector('input[type="text"]')
  const btn = document.querySelector('input[type="submit"]')
  const list = document.getElementById('sf-places')
  btn.addEventListener('click', e => {
    e.preventDefault()
    const data = input.value
    const new_li = document.createElement('li')
    new_li.textContent = data
    input.value = ''
    list.appendChild(new_li)
  })

  // adding new photos
  const photo_form_btn = document.querySelector('.photo-show-button')
  const photo_form = document.querySelector('.photo-form-container')

  photo_form_btn.addEventListener('click', e => {
    photo_form.classList.toggle('hidden')
  })

  const input_puppy = document.querySelector('.photo-url-input')
  const btn_puppy = document.querySelector('.photo-url-submit')
  const list_puppy = document.querySelector('.dog-photos')
  btn_puppy.addEventListener('click', e => {
    e.preventDefault()
    const data_puppy = input_puppy.value
    const new_li_puppy = document.createElement('li')
    new_li_puppy.innerHTML = `<img src="${data_puppy}">`
    input_puppy.value = ''
    list_puppy.appendChild(new_li_puppy)
  })
})
