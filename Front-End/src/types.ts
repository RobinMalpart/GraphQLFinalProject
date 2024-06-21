export interface DecodedToken {
    id: string;
    username: string;
    iat: number;
  }
  
export interface User {
  __typename?: "User";
  id: string;
  username: string;
}

export interface Like {
  __typename?: "Like";
  id: string;
  userId: string;
  articleId: string;
  User: User;
}

export interface Comment {
  __typename?: "Comment";
  id: string;
  content: string;
  userId: string;
  articleId: string;
  User: User;
}

export interface Article {
  __typename?: "Article";
  id: string;
  title: string;
  content: string;
  likes: Like[];
  User: User;
  comments: Comment[];
}