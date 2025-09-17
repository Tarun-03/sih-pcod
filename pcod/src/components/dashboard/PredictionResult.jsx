import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext.jsx';

const PredictionResult = () => {
  const { profile } = useApp();
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // This hook simulates fetching data from your backend
  useEffect(() => {
    const fetchPrediction = async () => {
      if (!profile) return; // Don't run if profile data isn't loaded yet

      setIsLoading(true);
      try {
        // Use the fetch logic from your sample file
        const response = await fetch('http://127.0.0.1:8000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Send the profile data from your context as the body
          body: JSON.stringify(profile), 
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setPredictionResult(result); // Set the state with the real backend response

      } catch (error) {
        console.error("Error fetching prediction:", error);
        // Optionally set an error state to display a message to the user
      } finally {
        setIsLoading(false); // Stop the loading indicator
      }
    };

    fetchPrediction();
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