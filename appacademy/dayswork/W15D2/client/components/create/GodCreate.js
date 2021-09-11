import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Queries from '../../graphql/queries'
import Mutations from '../../graphql/mutations'
const { NEW_GOD } = Mutations
const { FETCH_GODS } = Queries

class GodCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: 'god',
      description: '',
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUpdate(field) {
    return e => {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  handleSubmit(e, newGod) {
    e.preventDefault()
    let name = this.state.name
    newGod({
      variables: {
        name: name,
        type: this.state.type,
        description: this.state.description
      }
    }).then(data => {
      console.log(data)
      this.setState({
        message: `New god "${name}" created successfully`,
        name: '',
        type: 'god',
        description: ''
      })
    })
  }

  updateCache(
    cache,
    {
      data: { newGod }
    }
  ) {
    let godsCache
    try {
      godsCache = cache.readQuery({ query: FETCH_GODS })
    } catch (err) {
      return
    }
    if (godsCache) {
      let godArray = godsCache.gods

      cache.writeQuery({
        query: FETCH_GODS,
        data: { gods: godArray.concat(newGod) }
      })
    }
  }

  render() {
    return (
      <Mutation
        mutation={NEW_GOD}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newGod, { data }) => {
          return (
            <div>
              <form onSubmit={e => this.handleSubmit(e, newGod)}>
                <input
                  type="text"
                  placeholder="God's name"
                  value={this.state.name}
                  onChange={this.handleUpdate('name')}
                />
                <textarea
                  value={this.state.description}
                  onChange={this.handleUpdate('description')}
                  placeholder="Description"
                />
                <select
                  value={this.state.type}
                  onChange={this.handleUpdate('type')}
                >
                  <option value="god">God</option>
                  <option value="goddess">Goddess</option>
                </select>
                <button type="submit">Create God</button>
              </form>
              <p>{this.state.message}</p>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default GodCreate
