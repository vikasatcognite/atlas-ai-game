import React from 'react';
import { Bot, AlertTriangle } from 'lucide-react';
import { landingPageOptions } from '../data/gameData';

const LandingPage = ({ onPromptSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Atlas AI Assist</h1>
          <p className="text-gray-600">Industrial Root Cause Analysis</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Select an Equipment Issue to Investigate</h3>
          <div className="space-y-3">
            {landingPageOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => onPromptSelect(option.prompt)}
                className="w-full p-4 text-left border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                      <span className="font-semibold text-gray-800 group-hover:text-indigo-700">
                        {option.equipment}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 group-hover:text-gray-800 leading-relaxed">
                      {option.text}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mb-4">
          ⏱️ Complete investigation within 5 minutes • 🏆 Earn points for correct answers • ⚠️ Overtime penalties apply
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
