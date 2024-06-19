import { GraphQLError } from "graphql";
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
    const like = await dataSources.db.like.findUnique({
      where: { id },
      include: {
        User: true,
        Article: true,
      },
    });

    if (!like) {
      throw new GraphQLError('Like not found');
    }

    return {
      id: like.id,
      userId: like.userId,
      articleId: like.articleId,
      User: {
        id: like.User.id,
        username: like.User.username,
      },
      Article: {
        id: like.Article.id,
        title: like.Article.title,
        content: like.Article.content,
      },
    };
  },
  getLikes: async (_, __, { dataSources }) => {
    const likes = await dataSources.db.like.findMany({
      include: {
        User: true,
        Article: true,
      },
    });

    return likes.map(like => ({
      id: like.id,
      userId: like.userId,
      articleId: like.articleId,
      User: {
        id: like.User.id,
        username: like.User.username,
      },
      Article: {
        id: like.Article.id,
        title: like.Article.title,
        content: like.Article.content,
      },
    }));
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
