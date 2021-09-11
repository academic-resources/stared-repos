import * as SessionUtil from '../util/session_api_util'
// action types
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'

// regular action creators

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
})

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
})

export const receiveSessionErrors = errs => ({
  type: RECEIVE_SESSION_ERRORS,
  errs: errs.responseJSON
})

//thunk action creators

export const login = user => dispatch =>
  SessionUtil.login(user).then(
    user => dispatch(receiveCurrentUser(user)),
    err => dispatch(receiveSessionErrors(err))
  )
export const signup = user => dispatch =>
  SessionUtil.signup(user).then(
    user => dispatch(receiveCurrentUser(user)),
    err => dispatch(receiveSessionErrors(err))
  )

export const logout = () => dispatch =>
  SessionUtil.logout().then(
    () => dispatch(logoutCurrentUser()),
    err => dispatch(receiveSessionErrors(err))
  )
