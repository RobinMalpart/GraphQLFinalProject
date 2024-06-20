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
