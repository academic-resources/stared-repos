import React from 'react'
import BoardThumb from './board_thumb'
import { Link } from 'react-router-dom'

export default ({ personal_boards, history, teams }) => (
  <div className="recent-boards">
    <div className="heading">
      <i className="far fa-user" />
      <div className="title">Personal Boards</div>
    </div>
    <div className="boards-holder">
      {personal_boards.map(b => (
        <BoardThumb key={b.id} board={b} history={history} />
      ))}
      <Link className="create-board-button" to="/boards/new">
        Create new board...
      </Link>
    </div>
  </div>
)
