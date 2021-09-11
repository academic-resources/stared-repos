import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import DogEdit from "./DogEdit"

const FETCH_DOG = gql`
  query FetchDog($id: ID!) {
    dog(_id: $id) {
      _id
      name
      breed
    }
  }
`;

const DogDetail = props => {
  return (
    <div>
      <Query query={FETCH_DOG} variables={{"id": props.match.params.dogId}}>
        {({ loading, error, data }) => {
        if (loading) return <h1>Loading...</h1>;
        if (error) return <h1>{error}</h1>;
        console.log(data);
        return (
          <div>
            <h1>{data.dog.name}</h1>
            Breed: {data.dog.breed}
            <DogEdit dog={data.dog} />
          </div>
          
        );
      }}
      
      </Query>
      
    </div>
  )
}

export default DogDetail;