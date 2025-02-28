import React from 'react';
import { Phone, Heart, AlertCircle } from 'lucide-react';

export function EmergencyHelp() {
  return (
    <div className="fixed bottom-4 right-4">
      <div className="relative group">
        <button className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition-colors">
          <AlertCircle className="w-6 h-6" />
        </button>
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-64">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Emergency Resources
            </h3>
            <div className="space-y-2">
              <a
                href="tel:988"
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
              >
                <Phone className="w-4 h-4" />
                <span>988 Suicide & Crisis Lifeline</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-green-500 hover:text-green-600"
              >
                <Heart className="w-4 h-4" />
                <span>Find Local Support</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}