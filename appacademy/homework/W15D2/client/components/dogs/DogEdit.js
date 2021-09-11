import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import gpl from 'graphql-tag'

const UPDATE_DOG = gpl`
  mutation UpdateDog($_id: ID!, $name: String!, $breed: String!) {
    updateDog(_id: $_id, name: $name, breed: $breed) {
      _id
      name
      breed
    }
  }
`
const DogEdit = ({ dog }) => {
  const [name, setName] = useState(dog.name)
  const [breed, setBreed] = useState(dog.breed)

  const updateName = e => setName(e.target.value)
  const updateBreed = e => setBreed(e.target.value)

  const handleSubmit = (e, updateDog) => {
    e.preventDefault()
    updateDog({
      variables: {
        _id: dog._id,
        name: name,
        breed: breed
      }
    })
  }

  return (
    <Mutation mutation={UPDATE_DOG}>
      {updateDog => (
        <div>
          <h1>Dog Edit Form</h1>
          <form onSubmit={e => handleSubmit(e, updateDog)}>
            <input value={name} onChange={updateName} />
            <input value={breed} onChange={updateBreed} />
            <button type="submit">Update Dog</button>
          </form>
        </div>
      )}
    </Mutation>
  )
}

export default DogEdit
