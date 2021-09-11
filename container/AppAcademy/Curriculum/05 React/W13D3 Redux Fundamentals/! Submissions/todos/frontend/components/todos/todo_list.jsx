import React from 'react'

const TodoList = (props) => {
  // <h3>Todo List goes here!</h3>
  const { todos = [], receiveTodo } = props
  return (
  <div>
    <h3>My Todos</h3>
    <ul>

    </ul>
  </div>
  )
}

export default TodoList