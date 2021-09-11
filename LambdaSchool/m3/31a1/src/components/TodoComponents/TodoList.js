import React from 'react';
import Todo from './Todo.js';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
          };
  }

  render() {
    return (
      <div>
        <h2>Click to Complete a Todo:</h2>
        <ul>
            {
                this.props.data.map(
                todoItem => (
                    <Todo key={todoItem.id} todoItem={todoItem} toggleComplete={this.props.toggleComplete} />
                )
                )
            }
        </ul>
      </div>
    );
  }
}


export default TodoList;