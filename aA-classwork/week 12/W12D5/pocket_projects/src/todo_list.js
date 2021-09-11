const todos = JSON.parse(localStorage.getItem("todos")) || [];
const todosUl = document.querySelector('.todos');
const todosForm = document.querySelector('.add-todo-form');

const addTodo = function(event) {
  event.preventDefault();

  const addTodoEl = document.getElementsByName('add-todo')[0];
  const newTodo = { done: false, value: addTodoEl.value };
  todos.push(newTodo);
  addTodoEl.value = "";
  populateList(todos);
  localStorage.setItem("todos", JSON.stringify(todos))
}

const populateList = function(todos) {
  const children = todosUl.children;
  if (children) {
    const childrenArray = Array.from(children);
    childrenArray.forEach(child => {
      child.remove();
    })
  }
  
  todos.forEach( (todo, i) => {
    const label = document.createElement("label");
    label.innerHTML = todo.value;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    // debugger
    if (todos[i].done) checkbox.setAttribute("checked");
    const li = document.createElement("li");
    li.appendChild(label);
    li.appendChild(checkbox);
    todosUl.appendChild(li);
    checkbox.dataset.index = i
  })
}

todosForm.addEventListener("submit", addTodo)

todosUl.addEventListener("click", function(event) {
  if (event.target.type === "checkbox") {
    const index = event.target.dataset.index;
    todos[index].done = (todos[index].done === true ? false : true);
    // debugger
  }
})

populateList(todos)

{/* <input type="checkbox" checked> */}