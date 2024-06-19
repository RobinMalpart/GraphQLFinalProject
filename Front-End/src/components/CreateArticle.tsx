import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ARTICLE } from '../graphql/mutations';
import { CreateArticleMutation, CreateArticleMutationVariables } from '../generated/graphql';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  exp: number;
  iat: number;
}

interface CreateArticleProps {
  onAddArticle: (article: { id: string, title: string, content: string, User: { username: string, id: string } }) => void;
}

const CreateArticle: React.FC<CreateArticleProps> = ({ onAddArticle }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const token = localStorage.getItem('token');

  let userId = '';
  if (token) {
    const decoded: DecodedToken = jwtDecode(token as string);
    userId = decoded.id;
  }

  const [createArticle, { loading, error }] = useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CREATE_ARTICLE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await createArticle({ variables: { title, content, userId } });
      if (data?.createArticle.success && data.createArticle.article) {
        onAddArticle(data.createArticle.article);
        setTitle('');
        setContent('');
      } else {
        alert(data?.createArticle.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 mx-5">
      <h2 className="text-xl font-bold mb-4">Quoi de neuf ?</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Titre de l'article" className="w-full p-2 mb-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <textarea placeholder="Contenu de l'article" className="w-full p-2 mb-2 border rounded" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700" disabled={loading}>Créer le post</button>
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
      </form>
    </div>
  );
};

export default CreateArticle;