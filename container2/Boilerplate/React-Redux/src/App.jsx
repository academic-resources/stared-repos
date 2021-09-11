import React, { Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Nav } from './containers'
import { Routes } from './Routes'

import logo from './assets/React-icon.png'

const App = () => (
  <BrowserRouter>
    <main className="container">
      <Nav />
      <Fragment>
        <h1>Hello world!</h1>
        <img className="container__image" alt="react logo" src={logo} />
        <p>If you see this, everything is working!</p>
      </Fragment>
      <Routes />
    </main>
  </BrowserRouter>
)

export default App
