import * as ApiUtil from "../utils/session"

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER"
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER"

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
})

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
})

export const createNewUser = formUser => dispatch =>
  ApiUtil.postUser(formUser).then(user => dispatch(receiveCurrentUser(user)))

export const login = formUser => dispatch =>
  ApiUtil.postSession(formUser).then(user => dispatch(receiveCurrentUser(user)))

export const logout = () => dispatch =>
  ApiUtil.deleteSession().then(() => dispatch(logoutCurrentUser()))
