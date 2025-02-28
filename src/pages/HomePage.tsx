import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, BarChart2, ListChecks, BookOpen } from "lucide-react";

export function HomePage() {
  const token = localStorage.getItem("token") || "null";
  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Your AI Mental Health Companion
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          MindfulAI helps you track, understand, and improve your mental
          wellbeing through personalized guidance and support.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          to="/chat"
          icon={<MessageCircle className="w-8 h-8 text-blue-500" />}
          title="AI Chat Support"
          description="Talk to our AI companion about your feelings, concerns, or just to check in."
        />
        <FeatureCard
          to="/mood-tracker"
          icon={<BarChart2 className="w-8 h-8 text-green-500" />}
          title="Mood Tracking"
          description="Track your emotional patterns over time to gain insights into your mental health."
        />
        <FeatureCard
          to="/wellbeing-plan"
          icon={<ListChecks className="w-8 h-8 text-purple-500" />}
          title="Wellbeing Plan"
          description="Get personalized recommendations for improving your mental health."
        />
        <FeatureCard
          to="/resources"
          icon={<BookOpen className="w-8 h-8 text-red-500" />}
          title="Resources"
          description="Access a library of mental health resources, articles, and exercises."
        />
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 mt-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Start Your Wellbeing Journey Today
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            MindfulAI is here to support you every step of the way. Begin with a
            simple conversation or track your mood to get started.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {token == "null" ? (
              <Link
                to="/auth/login"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Start Chatting
              </Link>
            ) : (
              <Link
                to="/chat"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Start Chatting
              </Link>
            )}

            {token == "null" ? (
              <Link
                to="/auth/login"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                Track Your Mood
              </Link>
            ) : (
              <Link
                to="/mood-tracker"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                Track Your Mood
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ to, icon, title, description }) {
  return (
    <Link
      to={to}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </Link>
  );
}
