import React from 'react'
import { Link } from 'react-router-dom'
import { string } from 'prop-types'

const Nav = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  </nav>
)

Link.propTypes = {
  to: string.isRequired
}

export default Nav
