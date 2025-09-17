import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext.jsx';
import Card from './core/Card.jsx';

const PeriodTrackerSummary = () => {
    const { profile } = useApp();

    const analysis = useMemo(() => {
        if (!profile) return null;
        // This is mock data for the analysis
        return {
            currentCycleDay: 15,
            daysUntilNextPeriod: 3,
            lastCycle: true // Mock a valid last cycle
        };
    }, [profile]);

    if (!profile) return null;

    const renderContent = () => {
        if (!analysis || !analysis.lastCycle) {
            return (
                <div className="text-center text-gray-500">
                    <p>Log your period for a few days to see your cycle summary here.</p>
                </div>
            );
        }

        const { currentCycleDay, daysUntilNextPeriod } = analysis;

        return (
            <div className="flex justify-between items-center">
                <div className="text-center">
                    <div className="text-4xl font-bold text-pink-600">{currentCycleDay}</div>
                    <div className="text-sm text-gray-600">Current Day</div>
                </div>
                <div className="border-l border-gray-300 h-16 mx-4"></div>
                <div className="text-center">
                     <div className="text-4xl font-bold text-purple-600">{daysUntilNextPeriod}</div>
                    <div className="text-sm text-gray-600">Days Until Period</div>
                </div>
            </div>
        );
    };

    return (
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-2 mb-4">
                <h2 className="text-xl font-bold">Cycle Summary</h2>
            </div>
            {renderContent()}
        </Card>
    );
};

export default PeriodTrackerSummary;