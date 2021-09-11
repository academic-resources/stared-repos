import { fetch } from "./csrf";

export const SET_USER = "session/SET_USER"
export const USER_LOGOUT = "USER_LOGOUT"

export const userLogout = () => {
  return { type: USER_LOGOUT }
}

export const setUser = (user) => {
  return { type: SET_USER, user };
};

export const loginUser = (credential, password) => async dispatch => {
  const res = await fetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({credential, password}),
  });
  if (res.ok) {
    dispatch(setUser(res.data.user));
  }
};

export const loginDemo = () => async dispatch => {
  const res = await fetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({credential: "demo@email.com", password: "password"}),
  });
  if (res.ok) {
    dispatch(setUser(res.data.user));
  }
};

export const restoreUser = () => async dispatch => {
  const res = await fetch('/api/session');
  dispatch(setUser(res.data.user));
  return res;
};

export const logoutUser = () => async dispatch => {
  const res = await fetch('/api/session', {
    method: 'DELETE',
  });
  if (res.ok) {
    dispatch(userLogout());
    return res;
  }
};

export const signup = (user) => async dispatch => {
  const { email, password, firstName, lastName, artistName } = user;
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      artistName
    }),
  });
  dispatch(setUser(res.data.user));
  return res;
};


const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case SET_USER:
      updateState.user = action.user
      return updateState;
    default:
      return state;
    }
}
