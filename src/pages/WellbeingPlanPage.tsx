import React, { useState } from 'react';
import { WellbeingPlan } from '../components/WellbeingPlan';
import { WellbeingAssessment } from '../components/WellbeingAssessment';
import type { WellbeingTip } from '../types';

export function WellbeingPlanPage() {
  const [showAssessment, setShowAssessment] = useState(true);
  const [personalizedTips, setPersonalizedTips] = useState<WellbeingTip[]>([]);

  const handleAssessmentComplete = (tips: WellbeingTip[]) => {
    setPersonalizedTips(tips);
    setShowAssessment(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Your Wellbeing Plan
      </h1>
      
      {showAssessment ? (
        <>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Complete this assessment to receive personalized recommendations and activities to improve your mental health and emotional wellbeing.
          </p>
          <WellbeingAssessment onComplete={handleAssessmentComplete} />
        </>
      ) : (
        <>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Based on your assessment, we've created a personalized plan with recommendations and activities to improve your mental health and emotional wellbeing.
          </p>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Your Personalized Recommendations
            </h2>
            <button
              onClick={() => setShowAssessment(true)}
              className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Retake Assessment
            </button>
          </div>
          <WellbeingPlan customTips={personalizedTips} />
        </>
      )}
    </div>
  );
}