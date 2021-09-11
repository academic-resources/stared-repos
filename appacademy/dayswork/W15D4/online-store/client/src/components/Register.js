import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { REGISTER } from '../graphql/mutations'

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, {data}) {
    console.log(data);
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }


  render() {
      return (
        <Mutation
          mutation={REGISTER}
          onCompleted={data => {
            const { token } = data.register;
            localStorage.setItem("auth-token", token);
            this.props.history.push("/");
          }}
          update={(client, data) => this.updateCache(client, data)}
        >
          {register => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  register({
                    variables: {
                      name: this.state.name,
                      email: this.state.email,
                      password: this.state.password
                    }
                  });
                }}
              >
                <input
                  value={this.state.name}
                  onChange={this.update("name")}
                  placeholder="Name"
                />
                <input
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                />
                <input
                  value={this.state.password}
                  onChange={this.update("password")}
                  type="password"
                  placeholder="Password"
                />
                <button type="submit">Sign Up</button>
              </form>
            </div>
          )}
        </Mutation>
      );
  }
}

export default Register