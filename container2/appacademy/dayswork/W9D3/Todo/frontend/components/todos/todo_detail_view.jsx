import React from 'react'

const TodoDetailView = ({ todo, removeTodo }) => {
  return (
    <div>
      <h4>{todo.title}</h4>
      <p>{todo.body}</p>
      <button onClick={() => removeTodo(todo)}>X</button>
    </div>
  )
}

export default TodoDetailView