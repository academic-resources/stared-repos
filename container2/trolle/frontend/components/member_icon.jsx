import React from 'react'

export default ({ user }) => {
  const initials = user.name
    .split(' ')
    .map(n => n[0].toUpperCase())
    .join('')
  return <div className="profile-btn-icon">{initials}</div>
}
