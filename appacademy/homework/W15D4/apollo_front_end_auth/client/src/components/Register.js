import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { REGISTER_USER } from '../graphql/mutations'

const Register = props => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const updateCache = (cache, { data }) => {
    cache.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    })
  }

  const storeTokenInLocalStorage = data => {
    const { token } = data.register
    localStorage.setItem('auth-token', token)
  }

  return (
    <Mutation
      mutation={REGISTER_USER}
      onCompleted={data => storeTokenInLocalStorage(data)}
      update={(cache, ddata) => updateCache(cache, ddata)}
    >
      {muter => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault()
              muter({
                variables: {
                  name: name,
                  email: email,
                  password: password
                }
              })
            }}
          >
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button type="submit">Register</button>
          </form>
        </div>
      )}
    </Mutation>
  )
}

export default Register
