const SAVE_USER = 'user/SAVE_USER';
const LOGOUT_USER = 'user/LOGOUT_USER';

const save_user = (user) => ({
  type: SAVE_USER,
  user,
});

const logout_user = () => ({
  type: LOGOUT_USER,
});

export const saveUser = (user) => async (dispatch) => {
  await dispatch(save_user(user));
  return;
};

export const logoutUser = () => async (dispatch) => {
  await dispatch(logout_user());
  return;
};

// export const login = (user) => async dispatch => {
//     const response = await fetch('/api/auth/login')
//     const res = response.json()
//     dispatch(login_user(res))
//     return res
// }

const initialState = {};

const userReducer = (state = null, action) => {
  let newState;
  switch (action.type) {
    case SAVE_USER: {
      newState = Object.assign({}, state);
      newState = action.user;
      return newState;
    }
    case LOGOUT_USER: {
      newState = initialState;
      return newState;
    }
    default:
      return state;
  }
};

export default userReducer;
