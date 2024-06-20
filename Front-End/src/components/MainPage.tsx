import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ARTICLES } from '../graphql/queries';
import { GetArticlesQuery, GetArticlesQuery_getArticles } from '../generated/graphql';
import { DocumentTextIcon, ChatBubbleLeftRightIcon, CalendarDaysIcon, PhotoIcon, UsersIcon } from '@heroicons/react/24/outline';
import { jwtDecode } from 'jwt-decode';
import ArticleList from './ArticleList';
import UserList from './UserList';

interface DecodedToken {
  id: string;
  username: string;
  iat: number;
}

const MainPage: React.FC = () => {
  const userProfileImage = "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg";
  const token = localStorage.getItem('token');
  let username = '';
  if (token) {
    const decoded: DecodedToken = jwtDecode(token);
    username = decoded.username;
  }

  const { loading, error, data } = useQuery<GetArticlesQuery>(GET_ARTICLES);
  const [articles, setArticles] = useState<GetArticlesQuery_getArticles[]>([]);

  useEffect(() => {
    if (data) {
      setArticles(data.getArticles);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <main className="container grid grid-cols-4 min-h-screen">
        {/* Colonne de gauche */}
        <div className="col-span-1 flex flex-col border-r-2 mt-5">
          <div className="flex p-4">
            <img className="h-12 w-12 object-cover rounded-full mr-3" src={userProfileImage} alt="Profile" />
            <div className="flex flex-col">
              <h4 className="font-bold">{username}</h4>
              <Link to="#" className="text-blue-500 hover:underline cursor-not-allowed">Voir mon profil</Link>
            </div>
          </div>
          <div className="mt-3 p-2 border-b-2">
            <Link className="flex my-1 rounded-md p-1 hover:bg-slate-300" to="#">
              <DocumentTextIcon className="h-6 w-6 text-[#385999]" />
              <h5 className="my-auto ml-2">Flux d'actualités</h5>
            </Link>
            <Link className="flex my-1 rounded-md p-1 hover:bg-slate-300 cursor-not-allowed" to="#">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-[#385999]" />
              <h5 className="my-auto ml-2">Messages</h5>
            </Link>
            <Link className="flex my-1 rounded-md p-1 hover:bg-slate-300 cursor-not-allowed" to="#">
              <CalendarDaysIcon className="h-6 w-6 text-[#385999]" />
              <h5 className="my-auto ml-2">Evenements</h5>
            </Link>
            <Link className="flex my-1 rounded-md p-1 hover:bg-slate-300 cursor-not-allowed" to="#">
              <PhotoIcon className="h-6 w-6 text-[#385999]" />
              <h5 className="my-auto ml-2">Photos</h5>
            </Link>
            <Link className="flex my-1 rounded-md p-1 hover:bg-slate-300 cursor-not-allowed" to="#">
              <UsersIcon className="h-6 w-6 text-[#385999]" />
              <h5 className="my-auto ml-2">Amis</h5>
            </Link>
          </div>
          <div className="p-2">
            <h5 className="text-slate-400 mb-2">Suggestion d'amis</h5>
            <UserList />
          </div>
        </div>

        {/* Colonne du milieu */}
        <div className="col-span-2 mt-5 flex flex-col">          
          {/* Articles */}
          <ArticleList articles={articles} />
        </div>

        {/* Colonne de droite */}
        <div className="col-span-1 mt-5">
          <h6 className="text-slate-400">Sponsored</h6>
          <div className="flex flex-col">
            <div className="flex">
              <span className="h-48 w-48 m-2 bg-slate-300 rounded-md">Ad 1</span>
              <span className="h-48 w-48 m-2 bg-slate-300 rounded-md">Ad 2</span>
            </div>
            <span className="h-48 w-68 m-2 bg-slate-300 rounded-md">Ad 3</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
