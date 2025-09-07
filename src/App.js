import React from 'react';
import { useGameState } from './hooks/useGameState';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';

const AtlasAIGame = () => {
  const {
    messages,
    currentStep,
    score,
    timeLeft,
    gameStarted,
    gameComplete,
    wrongClicks,
    startGameWithPrompt,
    handleOptionClick,
    resetGame,
    goToLanding
  } = useGameState();

  if (!gameStarted) {
    return <LandingPage onPromptSelect={startGameWithPrompt} />;
  }

  return (
    <ChatInterface
      messages={messages}
      currentStep={currentStep}
      score={score}
      timeLeft={timeLeft}
      wrongClicks={wrongClicks}
      gameComplete={gameComplete}
      onOptionClick={handleOptionClick}
      onGoToLanding={goToLanding}
      onResetGame={resetGame}
    />
  );
};

export default AtlasAIGame;