import { print } from "graphql";
import { MutationResolvers } from "../../types.js";

export const createLike: MutationResolvers['createLike'] = async (_, {userId, articleId}, {dataSources}) => {
  try {
    const createdlike = await dataSources.db.like.create({
      data: {
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
      message: 'Like has been created',
      success: true,
      like: {
        id: createdlike.id,
        User: {
          id: createdlike.User.id,
          username: createdlike.User.username
        },
        Article: {
          id: createdlike.Article.id,
          title: createdlike.Article.title,
          content: createdlike.Article.content
        }
      }
    }
  } catch(e) {
    console.error('Error creating like:', e);
    return {
      code: 403,
      message: 'Like has not been created',
      success: false,
      like: null,
    }
  }
}