import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

const mstp = state => ({ isLoggedIn: !!state.session.id })

const Auth = ({ component: Component, path, isLoggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      !isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
)

const Protected = ({ component: Component, path, isLoggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
)

export const AuthRoute = withRouter(connect(mstp)(Auth))

export const ProtectedRoute = withRouter(connect(mstp)(Protected))
