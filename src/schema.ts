import gql from "graphql-tag";

export const typeDefs = gql`

 
  type Query {

    multiply(number1: Int!, number2: Int!): Float!

  }

  type Mutation {
    createArticle(title: String!, content: String!, userId: ID!): CreateArticleResponse!
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

  
  type Article {
    id: ID!
    title: String!
    content: String!
    User: User!
  }
  type CreateArticleResponse {
    code: Int!
    message: String!
    success: Boolean!
    article: Article
  }

`;