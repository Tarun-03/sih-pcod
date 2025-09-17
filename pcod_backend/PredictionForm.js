// Example React component: PredictionForm.js

import React, { useState } from 'react';

function PredictionForm() {
  // State for the form inputs
  const [formData, setFormData] = useState({
    age: 25,
    height_cm: 160,
    weight_kg: 60,
    waist_circumference_cm: 80,
    dietary_quality: 'Good',
    moderate_activity_mins_wk: 150,
    vigorous_activity_mins_wk: 60,
    sleep_quality: 'Good',
    typical_symptom_severity: 3,
    pcos_phenotype: 'A',
    smoking_status: 'Never',
    alcohol_intake: 'None',
    anxiety_score: 5,
    depression_score: 3,
    using_inositol: 1,
    using_vitamin_d: 1,
    using_omega_3: 0,
    avg_cycle_length: 28,
    avg_period_length: 5,
    primary_fitness_goal: 'Weight Loss',
    dietary_pref: 'Vegetarian',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      // Handle error state here
    } finally {
      setLoading(false);
    }
  };

  // In a real app, you would have input fields that update this state
  // For brevity, this example just uses the initial state.

  return (
    <div>
      <h1>PCOS Flare-Up Prediction</h1>
      {/* Your form JSX with input fields would go here */}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Getting Prediction...' : 'Predict Flare-Up'}
      </button>

      {prediction && (
        <div>
          <h2>Prediction Result:</h2>
          <p>Probability of a Flare-Up: {prediction.prediction_probability}</p>
          <p>Prediction: {prediction.prediction_label === 1 ? 'Likely Flare-Up' : 'Unlikely Flare-Up'}</p>
        </div>
      )}
    </div>
  );
}

export default PredictionForm;