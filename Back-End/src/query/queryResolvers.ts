import { QueryResolvers } from "../types.js";

export const queryResolvers: QueryResolvers = {
  getArticle: async (_, { id }, { dataSources }) => {
    return await dataSources.db.article.findUnique({
      where: { id },
      include: {
        User: true,
        likes: true,
      },
    });
  },
  getArticles: async (_, __, { dataSources }) => {
    return await dataSources.db.article.findMany({
      include: {
        User: true,
        likes: true,
      },
    });
  },
  getUser: async (_, { id }, { dataSources }) => {
    return await dataSources.db.user.findUnique({
      where: { id },
      include: {
        articles: true,
        likes: true,
      },
    });
  },
  getUsers: async (_, __, { dataSources }) => {
    return await dataSources.db.user.findMany({
      include: {
        articles: true,
        likes: true,
      },
    });
  },
  getLike: async (_, { id }, { dataSources }) => {
    return await dataSources.db.like.findUnique({
      where: { id },
      include: {
        User: true,
        Article: true,
      },
    });
  },
  getLikes: async (_, __, { dataSources }) => {
    return await dataSources.db.like.findMany({
      include: {
        User: true,
        Article: true,
      },
    });
  },
  getComment: async (_, { id }, { dataSources }) => {
    return await dataSources.db.comment.findUnique({
      where: { id },
      include: {
        User: true,
        Article: true,
      },
    });
  },
  getComments: async (_, __, { dataSources }) => {
    return await dataSources.db.comment.findMany({
      include: {
        User: true,
        Article: true,
      },
    });
  },
};
