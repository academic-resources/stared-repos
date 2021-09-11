import React from 'react'
import TodoForm from './todo_form'
import TodoListItem from './todo_list_item'

const TodoList = ({ todos, receiveTodo }) => {

  return (
      <div>
        <ul>
          {todos.map(todo => (
            <TodoListItem todo={todo} key={todo.id} />
          ))}
        </ul>
        <TodoForm receiveTodo={receiveTodo} />
      </div>
    )
  }

export default TodoList
