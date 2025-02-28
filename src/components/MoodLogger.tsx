import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Save } from 'lucide-react';
import type { MoodEntry } from '../types';

// Define the question type
interface MoodQuestion {
  id: number;
  text: string;
  emoji: string[];
  labels: string[];
}

// Define the questions
const moodQuestions: MoodQuestion[] = [
  {
    id: 1,
    text: "How would you describe your overall mood today?",
    emoji: ["😞", "😟", "😐", "🙂", "😃"],
    labels: ["Very low, upset, or overwhelmed", "A bit down or anxious", "Neutral, nothing special", "Mostly good, but some stress", "Very happy and positive"]
  },
  {
    id: 2,
    text: "How much energy did you have today?",
    emoji: ["😵", "😩", "😴", "✅", "⚡"],
    labels: ["Completely drained, exhausted", "Low energy, struggled to get things done", "Felt sluggish but managed", "Fairly energetic", "Full of energy and motivation"]
  },
  {
    id: 3,
    text: "How well did you sleep last night?",
    emoji: ["😫", "😕", "😴", "😌", "💤"],
    labels: ["Barely slept, completely exhausted", "Poor sleep, waking up often", "Somewhat restless", "Decent sleep, but could be better", "Great sleep, well-rested"]
  },
  {
    id: 4,
    text: "How well did you handle stress today?",
    emoji: ["😰", "😖", "😟", "🙂", "🧘"],
    labels: ["Overwhelmed, couldn't manage stress at all", "Very stressed, difficult to focus", "Somewhat stressed but pushed through", "Managed okay, but felt a little pressure", "Handled it well, stayed calm"]
  },
  {
    id: 5,
    text: "How socially connected did you feel today?",
    emoji: ["😔", "😞", "😐", "😊", "❤️"],
    labels: ["Completely disconnected from others", "Felt isolated or lonely", "Had minimal interactions", "Talked to a few people, felt okay", "Spent quality time with people I care about"]
  },
  {
    id: 6,
    text: "Did you feel in control of your emotions today?",
    emoji: ["😭", "😩", "😕", "✅", "🎯"],
    labels: ["Lost control, emotions took over", "Felt emotionally overwhelmed", "Had some emotional ups and downs", "Mostly stable", "Completely in control"]
  },
  {
    id: 7,
    text: "How productive did you feel today?",
    emoji: ["😞", "😟", "😐", "✅", "🚀"],
    labels: ["No motivation, got nothing done", "Couldn't focus, left things incomplete", "Did some tasks, but struggled", "Got most things done", "Super productive, got everything done"]
  },
  {
    id: 8,
    text: "How well did you take care of yourself today?",
    emoji: ["😣", "😞", "🤷", "🏃", "🍎"],
    labels: ["Completely neglected myself", "Ignored my needs today", "Did a few things for self-care", "Took care of some aspects of my well-being", "Ate well, exercised, and relaxed"]
  },
  {
    id: 9,
    text: "Did you experience any negative emotions today (anxiety, sadness, frustration)?",
    emoji: ["😞", "😟", "😐", "😊", "😃"],
    labels: ["Strong negative emotions all day", "Felt quite negative for most of the day", "Some negative emotions, but nothing major", "A little, but manageable", "Not at all"]
  },
  {
    id: 10,
    text: "What would best describe your day overall?",
    emoji: ["😩", "😞", "😐", "😊", "🌟"],
    labels: ["A really bad day, struggled a lot", "A rough day, but I got through it", "An average day, nothing special", "A good day with minor issues", "Fantastic, everything went well"]
  }
];

// Feedback based on average mood score
const getMoodFeedback = (score: number): string => {
  if (score >= 4.5) {
    return "You're having an excellent day! Your mood is very positive. This is a great time to engage in activities you enjoy and connect with others.";
  } else if (score >= 3.5) {
    return "You're having a good day overall. Your mood is positive, though there might be some minor stressors. Consider taking some time for yourself to maintain this positive state.";
  } else if (score >= 2.5) {
    return "You're having an average day. Your mood is neutral, with some ups and downs. Consider doing something you enjoy to boost your mood.";
  } else if (score >= 1.5) {
    return "You're having a challenging day. Your mood is lower than usual. Be gentle with yourself and consider reaching out to someone you trust or engaging in self-care activities.";
  } else {
    return "You're having a difficult day. Your mood is quite low. Please prioritize self-care and consider reaching out for support from friends, family, or a mental health professional.";
  }
};

interface MoodLoggerProps {
  onComplete: (entry: MoodEntry) => void;
  onCancel: () => void;
}

export function MoodLogger({ onComplete, onCancel }: MoodLoggerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(moodQuestions.length).fill(null));
  const [isReviewing, setIsReviewing] = useState(false);
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculate progress percentage
  const progress = Math.round(((answers.filter(a => a !== null).length) / moodQuestions.length) * 100);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < moodQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsReviewing(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateAverageScore = (): number => {
    const validAnswers = answers.filter(a => a !== null) as number[];
    const sum = validAnswers.reduce((acc, val) => acc + val + 1, 0); // +1 because our index is 0-4 but score is 1-5
    return sum / validAnswers.length;
  };

  const handleSubmit = () => {
    if (answers.every(answer => answer !== null)) {
      const averageScore = calculateAverageScore();
      const roundedScore = Math.round(averageScore) as 1 | 2 | 3 | 4 | 5;
      
      const newEntry: MoodEntry = {
        id: Date.now().toString(),
        date: new Date(),
        mood: roundedScore,
        note: note.trim() || undefined,
        scores: answers.map(a => (a !== null ? a + 1 : 0)) as number[], // Convert to 1-5 scale
      };
      
      setIsSubmitted(true);
      onComplete(newEntry);
    }
  };

  const editAnswers = () => {
    setIsReviewing(false);
    setCurrentQuestion(0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      {!isSubmitted ? (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {isReviewing ? "Review Your Responses" : "Log Today's Mood"}
              </h2>
              {!isReviewing && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Question {currentQuestion + 1} of {moodQuestions.length}
                </span>
              )}
            </div>
            
            {/* Progress bar */}
            {!isReviewing && (
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </div>
          
          {!isReviewing ? (
            <div className="mb-8 transition-opacity duration-300">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                {moodQuestions[currentQuestion].text}
              </h3>
              
              <div className="grid grid-cols-5 gap-2 mb-6">
                {moodQuestions[currentQuestion].emoji.map((emoji, index) => (
                  <div 
                    key={index}
                    className={`flex flex-col items-center p-3 rounded-lg border cursor-pointer transition-all ${
                      answers[currentQuestion] === index 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 transform scale-105' 
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                    onClick={() => handleAnswer(index)}
                  >
                    <span className="text-3xl mb-2">{emoji}</span>
                    <span className="text-xs text-center text-gray-600 dark:text-gray-300">
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {answers[currentQuestion] !== null && (
                  <span>
                    Selected: <span className="font-medium">{moodQuestions[currentQuestion].labels[answers[currentQuestion]]}</span>
                  </span>
                )}
              </p>
            </div>
          ) : (
            <div className="mb-8">
              <div className="space-y-4 mb-6">
                {moodQuestions.map((question, qIndex) => (
                  <div key={qIndex} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                          {question.text}
                        </h4>
                        {answers[qIndex] !== null && (
                          <div className="flex items-center">
                            <span className="text-xl mr-2">{question.emoji[answers[qIndex]]}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {question.labels[answers[qIndex]]} ({answers[qIndex] + 1}/5)
                            </span>
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => {
                          setIsReviewing(false);
                          setCurrentQuestion(qIndex);
                        }}
                        className="text-sm text-blue-500 hover:text-blue-600"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mb-6">
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Add a note about your day (optional)
                </label>
                <textarea
                  id="note"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="How was your day? Any significant events or feelings?"
                ></textarea>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Your Mood Summary
                </h4>
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">
                    {moodQuestions[9].emoji[Math.round(calculateAverageScore()) - 1]}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Average score: {calculateAverageScore().toFixed(1)}/5
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getMoodFeedback(calculateAverageScore())}
                </p>
              </div>
            </div>
          )}
          
          <div className="flex justify-between">
            {!isReviewing ? (
              <>
                <button
                  onClick={currentQuestion === 0 ? onCancel : goToPreviousQuestion}
                  className="flex items-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {currentQuestion === 0 ? "Cancel" : "Previous"}
                </button>
                
                <button
                  onClick={goToNextQuestion}
                  disabled={answers[currentQuestion] === null}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    answers[currentQuestion] === null
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={editAnswers}
                  className="flex items-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Edit Responses
                </button>
                
                <button
                  onClick={handleSubmit}
                  className="flex items-center px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Entry
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Mood Logged Successfully!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your mood entry has been saved and added to your tracking chart.
          </p>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Return to Mood Tracker
          </button>
        </div>
      )}
    </div>
  );
}