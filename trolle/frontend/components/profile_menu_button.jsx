import React from 'react'
import ProfileMenu from './profile_menu'
import { connect } from 'react-redux'
import { toggleProfileMenu } from '../actions/ui_actions'

const mstp = state => ({
  isOpen: !!state.ui.nav.profile_menu,
  currentUser: state.entities.users[state.session.id]
})

const mdtp = dispatch => ({
  toggleProfileMenu: () => dispatch(toggleProfileMenu())
})

class ProfileMenuButton extends React.Component {
  constructor(props) {
    super(props)
    this.checkForMenuClose = this.checkForMenuClose.bind(this)
    this.node = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.checkForMenuClose)
  }

  componentWillUnMount() {
    document.removeEventListener('mousedown', this.checkForMenuClose)
  }

  checkForMenuClose(e) {
    if (this.node.current && !this.node.current.contains(e.target)) {
      this.props.toggleProfileMenu()
    }
  }

  render() {
    const { toggleProfileMenu, isOpen, currentUser } = this.props
    const initials = currentUser.name
      .split(' ')
      .map(n => n[0].toUpperCase())
      .join('')
    return (
      <div className="profile-btn-bg">
        <div className="profile-btn-icon" onClick={toggleProfileMenu}>
          {initials}
        </div>
        {isOpen && (
          <div ref={this.node}>
            <ProfileMenu
              currentUser={currentUser}
              toggleProfileMenu={toggleProfileMenu}
            />
          </div>
        )}
      </div>
    )
  }
}

export default connect(
  mstp,
  mdtp
)(ProfileMenuButton)
