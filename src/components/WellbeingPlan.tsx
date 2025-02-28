import React from 'react';
import { Sparkles, BookOpen, Heart, Dumbbell } from 'lucide-react';
import type { WellbeingTip } from '../types';

const defaultTips: WellbeingTip[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    description: 'Start your day with 5 minutes of mindful breathing.',
    category: 'meditation',
  },
  {
    id: '2',
    title: 'Gratitude Journal',
    description: 'Write down three things you are grateful for today.',
    category: 'journaling',
  },
  {
    id: '3',
    title: 'Self-Care Break',
    description: 'Take a 15-minute walk in nature to reset your mind.',
    category: 'selfcare',
  },
];

interface WellbeingPlanProps {
  customTips?: WellbeingTip[];
}

export function WellbeingPlan({ customTips }: WellbeingPlanProps) {
  const tips = customTips && customTips.length > 0 ? customTips : defaultTips;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="space-y-4">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              {tip.category === 'meditation' && <Sparkles className="text-blue-500" />}
              {tip.category === 'journaling' && <BookOpen className="text-green-500" />}
              {tip.category === 'selfcare' && <Heart className="text-red-500" />}
              {tip.category === 'exercise' && <Dumbbell className="text-purple-500" />}
              <h3 className="font-medium text-gray-800 dark:text-gray-200">{tip.title}</h3>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{tip.description}</p>
          </div>
        ))}
      </div>
      
      {customTips && customTips.length > 0 && (
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
            How to use your plan
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>Try to incorporate at least one activity into your daily routine</li>
            <li>Track your progress and notice how different activities affect your wellbeing</li>
            <li>Adjust as needed - what works for you may change over time</li>
            <li>Retake the assessment in 2-4 weeks to see your progress</li>
          </ul>
        </div>
      )}
    </div>
  );
}