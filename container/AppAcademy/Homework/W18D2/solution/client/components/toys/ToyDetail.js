import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ToyEdit from "./ToyEdit";

// we use gql with a template literal to construct graphql queries
const FETCH_TOY = gql`
  query FetchToy($id: ID!) {
    toy(_id: $id) {
      _id
      name
      color
    }
  }
`;

class ToyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }
  render() {
    return (
      <Query
        query={FETCH_TOY}
        variables={{ id: this.props.match.params.toyId }}
      >
        {({ loading, error, data }) => {
          if (loading) return <h1>Loading...</h1>;
          return (
            <div onClick={() => this.setState({ editing: true })}>
              <h1>Details About {data.toy.name}</h1>
              <p>Color: {data.toy.color}</p>
              <ToyEdit
                toy={data.toy}
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

export default ToyDetail;
