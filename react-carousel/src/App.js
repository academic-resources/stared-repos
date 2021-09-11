import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'

import Carousel from './Carousel'
import Test from './Test'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/">test</Link>{' '}
        <Link to="/demo">demo</Link>
        <Switch>
          <Route exact path="/" component={Test} />
          <Route path="/demo" component={Carousel} />
        </Switch>
      </div>
    )
  }
}

export default App
