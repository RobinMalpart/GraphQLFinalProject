import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
  
  const HeaderDisconected: React.FC = () => {
      return (
        <header className="bg-[#385999] justify-center flex">
            <div className="flex flex-row justify-between container">
                <div className="flex flex-row">
                      <div className="inline me-1">
                        <Link to="/">
                            <img className="h-24 w-68" src={logo} alt="Logo Facebook" />
                        </Link>
                    </div>
                </div>
            </div>
    </header>
      );
  };
  
  export default HeaderDisconected;