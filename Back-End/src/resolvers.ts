import { GraphQLError } from "graphql";
import { Resolvers } from "./types.js";
import { createUser } from "./mutations/user/createUser.js";
import { createArticle } from "./mutations/article/createArticle.js";
import { createComment } from "./mutations/comment/createComment.js";
import { createLike } from "./mutations/like/createLike.js";
import { signIn } from "./mutations/user/signIn.js";
import { queryResolvers } from "./query/queryResolvers.js";
import { deleteArticle } from "./mutations/article/deleteArticle.js";
import { updateArticle } from "./mutations/article/updateArticle.js";

export const resolvers: Resolvers = {
  Query: {
    ...queryResolvers,

  },
  Mutation: {
    createArticle,
    createUser,
    signIn,
    createComment,
    createLike,
    deleteArticle,
    updateArticle,
  },
};
