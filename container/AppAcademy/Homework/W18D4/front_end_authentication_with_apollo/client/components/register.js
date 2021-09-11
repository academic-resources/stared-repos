import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Mutations from '../../graphql/mutations'
const { REGISTER_USER } = Mutations

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value })
  }

  updateCache(cache, {data}) {
    console.log(data);
    // here we can write directly to our cache with our returned mutation data
    cache.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={ REGISTER_USER }
        onCompleted={data => {
          console.log(data)
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
          this.props.history.push('/');
        }}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {registerUser => {
          return (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  registerUser({
                    variables: {
                      name: this.state.name,
                      email: this.state.email,
                      password: this.state.password
                    }
                  });
                }}
              >
                <input
                  type="text"
                  value={ this.state.name }
                  onChange={this.updateField("name")}
                  placeholder="name"
                />
                <input
                  type="email"
                  value={ this.state.email }
                  onChange={this.updateField("email")}
                  placeholder="email"
                />
                <input
                  type="password"
                  value={ this.state.password }
                  onChange={this.updateField("password")}
                  placeholder="password"
                />
                <button type="submit">Register</button>
              </form>
            </div>
          )  
        }}
      </Mutation>
    );
  }
}

export default Register
