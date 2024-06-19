import { MutationResolvers } from "../../types.js";

export const createComment: MutationResolvers['createComment'] = async (_, { content, userId, articleId }, { dataSources }) => {
  try {
    const createdComment = await dataSources.db.comment.create({
      data: {
        content,
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
      message: 'Comment has been created',
      success: true,
      comment: {
        id: createdComment.id,
        content: createdComment.content,
        userId: createdComment.userId,
        articleId: createdComment.articleId,
        User: {
          id: createdComment.User.id,
          username: createdComment.User.username,
        },
        Article: {
          id: createdComment.Article.id,
          title: createdComment.Article.title,
          content: createdComment.Article.content,
        },
      },
    };
  } catch (e) {
    console.error('Error creating comment:', e);
    return {
      code: 403,
      message: 'Comment has not been created',
      success: false,
      comment: null,
    };
  }
};
