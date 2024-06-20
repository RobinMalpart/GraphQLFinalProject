import { MutationResolvers } from "../../types.js";

// Définir une interface pour l'erreur Prisma
interface PrismaError extends Error {
  code: string;
  meta?: {
    target: string[];
  };
}

export const deleteLike: MutationResolvers['deleteLike'] = async (_, { id }, { dataSources }) => {
  try {
    const deletedLike = await dataSources.db.like.delete({
      where: { id },
      include: {
        User: true,
        Article: true,
      },
    });

    return {
      code: 200,
      message: 'Like has been deleted',
      success: true,
      like: deletedLike,
    };
  } catch (e) {
    const prismaError = e as PrismaError;
    if (prismaError.code === 'P2025') {
      // Gestion d'erreur pour l'élément non trouvé
      return {
        code: 404,
        message: 'Like not found',
        success: false,
        like: null,
      };
    } else {
      console.error('Error deleting like:', e);
      return {
        code: 403,
        message: 'Like could not be deleted',
        success: false,
        like: null,
      };
    }
  }
};
