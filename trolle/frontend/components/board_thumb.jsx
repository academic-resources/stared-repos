import React from 'react'
import { connect } from 'react-redux'
import { starBoard, addBoardToRecent } from '../actions/board_actions'

const mdtp = dispatch => ({
  starBoard: id => dispatch(starBoard(id)),
  addBoardToRecent: id => dispatch(addBoardToRecent(id))
})

const BoardThumb = ({ board, starBoard, history, addBoardToRecent }) => {
  const style = {
    background: `url(${board.image})`,
    backgroundColor: '#97a0af',
    backgroundSize: 'cover'
  }

  return (
    <div
      onClick={() => {
        history.push(`/boards/${board.id}`)
        addBoardToRecent(board.id)
      }}
      className="board-thumb"
      style={style}
    >
      <div className="thumb-title">{board.title}</div>
      <i
        className="far fa-star"
        onClick={e => {
          e.stopPropagation()
          starBoard(board.id)
        }}
      />
    </div>
  )
}

export default connect(
  null,
  mdtp
)(BoardThumb)
