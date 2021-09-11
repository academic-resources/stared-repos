import React from 'react'

class ListAdder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      title: ''
    }
    this.openDialog = this.openDialog.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.checkForDialogClose = this.checkForDialogClose.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.checkKeyPressForEnter = this.checkKeyPressForEnter.bind(this)
    this.input_node = React.createRef()
  }

  openDialog() {
    this.setState({ open: true })
  }

  handleChange(e) {
    this.setState({
      title: e.target.value
    })
  }

  checkKeyPressForEnter(e) {
    if (e.charCode === 13) this.handleCreate(e)
  }

  handleCreate(e) {
    e.stopPropagation()
    const { title } = this.state
    const { board } = this.props
    if (!title) return

    const newList = { title }
    this.props.createList(newList, board)
    this.setState({
      open: false,
      title: ''
    })
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.checkForDialogClose)
  }

  componentWillUnMount() {
    document.removeEventListener('mousedown', this.checkForDialogClose)
  }

  checkForDialogClose(e) {
    if (
      this.input_node &&
      this.input_node.current &&
      !this.input_node.current.contains(e.target) &&
      e.target.type !== 'submit' &&
      this.state.open
    ) {
      this.setState({
        open: false
      })
    }
  }

  render() {
    const { open } = this.state
    const { first } = this.props

    return open ? (
      <div className="add-form" onKeyPress={this.checkKeyPressForEnter}>
        <input
          className="input-field"
          ref={this.input_node}
          type="text"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder="Enter list title..."
          autoFocus={true}
        />
        <div>
          <input type="submit" onClick={this.handleCreate} value=" Add List" />
          <i className="fas fa-times" />
        </div>
      </div>
    ) : (
      <div className="add-btn add-list-btn" onClick={this.openDialog}>
        <i className="fas fa-plus" />
        {`Add ${first ? 'another' : 'a'} list`}
      </div>
    )
  }
}

export default ListAdder
