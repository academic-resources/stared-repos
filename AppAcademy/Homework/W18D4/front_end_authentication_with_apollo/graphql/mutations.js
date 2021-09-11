// src/graphql/mutations.js
import gql from "graphql-tag";

export default {
  REGISTER_USER = gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password) {
        email
        token
        loggedIn
      }
    }
  `,
  CREATE_POST = gql`
    mutation createPost($title: String!, $body: String!) {
      post(title: $title, body: $body) {
        title
        body
      }
    }
  `
}