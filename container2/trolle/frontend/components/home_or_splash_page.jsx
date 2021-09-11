import React from 'react'
import { connect } from 'react-redux'
import HomePage from './home_page'
import SplashPage from './splash_page'
import Navbar from './navbar'

const mstp = state => ({
  isLoggedIn: !!state.session.id
})

const hs = props => (
  <div>
    <Navbar isLoggedIn={props.isLoggedIn} />
    <div className="main">
      {props.isLoggedIn ? <HomePage {...props} /> : <SplashPage />}
    </div>
  </div>
)

export default connect(mstp)(hs)
