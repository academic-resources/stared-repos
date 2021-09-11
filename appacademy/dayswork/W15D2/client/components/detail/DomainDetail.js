import React from 'react'
import { Mutation } from 'react-apollo'
import { IconContext } from 'react-icons'
import { FaPencilAlt } from 'react-icons/fa'
import Mutations from '../../graphql/mutations'
import AddDomain from '../create/AddDomain'
import DeleteDomain from './DeleteDomain'

const { UPDATE_GOD_DOMAINS } = Mutations

class DomainDetail extends React.Component {
  constructor(props) {
    super(props)

    // since we know we'll be receiving the god's domains through props
    // we can set it in our state
    this.state = {
      adding: false,
      domains: this.props.god.domains || []
    }

    this.addingComplete = this.addingComplete.bind(this)
  }

  addingComplete() {
    this.setState({ adding: false })
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value })
  }

  render() {
    const addingDomain = this.state.adding ? (
      <AddDomain god={this.props.god} addingComplete={this.addingComplete} />
    ) : (
      <button onClick={() => this.setState({ adding: true })}>
        Add Domain
      </button>
    )

    const ListDomains = this.props.god.domains.map((domain, i) => {
      return (
        <div key={i}>
          <div>{domain}</div>
          <DeleteDomain god={this.props.god} domain={domain} />
        </div>
      )
    })

    return (
      <div>
        {ListDomains}
        {addingDomain}
      </div>
    )
  }
}

export default DomainDetail
