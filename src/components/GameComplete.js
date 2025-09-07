import React from 'react';
import { formatTime, GAME_CONFIG, calculateOvertimePenalty } from '../utils/gameUtils';

const GameComplete = ({ score, timeLeft, wrongClicks, onResetGame }) => {
  const timeTaken = GAME_CONFIG.INITIAL_TIME - Math.max(0, timeLeft);
  const isOvertime = timeLeft < 0;
  const overtimePenalty = calculateOvertimePenalty(timeLeft);
  
  return (
    <div className="bg-green-50 border-t border-green-200 p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-green-800 mb-2">🎉 Investigation Complete!</h2>
        
        {/* Score Breakdown */}
        <div className="bg-white rounded-lg p-4 mb-4 text-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Score Breakdown</h3>
          <div className="space-y-1 text-left max-w-xs mx-auto">
            <div className="flex justify-between">
              <span>Correct answers (+2 each):</span>
              <span className="text-green-600">+{Math.max(0, score + (wrongClicks * GAME_CONFIG.WRONG_ANSWER_PENALTY) + overtimePenalty - GAME_CONFIG.ROOT_CAUSE_BONUS)}</span>
            </div>
            <div className="flex justify-between">
              <span>Root cause bonus:</span>
              <span className="text-green-600">+{GAME_CONFIG.ROOT_CAUSE_BONUS}</span>
            </div>
            {wrongClicks > 0 && (
              <div className="flex justify-between">
                <span>Wrong answers (-1 each):</span>
                <span className="text-red-600">-{wrongClicks}</span>
              </div>
            )}
            {isOvertime && (
              <div className="flex justify-between">
                <span>Overtime penalty:</span>
                <span className="text-red-600">-{overtimePenalty}</span>
              </div>
            )}
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Final Score:</span>
              <span className={score > 0 ? 'text-green-600' : 'text-red-600'}>{score}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mb-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${score > 0 ? 'text-green-600' : 'text-red-600'}`}>{score}</div>
            <div className="text-xs text-gray-600">Final Score</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isOvertime ? 'text-red-600' : 'text-green-600'}`}>
              {formatTime(timeTaken)}
            </div>
            <div className="text-xs text-gray-600">Time Taken</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${wrongClicks > 0 ? 'text-red-600' : 'text-green-600'}`}>{wrongClicks}</div>
            <div className="text-xs text-gray-600">Wrong Answers</div>
          </div>
        </div>
        
        <p className="text-sm text-green-700 mb-4">
          {score > 0 ? 
            "Excellent work! Submit your complete root cause analysis report to win 3 coins!" :
            "Keep practicing! Industrial troubleshooting requires systematic methodology."
          }
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
