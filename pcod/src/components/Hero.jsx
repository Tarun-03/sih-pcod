// pcod/src/components/Hero.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/BG1.png';

const Hero = () => {
  return (
    <header 
      className="relative w-full h-screen flex items-center justify-center text-center text-white p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Uncomment this line to add the overlay */}
      {/* <div className="absolute inset-0 bg-black opacity-0"></div> */}
      
      <div className="relative z-10 p-6 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-wide mb-4">
          Aura: Your Wellness Companion
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8">
          Personalized healthcare and support for women with PCOD.
        </p>
        
        <Link 
          to="/onboarding"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default Hero;