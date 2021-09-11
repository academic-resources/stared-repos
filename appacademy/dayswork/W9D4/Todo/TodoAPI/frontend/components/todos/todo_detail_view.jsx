import React from 'react'
import StepList from '../steps/step_list'

const TodoDetailView = ({ todo, removeTodo }) => {
  return (
    <div>
      <h4>{todo.title}</h4>
      <p>{todo.body}</p>
      <StepList todo_id={todo.id} />
      <button onClick={() => removeTodo(todo)}>X</button>
    </div>
  )
}

export default TodoDetailView
