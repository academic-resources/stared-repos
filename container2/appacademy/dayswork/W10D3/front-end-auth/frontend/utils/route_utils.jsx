import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, withRouter } from 'react-router-dom'

const mstp = (state, ownProps) => ({
  loggedIn: !!state.session.currentUser
})

const mstp2 = (state, ownProps) => ({
  condition: ownProps.selector(state)
})

const Auth = ({ loggedIn, path, component: Component }) => (
  <Route
    path={path}
    render={props =>
      loggedIn ? <Redirect to="/" /> : <Component {...props} />
    }
  />
)

const Protected = ({ loggedIn, path, component: Component }) => (
  <Route
    path={path}
    render={props =>
      loggedIn ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
)

const Conditional = ({
  condition,
  path,
  yesC: YesComponent,
  noC: NoComponent
}) => (
  <Route
    path={path}
    render={props =>
      condition ? <YesComponent {...props} /> : <NoComponent {...props} />
    }
  />
)

// @ts-ignore
export const AuthRoute = withRouter(connect(mstp)(Auth))
// @ts-ignore
export const ProtectedRoute = withRouter(connect(mstp)(Protected))
// @ts-ignore
export const ConditionalRoute = withRouter(connect(mstp2)(Conditional))
