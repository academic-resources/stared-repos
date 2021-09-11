import React from 'react'
import TodoForm from './todo_form'
import TodoListItem from './todo_list_item'

class TodoList extends React.Component {
  componentDidMount() {
    const { fetchTodos } = this.props
    fetchTodos()
    this.interval = setInterval(fetchTodos, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { todos, receiveTodo, createTodo, errors } = this.props

    return (
      <div>
        <ul>
          {todos.map(todo => (
            <TodoListItem todo={todo} key={todo.id} />
          ))}
        </ul>
        <TodoForm
          receiveTodo={receiveTodo}
          createTodo={createTodo}
          errors={errors}
        />
      </div>
    )
  }
}

export default TodoList
