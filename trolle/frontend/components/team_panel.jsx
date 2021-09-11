import React from 'react'
import BoardThumb from './board_thumb'
import { Link } from 'react-router-dom'

export default ({ team, boards, history }) => (
  <div className="team-panels">
    <div className="heading">
      <i className="fas fa-user-friends" />
      <div className="title">{team.title}</div>
      <Link className="team-button" to={`/teams/${team.id}/boards`}>
        <div className="board-btn-icon" />
        Boards
      </Link>
      <Link className="team-button" to={`/teams/${team.id}/members`}>
        <i className="far fa-user members" />
        Members <span>({team.num_members})</span>
      </Link>
    </div>
    <div className="boards-holder">
      {boards.map(b => (
        <BoardThumb key={b.id} board={b} history={history} />
      ))}
    </div>
  </div>
)
