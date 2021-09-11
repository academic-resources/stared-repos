import React from 'react'
import { getTeams, createTeam } from '../actions/team_actions.js'
import { connect } from 'react-redux'
import { merge } from 'lodash'
import { updateBoard } from '../actions/board_actions'
import ExistingTeamDialog from './existing_team_dialog'
import ChangeTeamDialog from './change_team_dialog'
import CreateTeamDialog from './create_team_dialog'

const mstp = state => ({
  teams: Object.values(state.entities.teams)
})

const mdtp = dispatch => ({
  getTeams: () => dispatch(getTeams()),
  updateBoard: board => dispatch(updateBoard(board)),
  createTeam: team => dispatch(createTeam(team))
})

class BoardTeamLabel extends React.Component {
  constructor(props) {
    super(props)
    this.toggleTeamDialog = this.toggleTeamDialog.bind(this)
    this.closeTeamCreateDialog = this.closeTeamCreateDialog.bind(this)
    this.showChangeDialog = this.showChangeDialog.bind(this)
    this.showTeamDialog = this.showTeamDialog.bind(this)
    this.handleTeamSelect = this.handleTeamSelect.bind(this)
    this.checkForDialogClose = this.checkForDialogClose.bind(this)
    this.changeTeam = this.changeTeam.bind(this)
    this.showCreateTeam = this.showCreateTeam.bind(this)
    this.createTeam = this.createTeam.bind(this)
    this.node = React.createRef()
    this.state = {
      open: false,
      team_menu: false,
      team_change: false,
      team_create: false
    }
  }

  componentDidMount() {
    this.props.getTeams()
    document.addEventListener('mousedown', this.checkForDialogClose)
  }

  componentWillUnMount() {
    document.removeEventListener('mousedown', this.checkForDialogClose)
  }

  checkForDialogClose(e) {
    if (
      this.node &&
      this.node.current &&
      !this.node.current.contains(e.target) &&
      this.state.open
    ) {
      this.setState({
        open: false,
        team_menu: false,
        team_change: false,
        team_create: false
      })
    }
  }

  createTeam(team) {
    this.props.createTeam(team).then(team => {
      const newBoard = merge({}, this.props.board)
      newBoard.team_id = team.id
      this.props.updateBoard(newBoard)
    })
    this.setState({
      open: false,
      team_menu: false,
      team_change: false,
      team_create: false
    })
  }

  showChangeDialog() {
    this.setState({
      open: true,
      team_menu: false,
      team_change: true,
      team_create: false
    })
  }

  showTeamDialog() {
    this.setState({
      open: true,
      team_menu: true,
      team_change: false,
      team_create: false
    })
  }
  toggleTeamDialog() {
    if (this.state.open) {
      this.setState({
        open: false,
        team_menu: false,
        team_change: false,
        team_create: false
      })
    } else {
      if (this.props.board.team_id === -1) {
        this.setState({
          open: true,
          team_menu: false,
          team_change: true,
          team_create: false
        })
      } else {
        this.setState({
          open: true,
          team_menu: true,
          team_change: false,
          team_create: false
        })
      }
    }
  }

  closeTeamCreateDialog() {
    this.setState({
      open: false,
      team_menu: false,
      team_change: false,
      team_create: false
    })
  }

  handleTeamSelect(e) {
    this.setState({
      new_team_id: e.target.value
    })
  }

  showCreateTeam() {
    this.setState({
      open: true,
      team_menu: false,
      team_change: false,
      team_create: true
    })
  }

  changeTeam() {
    if (this.state.new_team_id) {
      const newBoard = merge({}, this.props.board)
      newBoard.team_id = this.state.new_team_id
      this.props.updateBoard(newBoard)
    }
    this.setState({
      open: false,
      team_menu: false,
      team_change: false,
      team_create: false
    })
  }

  render() {
    if (!this.props.teams) return null

    let label = '',
      team
    const team_id = this.props.board.team_id
    if (team_id === -1) {
      label = 'Personal'
    } else {
      team = this.props.teams.find(t => t.id === team_id)
      if (team) label = team.title
    }

    const teamOptions = [
      { id: -1, title: 'Personal Boards (no team)' },
      ...this.props.teams
    ]

    return (
      <div className="board-team-label" ref={this.node}>
        <div onClick={this.toggleTeamDialog} className="label">
          {label}
        </div>
        {this.state.open && team && this.state.team_menu && (
          <ExistingTeamDialog
            team={team}
            close={this.toggleTeamDialog}
            showChangeDialog={this.showChangeDialog}
          />
        )}
        {this.state.open && this.state.team_change && (
          <ChangeTeamDialog
            team_id={this.state.new_team_id || team_id}
            teamOptions={teamOptions}
            close={this.toggleTeamDialog}
            showTeamDialog={this.showTeamDialog}
            handleTeamSelect={this.handleTeamSelect}
            changeTeam={this.changeTeam}
            showCreateTeam={this.showCreateTeam}
          />
        )}
        {this.state.open && this.state.team_create && (
          <CreateTeamDialog
            close={this.closeTeamCreateDialog}
            showChangeTeamDialog={this.showChangeDialog}
            createTeam={this.createTeam}
          />
        )}
      </div>
    )
  }
}

export default connect(
  mstp,
  mdtp
)(BoardTeamLabel)
