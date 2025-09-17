import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import onboardingBg from '../assets/BG2.png';
import { useApp } from '../context/AppContext';

const Onboarding = () => {
    const navigate = useNavigate();
    const { setProfile: setGlobalProfile } = useApp();
    const [step, setStep] = useState(1);
    const [localProfile, setLocalProfile] = useState({
        age: 25,
        height: 165,
        weight: 60,
        waistCircumference: 80,
        pcosPhenotype: 'Classic',
        cycleLength: 28,
        periodLength: 5,
        symptomSeverity: 5,
        // 1. Updated initial state to use text
        dietQuality: 'Average',
        moderateActivity: 150,
        vigorousActivity: 60,
        sleepQuality: 'Average',
        smokingStatus: 'Never',
        alcoholIntake: 'None',
        anxietyScore: 0,
        depressionScore: 0,
        cbtSessions: 0,
        inositolUse: false,
        vitaminDUse: false,
        omega3Use: false,
        flareUp: false,
        fitnessGoal: 'General Wellness',
        dietaryPreference: 'No Preference',
    });

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);
    const handleSubmit = () => {
        setGlobalProfile(localProfile);
        navigate('/dashboard');
    };
    
    const totalSteps = 7;
    const progress = (step / totalSteps) * 100;

    // Helper component for the new buttons
    const QualityButtons = ({ label, value, options, onChange }) => (
        <div className="mb-4">
            <label className="block mb-3 text-lg font-medium text-gray-700">{label}</label>
            <div className="flex justify-center space-x-2">
                {options.map(option => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => onChange(option)}
                        className={`py-2 px-5 rounded-full font-semibold transition-colors text-sm ${
                            value === option 
                            ? 'bg-purple-600 text-white shadow-md' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );

    const renderStep = () => {
      switch (step) {
            // ... cases 1 and 2 are unchanged
            case 1:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-center text-gray-800">Tell us about you</h2>
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Age: {localProfile.age}</label>
                            <input
                                type="range"
                                min={13}
                                max={60}
                                value={localProfile.age}
                                onChange={(e) => setLocalProfile(p => ({ ...p, age: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-center text-gray-800">Your Physical Details</h2>
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Height (cm): {localProfile.height}</label>
                            <input
                                type="range"
                                min={140}
                                max={200}
                                value={localProfile.height}
                                onChange={(e) => setLocalProfile(p => ({ ...p, height: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Weight (kg): {localProfile.weight}</label>
                            <input
                                type="range"
                                min={40}
                                max={150}
                                value={localProfile.weight}
                                onChange={(e) => setLocalProfile(p => ({ ...p, weight: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Waist Circumference (cm): {localProfile.waistCircumference}</label>
                            <input
                                type="range"
                                min={50}
                                max={150}
                                value={localProfile.waistCircumference}
                                onChange={(e) => setLocalProfile(p => ({ ...p, waistCircumference: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>
                    </div>
                );
            case 3: // 2. This is the updated step
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-center text-gray-800">Your Lifestyle</h2>
                        <QualityButtons
                            label="Dietary Quality"
                            value={localProfile.dietQuality}
                            options={['Poor', 'Average', 'Good']}
                            onChange={(value) => setLocalProfile(p => ({ ...p, dietQuality: value }))}
                        />
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Moderate Activity (mins/wk): {localProfile.moderateActivity}</label>
                            <input
                                type="range"
                                min={0}
                                max={300}
                                step={15}
                                value={localProfile.moderateActivity}
                                onChange={(e) => setLocalProfile(p => ({ ...p, moderateActivity: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Vigorous Activity (mins/wk): {localProfile.vigorousActivity}</label>
                            <input
                                type="range"
                                min={0}
                                max={300}
                                step={15}
                                value={localProfile.vigorousActivity}
                                onChange={(e) => setLocalProfile(p => ({ ...p, vigorousActivity: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>
                        <QualityButtons
                            label="Sleep Quality"
                            value={localProfile.sleepQuality}
                            options={['Poor', 'Average', 'Good']}
                            onChange={(value) => setLocalProfile(p => ({ ...p, sleepQuality: value }))}
                        />
                    </div>
                );
            // ... other cases are unchanged ...
            case 4:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-center text-gray-800">Symptoms & Habits</h2>
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Typical Symptom Severity (1-10): {localProfile.symptomSeverity}</label>
                            <input
                                type="range"
                                min={1}
                                max={10}
                                value={localProfile.symptomSeverity}
                                onChange={(e) => setLocalProfile(p => ({ ...p, symptomSeverity: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-lg font-medium text-gray-700">PCOS Phenotype</label>
                            <select
                                value={localProfile.pcosPhenotype}
                                onChange={(e) => setLocalProfile(p => ({...p, pcosPhenotype: e.target.value}))}
                                className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300"
                            >
                                <option>Classic</option>
                                <option>Ovulatory</option>
                            </select>
                        </div>
                         <div>
                            <label className="block mb-2 text-lg font-medium text-gray-700">Smoking Status</label>
                            <select
                                value={localProfile.smokingStatus}
                                onChange={(e) => setLocalProfile(p => ({...p, smokingStatus: e.target.value}))}
                                className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300"
                            >
                                <option>Never</option>
                                <option>Former</option>
                                <option>Current</option>
                            </select>
                        </div>
                         <div>
                            <label className="block mb-2 text-lg font-medium text-gray-700">Alcohol Intake</label>
                            <select
                                value={localProfile.alcoholIntake}
                                onChange={(e) => setLocalProfile(p => ({...p, alcoholIntake: e.target.value}))}
                                className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300"
                            >
                                <option>None</option>
                                <option>Light</option>
                                <option>Frequent</option>
                            </select>
                        </div>
                    </div>
                );
            case 5:
                return (
                     <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-center text-gray-800">Mental Health & Supplements</h2>
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Anxiety Score (0-21): {localProfile.anxietyScore}</label>
                            <input
                                type="range"
                                min={0}
                                max={21}
                                value={localProfile.anxietyScore}
                                onChange={(e) => setLocalProfile(p => ({ ...p, anxietyScore: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Depression Score (0-27): {localProfile.depressionScore}</label>
                            <input
                                type="range"
                                min={0}
                                max={27}
                                value={localProfile.depressionScore}
                                onChange={(e) => setLocalProfile(p => ({ ...p, depressionScore: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>
                         <div className="flex items-center space-x-4">
                            <input type="checkbox" checked={localProfile.inositolUse} onChange={(e) => setLocalProfile(p => ({ ...p, inositolUse: e.target.checked }))} className="form-checkbox text-purple-600 rounded" />
                            <label className="text-lg font-medium text-gray-700">Using Inositol?</label>
                        </div>
                         <div className="flex items-center space-x-4">
                            <input type="checkbox" checked={localProfile.vitaminDUse} onChange={(e) => setLocalProfile(p => ({ ...p, vitaminDUse: e.target.checked }))} className="form-checkbox text-purple-600 rounded" />
                            <label className="text-lg font-medium text-gray-700">Using Vitamin D?</label>
                        </div>
                         <div className="flex items-center space-x-4">
                            <input type="checkbox" checked={localProfile.omega3Use} onChange={(e) => setLocalProfile(p => ({ ...p, omega3Use: e.target.checked }))} className="form-checkbox text-purple-600 rounded" />
                            <label className="text-lg font-medium text-gray-700">Using Omega-3?</label>
                        </div>
                    </div>
                );
            case 6:
                 return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-center text-gray-800">Goals & Cycle Info</h2>
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Average Cycle Length (days): {localProfile.cycleLength}</label>
                            <input
                                type="range"
                                min={20}
                                max={45}
                                value={localProfile.cycleLength}
                                onChange={(e) => setLocalProfile(p => ({ ...p, cycleLength: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-lg font-medium text-gray-700">Average Period Length (days): {localProfile.periodLength}</label>
                            <input
                                type="range"
                                min={1}
                                max={10}
                                value={localProfile.periodLength}
                                onChange={(e) => setLocalProfile(p => ({ ...p, periodLength: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>
                         <div className="flex items-center space-x-4">
                            <input type="checkbox" checked={localProfile.flareUp} onChange={(e) => setLocalProfile(p => ({ ...p, flareUp: e.target.checked }))} className="form-checkbox text-purple-600 rounded" />
                            <label className="text-lg font-medium text-gray-700">Experience flare-ups?</label>
                        </div>
                         <div>
                            <label className="block mb-2 text-lg font-medium text-gray-700">Primary Fitness Goal</label>
                            <select
                                value={localProfile.fitnessGoal}
                                onChange={(e) => setLocalProfile(p => ({...p, fitnessGoal: e.target.value}))}
                                className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option>General Wellness</option>
                                <option>Weight Loss</option>
                                <option>Muscle Gain</option>
                                <option>Stress Reduction</option>
                            </select>
                        </div>
                         <div>
                            <label className="block mb-2 text-lg font-medium text-gray-700">Dietary Preference</label>
                            <select
                                value={localProfile.dietaryPreference}
                                onChange={(e) => setLocalProfile(p => ({...p, dietaryPreference: e.target.value}))}
                                className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option>No Preference</option>
                                <option>North Indian</option>
                                <option>South Indian</option>
                                <option>East Indian</option>
                                <option>West Indian</option>
                                <option>Mediterranean</option>
                                <option>Vegetarian</option>
                                <option>Vegan</option>
                                <option>Keto</option>
                                <option>Gluten-Free</option>
                            </select>
                        </div>
                    </div>
                );
            case 7:
                return (
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-purple-600">You're all set!</h2>
                        <p className="text-lg text-gray-600">We're ready to create your personalized wellness plan.</p>
                        <p className="text-gray-500">Your journey to a healthier, more balanced life begins now.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center p-4"
            style={{
                backgroundImage: `url(${onboardingBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <h1 className="text-4xl font-extrabold mb-2 text-gray-900">Welcome to Aura</h1>
            <p className="text-lg mb-8 text-gray-600">Let's personalize your experience.</p>
            
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl text-gray-900">
                <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                
                <div className="min-h-[320px] flex flex-col justify-center">
                    {renderStep()}
                </div>

                <div className="flex justify-between mt-8">
                    <button
                        onClick={handleBack}
                        disabled={step === 1}
                        className="py-2 px-6 rounded-full text-gray-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Back
                    </button>
                    {step < totalSteps ? (
                        <button
                            onClick={handleNext}
                            className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-purple-700 transition-colors"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-purple-700 transition-colors"
                        >
                            Start Journey
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;