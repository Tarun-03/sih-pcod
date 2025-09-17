import React from 'react';
import { Link } from 'react-router-dom';
import myLogo from '../assets/Logo.png';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-4 bg-black-700 shadow-md">
      {/* Replaced text with an image */}
      <div className="flex-shrink-0">
        <Link to="/">
          <img src={myLogo} alt="PCOD App Logo" className="h-12 w-auto" />
        </Link>
      </div>
      
      {/* Navigation Links (Text) */}
      <ul className="flex items-center space-x-6">
        <li>
          <Link 
            to="/" 
            className="text-black font-bold text-lg hover:text-gray-200 transition-colors duration-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            className="text-black font-bold text-lg hover:text-gray-200 transition-colors duration-300"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;