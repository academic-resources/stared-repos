import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

const Auth = ({ component: AuthComponent, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      !loggedIn ? <AuthComponent {...props} /> : <Redirect to="/" />
    }
  />
)

const mstp = state => {
  return { loggedIn: !!state.session.id }
}

export const AuthRoute = withRouter(
  connect(
    mstp,
    null
  )(Auth)
)
