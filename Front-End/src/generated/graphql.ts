import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from '@vue/composition-api';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Article = {
  __typename?: 'Article';
  User: User;
  comments: Array<Comment>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likes: Array<Like>;
  title: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  User: User;
  articleId: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type CreateArticleResponse = {
  __typename?: 'CreateArticleResponse';
  article?: Maybe<Article>;
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateCommentResponse = {
  __typename?: 'CreateCommentResponse';
  code: Scalars['Int']['output'];
  comment?: Maybe<Comment>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateLikeResponse = {
  __typename?: 'CreateLikeResponse';
  code: Scalars['Int']['output'];
  like?: Maybe<Like>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type DeleteArticleResponse = {
  __typename?: 'DeleteArticleResponse';
  article?: Maybe<Article>;
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeleteLikeResponse = {
  __typename?: 'DeleteLikeResponse';
  code: Scalars['Int']['output'];
  like?: Maybe<Like>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Like = {
  __typename?: 'Like';
  User: User;
  articleId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle: CreateArticleResponse;
  createComment: CreateCommentResponse;
  createLike: CreateLikeResponse;
  createUser: CreateUserResponse;
  deleteArticle: DeleteArticleResponse;
  deleteLike: DeleteLikeResponse;
  signIn: SignInResponse;
  updateArticle: UpdateArticleResponse;
};


export type MutationCreateArticleArgs = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateCommentArgs = {
  articleId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateLikeArgs = {
  articleId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateUserArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLikeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateArticleArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getArticle?: Maybe<Article>;
  getArticles: Array<Article>;
  getComment?: Maybe<Comment>;
  getComments: Array<Comment>;
  getLike?: Maybe<Like>;
  getLikes: Array<Like>;
  getUser?: Maybe<User>;
  getUsers: Array<User>;
};


export type QueryGetArticleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetLikeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type UpdateArticleResponse = {
  __typename?: 'UpdateArticleResponse';
  article?: Maybe<Article>;
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type MutationMutationVariables = Exact<{
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
}>;


export type MutationMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'CreateArticleResponse', code: number, message: string, success: boolean, article?: { __typename?: 'Article', id: string, title: string, content: string, User: { __typename?: 'User', username: string, id: string } } | null } };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserResponse', success: boolean, code: number, message: string, user?: { __typename?: 'User', id: string, username: string } | null } };

export type SignInMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInResponse', token?: string | null, success: boolean, message: string, code: number } };

export type CreateCommentMutationVariables = Exact<{
  content: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
  articleId: Scalars['ID']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CreateCommentResponse', code: number, message: string, success: boolean, comment?: { __typename?: 'Comment', id: string, content: string, userId: string, articleId: string, User: { __typename?: 'User', id: string, username: string } } | null } };

export type CreateLikeMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  articleId: Scalars['ID']['input'];
}>;


export type CreateLikeMutation = { __typename?: 'Mutation', createLike: { __typename?: 'CreateLikeResponse', success: boolean, message: string, code: number, like?: { __typename?: 'Like', id: string, userId: string, articleId: string, User: { __typename?: 'User', id: string, username: string } } | null } };

export type DeleteLikeMutationVariables = Exact<{
  deleteLikeId: Scalars['ID']['input'];
}>;


export type DeleteLikeMutation = { __typename?: 'Mutation', deleteLike: { __typename?: 'DeleteLikeResponse', code: number, message: string, success: boolean, like?: { __typename?: 'Like', id: string, userId: string, articleId: string, User: { __typename?: 'User', id: string, username: string } } | null } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, username: string }> };

export type GetArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArticlesQuery = { __typename?: 'Query', getArticles: Array<{ __typename?: 'Article', id: string, title: string, content: string, likes: Array<{ __typename?: 'Like', id: string, userId: string, articleId: string, User: { __typename?: 'User', id: string, username: string } }>, User: { __typename?: 'User', id: string, username: string }, comments: Array<{ __typename?: 'Comment', id: string, content: string, userId: string, articleId: string, User: { __typename?: 'User', id: string, username: string } }> }> };

export type GetCommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCommentsQuery = { __typename?: 'Query', getComments: Array<{ __typename?: 'Comment', id: string, content: string, userId: string, articleId: string, User: { __typename?: 'User', id: string, username: string } }> };


export const MutationDocument = gql`
    mutation Mutation($title: String!, $content: String!, $userId: ID!) {
  createArticle(title: $title, content: $content, userId: $userId) {
    code
    message
    success
    article {
      id
      title
      content
      User {
        username
        id
      }
    }
  }
}
    `;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useMutationMutation({
 *   variables: {
 *     title: // value for 'title'
 *     content: // value for 'content'
 *     userId: // value for 'userId'
 *   },
 * });
 */
export function useMutationMutation(options: VueApolloComposable.UseMutationOptions<MutationMutation, MutationMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<MutationMutation, MutationMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
}
export type MutationMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<MutationMutation, MutationMutationVariables>;
export const CreateUserDocument = gql`
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

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateUserMutation({
 *   variables: {
 *     username: // value for 'username'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(options: VueApolloComposable.UseMutationOptions<CreateUserMutation, CreateUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateUserMutation, CreateUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
}
export type CreateUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateUserMutation, CreateUserMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password) {
    token
    success
    message
    code
  }
}
    `;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignInMutation({
 *   variables: {
 *     username: // value for 'username'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(options: VueApolloComposable.UseMutationOptions<SignInMutation, SignInMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SignInMutation, SignInMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
}
export type SignInMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SignInMutation, SignInMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($content: String!, $userId: ID!, $articleId: ID!) {
  createComment(content: $content, userId: $userId, articleId: $articleId) {
    code
    message
    success
    comment {
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

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateCommentMutation({
 *   variables: {
 *     content: // value for 'content'
 *     userId: // value for 'userId'
 *     articleId: // value for 'articleId'
 *   },
 * });
 */
export function useCreateCommentMutation(options: VueApolloComposable.UseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
}
export type CreateCommentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateLikeDocument = gql`
    mutation CreateLike($userId: ID!, $articleId: ID!) {
  createLike(userId: $userId, articleId: $articleId) {
    success
    message
    code
    like {
      id
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

/**
 * __useCreateLikeMutation__
 *
 * To run a mutation, you first call `useCreateLikeMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateLikeMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateLikeMutation({
 *   variables: {
 *     userId: // value for 'userId'
 *     articleId: // value for 'articleId'
 *   },
 * });
 */
export function useCreateLikeMutation(options: VueApolloComposable.UseMutationOptions<CreateLikeMutation, CreateLikeMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateLikeMutation, CreateLikeMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateLikeMutation, CreateLikeMutationVariables>(CreateLikeDocument, options);
}
export type CreateLikeMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateLikeMutation, CreateLikeMutationVariables>;
export const DeleteLikeDocument = gql`
    mutation DeleteLike($deleteLikeId: ID!) {
  deleteLike(id: $deleteLikeId) {
    code
    message
    success
    like {
      id
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

/**
 * __useDeleteLikeMutation__
 *
 * To run a mutation, you first call `useDeleteLikeMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLikeMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteLikeMutation({
 *   variables: {
 *     deleteLikeId: // value for 'deleteLikeId'
 *   },
 * });
 */
export function useDeleteLikeMutation(options: VueApolloComposable.UseMutationOptions<DeleteLikeMutation, DeleteLikeMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteLikeMutation, DeleteLikeMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteLikeMutation, DeleteLikeMutationVariables>(DeleteLikeDocument, options);
}
export type DeleteLikeMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteLikeMutation, DeleteLikeMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    username
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a Vue component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetUsersQuery();
 */
export function useGetUsersQuery(options: VueApolloComposable.UseQueryOptions<GetUsersQuery, GetUsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetUsersQuery, GetUsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUsersQuery, GetUsersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, {}, options);
}
export function useGetUsersLazyQuery(options: VueApolloComposable.UseQueryOptions<GetUsersQuery, GetUsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetUsersQuery, GetUsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUsersQuery, GetUsersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, {}, options);
}
export type GetUsersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetUsersQuery, GetUsersQueryVariables>;
export const GetArticlesDocument = gql`
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

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a Vue component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetArticlesQuery();
 */
export function useGetArticlesQuery(options: VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, {}, options);
}
export function useGetArticlesLazyQuery(options: VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, {}, options);
}
export type GetArticlesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetArticlesQuery, GetArticlesQueryVariables>;
export const GetCommentsDocument = gql`
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

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a Vue component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCommentsQuery();
 */
export function useGetCommentsQuery(options: VueApolloComposable.UseQueryOptions<GetCommentsQuery, GetCommentsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCommentsQuery, GetCommentsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCommentsQuery, GetCommentsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, {}, options);
}
export function useGetCommentsLazyQuery(options: VueApolloComposable.UseQueryOptions<GetCommentsQuery, GetCommentsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCommentsQuery, GetCommentsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCommentsQuery, GetCommentsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, {}, options);
}
export type GetCommentsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCommentsQuery, GetCommentsQueryVariables>;