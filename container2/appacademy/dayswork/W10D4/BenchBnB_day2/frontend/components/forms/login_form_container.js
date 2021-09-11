import { connect } from 'react-redux'
import SessionForm from './session_form'
import { login } from '../../actions/session_actions'

const mstp = (state, ownProps) => ({
  errors: state.errors.session,
  formType: 'login'
})

const mdtp = (dispatch, ownProps) => ({
  processForm: data => dispatch(login(data))
})

export default connect(
  mstp,
  mdtp
)(SessionForm)
