import { print } from "graphql";
import { MutationResolvers } from "../../types.js";

export const createArticle: MutationResolvers['createArticle'] = async (_, {title, content, userId}, {dataSources}) => {
  try {
    const createdArticle = await dataSources.db.article.create({
      data: {
        title,
        content,
        User: {
            connect: {
                id: userId
            }
          }, 
        likes: {
            create: []
          },
        comments: {
            create: []
          }
      },
        include: {
            User: true
        }
    })

    return {
      code: 201,
      message: 'Article has been created',
      success: true,
      article: {
        id: createdArticle.id,
        title: createdArticle.title,
        content: createdArticle.content,
        User: {
          id: createdArticle.User.id,
          username: createdArticle.User.username
        },
        likes: [],
        comments: []
      }
    }
  } catch(e) {
    console.error('Error creating article:', e);
    return {
      code: 403,
      message: 'Article has not been created',
      success: false,
      article: null,
    }
  }
}