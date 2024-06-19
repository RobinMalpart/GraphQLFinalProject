import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ARTICLES, GET_COMMENTS, GET_LIKES } from '../graphql/queries';
import { CREATE_COMMENT, CREATE_LIKE, DELETE_LIKE, UPDATE_ARTICLE, DELETE_ARTICLE } from '../graphql/mutations';
import { GetArticlesQuery, GetCommentsQuery, GetLikesQuery, CreateCommentMutation, CreateCommentMutationVariables, CreateLikeMutation, CreateLikeMutationVariables, DeleteLikeMutation, DeleteLikeMutationVariables, UpdateArticleMutation, UpdateArticleMutationVariables, DeleteArticleMutation, DeleteArticleMutationVariables } from '../generated/graphql';
import { HandThumbUpIcon, ChatBubbleOvalLeftEllipsisIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { jwtDecode } from 'jwt-decode';
import CreateArticle from './CreateArticle';

interface DecodedToken {
  id: string;
  exp: number;
  iat: number;
}

const ArticleList: React.FC = () => {
  const { loading, error, data } = useQuery<GetArticlesQuery>(GET_ARTICLES);
  const { data: commentsData } = useQuery<GetCommentsQuery>(GET_COMMENTS);
  const { data: likesData } = useQuery<GetLikesQuery>(GET_LIKES);
  const [createComment] = useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CREATE_COMMENT);
  const [createLike] = useMutation<CreateLikeMutation, CreateLikeMutationVariables>(CREATE_LIKE);
  const [deleteLike] = useMutation<DeleteLikeMutation, DeleteLikeMutationVariables>(DELETE_LIKE);
  const [updateArticle] = useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UPDATE_ARTICLE);
  const [deleteArticle] = useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DELETE_ARTICLE);

  const [articles, setArticles] = useState<GetArticlesQuery['getArticles']>([]);
  const [commentContent, setCommentContent] = useState('');
  const [commentArticleId, setCommentArticleId] = useState<string | null>(null);
  const [comments, setComments] = useState<GetCommentsQuery['getComments']>([]);
  const [likes, setLikes] = useState<GetLikesQuery['getLikes']>([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [authorFilter, setAuthorFilter] = useState('');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');
  const [sortedArticles, setSortedArticles] = useState<GetArticlesQuery['getArticles']>([]);

  const token = localStorage.getItem('token');
  let userId = '';
  if (token) {
    const decoded: DecodedToken = jwtDecode(token);
    userId = decoded.id;
  }

  useEffect(() => {
    if (data?.getArticles) {
      setArticles(data.getArticles);
    }
  }, [data]);

  useEffect(() => {
    if (commentsData?.getComments) {
      setComments(commentsData.getComments);
    }
  }, [commentsData]);

  useEffect(() => {
    if (likesData?.getLikes) {
      setLikes(likesData.getLikes);
    }
  }, [likesData]);

  useEffect(() => {
    const sorted = [...articles].sort((a, b) => {
      const likesA = likes.filter(like => like.articleId === a.id).length;
      const likesB = likes.filter(like => like.articleId === b.id).length;
      return sortOrder === 'asc' ? likesA - likesB : likesB - likesA;
    });
    setSortedArticles(sorted);
  }, [likes, sortOrder, articles]);

  const handleCommentSubmit = async (articleId: string) => {
    if (userId && commentContent) {
      try {
        const { data } = await createComment({
          variables: { content: commentContent, userId, articleId }
        });
        if (data?.createComment.success && data.createComment.comment) {
          setComments([...comments, data.createComment.comment]);
          setCommentContent('');
        } else {
          alert(data?.createComment.message);
        }
      } catch (err) {
        console.error('Error creating comment:', err);
      }
    }
  };

  const handleLike = async (articleId: string) => {
    const existingLike = likes.find(like => like.articleId === articleId && like.userId === userId);

    if (existingLike) {
      try {
        const { data } = await deleteLike({
          variables: { deleteLikeId: existingLike.id }
        });
        if (data?.deleteLike.success) {
          setLikes(likes.filter(like => like.id !== existingLike.id));
        } else {
          alert(data?.deleteLike.message);
        }
      } catch (err) {
        console.error('Error deleting like:', err);
      }
    } else {
      try {
        const { data } = await createLike({
          variables: { userId, articleId }
        });
        if (data?.createLike.success && data.createLike.like) {
          setLikes([...likes, data.createLike.like]);
        } else {
          alert(data?.createLike.message);
        }
      } catch (err) {
        console.error('Error creating like:', err);
      }
    }
  };

  const handleAddArticle = (newArticle: GetArticlesQuery['getArticles'][0]) => {
    setArticles([newArticle, ...articles]);
  };

  const handleEditArticle = (articleId: string, title: string, content: string) => {
    setEditingArticleId(articleId);
    setEditingTitle(title);
    setEditingContent(content);
  };

  const handleUpdateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await updateArticle({
        variables: { updateArticleId: editingArticleId!, title: editingTitle, content: editingContent }
      });
      if (data?.updateArticle.success && data.updateArticle.article) {
        setArticles(articles.map(article =>
          article.id === editingArticleId ? data.updateArticle.article : article
        ));
        setEditingArticleId(null);
        setEditingTitle('');
        setEditingContent('');
      } else {
        alert(data?.updateArticle.message);
      }
    } catch (err) {
      console.error('Error updating article:', err);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    try {
      const { data } = await deleteArticle({
        variables: { deleteArticleId: articleId }
      });
      if (data?.deleteArticle.success) {
        setArticles(articles.filter(article => article.id !== articleId));
      } else {
        alert(data?.deleteArticle.message);
      }
    } catch (err) {
      console.error('Error deleting article:', err);
    }
  };

  const filteredArticles = sortedArticles.filter(article => article.User.username.toLowerCase().includes(authorFilter.toLowerCase()));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="col-span-2 mt-5 flex flex-col">
      <CreateArticle onAddArticle={handleAddArticle} />

      <div className="mb-4">
        <label htmlFor="authorFilter" className="block text-sm font-medium text-gray-700">Filter by Author</label>
        <input
          type="text"
          id="authorFilter"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">Sort by Likes</label>
        <select
          id="sortOrder"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Croissant</option>
          <option value="desc">Décroissant</option>
        </select>
      </div>

      {filteredArticles.map(article => (
        <div key={article.id} className="bg-white shadow-md rounded-lg p-4 mb-4 mx-5">
          {editingArticleId === article.id ? (
            <form onSubmit={handleUpdateArticle}>
              <input
                type="text"
                className="w-full p-2 mb-2 border rounded"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
              />
              <textarea
                className="w-full p-2 mb-2 border rounded"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              />
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Mettre à jour le post</button>
              <button type="button" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 mt-2" onClick={() => setEditingArticleId(null)}>Annuler</button>
              <button type="button" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 mt-2" onClick={() => handleDeleteArticle(article.id)}>Supprimer</button>
            </form>
          ) : (
            <>
              <div className="border-b-4 pb-2">
                <h2 className="text-xl font-bold">{article.title}</h2>
                <p className="text-sm text-gray-500">Posted by {article.User.username}</p>
                <p className="mt-1">{article.content}</p>
              </div>
              
              <div className="flex justify-around mt-3">
                <button className="flex" onClick={() => handleLike(article.id)}>
                  <HandThumbUpIcon className="h-8 w-8" />
                  <span className="my-auto ml-1">
                    {likes.filter(like => like.articleId === article.id).length}
                  </span>
                </button>
                
                <button className="flex" onClick={() => setCommentArticleId(commentArticleId === article.id ? null : article.id)}>
                  <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8" />
                  <span className="my-auto ml-1">
                    {comments.filter(comment => comment.articleId === article.id).length}
                  </span>
                </button>
                
                {article.User.id === userId && (
                  <button className="flex" onClick={() => handleEditArticle(article.id, article.title, article.content)}>
                    <PencilSquareIcon className="h-8 w-8" />
                    <span className="my-auto ml-1">Modifier</span>
                  </button>
                )}
              </div>
              
              {commentArticleId === article.id && (
                <div className="mt-4">
                  <form onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(article.id); }}>
                    <textarea
                      placeholder="Votre commentaire"
                      className="w-full p-2 mb-2 border rounded"
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                      Ajouter un commentaire
                    </button>
                  </form>
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">Commentaires</h3>
                    {comments.filter(comment => comment.articleId === article.id).map(comment => (
                      <div key={comment.id} className="mt-2 bg-gray-100 p-2 rounded">
                        <p><strong>{comment.User.username}:</strong> {comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArticleList;