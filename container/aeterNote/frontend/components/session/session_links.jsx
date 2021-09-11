import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';

class SessionLinks extends React.Component {
  constructor(props) {

    super(props);
  }

  render(){
    return(
      <nav className='login-signup'>
        <Link id='login' to='/login'>Login</Link>
        <button onClick={this.props.demoLogin} > Demo Login </button>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  const demo = {email: 'pt@barnum.com', password: 'circus'};
  return {
    demoLogin: () => dispatch(login(demo))
  };
};



export default connect(null, mapDispatchToProps)(SessionLinks);
