import React from 'react';
import Hero from '../components/Hero.jsx';
import PcodInfo from '../components/PcodInfo.jsx'; // Import the new component

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      {/* Existing "What is PCOD?" section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">What is PCOD?</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          Polycystic Ovary Syndrome (PCOS) is a hormonal disorder common among women of reproductive age. It can cause irregular periods, excess hair growth, and other symptoms. Our app is here to help you manage your health effectively.
        </p>
      </section>

      {/* Add the new PcodInfo component here */}
      <PcodInfo />
    </div>
  );
};

export default Home;