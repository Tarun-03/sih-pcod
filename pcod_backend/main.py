# main.py

from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
import random # For dummy prediction logic

app = FastAPI()

origins = [
    "http://localhost:5173",  # The address from the error message
    "http://localhost:3000",  # Often used by create-react-app, good to keep
]

# --- Add CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---

# This model now perfectly matches the React 'profile' object
# using aliases to handle the camelCase to snake_case conversion.
class PredictionFeatures(BaseModel):
    age: int
    height: int = Field(alias='height')
    weight: int = Field(alias='weight')
    waist_circumference: int = Field(alias='waistCircumference')
    pcos_phenotype: str = Field(alias='pcosPhenotype')
    cycle_length: int = Field(alias='cycleLength')
    period_length: int = Field(alias='periodLength')
    symptom_severity: int = Field(alias='symptomSeverity')
    diet_quality: str = Field(alias='dietQuality')
    moderate_activity: int = Field(alias='moderateActivity')
    vigorous_activity: int = Field(alias='vigorousActivity')
    sleep_quality: str = Field(alias='sleepQuality')
    smoking_status: str = Field(alias='smokingStatus')
    alcohol_intake: str = Field(alias='alcoholIntake')
    anxiety_score: int = Field(alias='anxietyScore')
    depression_score: int = Field(alias='depressionScore')
    cbt_sessions: int = Field(alias='cbtSessions')
    inositol_use: bool = Field(alias='inositolUse')
    vitamin_d_use: bool = Field(alias='vitaminDUse')
    omega3_use: bool = Field(alias='omega3Use')
    flare_up: bool = Field(alias='flareUp')
    fitness_goal: str = Field(alias='fitnessGoal')
    dietary_preference: str = Field(alias='dietaryPreference')

# This response model is what React expects back
class PredictionResponse(BaseModel):
    riskPercentage: int
    willExperienceFlare: bool


# --- Prediction Endpoint ---

@app.post("/predict", response_model=PredictionResponse)
async def predict_flare_up(features: PredictionFeatures):
    print("Received and validated features:", features.dict())
    
    # --- DUMMY PREDICTION LOGIC ---
    # Replace with your actual model logic
    probability = random.uniform(0.3, 0.9)
    risk_percent = int(probability * 100)
    flare_prediction = bool(probability > 0.5)
    # --- END DUMMY LOGIC ---
    
    return PredictionResponse(
        riskPercentage=risk_percent,
        willExperienceFlare=flare_prediction
    )