import React from 'react'
import { connect } from 'react-redux'
import { getTeams } from '../actions/team_actions'
import { getBoards } from '../actions/board_actions'
import RecentlyViewedBoards from './recently_viewed_boards'
import StarredBoards from './starred_boards'
import PersonalBoards from './personal_boards'
import TeamPanel from './team_panel'
import {
  recentBoards,
  starredBoards,
  personalBoards
} from '../selectors/boards'

import { Link } from 'react-router-dom'

const mstp = state => ({
  teams: Object.values(state.entities.teams),
  recent_boards: recentBoards(state),
  starred_boards: starredBoards(state),
  personal_boards: personalBoards(state),
  all_boards: Object.values(state.entities.boards)
})

const mdtp = dispatch => ({
  getTeams: () => dispatch(getTeams()),
  getBoards: () => dispatch(getBoards())
})

class Boards extends React.Component {
  componentDidMount() {
    this.props.getTeams()
    this.props.getBoards()
  }

  render() {
    const {
      teams,
      recent_boards,
      starred_boards,
      personal_boards,
      history,
      all_boards
    } = this.props
    return (
      <div>
        {starred_boards.length > 0 && (
          <StarredBoards starred_boards={starred_boards} history={history} />
        )}
        {recent_boards.length > 0 && (
          <RecentlyViewedBoards
            recent_boards={recent_boards}
            history={history}
          />
        )}
        {personal_boards.length > 0 && (
          <PersonalBoards
            personal_boards={personal_boards}
            history={history}
            teams={teams}
          />
        )}
        {teams.map(t => {
          const boards = all_boards.filter(b => b.team_id === t.id)
          return (
            <TeamPanel history={history} key={t.id} team={t} boards={boards} />
          )
        })}
        <Link className="create-board-button" to="/boards/new">
          Create new board...
        </Link>
      </div>
    )
  }
}

export default connect(
  mstp,
  mdtp
)(Boards)
