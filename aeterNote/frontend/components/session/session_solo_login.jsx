import React from "react";
import SessionForm from "../session/session_form_container";
import { Link } from "react-router-dom";
import { login, removeSessionErrors } from "../../actions/session_actions";
import { connect } from "react-redux";

class SoloLogin extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.removeErrors();
  }

  render() {
    return (
      <div className="solo-session-bg">
        <div className="solo-session">
          <img src={window.staticImages.logoMain} />
          <p className="greeting">Welcome back to æterNote</p>
          <div className="solo-session-template">
            <SessionForm />
            <p>or</p>
            <button onClick={this.props.demoLogin}> Demo Login </button>
          </div>
          <p>New to æterNote?</p>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  const demo = { email: "pt@barnum.com", password: "circus" };
  return {
    demoLogin: () => dispatch(login(demo)),
    removeErrors: () => dispatch(removeSessionErrors()),
  };
};

export default connect(null, mapDispatchToProps)(SoloLogin);
