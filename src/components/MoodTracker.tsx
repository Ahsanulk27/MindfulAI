import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Calendar, PlusCircle, Info } from 'lucide-react';
import { MoodLogger } from './MoodLogger';
import type { MoodEntry } from '../types';

// Emoji mapping for mood levels
const moodEmojis = ["😞", "😟", "😐", "🙂", "😃"];

// Format date for display
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
        <p className="font-medium text-gray-800 dark:text-gray-200">{formatDate(data.date)}</p>
        <div className="flex items-center mt-1">
          <span className="text-xl mr-2">{moodEmojis[data.mood - 1]}</span>
          <span className="text-gray-600 dark:text-gray-300">Mood: {data.mood}/5</span>
        </div>
        {data.note && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xs">
            "{data.note}"
          </p>
        )}
      </div>
    );
  }
  return null;
};

export function MoodTracker() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(() => {
    const savedEntries = localStorage.getItem("moodEntries");
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries) as MoodEntry[];
        // Convert `date` strings back to Date objects if needed
        return parsedEntries.map(entry => ({ 
          ...entry,
          date: new Date(entry.date),
        }));
      } catch {
        // If parsing fails, fall back to empty
        return [];
      }
    } else {
      return [];
    }
  });
  const [showLogger, setShowLogger] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Load mood entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    if (savedEntries) {
      try {
        // Parse the JSON string and convert date strings back to Date objects
        const parsedEntries = JSON.parse(savedEntries);
        const entriesWithDates = parsedEntries.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
        setMoodEntries(entriesWithDates);
      } catch (error) {
        console.error('Error loading mood entries:', error);
      }
    } else {
      // If no saved entries, use an empty array
      setMoodEntries([]);
    }
  }, []);

  // Save mood entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  const handleAddMoodEntry = (newEntry: MoodEntry) => {
    // Check if an entry for today already exists
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingTodayEntryIndex = moodEntries.findIndex(entry => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });

    if (existingTodayEntryIndex !== -1) {
      // Replace the existing entry for today
      const updatedEntries = [...moodEntries];
      updatedEntries[existingTodayEntryIndex] = newEntry;
      setMoodEntries(updatedEntries);
    } else {
      // Add the new entry
      setMoodEntries([...moodEntries, newEntry]);
    }
    
    setShowLogger(false);
  };

  // Sort entries by date for the chart
  const sortedEntries = [...moodEntries].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Calculate average mood
  const averageMood = moodEntries.length > 0 
    ? moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length 
    : 0;

  // Get the mood trend (improving, declining, or stable)
  const getMoodTrend = () => {
    if (sortedEntries.length < 3) return "Not enough data";
    
    const recentEntries = sortedEntries.slice(-3);
    const firstMood = recentEntries[0].mood;
    const lastMood = recentEntries[recentEntries.length - 1].mood;
    
    if (lastMood > firstMood) return "improving";
    if (lastMood < firstMood) return "declining";
    return "stable";
  };

  return (
    <>
      {showLogger ? (
        <MoodLogger 
          onComplete={handleAddMoodEntry} 
          onCancel={() => setShowLogger(false)} 
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Mood Tracking</h2>
            <div className="flex items-center">
              <button 
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mr-2"
                aria-label="Show information"
              >
                <Info className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowLogger(true)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Log Today's Mood
              </button>
            </div>
          </div>
          
          {showInfo && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                About Mood Tracking
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Tracking your mood can help you identify patterns and triggers that affect your emotional wellbeing.
                Log your mood daily for the most accurate insights.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                <li>Rate your mood on a scale of 1-5</li>
                <li>Add notes about significant events or feelings</li>
                <li>View your mood trends over time</li>
                <li>Identify patterns that affect your wellbeing</li>
              </ul>
            </div>
          )}
          
          {moodEntries.length > 0 ? (
            <>
              <div className="h-[300px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sortedEntries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatDate}
                      stroke="#94a3b8"
                    />
                    <YAxis 
                      domain={[1, 5]} 
                      stroke="#94a3b8" 
                      ticks={[1, 2, 3, 4, 5]}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 4 }}
                      activeDot={{ r: 6, fill: '#2563eb' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Average Mood
                    </h3>
                    <span className="text-2xl">{moodEmojis[Math.round(averageMood) - 1]}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">
                    {averageMood.toFixed(1)}/5
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Recent Trend
                    </h3>
                    <span className="text-2xl">
                      {getMoodTrend() === "improving" ? "📈" : getMoodTrend() === "declining" ? "📉" : "➡️"}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1 capitalize">
                    {getMoodTrend()}
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Entries
                    </h3>
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">
                    {moodEntries.length} days
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                  Recent Entries
                </h3>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                  {[...moodEntries]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 5)
                    .map((entry) => (
                      <div 
                        key={entry.id}
                        className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">
                            {formatDate(entry.date)}
                          </p>
                          {entry.note && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                              {entry.note}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{moodEmojis[entry.mood - 1]}</span>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {entry.mood}/5
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No mood entries yet. Start tracking your mood to see insights.
              </p>
              <button 
                onClick={() => setShowLogger(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Log Your First Mood
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
