import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { getTeams } from '../actions/team_actions'
import { setSelectedHomeMenuItem } from '../actions/ui_actions'

const mstp = state => ({
  teams: Object.values(state.entities.teams),
  selectedItem: state.ui.nav.home_menu || 'boards'
})

const mdtp = dispatch => ({
  getTeams: () => dispatch(getTeams()),
  setSelectedItem: selection => dispatch(setSelectedHomeMenuItem(selection))
})

const SubmenuItem = ({ icon, text, link }) => (
  <li>
    <Link className="sec-link" to={link}>
      <i className={icon} />
      {text}
    </Link>
  </li>
)

const TeamMenuLink = ({ team, selectedItem, selectorFunc }) => (
  <li>
    <Link className="main-link" to={`/teams/${team.id}`} onClick={selectorFunc}>
      <i className="fas fa-user-friends" />
      {team.title}
    </Link>
    {'team_' + team.id === selectedItem && (
      <ul>
        <SubmenuItem
          icon="far fa-heart"
          text="Highlights"
          link={`/teams/${team.id}/highlights`}
        />
        <SubmenuItem
          icon="fab fa-flipboard"
          text="All team boards"
          link={`/teams/${team.id}/boards`}
        />
        <SubmenuItem
          icon="fas fa-user-friends"
          text="Members"
          link={`/teams/${team.id}/members`}
        />
        <SubmenuItem
          icon="fas fa-cog"
          text="Settings"
          link={`/teams/${team.id}/settings`}
        />
      </ul>
    )}
  </li>
)

class HomeMenu extends React.Component {
  componentDidMount() {
    this.props.getTeams()
    this.props.history.push(`/${this.props.selectedItem}`)
  }

  handleItemSelect(selection) {
    return () => this.props.setSelectedItem(selection)
  }

  render() {
    const { teams, selectedItem } = this.props
    return (
      <nav className="home-menu">
        <ul>
          <li>
            <Link
              id="boards"
              to={`/boards`}
              className={selectedItem === 'boards' ? 'active' : ''}
              onClick={this.handleItemSelect('boards')}
            >
              Boards
            </Link>
          </li>
          <li>
            <Link
              className={`main-link ${selectedItem === 'home' ? 'active' : ''}`}
              to={`/`}
              onClick={this.handleItemSelect('home')}
            >
              <i className="fas fa-home" />
              Home
            </Link>
          </li>
          <li className="header">TEAMS</li>
          {teams.map(team => (
            <TeamMenuLink
              key={team.id}
              team={team}
              selectedItem={selectedItem}
              selectorFunc={this.handleItemSelect('team_' + team.id)}
            />
          ))}
        </ul>
      </nav>
    )
  }
}

export default connect(
  mstp,
  mdtp
)(withRouter(HomeMenu))
