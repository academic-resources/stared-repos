import { connect } from 'react-redux'
import SessionForm from './session_form'
import { signup } from '../../actions/session_actions'

const mstp = (state, ownProps) => ({
  errors: state.errors.session,
  formType: 'signup'
})

const mdtp = (dispatch, ownProps) => ({
  processForm: data => dispatch(signup(data))
})

export default connect(
  mstp,
  mdtp
)(SessionForm)
