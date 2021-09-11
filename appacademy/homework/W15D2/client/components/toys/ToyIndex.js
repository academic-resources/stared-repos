import gql from 'graphql-tag'
import React from 'react'
import { Query } from 'react-apollo'

const FETCH_TOYS = gql`
  query FetchToys {
    toys {
      _id
      name
    }
  }
`

const ToyIndex = () => (
  <Query query={FETCH_TOYS}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>{error}</div>
      return (
        <div>
          <h1>ToyIndex</h1>
          <ul>
            {data.toys.map(toy => (
              <li key={toy._id}>
                <p>{toy.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )
    }}
  </Query>
)

export default ToyIndex
