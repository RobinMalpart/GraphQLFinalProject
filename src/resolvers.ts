import { GraphQLError } from "graphql";
import { Resolvers } from "./types.js";
import { createUser } from "./mutations/user/createUser.js";
import { createArticle } from "./mutations/article/createArticle.js";
import { signIn } from "./mutations/user/signIn.js";


export const resolvers: Resolvers = {
  Query: {

    multiply: (parent, args, context, info) => {
      const {number1, number2} = args
      return number1 * number2
    },

  },
  Mutation: {
    createArticle,
    createUser,
    signIn,
  },

 };
