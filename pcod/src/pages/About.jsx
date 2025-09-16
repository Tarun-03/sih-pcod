import React from 'react';
import aboutBgImage from '../assets/BG1.png'; // 👈 Import your background image

const About = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 text-center text-white"
      style={{
        backgroundImage: `url(${aboutBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* <div className="absolute inset-0 bg-black opacity-40"></div> */}

      <div className="relative z-10 w-full max-w-2xl bg-white p-12 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-purple-600 mb-4">
          About Aura
        </h1>
        <p className="text-lg text-gray-700">
          Aura is your wellness companion, designed to help women manage PCOD with personalized plans, symptom tracking, and expert-backed insights. We believe in empowering you with the knowledge and tools to lead a healthier life.
        </p>
        <p className="mt-4 text-md text-gray-500">
          Our mission is to provide comprehensive support, foster a community of understanding, and leverage technology to make PCOD management simpler and more effective.
        </p>
      </div>
    </div>
  );
};

export default About;