import { connect } from 'react-redux'
import { login, clearSessionErrors, loginAsHarry } from '../actions/session_actions'
import LoginSignupForm from './login_signup_form'

const mstp = state => ({
  session_errors: state.errors.session,
  formType: 'login'
})

const mdtp = dispatch => ({
  action: newUser => dispatch(login(newUser)),
  clearErrors: () => dispatch(clearSessionErrors()),
  loginAsHarry: () => dispatch(loginAsHarry())
})

export default connect(
  mstp,
  mdtp
)(LoginSignupForm)
