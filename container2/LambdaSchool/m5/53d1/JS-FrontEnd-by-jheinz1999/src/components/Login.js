import React from 'react';
const axios = require('axios');
const oauth = require('axios-oauth-client');

export default class Login extends React.Component {

  state = {

    username: '',
    password: ''

  }

  constructor() {

    super();

  }

  handleChange = e => {

    this.setState({
      [e.target.name]: e.target.value
    });

  }

  handleSubmit = e => {

    axios.post('http://localhost:8443/oauth/token', `grant_type=password&username=${this.state.username}&password=${this.state.password}`, {

      headers: {

        // btoa is converting our client id/client secret into base64
        Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
        'Content-Type': 'application/x-www-form-urlencoded'

      }

    })
      .then(res => {

        localStorage.setItem('token', res.data.access_token);
        this.props.history.push('/users');

      })
      .catch(err => console.dir(err));

    e.preventDefault();

  }

  render() {

    return (

      <form onSubmit={this.handleSubmit}>

        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required />
        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
        <button>Submit</button>

      </form>

    );

  }

}
