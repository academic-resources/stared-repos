import React from 'react'
import { logout } from '../actions/session_actions'
import { connect } from 'react-redux'

const mdtp = dispatch => ({
  logout: () => dispatch(logout())
})

const ProfileMenu = ({ logout, currentUser, toggleProfileMenu }) => (
  <div className="profile-menu">
    <div className="profile-info">
      {`${currentUser.name} (${currentUser.username})`}
      <span onClick={toggleProfileMenu}>X</span>
    </div>
    <hr />
    <div className="profile-menu-item">Something Else</div>
    <div className="profile-menu-item">Something Else</div>
    <div className="profile-menu-item">Something Else</div>
    <hr />
    <div className="profile-menu-item">Something Else</div>
    <div className="profile-menu-item">Something Else</div>
    <div className="profile-menu-item">Something Else</div>
    <hr />
    <div
      className="profile-menu-item profile-menu-item-last "
      onClick={() => {
        logout()
        toggleProfileMenu()
      }}
    >
      Log Out
    </div>
  </div>
)

export default connect(
  null,
  mdtp
)(ProfileMenu)
