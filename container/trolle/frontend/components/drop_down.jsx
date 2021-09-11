import React from 'react'

class Dropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: this.props.options[0],
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

  render() {
    return (
      <div className="dropdown">
        <div className="dropdown-top" onClick={this.toggleOptions}>
          <div className="dropdown-value">
            {this.state.selected[this.props.display_key]}
          </div>
          <i className="dropdown-arrow fas fa-angle-down" />
        </div>
        {this.state.open && (
          <div className="dropdown-options">
            {this.props.options.map(o => (
              <div
                key={o.id}
                className="dropdown-option"
                onClick={this.handleSelect(o)}
              >
                <div className="dropdown-option-value">
                  {o[this.props.display_key]}
                </div>
                {this.state.selected.id === o.id && (
                  <i className="fas fa-check" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default Dropdown
