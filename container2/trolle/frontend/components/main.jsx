import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomeOrSplash from './home_or_splash_page'

export default () => (
  <div>
    <Switch>
      <Route path="/" component={HomeOrSplash} />
    </Switch>
  </div>
)
