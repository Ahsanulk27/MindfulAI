import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import type { WellbeingTip } from '../types';

// Define the question and answer types
interface Question {
  id: number;
  text: string;
  options: string[];
}

interface AssessmentResult {
  stressManagement: number;
  emotionalWellbeing: number;
  sleep: number;
  copingStrategies: number;
  lifeBalance: number;
  mindfulness: number;
  energy: number;
  emotionalExpression: number;
  selfCare: number;
  goals: number;
}

// Define the questions
const questions: Question[] = [
  {
    id: 1,
    text: "How often do you feel stressed or overwhelmed?",
    options: ["Rarely", "Occasionally", "Frequently", "Almost always"]
  },
  {
    id: 2,
    text: "What is your most common emotional state lately?",
    options: ["Happy & calm", "Anxious & restless", "Sad & unmotivated", "Irritable & frustrated"]
  },
  {
    id: 3,
    text: "How well do you sleep on most nights?",
    options: ["Very well (7+ hours, restful)", "Decent (6-7 hours, slightly disturbed)", "Poorly (less than 6 hours, restless)", "Extremely poorly (insomnia, frequent waking)"]
  },
  {
    id: 4,
    text: "How do you usually cope with stress?",
    options: ["Exercise or physical activity", "Talking to someone (friends, family)", "Distracting myself with media (TV, social media)", "Keeping it to myself"]
  },
  {
    id: 5,
    text: "What aspect of your life is currently the most challenging?",
    options: ["Work or studies", "Relationships (family, friends, partner)", "Personal growth & motivation", "Health & physical well-being"]
  },
  {
    id: 6,
    text: "Do you engage in any mindfulness or relaxation activities?",
    options: ["Yes, regularly", "Occasionally", "Rarely", "No, but I'm interested in trying"]
  },
  {
    id: 7,
    text: "How would you describe your daily energy levels?",
    options: ["High and productive", "Moderate, but manageable", "Low and sluggish", "Extremely drained and exhausted"]
  },
  {
    id: 8,
    text: "Do you feel comfortable expressing your emotions to others?",
    options: ["Yes, I openly talk about them", "Sometimes, with close people", "Rarely, I prefer to keep things private", "No, I struggle with expressing emotions"]
  },
  {
    id: 9,
    text: "What kind of self-care do you enjoy the most?",
    options: ["Physical (exercise, skincare, sleep)", "Creative (art, music, writing)", "Social (spending time with others)", "Mental (reading, meditation, journaling)"]
  },
  {
    id: 10,
    text: "What are you hoping to gain from this personalized plan?",
    options: ["Better stress management", "Improved sleep and relaxation", "More motivation and emotional balance", "General mental well-being improvement"]
  }
];

// Tips based on assessment results
const generateTips = (results: AssessmentResult): WellbeingTip[] => {
  const tips: WellbeingTip[] = [];
  
  // Stress management tips
  if (results.stressManagement > 2) {
    tips.push({
      id: 'stress-1',
      title: 'Daily Breathing Exercise',
      description: 'Practice 4-7-8 breathing: Inhale for 4 seconds, hold for 7, exhale for 8. Repeat 5 times when feeling stressed.',
      category: 'meditation'
    });
  }
  
  // Emotional wellbeing tips
  if (results.emotionalWellbeing > 1) {
    tips.push({
      id: 'emotion-1',
      title: 'Gratitude Journal',
      description: 'Write down three things you are grateful for each day to shift focus toward positive aspects of life.',
      category: 'journaling'
    });
  }
  
  // Sleep tips
  if (results.sleep > 1) {
    tips.push({
      id: 'sleep-1',
      title: 'Evening Wind-Down Routine',
      description: 'Create a 30-minute pre-sleep routine: dim lights, avoid screens, try light stretching or reading.',
      category: 'selfcare'
    });
  }
  
  // Coping strategies
  if (results.copingStrategies > 2) {
    tips.push({
      id: 'cope-1',
      title: 'Healthy Stress Response Plan',
      description: 'Create a list of 5 healthy ways to respond to stress that you can reference when feeling overwhelmed.',
      category: 'selfcare'
    });
  }
  
  // Life balance
  if (results.lifeBalance > 0) {
    tips.push({
      id: 'balance-1',
      title: 'Boundary Setting Practice',
      description: 'Identify one area where you need better boundaries and practice saying "no" when necessary.',
      category: 'selfcare'
    });
  }
  
  // Mindfulness
  if (results.mindfulness > 1) {
    tips.push({
      id: 'mind-1',
      title: 'Morning Mindfulness',
      description: 'Start each day with 5 minutes of mindful breathing or body scan meditation before checking your phone.',
      category: 'meditation'
    });
  }
  
  // Energy management
  if (results.energy > 1) {
    tips.push({
      id: 'energy-1',
      title: 'Energy Audit',
      description: 'Track activities that drain and boost your energy for one week to identify patterns.',
      category: 'journaling'
    });
  }
  
  // Emotional expression
  if (results.emotionalExpression > 1) {
    tips.push({
      id: 'express-1',
      title: 'Emotion Naming Practice',
      description: 'When feeling intense emotions, pause and name the specific emotion to increase emotional awareness.',
      category: 'journaling'
    });
  }
  
  // Self-care based on preference
  switch(results.selfCare) {
    case 0: // Physical
      tips.push({
        id: 'self-1',
        title: 'Movement Snacks',
        description: 'Incorporate 3-5 minute "movement snacks" throughout your day - stretch, walk, or do quick exercises.',
        category: 'selfcare'
      });
      break;
    case 1: // Creative
      tips.push({
        id: 'self-2',
        title: 'Creative Expression Time',
        description: 'Schedule 15 minutes daily for creative expression without judgment or expectations.',
        category: 'selfcare'
      });
      break;
    case 2: // Social
      tips.push({
        id: 'self-3',
        title: 'Meaningful Connection',
        description: 'Reach out to one person each week for a meaningful conversation beyond small talk.',
        category: 'selfcare'
      });
      break;
    case 3: // Mental
      tips.push({
        id: 'self-4',
        title: 'Mental Clarity Break',
        description: 'Take a 10-minute break each day to clear your mind through meditation or journaling.',
        category: 'meditation'
      });
      break;
  }
  
  // Goal-specific tip
  switch(results.goals) {
    case 0: // Stress management
      tips.push({
        id: 'goal-1',
        title: 'Stress Trigger Identification',
        description: 'Identify your top three stress triggers and create a specific plan for each one.',
        category: 'journaling'
      });
      break;
    case 1: // Sleep
      tips.push({
        id: 'goal-2',
        title: 'Sleep Environment Optimization',
        description: 'Evaluate and improve your sleep environment: temperature, light, noise, and comfort.',
        category: 'selfcare'
      });
      break;
    case 2: // Motivation
      tips.push({
        id: 'goal-3',
        title: 'Values Alignment Check',
        description: 'List your core values and assess how your daily activities align with them.',
        category: 'journaling'
      });
      break;
    case 3: // General wellbeing
      tips.push({
        id: 'goal-4',
        title: 'Wellbeing Routine Building',
        description: 'Create a simple morning routine that includes one activity for mental, physical, and emotional wellbeing.',
        category: 'selfcare'
      });
      break;
  }
  
  return tips;
};

// Calculate assessment results
const calculateResults = (answers: (number | null)[]): AssessmentResult => {
  return {
    stressManagement: answers[0] !== null ? answers[0] : 0,
    emotionalWellbeing: answers[1] !== null ? answers[1] : 0,
    sleep: answers[2] !== null ? answers[2] : 0,
    copingStrategies: answers[3] !== null ? answers[3] : 0,
    lifeBalance: answers[4] !== null ? answers[4] : 0,
    mindfulness: answers[5] !== null ? answers[5] : 0,
    energy: answers[6] !== null ? answers[6] : 0,
    emotionalExpression: answers[7] !== null ? answers[7] : 0,
    selfCare: answers[8] !== null ? answers[8] : 0,
    goals: answers[9] !== null ? answers[9] : 0
  };
};

export function WellbeingAssessment({ onComplete }: { onComplete: (tips: WellbeingTip[]) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedResponses, setSavedResponses] = useState<boolean>(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    if (answers.every(answer => answer !== null)) {
      setIsSubmitted(true);
      const results = calculateResults(answers);
      const tips = generateTips(results);
      onComplete(tips);
      
      // Save responses to localStorage
      localStorage.setItem('wellbeingAssessment', JSON.stringify({
        answers,
        date: new Date().toISOString()
      }));
      setSavedResponses(true);
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

  const resetAssessment = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrentQuestion(0);
    setIsSubmitted(false);
    setSavedResponses(false);
  };

  // Load saved responses if they exist
  React.useEffect(() => {
    const savedAssessment = localStorage.getItem('wellbeingAssessment');
    if (savedAssessment) {
      try {
        const { answers: savedAnswers } = JSON.parse(savedAssessment);
        setAnswers(savedAnswers);
        setSavedResponses(true);
      } catch (error) {
        console.error('Error loading saved assessment:', error);
      }
    }
  }, []);

  // Calculate progress percentage
  const progress = Math.round(((answers.filter(a => a !== null).length) / questions.length) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {!isSubmitted ? (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Wellbeing Assessment
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
              <div 
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
              {questions[currentQuestion].text}
            </h3>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    answers[currentQuestion] === index 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => handleAnswer(index)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      answers[currentQuestion] === index 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {answers[currentQuestion] === index && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className={`${
                      answers[currentQuestion] === index 
                        ? 'text-blue-700 dark:text-blue-300 font-medium' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {option}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center px-4 py-2 rounded-lg ${
                currentQuestion === 0
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            
            {currentQuestion < questions.length - 1 ? (
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
            ) : (
              <button
                onClick={handleSubmit}
                disabled={answers.some(answer => answer === null)}
                className={`flex items-center px-6 py-2 rounded-lg ${
                  answers.some(answer => answer === null)
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit
              </button>
            )}
          </div>
          
          {savedResponses && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                You have saved responses. Would you like to start over?
              </p>
              <button
                onClick={resetAssessment}
                className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              >
                Reset Assessment
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Assessment Complete!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your personalized wellbeing plan has been created based on your responses.
          </p>
          <button
            onClick={resetAssessment}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Take Assessment Again
          </button>
        </div>
      )}
    </div>
  );
}