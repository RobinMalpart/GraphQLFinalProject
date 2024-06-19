import React from 'react';
import { HandThumbUpIcon, ChatBubbleOvalLeftEllipsisIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

interface ArticleListProps {
  articles: { id: string, title: string, content: string}[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <div>
      {articles.map(article => (
        <div key={article.id} className="bg-white shadow-md rounded-lg p-4 mb-4 mx-5">
          <div className="border-b-4 pb-2">
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p className="text-sm">Author</p>
            <p className="my-3">{article.content}</p>
          </div>

          <div className="flex justify-around mt-3">
            <button className="flex">
              <HandThumbUpIcon className="h-8 w-8" />
              <span className="my-auto ml-1">0</span>
            </button>

            <button className="flex">
              <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8" />
              <span className="my-auto ml-1">0</span>
            </button>

            <button className="flex">
              <PencilSquareIcon className="h-8 w-8" />
              <span className="my-auto ml-1">Modifier</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;