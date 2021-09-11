import React from 'react'
import { Query } from 'react-apollo'

import { FETCH_POSTS } from '../../graphql/queries'

const list = posts => (
  <ul>
    {posts.map(post => (
      <li key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </li>
    ))}
  </ul>
)

const App = () => (
  <Query query={FETCH_POSTS}>
    {response => {
      const { loading, error, data } = response
      const { posts } = data

      if (loading) return 'Loading...'
      if (error) return `Error! ${error.message}`

      return list(posts)
    }}
  </Query>
)

export default App
