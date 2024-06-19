import { MutationResolvers } from "../../types.js";

export const updateArticle: MutationResolvers['updateArticle'] = async (_, { id, title, content }, { dataSources }) => {
  try {
    const updateData: { title?: string, content?: string } = {};

    if (title !== undefined && title !== null) {
      updateData.title = title;
    }

    if (content !== undefined && content !== null) {
      updateData.content = content;
    }

    const updatedArticle = await dataSources.db.article.update({
      where: { id },
      data: updateData,
      include: {
        User: true,
      },
    });

    return {
      code: 200,
      message: 'Article has been updated',
      success: true,
      article: {
        id: updatedArticle.id,
        title: updatedArticle.title,
        content: updatedArticle.content,
        User: {
          id: updatedArticle.User.id,
          username: updatedArticle.User.username,
        },
      },
    };
  } catch (e) {
    console.error('Error updating article:', e);
    return {
      code: 404,
      message: 'Article not found or cannot be updated',
      success: false,
      article: null,
    };
  }
};
