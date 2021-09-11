import React, { Component } from "react";
import { Query } from "react-apollo";

import gql from "graphql-tag";

export const FETCH_POSTS = gql`
  query fetchPosts {
    posts {
      id
      title
      body
    }
  }
`;

const App = () => {
  return (
    <Query query={FETCH_POSTS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <ul>
            {data.posts.map(post => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default App;
