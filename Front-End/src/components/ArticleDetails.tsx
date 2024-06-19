import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ARTICLE } from '../graphql/queries';
import { GetArticleQuery, GetArticleQueryVariables } from '../generated/graphql';
import { useParams } from 'react-router-dom';

const ArticleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<GetArticleQuery, GetArticleQueryVariables>(GET_ARTICLE, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{data?.getArticle.title}</h2>
      <p>{data?.getArticle.content}</p>
    </div>
  );
};

export default ArticleDetails;
