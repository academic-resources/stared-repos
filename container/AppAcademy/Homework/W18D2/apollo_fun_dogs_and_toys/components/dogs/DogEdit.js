import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const UPDATE_DOG = gql`
  mutation UpdateDog($_id: ID!, $name: String!, $breed: String!) {
    updateDog(_id: $_id, name: $name, breed: $breed) {
      _id
      name
      breed
    }
  }
`;

class DogEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.dog.name,
      breed: this.props.dog.breed
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e, updateDog) {
    e.preventDefault();
    console.log(this.props.dog);
    updateDog({
      variables: {
        _id: this.props.dog._id,
        name: this.state.name,
        breed: this.state.breed
      }
    })
  }

  update(field) {
    // easy function for updating our input fields
      return e => this.setState({ [field]: e.target.value });
    }
  
  render() {
    // here updateDog is the name of the now invocable function inside of our UPDATE_DOG mutation
      return (
        <Mutation mutation={UPDATE_DOG}>
          {updateDog => (
            <div>
              <h1>Dog Edit Form</h1>
              <form onSubmit={e => this.handleSubmit(e, updateDog)}>
                <input value={this.state.name} onChange={this.update("name")} />
                <input value={this.state.breed} onChange={this.update("breed")} />
                <button type="submit">Update Dog</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    }
}

export default DogEdit