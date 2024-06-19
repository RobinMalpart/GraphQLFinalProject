import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ARTICLES, GET_COMMENTS, GET_LIKES } from '../graphql/queries';
import { CREATE_COMMENT, CREATE_LIKE, DELETE_LIKE } from '../graphql/mutations';
import { GetArticlesQuery, GetCommentsQuery, GetLikesQuery, CreateCommentMutation, CreateCommentMutationVariables, CreateLikeMutation, CreateLikeMutationVariables, DeleteLikeMutation, DeleteLikeMutationVariables } from '../generated/graphql';
import { HandThumbUpIcon, ChatBubbleOvalLeftEllipsisIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { jwtDecode } from 'jwt-decode';

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

  const [commentContent, setCommentContent] = useState('');
  const [commentArticleId, setCommentArticleId] = useState<string | null>(null);
  const [comments, setComments] = useState(commentsData?.getComments || []);
  const [likes, setLikes] = useState(likesData?.getLikes || []);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedArticles, setSortedArticles] = useState(data?.getArticles || []);

  useEffect(() => {
    if (data) {
      const sorted = [...data.getArticles].sort((a, b) => {
        const likesA = likes.filter(like => like.articleId === a.id).length;
        const likesB = likes.filter(like => like.articleId === b.id).length;
        return sortOrder === 'asc' ? likesA - likesB : likesB - likesA;
      });
      setSortedArticles(sorted);
    }
  }, [data, likes, sortOrder]);

  useEffect(() => {
    if (commentsData) {
      setComments(commentsData.getComments);
    }
  }, [commentsData]);

  useEffect(() => {
    if (likesData) {
      setLikes(likesData.getLikes);
    }
  }, [likesData]);

  const handleCommentSubmit = async (articleId: string) => {
    const token = localStorage.getItem('token');
    const decoded: DecodedToken = jwtDecode(token as string);
    const userId = decoded.id;

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
    const token = localStorage.getItem('token');
    const decoded: DecodedToken = jwtDecode(token as string);
    const userId = decoded.id;

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="col-span-2 mt-5 flex flex-col">
      <div className="mb-4">
        <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">Sort by Likes</label>
        <select id="sortOrder" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {sortedArticles.map(article => (
        <div key={article.id} className="bg-white shadow-md rounded-lg p-4 mb-4 mx-5">
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
            
            <button className="flex">
              <PencilSquareIcon className="h-8 w-8" />
              <span className="my-auto ml-1">Modifier</span>
            </button>
          </div>
          
          {commentArticleId === article.id && (
            <div className="mt-4">
              <form onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(article.id); }}>
                <textarea placeholder="Votre commentaire" className="w-full p-2 mb-2 border rounded" value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
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
        </div>
      ))}
    </div>
  );
};

export default ArticleList;