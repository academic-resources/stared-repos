import React from 'react'
import InviteDialog from './invite_dialog'

class InviteButton extends React.Component {
  constructor(props) {
    super(props)
    this.toggleInviteDialog = this.toggleInviteDialog.bind(this)
    this.checkForDialogClose = this.checkForDialogClose.bind(this)
    this.node = React.createRef()
    this.state = {
      open: false
    }
  }

  toggleInviteDialog() {
    this.setState({
      open: !this.state.open
    })
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.checkForDialogClose)
  }

  componentWillUnMount() {
    document.removeEventListener('mousedown', this.checkForDialogClose)
  }

  checkForDialogClose(e) {
    if (
      this.node &&
      this.node.current &&
      !this.node.current.contains(e.target) &&
      this.state.open
    ) {
      this.setState({
        open: false
      })
    }
  }

  render() {
    return (
      <div className="invite-btn" ref={this.node}>
        <div onClick={this.toggleInviteDialog} className="label">
          Invite
        </div>
        {this.state.open && (
          <InviteDialog
            board={this.props.board}
            close={this.toggleInviteDialog}
          />
        )}
      </div>
    )
  }
}

export default InviteButton
