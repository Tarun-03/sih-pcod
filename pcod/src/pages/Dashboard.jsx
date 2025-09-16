import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  // Get the user's profile from the global context
  const { profile } = useApp();

  // If the profile is not yet set (e.g., user skipped onboarding), show a message
  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-center">
        <div className="p-8 bg-white rounded-xl shadow-lg max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
          <p className="text-gray-600 mb-6">
            Please complete the onboarding process to view your personalized dashboard.
          </p>
          <Link 
            to="/onboarding"
            className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-purple-700 transition-colors"
          >
            Start Onboarding
          </Link>
        </div>
      </div>
    );
  }

  // Calculate BMI and other dynamic values
  const bmi = profile.height > 0 ? (profile.weight / (profile.height / 100) ** 2).toFixed(2) : 'N/A';
  
  const waterProgress = (6 / 8) * 100; // You would track this separately, keeping it mock for now
  const activityProgress = (profile.moderateActivity + profile.vigorousActivity) > 0 ? 100 : 0;
  const sleepProgress = (profile.sleepQuality / 10) * 100;
  
  return (
    <div className="min-h-screen p-6 space-y-6 bg-gray-50">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">🌟 Keep up the amazing work!</p>
      </header>
      
      {/* Today's Progress Section */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Today's Progress</h2>
        <div className="flex justify-around items-center text-center">
          {/* Progress Rings here (using the logic from the old code) */}
          <div>
            <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full"
                style={{
                  background: `conic-gradient(#3B82F6 ${waterProgress}%, #E5E7EB ${waterProgress}%)`
                }}
              />
            </div>
            <p className="mt-2 text-blue-500 font-bold">Water</p>
          </div>
          <div>
            <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full"
                style={{
                  background: `conic-gradient(#F43F5E ${activityProgress}%, #E5E7EB ${activityProgress}%)`
                }}
              />
            </div>
            <p className="mt-2 text-rose-500 font-bold">Activity</p>
          </div>
          <div>
            <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full"
                style={{
                  background: `conic-gradient(#6366F1 ${sleepProgress}%, #E5E7EB ${sleepProgress}%)`
                }}
              />
            </div>
            <p className="mt-2 text-indigo-500 font-bold">Sleep</p>
          </div>
        </div>
      </div>

      {/* User Profile Details - New Section */}
      <div className="p-6 bg-white rounded-xl shadow-lg space-y-4">
        <h2 className="text-2xl font-bold mb-4">Your Health Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-100 rounded-lg">
                <span className="block text-sm text-gray-500">Age:</span>
                <span className="text-lg font-semibold">{profile.age} years</span>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
                <span className="block text-sm text-gray-500">Height:</span>
                <span className="text-lg font-semibold">{profile.height} cm</span>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
                <span className="block text-sm text-gray-500">Weight:</span>
                <span className="text-lg font-semibold">{profile.weight} kg</span>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
                <span className="block text-sm text-gray-500">BMI:</span>
                <span className="text-lg font-semibold">{bmi}</span>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
                <span className="block text-sm text-gray-500">Fitness Goal:</span>
                <span className="text-lg font-semibold">{profile.fitnessGoal}</span>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
                <span className="block text-sm text-gray-500">Dietary Preference:</span>
                <span className="text-lg font-semibold">{profile.dietaryPreference}</span>
            </div>
        </div>
      </div>
      
      {/* Habits & Symptoms */}
      <div className="p-6 bg-white rounded-xl shadow-lg space-y-4">
        <h2 className="text-2xl font-bold mb-4">Habits & Wellness</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-100 rounded-lg">
                <span className="block text-sm text-gray-500">PCOS Phenotype:</span>
                <span className="text-lg font-semibold">{profile.pcosPhenotype}</span>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
                <span className="block text-sm text-gray-500">Symptom Severity:</span>
                <span className="text-lg font-semibold">{profile.symptomSeverity} / 10</span>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
                <span className="block text-sm text-gray-500">Sleep Quality:</span>
                <span className="text-lg font-semibold">{profile.sleepQuality} / 10</span>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
                <span className="block text-sm text-gray-500">Using Inositol:</span>
                <span className={`text-lg font-semibold ${profile.inositolUse ? 'text-green-500' : 'text-red-500'}`}>{profile.inositolUse ? 'Yes' : 'No'}</span>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
                <span className="block text-sm text-gray-500">Anxiety Score:</span>
                <span className="text-lg font-semibold">{profile.anxietyScore}</span>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
                <span className="block text-sm text-gray-500">Depression Score:</span>
                <span className="text-lg font-semibold">{profile.depressionScore}</span>
            </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <Link to="/onboarding" className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-md hover:bg-gray-100 transition">
          <span className="text-3xl">📝</span>
          <span className="font-semibold mt-2">Log Symptoms</span>
        </Link>
        <Link to="/onboarding" className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-md hover:bg-gray-100 transition">
          <span className="text-3xl">🍲</span>
          <span className="font-semibold mt-2">Add Meal</span>
        </Link>
        <Link to="/onboarding" className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-md hover:bg-gray-100 transition">
          <span className="text-3xl">🏃‍♂️</span>
          <span className="font-semibold mt-2">Track Habit</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;