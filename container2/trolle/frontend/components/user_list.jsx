import React from 'react'
import MemberIcon from './member_icon'

export default ({ users, select }) => (
  <ul className="users-list">
    {users.map(u => (
      <li key={u.id} onClick={() => select(u)}>
        <div className="profile-btn-bg">
          <MemberIcon user={u} />
        </div>
        <span>{u.name}</span>
      </li>
    ))}
  </ul>
)
