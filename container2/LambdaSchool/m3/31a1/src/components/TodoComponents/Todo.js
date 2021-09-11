import React from 'react';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
          };
  }
  
    
  render() {
      return (
        <li style={this.props.todoItem.completed ? { textDecoration: 'line-through' } : null}
      onClick={() => this.props.toggleComplete(this.props.todoItem.id)}>{this.props.todoItem.task}</li>
    );
  }
}

export default Todo;