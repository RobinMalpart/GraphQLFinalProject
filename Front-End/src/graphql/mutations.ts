import { gql } from '@apollo/client';

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String!, $content: String!, $userId: ID!) {
    createArticle(title: $title, content: $content, userId: $userId) {
      code
      message
      success
      article {
        id
        title
        content
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      user {
        id
        username
      }
      success
      code
      message
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
      success
      message
      code
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($content: String!, $userId: ID!, $articleId: ID!) {
    createComment(content: $content, userId: $userId, articleId: $articleId) {
      code
      message
      success
      comment {
        id
        content
      }
    }
  }
`;

export const CREATE_LIKE = gql`
  mutation CreateLike($userId: ID!, $articleId: ID!) {
    createLike(userId: $userId, articleId: $articleId) {
      code
      message
      success
      like {
        id
      }
    }
  }
`;
