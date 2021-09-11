import Clock from './clock'
import { attachDogLinks } from './drop_down'
import { debounce } from './slide_scroll'
import { htmlGenerator } from './warmup'

const h1 = document.getElementById('party')

htmlGenerator('Hello from Index', h1)
const clock = document.getElementById('clock')

const clockLogic = new Clock()
setInterval(() => {
  htmlGenerator(clockLogic.currentTime(), clock)
})

const dogList = document.getElementsByClassName('drop-down-dog-list')[0]

attachDogLinks(dogList)

const h3 = document.querySelector('h3')

let visited_h3 = false

document.addEventListener('DOMContentLoaded', () => {
  dogList.setAttribute('style', 'display: none')
})

h3.addEventListener('mouseenter', () => {
  dogList.setAttribute('style', 'display: block')
  visited_h3 = true
})

dogList.addEventListener('mouseleave', () => {
  dogList.setAttribute('style', 'display: none')
  visited_h3 = false
})

dogList.addEventListener('mouseenter', () => {
  if (visited_h3) dogList.setAttribute('style', 'display: block')
})

const toDos = JSON.parse(localStorage.getItem('todos')) || []
const ul = document.getElementsByClassName('todos')[0]
const form = document.getElementsByClassName('add-todo-form')[0]
const submitButton = form.querySelector('[type="submit"]')
submitButton.addEventListener('click', event => {
  event.preventDefault()
  addTodo()
  populateList()
})

ul.addEventListener('click', event => {
  const target = event.target
  if (target.hasAttribute('data-task')) {
    // { value: todoInput.value, done: false }
    const todo = toDos.filter(t => t.value === target.dataset.task)[0]
    todo.done = !todo.done
    populateList()
  }
})

const addTodo = () => {
  const todoInput = form.querySelector('[name="add-todo"]')
  const newTodo = { value: todoInput.value, done: false }
  toDos.push(newTodo)
  todoInput.value = ''
}

const populateList = () => {
  localStorage.setItem('todos', JSON.stringify(toDos))
  ul.innerHTML = ''
  const lis = toDos.map(todo => {
    const label = document.createElement('label')
    label.innerHTML = todo.value
    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    input.setAttribute('data-task', todo.value)
    if (todo.done) input.setAttribute('checked', 'checked')
    const li = document.createElement('li')
    li.appendChild(label)
    li.appendChild(input)
    return li
  })
  lis.forEach(li => {
    ul.appendChild(li)
  })
}
populateList()

const images = document.querySelectorAll('img')
window.addEventListener('scroll', e => {
  images.forEach(img => {
    const verticalDiff = Math.abs(img.y - window.scrollY)
    if (verticalDiff < 100) debounce(img.classList.add('active'))
  })
})

const input = document.getElementsByClassName('search')[0]

// debounce missing
input.addEventListener('input', e =>
  fetch('https://pokeapi.co/api/v2/pokemon/?offset=150&limit=150')
    .then(function(response) {
      return response.json()
    })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson))
    })
)
