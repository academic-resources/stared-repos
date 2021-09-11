import React from 'react'
import TodoListItem from './todo_list_item'
import TodoForm from './todo_form'

const TodoList = (props) => {
  // <h3>Todo List goes here!</h3>
  const { todos = [], receiveTodo } = props
  let lis = todos.map( (todo) => {
    return (<TodoListItem 
    key={todo.id}
    todo={todo}
    />)
    // return <li key={todo.id}>{todo.title}</li>
  })
  return (
  <div>
    <h3>My Todos</h3>
    <ul>
      {lis}
    </ul>
    <TodoForm receiveTodo={receiveTodo}/>
  </div>
  )
}

export default TodoList