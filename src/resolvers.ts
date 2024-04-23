import { GraphQLError } from "graphql";
import { Resolvers, Speciality } from "./types.js";
import { createUser } from "./mutations/user/createUser.js";
import { signIn } from "./mutations/user/signIn.js";


export const resolvers: Resolvers = {
  Query: {

    multiply: (parent, args, context, info) => {
      const {number1, number2} = args
      return number1 * number2
    },

  },
  Mutation: {
   
    createUser,
    signIn,
  },

 };
