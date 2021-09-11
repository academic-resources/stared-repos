import * as SessionUtil from '../util/session_api_util'
import { Session } from 'inspector'
// action types
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'

// regular action creators

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
})

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
})

export const receiveErrors = errs => ({
  type: RECEIVE_ERRORS,
  errs
})

//thunk action creators

export const login = user => dispatch =>
  SessionUtil.login(user).then(
    user => dispatch(receiveCurrentUser(user)),
    err => dispatch(receiveErrors(err))
  )
export const signup = user => dispatch =>
  SessionUtil.signup(user).then(
    user => dispatch(receiveCurrentUser(user)),
    err => dispatch(receiveErrors(err))
  )

export const logout = () => dispatch =>
  SessionUtil.logout().then(
    () => dispatch(logoutCurrentUser()),
    err => dispatch(receiveErrors(err))
  )
