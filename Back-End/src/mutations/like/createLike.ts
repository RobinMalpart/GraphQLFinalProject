import { MutationResolvers } from "../../types.js";

export const createLike: MutationResolvers['createLike'] = async (_, { userId, articleId }, { dataSources }) => {
  try {
    const createdLike = await dataSources.db.like.create({
      data: {
        User: {
          connect: {
            id: userId,
          },
        },
        Article: {
          connect: {
            id: articleId,
          },
        },
      },
      include: {
        User: true,
        Article: true,
      },
    });

    return {
      code: 201,
      message: 'Like has been created',
      success: true,
      like: {
        id: createdLike.id,
        userId: createdLike.userId,
        articleId: createdLike.articleId,
        User: {
          id: createdLike.User.id,
          username: createdLike.User.username,
        },
        Article: {
          id: createdLike.Article.id,
          title: createdLike.Article.title,
          content: createdLike.Article.content,
        },
      },
    };
  } catch (e) {
    console.error('Error creating like:', e);
    return {
      code: 403,
      message: 'Like has not been created',
      success: false,
      like: null,
    };
  }
};
