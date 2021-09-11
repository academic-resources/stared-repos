import React from 'react'

class Dropdown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: 'private',
      open: false
    }
    this.toggleOptions = this.toggleOptions.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  toggleOptions() {
    this.setState({
      open: !this.state.open
    })
  }

  handleSelect(option) {
    return () => {
      this.setState({
        selected: option,
        open: false
      })
      this.props.setSelected(option)
    }
  }

  privateOption(selected) {
    return (
      <div className="visibility-option">
        <i className="logo lock fas fa-lock" />
        <span>Private</span>
        {selected && <i className="sel-check fas fa-check" />}
        <div className="explainer">
          Only board members can see and edit this board.
        </div>
      </div>
    )
  }

  teamOption(selected) {
    return (
      <div className="visibility-option">
        <i className="logo team fas fa-user-friends" />
        <span>Team</span>
        {selected && <i className="sel-check fas fa-check" />}
        <div className="explainer">
          All members of the selected team can see and edit this board.
        </div>
      </div>
    )
  }

  publicOption(selected) {
    return (
      <div className="visibility-option">
        <i className="logo world fas fa-globe" />
        <span>Public</span>
        {selected && <i className="sel-check fas fa-check" />}
        <div className="explainer">
          Anyone on the internet (including Google) can see this board. Only
          board members can edit.
        </div>
      </div>
    )
  }

  render() {
    let displayValue, displayIcon
    if (this.state.selected === 'private') {
      displayValue = <div>Private</div>
      displayIcon = <i className="logo lock fas fa-lock" />
    } else if (this.state.selected === 'team') {
      displayValue = <div>Team</div>
      displayIcon = <i className="logo team fas fa-user-friends" />
    } else {
      displayValue = <div>Public</div>
      displayIcon = <i className="logo world fas fa-globe" />
    }
    return (
      <div className="visibility-dropdown">
        <div className="visibility-dropdown-top" onClick={this.toggleOptions}>
          {displayIcon}
          <div className="visibility-dropdown-value">{displayValue}</div>
          <i className="visibility-dropdown-arrow fas fa-angle-down" />
        </div>
        {this.state.open && (
          <div className="visibility-dropdown-options">
            <div
              className="visibility-dropdown-option"
              onClick={this.handleSelect('private')}
            >
              {this.privateOption(this.state.selected === 'private')}
            </div>

            <div
              className="visibility-dropdown-option"
              onClick={this.handleSelect('team')}
            >
              {this.teamOption(this.state.selected === 'team')}
            </div>

            <div
              className="visibility-dropdown-option"
              onClick={this.handleSelect('public')}
            >
              {this.publicOption(this.state.selected === 'public')}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Dropdown
