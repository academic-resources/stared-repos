import React from 'react'
import { Mutation } from 'react-apollo'
import { IconContext } from 'react-icons'
import { FaPencilAlt } from 'react-icons/fa'
import Mutations from '../../graphql/mutations'

const { UPDATE_GOD_DESCRIPTION } = Mutations

class DescriptionDetail extends React.Component {
  constructor(props) {
    super(props)

    // since we know we'll be receiving the god's description through props
    // we can set it in our state
    this.state = {
      editing: false,
      description: this.props.god.description || ''
    }

    this.handleEdit = this.handleEdit.bind(this)
  }

  // this is the function that will trigger "editing" mode
  handleEdit(e) {
    e.preventDefault()
    this.setState({ editing: true })
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value })
  }

  render() {
    // if we are editing we'll return a Mutation component
    if (this.state.editing) {
      return (
        <Mutation mutation={UPDATE_GOD_DESCRIPTION}>
          {(updateGodDescription, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  updateGodDescription({
                    variables: {
                      id: this.props.god.id,
                      description: this.state.description
                    }
                  }).then(() => this.setState({ editing: false }))
                }}
              >
                <textarea
                  value={this.state.description}
                  onChange={this.fieldUpdate('description')}
                  rows={15}
                />
                <button type="submit">Update Description</button>
              </form>
            </div>
          )}
        </Mutation>
      )
    } else {
      return (
        <div>
          <div
            onClick={this.handleEdit}
            style={{ fontSize: '10px', cursor: 'pointer', display: 'inline' }}
          >
            <IconContext.Provider value={{ className: 'custom-icon' }}>
              <FaPencilAlt />
            </IconContext.Provider>
          </div>
          <p>{this.state.description}</p>
        </div>
      )
    }
  }
}

export default DescriptionDetail
