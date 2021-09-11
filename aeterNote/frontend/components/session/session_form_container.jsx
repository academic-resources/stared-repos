import { connect } from 'react-redux';
import {
  login,
  signup,
  removeSessionErrors
} from '../../actions/session_actions';
import SessionForm from './session_form';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  return({
    loggedIn: Boolean(state.session.currentUser),
    errors: state.errors.session,
  });
};

const mapDispatchToProps = (dispatch, { location }) => {
  const formType = (location.pathname.slice(1) === 'login') ? 'Login': 'Sign Up';
  const processForm = (formType === 'Login') ? login : signup;
  return ({
    removeErrors: () => dispatch(removeSessionErrors()),
    processForm: user => dispatch(processForm(user)),
    formType
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm));
