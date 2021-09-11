import React from 'react'
import { merge } from 'lodash'
import BoardTeamLabel from './board_team_label'
import VisibilityDropDown from './visibility_change'
import BoardMemberIconsList from './board_members_icons_list'
import InviteButton from './invite_button'

class BoardBar extends React.Component {
  constructor(props) {
    super(props)

    this.toggleFocus = this.toggleFocus.bind(this)
    this.toggleHoverEffect = this.toggleHoverEffect.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleStarClick = this.handleStarClick.bind(this)
    this.setSelectedVisibility = this.setSelectedVisibility.bind(this)
    this.state = {
      titleInputFocused: false,
      titleInputHovered: false,
      boardTitle: this.props.board ? this.props.board.title : ''
    }
  }

  componentWillUpdate(newProps) {
    if (newProps.board && newProps.board !== this.props.board)
      this.setState({
        boardTitle: newProps.board.title
      })
  }

  toggleFocus(on) {
    if (on) {
      this.setState({
        titleInputFocused: true,
        titleInputHovered: false
      })
    } else {
      this.setState({
        titleInputFocused: false
      })
      const newBoard = merge({}, this.props.board)
      newBoard.title = this.state.boardTitle
      this.props.updateBoard(newBoard)
    }
  }

  handleTitleChange(e) {
    if (this.state.titleInputFocused)
      this.setState({
        boardTitle: e.target.value
      })
  }

  toggleHoverEffect(on) {
    if (on && !this.state.titleInputFocused) {
      this.setState({
        titleInputHovered: true
      })
    } else {
      this.setState({
        titleInputHovered: false
      })
    }
  }

  handleStarClick(board) {
    this.props.toggleStarClick(board.id)
  }

  setSelectedVisibility(option) {
    const newBoard = merge({}, this.props.board)
    newBoard.visibility = option
    this.props.updateBoard(newBoard)
  }

  render() {
    const { board, starred } = this.props
    const { titleInputFocused, titleInputHovered, boardTitle } = this.state

    const titleFocusStyle = titleInputFocused
      ? {
          background: 'white',
          color: '#172b4d'
        }
      : {
          background: 'transparent',
          color: 'white',
          cursor: 'pointer'
        }

    const titleInputStyle = titleInputHovered
      ? { ...titleFocusStyle, background: 'rgba(0,0,0,.25)' }
      : titleFocusStyle

    if (!board) return null

    return (
      <div className="board-bar">
        <input
          type="text"
          onFocus={() => this.toggleFocus(true)}
          onBlur={() => this.toggleFocus(false)}
          onMouseOver={() => this.toggleHoverEffect(true)}
          onMouseOut={() => this.toggleHoverEffect(false)}
          className="board-name"
          onChange={this.handleTitleChange}
          value={boardTitle}
          style={titleInputStyle}
          size={boardTitle ? boardTitle.length + 0 : 1}
        />
        <i
          className={`far fa-star ${starred ? 'starred' : ''}`}
          onClick={e => {
            this.handleStarClick(board)
          }}
        />
        <BoardTeamLabel board={board} />
        <VisibilityDropDown
          setSelected={this.setSelectedVisibility}
          selected={board.visibility}
        />
        <BoardMemberIconsList board={board} />
        <InviteButton board={board} />
      </div>
    )
  }
}

export default BoardBar
