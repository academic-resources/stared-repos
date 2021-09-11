import React from 'react'

class CreateTeamDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: ''
    }
    this.setTitle = this.setTitle.bind(this)
    this.setDescription = this.setDescription.bind(this)
  }

  setTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  setDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  render() {
    const { close, showChangeTeamDialog, createTeam } = this.props

    return (
      <div className="creating-team">
        <div className="top-row">
          <i
            onClick={showChangeTeamDialog}
            className="fas fa-chevron-left back"
          />
          <div className="title">Create Team</div>
          <i onClick={close} className="fas fa-times close" />
        </div>

        <form onSubmit={() => createTeam(this.state)}>
          <div className="name">
            <label>Name</label>
            <input
              className="name"
              type="text"
              value={this.state.title}
              onChange={this.setTitle}
            />
          </div>
          <div className="description">
            <label>
              Description<span>(optional)</span>
            </label>
            <textarea
              className="description"
              value={this.state.description}
              onChange={this.setDescription}
            />
          </div>

          <input
            className={`create-team-form-btn ${
              !!this.state.title ? 'enabled' : 'disabled'
            }`}
            type="submit"
            value="Create"
          />
        </form>
        <p>
          A team is a group of boards and people. Use it to organize your
          company, side hustle, family, or friends.
        </p>
      </div>
    )
  }
}

export default CreateTeamDialog
