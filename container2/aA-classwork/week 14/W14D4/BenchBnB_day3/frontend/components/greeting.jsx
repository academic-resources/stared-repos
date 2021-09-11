import React from 'react'
import { Link } from 'react-router-dom'

export default ({ currentUser, logout }) =>
  currentUser ? (
    <div>
      <h1>Welcome, {currentUser.username}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <div>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
    </div>
  )
