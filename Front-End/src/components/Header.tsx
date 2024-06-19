import React from 'react';
import logo from '../assets/logo.png';
import { UsersIcon, ChatBubbleLeftRightIcon, GlobeAmericasIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';
  
  const Header: React.FC = () => {
      return (
        <header className="bg-[#385999] justify-center flex">
            <div className="flex flex-row justify-between container">
                <div className="flex flex-row">
                    <div className="inline me-1">
                    <Link to="/">
                        <img className="h-12 w-32" src={logo} alt="Logo" />
                    </Link>
                    </div>
                    <div className="flex flex-row h-8 w-24 my-auto text-[#284184] ms-1 ">
                        <UsersIcon className="hover:text-slate-50 ease-out duration-300 cursor-not-allowed" />
                        <ChatBubbleLeftRightIcon className="mx-2 hover:text-slate-50 ease-out duration-300 cursor-not-allowed" />
                        <GlobeAmericasIcon className="hover:text-slate-50 ease-out duration-300 cursor-not-allowed" />
                    </div>
                </div>

                <div className="inline-flex flex-row my-auto">
                    <input className="h-8 w-96 rounded-l-lg" type="text" placeholder=" Search on Facebook" />
                    <div className="bg-white inline my-auto p-1 rounded-r-lg">
                        <MagnifyingGlassIcon className="h-6 w-6 text-slate-400" />
                    </div>
                </div>

                <div className="inline-flex flex-row my-auto">
                    <button className="bg-[#3b5998] text-white">Home</button>
                    <button className="bg-[#3b5998] text-white mx-3 cursor-not-allowed">Profile</button>
                    <LogoutButton />
                </div>
            </div>
    </header>
      );
  };
  
  export default Header;