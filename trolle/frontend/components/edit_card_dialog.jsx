import React from 'react'
import { updateCard } from '../actions/card_actions'
import { connect } from 'react-redux'

const mdtp = dispatch => ({
  updateCard: card => dispatch(updateCard(card))
})

class EditCardDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.card.title
    }
    this.setTitle = this.setTitle.bind(this)
    this.checkForDialogClose = this.checkForDialogClose.bind(this)
    this.saveEdit = this.saveEdit.bind(this)
    this.node = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.checkForDialogClose)
  }

  componentWillUnMount() {
    document.removeEventListener('mousedown', this.checkForDialogClose)
  }

  checkForDialogClose(e) {
    if (
      this.node &&
      this.node.current &&
      !this.node.current.contains(e.target)
    ) {
      this.props.close()
    }
  }

  saveEdit(e) {
    e.preventDefault()
    this.props.card.title = this.state.title
    this.props.updateCard(this.props.card)
    this.props.close()
  }

  setTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  render() {
    const { saveEdit } = this.props

    return (
      <div className="editing-card" ref={this.node}>
        <form onSubmit={this.saveEdit}>
          <textarea
            className="name"
            value={this.state.title}
            onChange={this.setTitle}
          />
          <input
            className={`save-card-form-btn ${
              !!this.state.title ? 'enabled' : 'disabled'
            }`}
            type="submit"
            value="Save"
          />
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  mdtp
)(EditCardDialog)
