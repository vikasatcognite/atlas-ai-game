import React from 'react';
import { gameFlow } from '../data/gameData';

const ActionButtons = ({ currentStep, onOptionClick, gameComplete }) => {
  if (gameComplete || !gameFlow[currentStep]?.options?.length) {
    return null;
  }

  return (
    <div className="p-4 bg-gray-50">
      {/* Option Messages */}
      <div className="space-y-3">
        {gameFlow[currentStep].options.map((option, index) => (
          <div key={index} className="flex justify-end">
            <button
              onClick={() => onOptionClick(option)}
              className="max-w-sm px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-2xl transition-colors text-sm cursor-pointer border-2 border-transparent hover:border-indigo-300"
            >
              {option.text}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;
