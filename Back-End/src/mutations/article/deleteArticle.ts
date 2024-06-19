import { MutationResolvers } from "../../types.js";

export const deleteArticle: MutationResolvers['deleteArticle'] = async (_, { id }, { dataSources }) => {
  try {
    const deletedArticle = await dataSources.db.article.delete({
      where: { id },
      include: {
        User: true,
      },
    });

    return {
      code: 200,
      message: 'Article has been deleted',
      success: true,
      article: {
        id: deletedArticle.id,
        title: deletedArticle.title,
        content: deletedArticle.content,
        User: {
          id: deletedArticle.User.id,
          username: deletedArticle.User.username,
        },
      },
    };
  } catch (e) {
    console.error('Error deleting article:', e);
    return {
      code: 404,
      message: 'Article not found or cannot be deleted',
      success: false,
      article: null,
    };
  }
};
