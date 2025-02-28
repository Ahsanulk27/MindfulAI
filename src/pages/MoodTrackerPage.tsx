import React from 'react';
import { MoodTracker } from '../components/MoodTracker';

export function MoodTrackerPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Mood Tracker
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Track your emotional wellbeing over time. Identifying patterns in your mood can help you understand your mental health better.
      </p>
      <MoodTracker />
    </div>
  );
}