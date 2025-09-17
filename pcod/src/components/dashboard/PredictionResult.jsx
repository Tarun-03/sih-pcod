import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext.jsx';

const PredictionResult = () => {
  const { profile } = useApp();
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // This hook simulates fetching data from your backend
  useEffect(() => {
    const fetchPrediction = () => {
      setTimeout(() => {
        // This is where you would call your actual backend API
        // For now, we use mock data
        const mockBackendResponse = {
          riskPercentage: 65,
          willExperienceFlare: true,
        };
        setPredictionResult(mockBackendResponse);
        setIsLoading(false);
      }, 1500); // Simulate a 1.5-second network delay
    };

    if (profile) {
      fetchPrediction();
    }
  }, [profile]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Health Outlook</h2>
      {isLoading ? (
        <p className="text-gray-500">Analyzing your data...</p>
      ) : (
        predictionResult && (
          <div className="flex flex-col md:flex-row justify-around items-center gap-6">
            <div className="text-center">
              <div className={`text-5xl font-bold ${predictionResult.riskPercentage > 50 ? 'text-red-500' : 'text-green-500'}`}>
                {predictionResult.riskPercentage}%
              </div>
              <div className="text-sm text-gray-600">Symptom Risk</div>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-gray-200 h-16 w-full md:w-auto"></div>
            <div className="text-center">
              <div className={`text-4xl font-bold ${predictionResult.willExperienceFlare ? 'text-red-500' : 'text-green-500'}`}>
                {predictionResult.willExperienceFlare ? 'Yes' : 'No'}
              </div>
              <div className="text-sm text-gray-600">Predicted Flare-up</div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PredictionResult;