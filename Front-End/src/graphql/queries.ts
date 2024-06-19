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
    }
  }
`;

export const GET_ARTICLE = gql`
  query GetArticle($id: ID!) {
    getArticle(id: $id) {
      id
      title
      content
    }
  }
`;
