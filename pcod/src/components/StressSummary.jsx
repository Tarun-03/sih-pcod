import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext.jsx';
import Card from './core/Card.jsx';

// Mock data as a placeholder
const MOCK_STRESS_LOGS = [
    { date: '2025-09-15', stressLevel: 5 }
];

const StressSummary = () => {
    // We'll use mock logs instead of context for this component
    const stressLogs = MOCK_STRESS_LOGS;

    const lastStressLog = useMemo(() => {
        if (stressLogs.length === 0) return null;
        const sortedLogs = [...stressLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return sortedLogs[0];
    }, [stressLogs]);

    const renderContent = () => {
        if (!lastStressLog) {
            return (
                <div className="text-center text-gray-500">
                    <p>Log your stress to see your summary here.</p>
                </div>
            );
        }
        
        const { stressLevel } = lastStressLog;
        let stressText = 'Low';
        let textColor = 'text-green-500';

        if (stressLevel > 3 && stressLevel <= 6) {
            stressText = 'Moderate';
            textColor = 'text-yellow-500';
        } else if (stressLevel > 6) {
            stressText = 'High';
            textColor = 'text-red-500';
        }

        return (
            <div className="flex justify-between items-center">
                <div className="text-center flex-1">
                    <div className={`text-3xl font-bold ${textColor}`}>{stressText}</div>
                    <div className="text-sm text-gray-600">Stress Level</div>
                </div>
                <div className="border-l border-gray-300 h-16 mx-4"></div>
                <div className="text-center flex-1">
                     <div className="text-4xl font-bold text-purple-600">{stressLevel}<span className="text-2xl">/10</span></div>
                    <div className="text-sm text-gray-600">Last Logged</div>
                </div>
            </div>
        );
    };

    return (
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-2 mb-4">
                <h2 className="text-xl font-bold">Stress Summary</h2>
            </div>
            {renderContent()}
        </Card>
    );
};

export default StressSummary;