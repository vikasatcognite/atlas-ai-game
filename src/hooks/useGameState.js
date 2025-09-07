import { useState, useEffect } from 'react';
import { GAME_CONFIG, createMessage, calculateOvertimePenalty } from '../utils/gameUtils';
import { gameFlow } from '../data/gameData';

export const useGameState = () => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState('landing');
  const [score, setScore] = useState(GAME_CONFIG.INITIAL_SCORE);
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.INITIAL_TIME);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [wrongClicks, setWrongClicks] = useState(0);

  // Timer effect - continues counting even after time limit for overtime penalty
  useEffect(() => {
    if (gameStarted && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [gameStarted, timeLeft, gameComplete]);

  const startGameWithPrompt = (promptNumber) => {
    setGameStarted(true);
    setCurrentStep(promptNumber);
    
    const flowData = gameFlow[promptNumber];
    if (flowData) {
      const initialMessage = createMessage('bot', flowData.botMessage);
      setMessages([initialMessage]);
    }
  };

  const handleOptionClick = (option) => {
    const userMessage = createMessage('user', option.text);

    // Update scoring based on new system
    if (option.isCorrect === false) {
      setWrongClicks(prev => prev + 1);
      setScore(prev => Math.max(0, prev - GAME_CONFIG.WRONG_ANSWER_PENALTY));
    } else if (option.isCorrect === true) {
      setScore(prev => prev + GAME_CONFIG.CORRECT_ANSWER_POINTS);
    }

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const nextStep = option.next || option.prompt;
      
      // Handle going back to landing - return to prompt selection screen
      if (nextStep === 'landing') {
        setGameStarted(false);
        setMessages([]);
        setCurrentStep('landing');
        return;
      }
      
      const flowData = gameFlow[nextStep];
      
      if (flowData) {
        const botMessage = createMessage('bot', flowData.botMessage);

        setMessages(prev => [...prev, botMessage]);
        setCurrentStep(nextStep);

        // Award points for finding root causes
        if (flowData.rootCause) {
          setScore(prev => prev + GAME_CONFIG.ROOT_CAUSE_BONUS);
        }

        // Check for game completion
        if (nextStep === 'complete') {
          setGameComplete(true);
          // Apply overtime penalty if time ran out
          const overtimePenalty = calculateOvertimePenalty(timeLeft);
          if (overtimePenalty > 0) {
            setScore(prev => Math.max(0, prev - overtimePenalty));
          }
        }
      }
    }, 1000);
  };

  const resetGame = () => {
    setMessages([]);
    setCurrentStep('landing');
    setScore(GAME_CONFIG.INITIAL_SCORE);
    setTimeLeft(GAME_CONFIG.INITIAL_TIME);
    setGameStarted(false);
    setGameComplete(false);
    setWrongClicks(0);
  };

  const goToLanding = () => {
    // Reset to prompt selection screen instead of showing chat landing
    setGameStarted(false);
    setMessages([]);
    setCurrentStep('landing');
  };

  return {
    // State
    messages,
    currentStep,
    score,
    timeLeft,
    gameStarted,
    gameComplete,
    wrongClicks,
    
    // Actions
    startGameWithPrompt,
    handleOptionClick,
    resetGame,
    goToLanding
  };
};
