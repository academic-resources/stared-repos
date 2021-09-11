import React from 'react'
import { getMatchingUsers, inviteUsers } from '../actions/user_actions.js'
import { connect } from 'react-redux'
import { merge } from 'lodash'
import UserList from './user_list'

const mstp = (state, { board: { members } }) => ({
  matching_users: Object.values(state.ui.matching_users).filter(
    u => members.indexOf(u.id) === -1
  )
})

const mdtp = dispatch => ({
  getMatchingUsers: (matching, board_id) =>
    dispatch(getMatchingUsers(matching, board_id)),
  inviteUsers: (user_ids, board_id) => dispatch(inviteUsers(user_ids, board_id))
})

class InviteDialog extends React.Component {
  constructor(props) {
    super(props)
    this.handleMemberSelect = this.handleMemberSelect.bind(this)
    this.inviteUsers = this.inviteUsers.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
      selected_users: {},
      matching_string: ''
    }
  }

  inviteUsers(e) {
    e.preventDefault()
    const user_ids = Object.values(this.state.selected_users).map(u => u.id)
    const board_id = this.props.board.id
    this.props.inviteUsers(user_ids, board_id)
    this.props.close()
  }

  handleMemberSelect(user) {
    const newSelected = merge({}, this.state.selected_users)
    newSelected[user.id] = user
    this.setState({
      selected_users: newSelected,
      matching_string: ''
    })
  }

  handleMemberUnselect(user) {
    const newSelected = merge({}, this.state.selected_users)
    delete newSelected[user.id]
    this.setState({
      selected_users: newSelected
    })
  }

  handleInputChange(e) {
    this.setState(
      {
        matching_string: e.target.value
      },
      () => {
        if (this.state.matching_string === '') return
        const board_id = this.props.board.id
        this.props.getMatchingUsers(this.state.matching_string, board_id)
      }
    )
  }

  render() {
    const { matching_users, close } = this.props

    const selectedIcons = Object.values(this.state.selected_users).map(user => (
      <div key={user.id} className="sel">
        {user.name}
        <div onClick={() => this.handleMemberUnselect(user)}>X</div>
      </div>
    ))

    return (
      <div className="invite-dialog">
        <div className="top-row">
          <div className="title">Invite To Board</div>
          <i onClick={close} className="fas fa-times close" />
        </div>
        <form onSubmit={this.inviteUsers}>
          <div className="holder">
            {selectedIcons}
            <input
              className="name"
              type="text"
              value={this.state.matching_string}
              onChange={this.handleInputChange}
            />
          </div>
          {matching_users.length > 0 && this.state.matching_string !== '' && (
            <div className="matches">
              <UserList
                users={matching_users}
                select={this.handleMemberSelect}
              />
            </div>
          )}
          <input
            className={`invite-selected-btn ${
              Object.keys(this.state.selected_users).length > 0
                ? 'enabled'
                : 'disabled'
            }`}
            type="submit"
            value="Send Invitation"
          />
        </form>
      </div>
    )
  }
}

export default connect(
  mstp,
  mdtp
)(InviteDialog)
