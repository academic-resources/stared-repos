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
