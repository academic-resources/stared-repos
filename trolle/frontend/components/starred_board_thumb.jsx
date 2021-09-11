import React from 'react'
import { connect } from 'react-redux'
import { unStarBoard } from '../actions/board_actions'

const mdtp = dispatch => ({
  unStarBoard: id => dispatch(unStarBoard(id))
})

const StarredBoardThumb = ({ board, unStarBoard, history }) => {
  const style = {
    background: `url(${board.image})`,
    backgroundColor: '#97a0af',
    backgroundSize: 'cover'
  }

  return (
    <div
      onClick={() => history.push(`/boards/${board.id}`)}
      className="starred-board-thumb"
      style={style}
    >
      <div className="thumb-title">{board.title}</div>
      <i
        className="far fa-star"
        onClick={e => {
          e.stopPropagation()
          unStarBoard(board.id)
        }}
      />
    </div>
  )
}

export default connect(
  null,
  mdtp
)(StarredBoardThumb)
