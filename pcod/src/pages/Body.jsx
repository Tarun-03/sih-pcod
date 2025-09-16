import React from 'react';

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-50 text-center">
      <div className="w-full max-w-2xl bg-white p-12 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-purple-600 mb-4">
          Welcome to the Body Page
        </h1>
        <p className="text-lg text-gray-700">
          This is a placeholder for the main content of your application, where you can add forms, data displays, or other interactive elements related to PCOD.
        </p>
      </div>
    </div>
  );
};

export default Body;