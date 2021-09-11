import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import gql from "graphql-tag";

const FETCH_TOYS = gql`
  query FetchDogs {
    toys {
      _id
      name
    }
  }
`;

const ToyIndex = () => (
  <Query query={FETCH_TOYS}>
    {({ loading, error, data }) => {
      if (loading) return <h1>Loading...</h1>;
      if (error) return <h1>{error}</h1>;
      return (
        <div>
          <h1>ToyIndex</h1>
          <ul>
            {data.toys.map(toy => (
              <li key={toy._id}>
                <Link to={`/toys/${toy._id}`}>{toy.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }}
  </Query>
);

export default ToyIndex;
