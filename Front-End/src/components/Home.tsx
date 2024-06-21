import React from 'react';
import { Link } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/outline';
import Header from './Header';
import HeaderDisconnected from './HeaderDisconnected';
import peoplelink from '../assets/peoplelink.webp';
import MainPage from './MainPage';

const Home: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="w-screen h-screen max-h-screen">
      {isAuthenticated ? <Header /> : <HeaderDisconnected />}
      <nav className="">
        <ul className="list-none p-0 h-full">
          {!isAuthenticated && (
            <div className="flex justify-between mt-24">
              <div className="w-2/3 flex flex-col my-auto">
                <img src={peoplelink} className="mx-auto my-auto" alt="People Link" />
              </div>
              <div className="flex-col inline-flex w-1/2 justify-end">
                <div className="w-1/3 h-3/4 flex flex-col justify-center mx-auto my-auto">
                  <Link className="py-2 px-3 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 inline mt-4" to="/signup">
                    <li className="hover:underline">
                      <UserIcon className="h-5 w-5 inline mr-1" /><span className="my-auto">Sign Up</span>
                    </li>
                  </Link>
                  <Link className="py-2 px-3 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 inline mt-4" to="/login">
                    <li className="hover:underline">
                      <UserIcon className="h-5 w-5 inline mr-1" /><span className="my-auto">Login</span>
                    </li>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {isAuthenticated && <MainPage />}
        </ul>
      </nav>
    </div>
  );
};

export default Home;
