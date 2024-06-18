import { print } from "graphql";
import { MutationResolvers } from "../../types.js";

export const createComment: MutationResolvers['createComment'] = async (_, {content, userId, articleId}, {dataSources}) => {
  try {
    const createdcomment = await dataSources.db.comment.create({
      data: {
        content,
        User: {
            connect: {
                id: userId
            }
          },
        Article: {
            connect: {
                id: articleId
            } 
      },
    },
        include: {
            User: true,
            Article: true
        }
    })

    return {
      code: 201,
      message: 'Comment has been created',
      success: true,
      comment: {
        id: createdcomment.id,
        content: createdcomment.content
      }

    }
  } catch(e) {
    console.error('Error creating comment:', e);
    return {
      code: 403,
      message: 'Comment has not been created',
      success: false,
      comment: null,
    }
  }
}