import React from 'react';
import GameHeader from './GameHeader';
import ChatMessages from './ChatMessages';
import ActionButtons from './ActionButtons';
import ChatInput from './ChatInput';
import GameComplete from './GameComplete';

const ChatInterface = ({
  messages,
  currentStep,
  score,
  timeLeft,
  wrongClicks,
  gameComplete,
  onOptionClick,
  onGoToLanding,
  onResetGame
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <GameHeader score={score} timeLeft={timeLeft} />
        
        <ChatMessages messages={messages} />

        <ActionButtons
          currentStep={currentStep}
          onOptionClick={onOptionClick}
          gameComplete={gameComplete}
        />

        {!gameComplete && (
          <ChatInput 
            currentStep={currentStep}
            onGoToLanding={onGoToLanding}
          />
        )}

        {gameComplete && (
          <GameComplete
            score={score}
            timeLeft={timeLeft}
            wrongClicks={wrongClicks}
            onResetGame={onResetGame}
          />
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
