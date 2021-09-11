import { connect } from 'react-redux'
import SessionForm from './session_form'
import { login, clearErrors } from '../../actions/session_actions'

const msp = (state, ownProps) => ({
  errors: state.errors.session,
  formType: 'login'
})

const mdp = (dispatch, ownProps) => ({
  processForm: (user) => dispatch(login(user)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(msp, mdp)(SessionForm)