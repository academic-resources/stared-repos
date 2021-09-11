import React from 'react'
import GodsList from './gods/GodsList'
import { Route, Switch } from 'react-router-dom'
import Create from './create/Create'
import Navbar from './navigation/navbar'
import GodDetail from './gods/GodDetail';

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/new" component={Create} />
        <Route exact path="/" component={GodsList} />
        <Route exact path="/gods/:id" component={GodDetail} />
      </Switch>
    </div>
  )
}

export default App
