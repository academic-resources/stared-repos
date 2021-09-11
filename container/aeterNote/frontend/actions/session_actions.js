import * as APIUtil from '.././util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECIEVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const REMOVE_SESSION_ERRORS = 'REMOVE_ERRORS';
export const LOGOUT = 'LOGOUT';

const receiveCurrentUser = (currentUser) => {

  return {
    type: RECEIVE_CURRENT_USER,
    // currentUser: data.currentUser,
    // notebooks: data.notebooks
    currentUser
  };
};

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

export const removeSessionErrors = () => {
  return {
    type: REMOVE_SESSION_ERRORS
  };
};

export const sessionLogout = () => {
  return {
    type: LOGOUT
  };
};


export const login = user => dispatch => {
  return APIUtil.login(user).then(
    currentUser => dispatch(receiveCurrentUser(currentUser)),
    err => dispatch(receiveErrors(err.responseJSON))
  );
};

export const logout = () => dispatch => {
  return APIUtil.logout().then(dispatch(sessionLogout()));
};

export const signup = user => dispatch => {
  return APIUtil.signup(user).then(
    currentUser => dispatch(receiveCurrentUser(currentUser)),
    err => dispatch(receiveErrors(err.responseJSON))
  );
};
