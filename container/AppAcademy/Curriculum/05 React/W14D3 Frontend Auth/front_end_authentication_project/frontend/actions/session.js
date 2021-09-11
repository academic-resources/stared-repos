import * as APIUtil from '../utils/session'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'

export const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user,
})

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
})


// thunk action creators

export const createNewUser = (formUser) => dispatch => APIUtil.postUser(formUser)
  .then(user => dispatch(receiveCurrentUser(user)))

export const login = (formUser) => dispatch => APIUtil.postSession(formUser)
  .then(user => dispatch(receiveCurrentUser(user)))

export const logout = () => dispatch => APIUtil.deleteSession()
  .then(() => dispatch(logoutCurrentUser()))