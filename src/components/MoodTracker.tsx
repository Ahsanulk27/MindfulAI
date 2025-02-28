import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { MoodEntry } from '../types';

const mockData: MoodEntry[] = [
  { id: '1', date: new Date('2024-03-01'), mood: 3 },
  { id: '2', date: new Date('2024-03-02'), mood: 4 },
  { id: '3', date: new Date('2024-03-03'), mood: 2 },
  { id: '4', date: new Date('2024-03-04'), mood: 5 },
  { id: '5', date: new Date('2024-03-05'), mood: 4 },
];

export function MoodTracker() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Mood Tracking</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
              stroke="#94a3b8"
            />
            <YAxis domain={[1, 5]} stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Log Today's Mood
        </button>
      </div>
    </div>
  );
}