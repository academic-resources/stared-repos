import React from 'react';

class TodoListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", body: "", done: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uniqueID = this.uniqueID.bind(this);
    this.update = this.update.bind(this);
  }

  uniqueID() {
    return new Date().getTime();
  }

  handleSubmit(e) {
    // debugger
    e.preventDefault();
    const {title, body, done} = this.state;
    this.props.receiveTodo({
      title,
      body,
      done,
      id: this.uniqueID()
    });
    this.setState({ title: "", body: "", done: false, id: null });
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };  
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Title: 
          <input 
            type="text" 
            placeholder="buy milk"
            value={this.state.title}
            onChange={this.update("title")}
          />
        </label>
        <label>Body: 
          <textarea
            value={this.state.body}
            onChange={this.update("body")}>
          </textarea>
        </label>
        <input type="submit" value="Create Todo!"/>
      </form>
    )
  }
}

export default TodoListForm;