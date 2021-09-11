import React from 'react'
import BoardBackgroundThumb from './board_background_thumb'
import Dropdown from './drop_down'
import VisibilityDropdown from './visibility_drop_down'
import { connect } from 'react-redux'
import { createBoard } from '../actions/board_actions'
import { getTeams } from '../actions/team_actions'

const mstp = state => ({
  teams: Object.values(state.entities.teams)
})

const mdtp = dispatch => ({
  createBoard: board => dispatch(createBoard(board)),
  getTeams: () => dispatch(getTeams())
})

class CreateBoardForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleThumbSelect = this.handleThumbSelect.bind(this)
    this.setTitle = this.setTitle.bind(this)
    this.checkFormExit = this.checkFormExit.bind(this)
    this.handleVisibilitySelect = this.handleVisibilitySelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTeamSelect = this.handleTeamSelect.bind(this)
    this.node = React.createRef()
    this.teamOptions = [{ id: -1, title: 'No team' }, ...this.props.teams]
    this.state = {
      selectedThumb: 'img_1',
      title: '',
      visibility: 'private',
      team_id: -1
    }
  }

  componentDidMount() {
    this.props.getTeams()
    document.addEventListener('mousedown', this.checkFormExit)
  }

  componentWillUnMount() {
    document.removeEventListener('mousedown', this.checkFormExit)
  }

  checkFormExit(e) {
    if (this.node.current && !this.node.current.contains(e.target)) {
      this.props.history.goBack()
    }
  }

  setTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  handleThumbSelect(thumb) {
    this.setState({
      selectedThumb: thumb
    })
  }

  handleTeamSelect(option) {
    this.setState({
      team_id: option.id
    })
  }

  handleVisibilitySelect(option) {
    this.setState({
      visibility: option
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (!this.state.title) return
    const { title, visibility, selectedThumb: image, team_id } = this.state

    const new_board = {
      image,
      title,
      starred: false,
      visibility,
      personal: team_id === -1,
      team_id
    }
    this.props.createBoard(new_board).then(board => {
      if (board && board.id) this.props.history.goBack()
    })
  }

  render() {
    return (
      <div className="create-board-form">
        <div ref={this.node} className="wrapper">
          <div className={`form-holder ${this.state.selectedThumb}`}>
            <form onSubmit={this.handleSubmit}>
              <input
                className="title"
                type="text"
                value={this.state.title}
                placeholder="Add board title"
                onChange={this.setTitle}
              />
              <Dropdown
                setSelected={this.handleTeamSelect}
                options={this.teamOptions}
                display_key={'title'}
              />
              <VisibilityDropdown setSelected={this.handleVisibilitySelect} />
              <input
                className={`create-form-btn ${
                  !!this.state.title ? 'enabled' : 'disabled'
                }`}
                type="submit"
                value="Create Board"
              />
            </form>
          </div>
          <div className="thumb-holder">
            <BoardBackgroundThumb
              label="img_1"
              handleThumbSelect={() => this.handleThumbSelect('img_1')}
              selected={this.state.selectedThumb === 'img_1'}
            />
            <BoardBackgroundThumb
              label="img_2"
              handleThumbSelect={() => this.handleThumbSelect('img_2')}
              selected={this.state.selectedThumb === 'img_2'}
            />
            <BoardBackgroundThumb
              label="img_3"
              handleThumbSelect={() => this.handleThumbSelect('img_3')}
              selected={this.state.selectedThumb === 'img_3'}
            />
            <BoardBackgroundThumb
              label="img_4"
              handleThumbSelect={() => this.handleThumbSelect('img_4')}
              selected={this.state.selectedThumb === 'img_4'}
            />
            <BoardBackgroundThumb
              label="img_5"
              handleThumbSelect={() => this.handleThumbSelect('img_5')}
              selected={this.state.selectedThumb === 'img_5'}
            />
            <BoardBackgroundThumb
              label="img_6"
              handleThumbSelect={() => this.handleThumbSelect('img_6')}
              selected={this.state.selectedThumb === 'img_6'}
            />
            <BoardBackgroundThumb
              label="col_1"
              handleThumbSelect={() => this.handleThumbSelect('col_1')}
              selected={this.state.selectedThumb === 'col_1'}
            />
            <BoardBackgroundThumb
              label="col_2"
              handleThumbSelect={() => this.handleThumbSelect('col_2')}
              selected={this.state.selectedThumb === 'col_2'}
            />
            <BoardBackgroundThumb
              label="col_3"
              handleThumbSelect={() => this.handleThumbSelect('col_3')}
              selected={this.state.selectedThumb === 'col_3'}
            />
            <BoardBackgroundThumb
              label="col_4"
              handleThumbSelect={() => this.handleThumbSelect('col_4')}
              selected={this.state.selectedThumb === 'col_4'}
            />
            <BoardBackgroundThumb
              label="col_5"
              handleThumbSelect={() => this.handleThumbSelect('col_5')}
              selected={this.state.selectedThumb === 'col_5'}
            />
            <BoardBackgroundThumb
              label="col_6"
              handleThumbSelect={() => this.handleThumbSelect('col_6')}
              selected={this.state.selectedThumb === 'col_6'}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mstp,
  mdtp
)(CreateBoardForm)
