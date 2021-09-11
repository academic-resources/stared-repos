import { connect } from 'react-redux'
import {
  signup,
  clearSessionErrors,
  loginAsHarry
} from '../actions/session_actions'
import LoginSignupForm from './login_signup_form'

const mstp = state => ({
  session_errors: state.errors.session,
  formType: 'signup'
})

const mdtp = dispatch => ({
  action: newUser => dispatch(signup(newUser)),
  clearErrors: () => dispatch(clearSessionErrors()),
  loginAsHarry: () => dispatch(loginAsHarry())
})

export default connect(
  mstp,
  mdtp
)(LoginSignupForm)
