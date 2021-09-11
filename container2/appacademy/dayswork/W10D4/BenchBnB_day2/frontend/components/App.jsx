import React from 'react'
import GreetingContainer from './greeting_container'
import { AuthRoute } from '../util/route_util'
import { Route } from 'react-router-dom'
import LoginFormContainer from './forms/login_form_container'
import SignupFormContainer from './forms/signup_form_container'
import SearchContainer from './search_container'

const App = () => (
  <div>
    <header>
      <h1>Bench BnB</h1>
      <GreetingContainer />
    </header>
    <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} />
    <Route exact path='/' component={SearchContainer} />
  </div>
)

export default App
