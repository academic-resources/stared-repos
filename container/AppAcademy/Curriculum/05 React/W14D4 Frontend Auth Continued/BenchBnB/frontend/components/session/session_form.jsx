import React from 'react'
import { Link } from 'react-router-dom'

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state)
    this.props.processForm(user)
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.currentTarget.value
      })
    }
  }
  
  render() {
    let errorsList
    if (this.props.errors.length) {
      errorsList = this.props.errors.map((error, idx) => {
        return <li key={idx}>{error}</li>
      })
    }
    
    const otherLink = this.props.formType === 'signup'
      ? <Link to="/login">Log in</Link>
      : <Link to="/signup">Sign up</Link>
    
    return(
      <div>
        <ul>{errorsList}</ul>

        <form onSubmit={this.handleSubmit}>
          <p>Welcome to Bench BnB!</p>
          <p>Please {this.props.formType} or {otherLink} </p>
          <label>Username:
            <input 
              type="text"
              value={this.state.username}
              onChange={this.update('username')}
            />
          </label>
          <label>Password:
            <input 
              type="password"
              value={this.state.password}
              onChange={this.update('password')}
            />
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default SessionForm;