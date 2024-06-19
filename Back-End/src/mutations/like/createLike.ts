import { MutationResolvers } from "../../types.js";
interface PrismaError extends Error {
  code: string;
  meta?: {
    target: string[];
  };
}
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
        }
      },
    };
  } 
  catch (e) {
    const prismaError = e as PrismaError;
    if (prismaError.code === 'P2002' ) {
      return {
        code: 409,
        message: 'User has already liked this article',
        success: false,
        like: null,
      };
    } else {
      console.error('Error creating like:', e);
      return {
        code: 403,
        message: 'Like has not been created',
        success: false,
        like: null,
      };
    }
  }
};