// src/components/LogEntryModal.jsx

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const LogEntryModal = ({ date, existingLog, onSave, onClose }) => {
    const [flow, setFlow] = useState('None');
    const [painLevel, setPainLevel] = useState(0);
    const [ovulationSigns, setOvulationSigns] = useState(false);

    // If there's an existing log for this day, pre-fill the form
    useEffect(() => {
        if (existingLog) {
            setFlow(existingLog.flow || 'None');
            setPainLevel(existingLog.painLevel || 0);
            setOvulationSigns(existingLog.ovulationSigns || false);
        }
    }, [existingLog]);


    const handleSave = () => {
        onSave({
            date: format(date, 'yyyy-MM-dd'),
            flow,
            painLevel,
            ovulationSigns,
        });
        onClose();
    };

    const flowOptions = ['None', 'Spotting', 'Light', 'Medium', 'Heavy'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Log for</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
                </div>
                <p className="text-blue-600 font-medium mb-6">{format(date, 'EEEE, MMMM d, yyyy')}</p>

                {/* Flow Tracking */}
                <div className="mb-6">
                    <h3 className="font-medium mb-2">Flow</h3>
                    <div className="flex space-x-2">
                        {flowOptions.map(option => (
                            <button
                                key={option}
                                onClick={() => setFlow(option)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                                    flow === option ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pain Level */}
                <div className="mb-6">
                    <h3 className="font-medium mb-2">Pain Level: <span className="text-blue-600">{painLevel > 0 ? painLevel : 'None'}</span></h3>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={painLevel}
                        onChange={(e) => setPainLevel(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Ovulation Signs */}
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-medium">Ovulation Signs</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={ovulationSigns} onChange={() => setOvulationSigns(!ovulationSigns)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                    <button onClick={onClose} className="px-6 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100">Cancel</button>
                    <button onClick={handleSave} className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Save</button>
                </div>
            </div>
        </div>
    );
};

export default LogEntryModal;