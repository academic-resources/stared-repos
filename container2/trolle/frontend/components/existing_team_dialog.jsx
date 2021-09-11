import React from 'react'
import { Link } from 'react-router-dom'

export default ({ team, close, showChangeDialog }) => {
  return (
    <div className="existing-team">
      <div className="top-row">
        <div className="title">{team.title}</div>
        <i onClick={close} className="fas fa-times close" />
      </div>
      <div onClick={showChangeDialog} className="change-team">
        Change Team...
      </div>
      <Link to={`/teams/${team.id}`}>View Team Page</Link>
    </div>
  )
}
