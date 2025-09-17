import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext.jsx';
import Card from './core/Card.jsx';

// Mock data as a placeholder since a dedicated sleep tracker component doesn't exist yet
const MOCK_SLEEP_LOGS = [
    { bedtime: '2025-09-15T22:30:00Z', wakeTime: '2025-09-16T06:45:00Z', quality: 4 }
];

const SleepSummary = () => {
    // We'll use mock logs instead of context for this component
    const sleepLogs = MOCK_SLEEP_LOGS;

    const lastNightSleep = useMemo(() => {
        if (sleepLogs.length === 0) return null;
        return sleepLogs[sleepLogs.length - 1];
    }, [sleepLogs]);

    const renderContent = () => {
        if (!lastNightSleep) {
            return (
                <div className="text-center text-gray-500">
                    <p>Log your sleep to see your summary here.</p>
                </div>
            );
        }
        
        const durationMs = new Date(lastNightSleep.wakeTime).getTime() - new Date(lastNightSleep.bedtime).getTime();
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

        const qualityMap = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
        const qualityText = qualityMap[lastNightSleep.quality - 1] || 'Good';

        return (
            <div className="flex justify-between items-center">
                <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-500">{hours}<span className="text-2xl">h</span> {minutes}<span className="text-2xl">m</span></div>
                    <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="border-l border-gray-300 h-16 mx-4"></div>
                <div className="text-center">
                     <div className="text-3xl font-bold text-purple-600">{qualityText}</div>
                    <div className="text-sm text-gray-600">Quality</div>
                </div>
            </div>
        );
    };

    return (
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-2 mb-4">
                <h2 className="text-xl font-bold">Last Night's Sleep</h2>
            </div>
            {renderContent()}
        </Card>
    );
};

export default SleepSummary;