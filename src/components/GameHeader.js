import React from 'react';
import { Bot, Clock, Award } from 'lucide-react';
import { formatTime, GAME_CONFIG } from '../utils/gameUtils';

const GameHeader = ({ score, timeLeft }) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-800">Atlas AI</h1>
            <p className="text-xs text-gray-500">Industrial Operations Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className={`font-mono text-sm ${
              timeLeft < GAME_CONFIG.WARNING_TIME_THRESHOLD ? 'text-red-500' : 'text-gray-700'
            }`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold text-gray-700">{score}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
