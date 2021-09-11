import React from 'react'
import BoardsMenu from './boards_menu'
import { connect } from 'react-redux'
import { toggleBoardsMenu } from '../actions/ui_actions'

const mstp = state => ({
  isOpen: !!state.ui.nav.boards_menu
})

const mdtp = dispatch => ({
  toggleBoardsMenu: () => dispatch(toggleBoardsMenu())
})

class BoardMenuButton extends React.Component {
  constructor(props) {
    super(props)
    this.checkForMenuClose = this.checkForMenuClose.bind(this)
    this.node = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.checkForMenuClose)
  }

  componentWillUnMount() {
    document.removeEventListener('mousedown', this.checkForMenuClose)
  }

  checkForMenuClose(e) {
    if (this.node.current && !this.node.current.contains(e.target)) {
      this.props.toggleBoardsMenu()
    }
  }

  render() {
    const { toggleBoardsMenu, isOpen } = this.props
    return (
      <div className="board-btn-bg">
        <div className="board-btn-icon" onClick={toggleBoardsMenu}>
          Boards
        </div>
        {isOpen && (
          <div ref={this.node}>
            <BoardsMenu />
          </div>
        )}
      </div>
    )
  }
}

export default connect(
  mstp,
  mdtp
)(BoardMenuButton)
