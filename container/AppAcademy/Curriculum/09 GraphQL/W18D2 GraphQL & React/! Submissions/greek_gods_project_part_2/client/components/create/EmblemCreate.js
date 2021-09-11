import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Queries from '../../graphql/queries'
import Mutations from '../../graphql/mutations'
const { NEW_EMBLEM } = Mutations
const { FETCH_EMBLEMS } = Queries

class EmblemCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
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

  handleSubmit(e, newEmblem) {
    e.preventDefault()
    let name = this.state.name
    newEmblem({
      variables: {
        name: name
      }
    }).then(data => {
      console.log(data)
      this.setState({
        message: `New emblem "${name}" created successfully`,
        name: ''
      })
    })
  }

  updateCache(
    cache,
    {
      data: { newEmblem }
    }
  ) {
    let emblemsCache
    try {
      emblemsCache = cache.readQuery({ query: FETCH_EMBLEMS })
    } catch (err) {
      return
    }
    if (emblemsCache) {
      let emblemArray = emblemsCache.emblems

      cache.writeQuery({
        query: FETCH_EMBLEMS,
        data: { emblems: emblemArray.concat(newEmblem) }
      })
    }
  }

  render() {
    return (
      <Mutation
        mutation={NEW_EMBLEM}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newEmblem, { data }) => {
          return (
            <div>
              <form onSubmit={e => this.handleSubmit(e, newEmblem)}>
                <input
                  type="text"
                  placeholder="Emblem's name"
                  value={this.state.name}
                  onChange={this.handleUpdate('name')}
                />
                <button type="submit">Create Emblem</button>
              </form>
              <p>{this.state.message}</p>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default EmblemCreate
