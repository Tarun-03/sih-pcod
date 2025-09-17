# main.py

import pandas as pd
import joblib
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware # Import CORS middleware

# --- 1. Initialize the FastAPI app ---
app = FastAPI(title="PCOS Flare-Up Prediction API")

# --- 2. Add CORS Middleware ---
# This is crucial for allowing your React frontend (running on a different port)
# to communicate with your backend.
origins = [
    "http://localhost:3000",  # Your React app's default address
    "http://localhost:5173",  # Your Vite React app's default address
    # Add your deployed frontend URL here if you have one
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)

# --- 3. Load the saved model and preprocessor ---
try:
    model = joblib.load('ensemble_model.pkl')
    preprocessor = joblib.load('preprocessor.pkl')
except FileNotFoundError:
    raise RuntimeError("Model or preprocessor not found. Make sure 'ensemble_model.pkl' and 'preprocessor.pkl' are in the same directory.")


# --- 4. Define the structure of the input data from the user ---
# This Pydantic model validates the incoming data from your React form.
class UserInput(BaseModel):
    age: int
    height_cm: float
    weight_kg: float
    waist_circumference_cm: float
    dietary_quality: str # Expected: 'Good', 'Average', or 'Poor'
    moderate_activity_mins_wk: int
    vigorous_activity_mins_wk: int
    sleep_quality: str # Expected: 'Good', 'Average', or 'Poor'
    typical_symptom_severity: int
    pcos_phenotype: str
    smoking_status: str
    alcohol_intake: str
    anxiety_score: int
    depression_score: int
    using_inositol: int
    using_vitamin_d: int
    using_omega_3: int
    avg_cycle_length: int
    avg_period_length: int
    primary_fitness_goal: str
    dietary_pref: str


# --- 5. Define the prediction endpoint ---
@app.post("/predict")
def predict_flare_up(data: UserInput):
    """
    Accepts user input, maps it to the model's expected features,
    and returns a flare-up prediction probability.
    """
    # Convert the rich user input to a dictionary
    input_dict = data.dict()

    # --- Feature Mapping and Proxy Creation ---
    # This is the crucial step where we create the feature set the model was trained on
    # from the detailed user inputs. This MUST match the logic in your training script.
    model_input = {
        'age': input_dict['age'],
        # Combine anxiety and depression scores as a proxy for the original 'stress_score'
        'anxiety_depression_score': input_dict['anxiety_score'] + input_dict['depression_score'],
        'avg_cycle_length': input_dict['avg_cycle_length'],
        'sleep_quality': input_dict['sleep_quality'],
        'dietary_quality': input_dict['dietary_quality']
    }
    
    # Convert the mapped dictionary to a DataFrame for the preprocessor
    input_df = pd.DataFrame([model_input])

    # Preprocess the input data using the loaded preprocessor
    transformed_input = preprocessor.transform(input_df)

    # Make a prediction using the ensemble model
    prediction_proba = model.predict_proba(transformed_input)
    
    # Get the probability of a flare-up (class 1)
    flare_up_probability = prediction_proba[0][1]

    # Return the final prediction in a clear JSON format
    return {
        "prediction_probability": float(f"{flare_up_probability:.4f}"), # Format to 4 decimal places
        "prediction_label": int(flare_up_probability > 0.5), # Predict 1 if prob > 50%
        "message": "Prediction successful"
    }


# --- 6. Define a root endpoint for health checks ---
@app.get("/")
def read_root():
    """A simple endpoint to check if the API is running."""
    return {"status": "PCOS Prediction API is running correctly."}