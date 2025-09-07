import React from 'react';
import { Send, ArrowLeft } from 'lucide-react';

const ChatInput = ({ currentStep, onGoToLanding }) => {
  return (
    <div className="bg-white border-t border-gray-200">
      {/* Navigation */}
      {currentStep !== 'landing' && (
        <div className="px-4 pt-3 pb-1">
          <div className="flex justify-end">
            <button
              onClick={onGoToLanding}
              className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Selection</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Input Section */}
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              disabled
              placeholder="Ask Atlas AI"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed focus:outline-none"
            />
          </div>
          <button
            disabled
            className="px-4 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
