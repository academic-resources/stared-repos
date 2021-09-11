import { connect } from 'react-redux'
import SessionForm from './session_form'
import { signup, clearErrors } from '../../actions/session_actions'

const msp = (state, ownProps) => {
  return {
    errors: state.errors.session,
    formType: 'signup'
  }
}

const mdp = (dispatch, ownProps) => ({
  processForm: (user) => dispatch(signup(user)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(msp, mdp)(SessionForm)