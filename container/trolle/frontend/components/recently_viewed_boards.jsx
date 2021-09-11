import React from 'react'
import BoardThumb from './board_thumb'

export default ({ recent_boards, history }) => (
  <div className="recent-boards">
    <div className="heading">
      <i className="far fa-clock" />
      <div className="title">Recently Viewed</div>
    </div>
    <div className="boards-holder">
      {recent_boards.map(b => (
        <BoardThumb key={b.id} board={b} history={history} />
      ))}
    </div>
  </div>
)
