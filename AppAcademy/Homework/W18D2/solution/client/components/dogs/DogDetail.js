import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import DogEdit from "./DogEdit";

// we use gql with a template literal to construct graphql queries
const FETCH_DOG = gql`
  query FetchDog($id: ID!) {
    dog(_id: $id) {
      _id
      name
      breed
    }
  }
`;

class DogDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }
  render() {
    return (
      <Query
        query={FETCH_DOG}
        variables={{ id: this.props.match.params.dogId }}
      >
        {({ loading, error, data }) => {
          if (loading) return <h1>Loading...</h1>;
          return (
            <div onClick={() => this.setState({ editing: true })}>
              <h1>Details About {data.dog.name}</h1>
              <p>Breed: {data.dog.breed}</p>
              <DogEdit
                dog={data.dog}
                history={this.props.history}
                editing={this.state.editing}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default DogDetail;
