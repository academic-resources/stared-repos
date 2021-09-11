import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Queries from '../../graphql/queries'
import Mutations from '../../graphql/mutations'
const { NEW_ABODE } = Mutations
const { FETCH_ABODES } = Queries

class AbodeCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      coordinates: '',
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

  handleSubmit(e, newAbode) {
    e.preventDefault()
    let name = this.state.name
    newAbode({
      variables: {
        name: name,
        coordinates: this.state.coordinates
      }
    }).then(data => {
      console.log(data)
      this.setState({
        message: `New abode "${name}" created successfully`,
        name: '',
        coordinates: ''
      })
    })
  }

  updateCache(
    cache,
    {
      data: { newAbode }
    }
  ) {
    let abodesCache
    try {
      abodesCache = cache.readQuery({ query: FETCH_ABODES })
    } catch (err) {
      return
    }
    if (abodesCache) {
      let abodeArray = abodesCache.abodes

      cache.writeQuery({
        query: FETCH_ABODES,
        data: { abodes: abodeArray.concat(newAbode) }
      })
    }
  }

  render() {
    return (
      <Mutation
        mutation={NEW_ABODE}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newAbode, { data }) => {
          return (
            <div>
              <form onSubmit={e => this.handleSubmit(e, newAbode)}>
                <input
                  type="text"
                  placeholder="Abode's name"
                  value={this.state.name}
                  onChange={this.handleUpdate('name')}
                />
                <input
                  type="text"
                  placeholder="Coordinates"
                  value={this.state.coordinates}
                  onChange={this.handleUpdate('coordinates')}
                />
                <button type="submit">Create Abode</button>
              </form>
              <p>{this.state.message}</p>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default AbodeCreate
