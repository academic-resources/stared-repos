import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/actions/session';

import { AuthContext } from '../../context/context';

//Mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const SignupForm = (props) => {
  const { setAuthDialog } = useContext(AuthContext)
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      dispatch(sessionActions.signupUser({ email, username, password }))
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
      history.replace('/')
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const handleChange = prop => e => {
    switch (prop) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'username':
        setUsername(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(e.target.value);
        break;
      default:
        return;
    }
  }

  return (
    <>
      <DialogTitle id="form-dialog-title">Log In</DialogTitle>
      <DialogContent>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <DialogContentText>
          To Log In to this website, please enter your email address here.
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            // type="email"
            value={email}
            onChange={handleChange('email')}
            required
            fullWidth
          />
          <TextField
            // autoFocus
            margin="dense"
            id="name"
            label="Username"
            value={username}
            onChange={handleChange('username')}
            required
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            // type="password"
            value={password}
            onChange={handleChange('password')}
            required
            fullWidth
          />
          <TextField
            margin="dense"
            id="confirmPassword"
            label="Confirm Password"
            // type="password"
            value={confirmPassword}
            onChange={handleChange('confirmPassword')}
            required
            fullWidth
          />
          <Button type='submit' color="primary">
            Signup
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAuthDialog(false)} color="primary">
          Cancel
          </Button>
      </DialogActions>
    </>
  );
}

export default SignupForm
