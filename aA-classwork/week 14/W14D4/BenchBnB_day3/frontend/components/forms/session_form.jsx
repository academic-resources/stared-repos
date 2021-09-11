import React from 'react'
import { Link } from 'react-router-dom'

class SessionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const user = Object.assign({}, this.state)
    this.props.processForm(user).then(user => this.props.history.push('/'))
  }

  handleChange(field) {
    return e => {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  render() {
    const { formType, errors } = this.props
    const formText = formType === 'signup' ? 'Sign Up' : 'Login'
    const linkText = formType === 'signup' ? 'Login' : 'Sign Up'
    const linkRoute = formType === 'signup' ? '/login' : '/signup'
    return (
      <div>
        <h1>{formText}</h1>
        <Link to={linkRoute}>{linkText}</Link>
        {errors && (
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        )}
        <form>
          <label>
            Username
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange('username')}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange('password')}
            />
          </label>
          <button onClick={this.handleSubmit}>{formText}</button>
        </form>
      </div>
    )
  }
}

export default SessionForm
