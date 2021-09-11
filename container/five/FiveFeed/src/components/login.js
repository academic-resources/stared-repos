import React, { Component } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

import User from '../icons/user'

export default class Login extends Component {
  generateHeaders() {
    const headers = { 'Content-Type': 'application/json' }
    if (netlifyIdentity.currentUser()) {
      return netlifyIdentity
        .currentUser()
        .jwt()
        .then(token => {
          return { ...headers, Authorization: `Bearer ${token}` }
        })
    }
    return Promise.resolve(headers)
  }

  clickHandler = e => {
    e.preventDefault()
    netlifyIdentity.open()
    netlifyIdentity.on('login', user => console.log('login', user))
    // store token in localstorage
    this.generateHeaders().then(headers => {
      // GET request
      //
      //   USE IN LAMBDA:
      // const claims = context.clientContext && context.clientContext.user;
      //   if (!claims) {
      //     return callback(null, { statusCode: 401, body: "You must be signed in to call this function" });
      //   }
    })
  }
  render() {
    return <button className="login-button" onClick={this.clickHandler}><User /></button>
  }
}
