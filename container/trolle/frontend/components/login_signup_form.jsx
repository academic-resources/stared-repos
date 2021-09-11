import React from 'react'
import { Link } from 'react-router-dom'
import ErrorBlock from './error_block'

class LoginSignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitOK: false,
      name: '',
      email: '',
      password: ''
    }
    this.checkButtonState = this.checkButtonState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  checkButtonState() {
    const { formType } = this.props
    const isLogin = formType === 'login'
    const submitOK =
      (isLogin ? true : this.state.name) &&
      this.state.email &&
      this.state.password
    this.setState({ submitOK })
  }

  handleSubmit() {
    if (this.state.submitOK) {
      const { name, email, password } = this.state
      const user = {
        name,
        email,
        password
      }
      this.props.clearErrors()
      this.props.action(user).then(u => this.props.history.push('/boards'))
    }
  }

  handleUpdate(field) {
    return e => {
      this.setState(
        {
          [field]: e.target.value
        },
        this.checkButtonState
      )
    }
  }

  render() {
    const {
      session_errors: errors,
      formType,
      loginAsHarry,
      clearErrors
    } = this.props

    const isLogin = formType === 'login'
    const headingText = isLogin ? 'Log in to Trolle' : 'Create a Trolle Account'
    const altText = isLogin
      ? 'or create an account'
      : 'or sign in to your account'
    const altURL = isLogin ? '/signup' : '/login'
    const buttonText = isLogin ? 'Log In' : 'Create New Account'

    return (
      <div className="login-form">
        <div className="contents-wrapper">
          {errors.length > 0 && <ErrorBlock errors={errors} />}
          <h1>{headingText}</h1>
          <div onClick={clearErrors}>
            <Link className="create-link" to={altURL}>
              {altText}
            </Link>
          </div>
          <form onSubmit={this.handleSubmit}>
            {!isLogin && (
              <fieldset>
                <label>Name</label>
                <input
                  type="text"
                  value={this.state.name}
                  onChange={this.handleUpdate('name')}
                  placeholder="e.g., Harry Houdini"
                />
              </fieldset>
            )}
            <fieldset>
              <label>Email {isLogin && <span>(or username)</span>}</label>
              <input
                type="text"
                value={this.state.email}
                onChange={this.handleUpdate('email')}
                placeholder="e.g., harry@gcloud.ai"
              />
            </fieldset>
            <fieldset>
              <label>Password</label>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleUpdate('password')}
              />
            </fieldset>

            <input
              className={
                this.state.submitOK ? 'button submit-ok' : 'button disabled'
              }
              type="submit"
              value={buttonText}
            />
          </form>
          <div onClick={loginAsHarry} className="demo-user">
            Log in as a Demo User
          </div>
        </div>
      </div>
    )
  }
}

export default LoginSignupForm
