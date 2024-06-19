import React from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import LogoutButton from './LogoutButton';
import Header from './Header';
import HeaderDisconected from './HeaderDisconnected';
import peoplelink from '../assets/peoplelink.png';
import MainPage from './MainPage';

const Home: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem('token');
  return (
      <div className="w-screen h-screen max-h-screen">
      {isAuthenticated ? <Header /> : <HeaderDisconected />}
      <nav className=''>
        <ul className="list-none p-0 h-full">
          {!isAuthenticated && (
            <>
            <div className='flex justify-between mt-24'>
                <div className='w-2/3 flex flex-col my-auto'>
                    <img src={peoplelink} className='mx-auto my-auto'/>
                </div>            
                <div className='flex-col inline-flex w-1/2 justify-end'>
                    <div className='w-1/3 h-3/4 flex flex-col justify-center mx-auto my-auto'>
                        <li className="py-2 px-3 bg-slate-100 hover:bg-slate-200 inline rounded-md mt-4">
                            <Link className="text-blue-500 hover:underline" to="/signup">
                                <UserIcon className="h-5 w-5 inline mr-1" /><span className='my-auto'>Sign Up</span>
                            </Link>
                        </li>
                        <li className="py-2 px-3 bg-slate-100 hover:bg-slate-200 inline rounded-md mt-4">
                            <Link className="text-blue-500 hover:underline" to="/login">
                                <UserIcon className="h-5 w-5 inline mr-1" /><span className='my-auto'>Login</span>
                            </Link>
                        </li>
                    </div>
                </div>
            </div> 
            </>
          )}
          {isAuthenticated && (
            <>
                <MainPage />
            </>
            )}
        </ul>
      </nav>
    </div>
  );
};

export default Home;