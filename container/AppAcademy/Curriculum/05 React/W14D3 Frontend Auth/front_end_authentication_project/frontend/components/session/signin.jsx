import React from 'react'

class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.loginUser(this.state)
      .then(() => this.props.history.push('/chirps'))
  }
  
  render () {
    // debugger
    return (
      <div className="session-form">
        <h2>Sign In!</h2> 
        <form>
          <label>Username:
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleInput('username')}
              />
          </label>
          {/* <label>Email:
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleInput('email')}
              />
          </label> */}
          <label>Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleInput('password')}
              />
          </label>
          <button onClick={this.handleSubmit}>Sign In</button>
        </form>
      </div>
    )
  }
}

export default Signin