import gql from "graphql-tag";

export const typeDefs = gql`

 
  type Query {
    getArticle(id: ID!): Article
    getArticles: [Article!]!
    getUser(id: ID!): User
    getUsers: [User!]!
    getLike(id: ID!): Like
    getLikes: [Like!]!
    getComment(id: ID!): Comment
    getComments: [Comment!]!
  }

  type Mutation {
    createArticle(title: String!, content: String!, userId: ID!): CreateArticleResponse!
    createUser(username: String!, password: String!): CreateUserResponse!
    signIn(username: String!, password: String!): SignInResponse!
    createComment(content: String!, userId: ID!, articleId: ID!): CreateCommentResponse!
    createLike(userId: ID!, articleId: ID!): CreateLikeResponse!
    deleteArticle(id: ID!): DeleteArticleResponse!
    updateArticle(id: ID!, title: String, content: String): UpdateArticleResponse!
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

  }

  type CreateArticleResponse {
    code: Int!
    message: String!
    success: Boolean!
    article: Article
  }

  type Comment {
    id: ID!
    content: String!
    userId: ID!
    articleId: ID!
    User: User!
    Article: Article!
  }

  type CreateCommentResponse {
    code: Int!
    message: String!
    success: Boolean!
    comment: Comment
  }

  type Like {
    id: ID!
    userId: ID!
    articleId: ID!
    User: User!
    Article: Article!
  }

  type CreateLikeResponse {
    code: Int!
    message: String!
    success: Boolean!
    like: Like
  }
  type DeleteArticleResponse {
    code: Int!
    message: String!
    success: Boolean!
    article: Article
  }

  type UpdateArticleResponse {
    code: Int!
    message: String!
    success: Boolean!
    article: Article
  }
`;