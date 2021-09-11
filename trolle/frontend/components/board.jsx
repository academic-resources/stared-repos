import React from 'react'
import { connect } from 'react-redux'
import {
  getBoard,
  updateBoard,
  starBoard,
  unStarBoard
} from '../actions/board_actions'
import BoardBar from './board_bar'
import ListCollection from './list_collection'

const mstp = (state, ownProps) => ({
  board: state.entities.boards[ownProps.match.params.id],
  starred_boards: state.entities.users[state.session.id].starred_boards,
  id: parseInt([ownProps.match.params.id][0])
})

const mdtp = dispatch => ({
  getBoard: id => dispatch(getBoard(id)),
  updateBoard: id => dispatch(updateBoard(id)),
  starBoard: id => dispatch(starBoard(id)),
  unStarBoard: id => dispatch(unStarBoard(id))
})

class Board extends React.Component {
  componentDidMount() {
    this.props.getBoard(this.props.id)
  }

  render() {
    const { board, updateBoard, starred_boards } = this.props

    if (!board) return null

    const starred = starred_boards.indexOf(board.id) >= 0
    const toggleStarClick = starred
      ? this.props.unStarBoard
      : this.props.starBoard

    const style = board
      ? {
          background: `url(${board.image})`,
          backgroundSize: 'cover'
        }
      : {}
    return (
      <div className="board" style={style}>
        <BoardBar
          board={board}
          updateBoard={updateBoard}
          toggleStarClick={toggleStarClick}
          starred={starred}
        />
        <ListCollection board={board} />
      </div>
    )
  }
}

export default connect(
  mstp,
  mdtp
)(Board)
