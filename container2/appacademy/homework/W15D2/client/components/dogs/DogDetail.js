import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import React from 'react'
import DogEdit from './DogEdit'

const FETCH_DOG = gql`
  query FetchDog($id: ID!) {
    dog(_id: $id) {
      _id
      name
      breed
    }
  }
`

const DogDetail = props => (
  <Query query={FETCH_DOG} variables={{ id: props.match.params.dogId }}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>{error}</div>
      return (
        <div>
          <p>{data.dog.name}</p>
          <p>{data.dog.breed}</p>
          <DogEdit dog={data.dog} />
        </div>
      )
    }}
  </Query>
)

export default DogDetail
