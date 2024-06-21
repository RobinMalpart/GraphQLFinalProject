import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      username
    }
  }
`;


export const GET_ARTICLES = gql`
  query GetArticles {
    getArticles {
      id
      title
      content
      likes {
        id
        userId
        articleId
        User {
          id
          username
        }
      }
      User {
        id
        username
      }
      comments {
        id
        content
        userId
        articleId
        User {
          id
          username
        }
      }
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments {
    getComments {
      id
      content
      userId
      articleId
      User {
        id
        username
      }
    }
  }
`;

export const GET_LIKES = gql`
  query GetLikes {
    getLikes {
      id
      userId
      articleId
      User {
        id
        username
      }
    }
  }
`;