import React from 'react'
import { connect } from 'react-redux'
import { getMembers } from '../actions/board_actions'
import MemberIcon from './member_icon'

const mstp = (state, ownProps) => ({
  members: Object.values(state.entities.users).filter(
    u => ownProps.board.members.indexOf(u.id) >= 0
  )
})

const mdtp = dispatch => ({
  getMembers: id => dispatch(getMembers(id))
})

class IconList extends React.Component {
  componentDidMount() {
    this.props.getMembers(this.props.board.id)
  }

  render() {
    return (
      <ul className="icon-list">
        {this.props.members.map(m => (
          <li key={m.id} className="profile-btn-bg">
            <MemberIcon user={m} />
          </li>
        ))}
      </ul>
    )
  }
}

export default connect(
  mstp,
  mdtp
)(IconList)
