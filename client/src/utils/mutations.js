import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      _id
    }
  }
`;

const ADD_POST = gql`
  mutation addPost(
    $title: String!
    $body: String
    $challenge: String
    $dateCreated: String
    $location: String
  ) {
    addPost(
      title: $title
      body: $body
      challenge: $challenge
      dateCreated: $dateCreated
      location: $location
    ) {
      _id
    }
  }
`;

export { ADD_USER, ADD_POST };