import * as APIUtil from '../util/session_api_util'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
})

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
})

const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

export const clearErrors = () => ({
  type: CLEAR_ERRORS
})


//thunk action creators

export const login = (user) => (dispatch) => (APIUtil.login(user)
  .then(
    (currentUser) => dispatch(receiveCurrentUser(currentUser)),
    (errors) => dispatch(receiveErrors(errors))
  )
)

export const signup = (user) => (dispatch) => (APIUtil.signup(user)
  .then(
    (currentUser) => dispatch(receiveCurrentUser(currentUser)),
    (errors) => dispatch(receiveErrors(errors))
  )
)

export const logout = () => (dispatch) => (APIUtil.logout()
  .then(
    () => dispatch(logoutCurrentUser()),
    (errors) => dispatch(receiveErrors(errors))
  )
)