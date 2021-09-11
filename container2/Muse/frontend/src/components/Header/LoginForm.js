import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/actions/session';
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../../context/context';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const LoginForm = (props) => {
  const { setAuthDialog } = useContext(AuthContext)
  const dispatch = useDispatch();
  const history = useHistory();

  const [credential, setCredential] = useState('demo@demo.demo');
  const [password, setPassword] = useState('Darks@8927');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.loginUser({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
    setAuthDialog(false);
    history.push('muse-lab')
  };

  const handleSignup = () => {
    props.setWhichDialog('signup')
  }

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'email':
        setCredential(e.target.value)
        return;
      case 'password':
        setPassword(e.target.value)
        return;
      default:
        return;
    }
  }

  return (
    <>
      <DialogTitle id="form-dialog-title">Log In</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To Log In to this website, please enter your email address here.
          </DialogContentText>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type='text'
            value={credential}
            onChange={e => handleChange(e)}
            required
            fullWidth
          // color={'red'}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={e => handleChange(e)}
            required
            fullWidth
          />
          <Button type='submit' color="primary">
            Login
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAuthDialog(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSignup} color="primary">
          Signup?
        </Button>
      </DialogActions>
    </>
  );
}

export default LoginForm
