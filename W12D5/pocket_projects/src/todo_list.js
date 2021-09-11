// let todoButton = document.getElementsByClassName("add-todo-form")

const todos = []
const ul = document.getElementsByClassName('todos')[0]
ul.addEventListener('onChange', handleCheckBox)

export const addTodo = () => {
  const form = document.getElementsByClassName("add-todo-form")[0]
  form.addEventListener("submit", handleButton)
  
}

const handleButton = (e) => {
  e.preventDefault();
  const input = document.getElementsByName("add-todo")[0].value
  let todoObj = { task: input, done: false }
  todos.push(todoObj)
  document.getElementsByName("add-todo")[0].value = ''
  populateList(todos)
}

function handleCheckBox (e) {
  console.log('inside handleCheckbox')
  console.log(e.currentTarget)
}

const populateList = (todos) => {
  let todoLis = todos.map (todo => {
    const label = document.createElement('label')
    label.textContent = todo.task
    const checkBoxInput = document.createElement('input')
    checkBoxInput.type = 'checkbox'
    checkBoxInput.checked = todo.done
    const li = document.createElement('li')
    li.appendChild(label)
    li.appendChild(checkBoxInput)
    return li
  })
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
  // console.log()
  // ul.children.forEach( li => {

  // })
  // console.log(todoLis)
  todoLis.forEach( li => {
    ul.appendChild(li)
  })
}

addTodo()