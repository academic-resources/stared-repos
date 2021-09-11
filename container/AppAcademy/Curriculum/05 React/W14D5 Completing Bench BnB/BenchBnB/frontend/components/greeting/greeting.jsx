import React from 'react'
import { Link } from 'react-router-dom'

const Greeting = ({ currentUser, logout }) => {
  let dispGreeting
  if (currentUser) {
    dispGreeting =
    <div>
      <h1>Hi, {currentUser.username}!</h1>
      <button onClick={ e => {
        e.preventDefault()
        logout()}}>Log Out</button>
    </div>
  } else {
    dispGreeting =
    <div>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  }
  return (
    <div>
      {dispGreeting}
    </div>
  )
}

export default Greeting