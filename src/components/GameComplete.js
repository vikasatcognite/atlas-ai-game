import React from 'react';
import { formatTime, GAME_CONFIG } from '../utils/gameUtils';

const GameComplete = ({ score, timeLeft, wrongClicks, onResetGame }) => {
  return (
    <div className="bg-green-50 border-t border-green-200 p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-green-800 mb-2">🎉 Investigation Complete!</h2>
        <div className="flex justify-center space-x-6 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{score}</div>
            <div className="text-xs text-gray-600">Final Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatTime(GAME_CONFIG.INITIAL_TIME - timeLeft)}
            </div>
            <div className="text-xs text-gray-600">Time Taken</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{wrongClicks}</div>
            <div className="text-xs text-gray-600">Wrong Clicks</div>
          </div>
        </div>
        <p className="text-sm text-green-700 mb-4">
          Submit your complete root cause analysis report to win 3 coins!
        </p>
        <button
          onClick={onResetGame}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Start New Investigation
        </button>
      </div>
    </div>
  );
};

export default GameComplete;
