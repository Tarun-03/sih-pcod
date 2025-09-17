import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Card from '../components/core/Card.jsx';
import SleepSummary from '../components/SleepSummary.jsx';
import StressSummary from '../components/StressSummary.jsx';
import PeriodTrackerSummary from '../components/PeriodTrackerSummary.jsx';
import PredictionResult from '../components/dashboard/PredictionResult.jsx';

const Dashboard = () => {
  const { profile } = useApp();
  const [activeTab, setActiveTab] = useState('profile');

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

  const bmi = profile.height > 0 ? (profile.weight / (profile.height / 100) ** 2).toFixed(2) : 'N/A';
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Your Health Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                    <span className="block text-sm text-gray-500">Age:</span>
                    <span className="text-lg font-semibold">{profile.age} years</span>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <span className="block text-sm text-gray-500">BMI:</span>
                    <span className="text-lg font-semibold">{bmi}</span>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <span className="block text-sm text-gray-500">Waist Circumference:</span>
                    <span className="text-lg font-semibold">{profile.waistCircumference} cm</span>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <span className="block text-sm text-gray-500">PCOS Phenotype:</span>
                    <span className="text-lg font-semibold">{profile.pcosPhenotype}</span>
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
        );
      case 'habits':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Habits & Wellness</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                    <span className="block text-sm text-gray-500">Moderate Activity:</span>
                    <span className="text-lg font-semibold">{profile.moderateActivity} mins/wk</span>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <span className="block text-sm text-gray-500">Vigorous Activity:</span>
                    <span className="text-lg font-semibold">{profile.vigorousActivity} mins/wk</span>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <span className="block text-sm text-gray-500">Sleep Quality:</span>
                    <span className="text-lg font-semibold">{profile.sleepQuality}</span>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <span className="block text-sm text-gray-500">Smoking Status:</span>
                    <span className="text-lg font-semibold">{profile.smokingStatus}</span>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <span className="block text-sm text-gray-500">Alcohol Intake:</span>
                    <span className="text-lg font-semibold">{profile.alcoholIntake}</span>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <span className="block text-sm text-gray-500">Symptom Severity:</span>
                    <span className="text-lg font-semibold">{profile.symptomSeverity} / 10</span>
                </div>
            </div>
          </div>
        );
      case 'wellness':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Wellness Summaries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SleepSummary />
                <StressSummary />
            </div>
          </div>
        );
      case 'cycle':
        return (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Period & Cycle Tracker</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PeriodTrackerSummary />
                    <Card>
                        <h3 className="text-lg font-semibold">Symptom Trends</h3>
                        <p className="text-sm text-gray-500">
                            (Feature coming soon)
                        </p>
                    </Card>
                </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gray-50">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">🌟 Keep up the amazing work!</p>
      </header>
      
      {/* Prediction Result Component */}
      <PredictionResult />

      {/* Tab Navigation and Content */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center flex-wrap gap-2 md:space-x-4 mb-6 border-b pb-4">
            <button 
              onClick={() => setActiveTab('profile')} 
              className={`py-2 px-4 rounded-full font-semibold transition-colors ${activeTab === 'profile' ? 'bg-purple-600 text-white' : 'bg-transparent text-gray-700 hover:bg-gray-100'}`}
            >
              My Profile
            </button>
            <button 
              onClick={() => setActiveTab('habits')} 
              className={`py-2 px-4 rounded-full font-semibold transition-colors ${activeTab === 'habits' ? 'bg-purple-600 text-white' : 'bg-transparent text-gray-700 hover:bg-gray-100'}`}
            >
              Habits
            </button>
            <button 
              onClick={() => setActiveTab('wellness')} 
              className={`py-2 px-4 rounded-full font-semibold transition-colors ${activeTab === 'wellness' ? 'bg-purple-600 text-white' : 'bg-transparent text-gray-700 hover:bg-gray-100'}`}
            >
              Wellness
            </button>
            <button 
              onClick={() => setActiveTab('cycle')} 
              className={`py-2 px-4 rounded-full font-semibold transition-colors ${activeTab === 'cycle' ? 'bg-purple-600 text-white' : 'bg-transparent text-gray-700 hover:bg-gray-100'}`}
            >
              Cycle
            </button>
        </div>
        
        {/* Renders the content for the active tab */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;