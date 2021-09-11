import React from 'react';
import TodoListItem from './todo_list_item';
import {receiveTodo, removeTodo} from '../../actions/todo_actions';
import TodoListForm from './todo_form_container';

const Todo = ({todos}) => {
  const todoLis = todos.map((todo, i) => {
    return <TodoListItem todo={todo} key={i} removeTodo={removeTodo}/>;
  })

  return (
    <div>
      <ul>
        {todoLis}
      </ul>
      <TodoListForm receiveTodo={receiveTodo}/>
    </div>
  )
}

export default Todo;