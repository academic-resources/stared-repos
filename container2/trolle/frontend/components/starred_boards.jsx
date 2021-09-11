import React from 'react'
import StarredBoardThumb from './starred_board_thumb'

export default ({ starred_boards, history }) => (
  <div className="starred-boards">
    <div className="heading">
      <i className="far fa-star" />
      <div className="title">Starred Boards</div>
    </div>
    <div className="boards-holder">
      {starred_boards.map(b => (
        <StarredBoardThumb key={b.id} board={b} history={history} />
      ))}
    </div>
  </div>
)
