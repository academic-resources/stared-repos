import { connect } from 'react-redux'
import { login } from '../../actions/session'
import Signin from './signin'

const msp = (state) => ({
  currentUser: state.session.currentUser
})

const mdp = (dispatch) => ({
  loginUser: (formUser) => dispatch(login(formUser))
})

export default connect(null, mdp)(Signin)