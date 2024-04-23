import gql from "graphql-tag";

export const typeDefs = gql`

 
  type Query {

    multiply(number1: Int!, number2: Int!): Float!

  }

  type Mutation {

    createUser(username: String!, password: String!): CreateUserResponse!
    signIn(username: String!, password: String!): SignInResponse!
  }

  type User {
    id: ID!
    username: String!
  }

  type SignInResponse {
    code: Int!
    message: String!
    success: Boolean!
    token: String
  }

  type CreateUserResponse {
    code: Int!
    message: String!
    success: Boolean!
    user: User
  }

`;