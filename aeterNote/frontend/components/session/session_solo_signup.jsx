import React from "react";
import SessionForm from "../session/session_form_container";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeSessionErrors } from "../../actions/session_actions";

class SoloSignup extends React.Component {
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
          <p className="greeting">Welcome to æterNote</p>
          <div className="solo-session-template">
            <SessionForm />
          </div>
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  const demo = { email: "pt@barnum.com", password: "circus" };
  return {
    removeErrors: () => dispatch(removeSessionErrors()),
  };
};

export default connect(null, mapDispatchToProps)(SoloSignup);
