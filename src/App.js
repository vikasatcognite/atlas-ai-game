import React, { useState, useEffect } from 'react';
import { User, Bot, Clock, Award, AlertTriangle } from 'lucide-react';

const AtlasAIGame = () => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [cluesFound, setCluesFound] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [gameStarted, timeLeft, gameComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const gameFlow = {
    0: {
      botMessage: "Hello! I'm Atlas AI, your industrial operations co-pilot. I can see you're investigating Compressor A108. How can I assist you today?",
      options: [
        { text: "Show me the latest maintenance work orders for Compressor A108", next: 1, isCorrect: true },
        { text: "What's the weather like today?", next: -1, isCorrect: false },
        { text: "Show me all compressors in the plant", next: -2, isCorrect: false }
      ]
    },
    1: {
      botMessage: "📊 **MAINTENANCE WORK ORDERS - COMPRESSOR A108**\n\n• **Last Service:** 2 days ago - Routine inspection\n• **Status:** Operational with minor vibration detected\n• **Next Scheduled:** In 14 days\n• **Recent Issues:** Unusual temperature spikes noted\n\n🔍 **CLUE 1 FOUND:** Compressor showing temperature anomalies!",
      clue: "Temperature anomalies detected in A108",
      options: [
        { text: "Analyze upstream dependencies for A108", next: 2, isCorrect: true },
        { text: "Schedule immediate shutdown", next: -3, isCorrect: false },
        { text: "Check oil levels", next: -4, isCorrect: false }
      ]
    },
    2: {
      botMessage: "🔗 **ASSET HIERARCHY - COMPRESSOR A108**\n\n```\nHeat Exchanger HX-204 → Compressor A108 → Distribution Line D-12\n```\n\n⚠️ **ALERT:** Heat Exchanger HX-204 showing degraded performance\n• **Efficiency:** 73% (Normal: 85-95%)\n• **Fouling detected:** High probability\n• **Impact:** Reduced cooling affecting A108\n\n🔍 **CLUE 2 FOUND:** Heat exchanger fouling is root cause!",
      clue: "HX-204 fouling is causing downstream issues",
      options: [
        { text: "Get recommended actions for this issue", next: 3, isCorrect: true },
        { text: "Restart the compressor immediately", next: -5, isCorrect: false },
        { text: "Check other heat exchangers", next: -6, isCorrect: false }
      ]
    },
    3: {
      botMessage: "🛠️ **RECOMMENDED ACTIONS**\n\n**Immediate Actions:**\n1. **Implement temporary bypass** on HX-204 (Est. time: 2 hours)\n2. **Reduce A108 load** to 70% capacity\n\n**Scheduled Actions:**\n1. **Clean HX-204** during next maintenance window\n2. **Inspect cooling loops** for similar issues\n\n💡 **OPTIMIZATION TIP:** This bypass will maintain operations while preventing compressor damage.\n\n🔍 **CLUE 3 FOUND:** Temporary bypass solution identified!",
      clue: "Bypass HX-204 and reduce A108 load to 70%",
      options: [
        { text: "Execute recommended solution", next: 4, isCorrect: true },
        { text: "Wait for next maintenance window", next: -7, isCorrect: false },
        { text: "Shut down entire system", next: -8, isCorrect: false }
      ]
    },
    4: {
      botMessage: "✅ **SOLUTION EXECUTED SUCCESSFULLY!**\n\n🎉 **Mission Accomplished!** You've successfully:\n• Identified the root cause (heat exchanger fouling)\n• Implemented a safe temporary solution\n• Prevented costly downtime\n• Maintained operational safety\n\nYour quick thinking and effective use of Atlas AI saved the day!",
      options: []
    }
  };

  const wrongAnswers = {
    '-1': "I'm focused on industrial operations. Let's get back to troubleshooting Compressor A108.",
    '-2': "That's a broad request. Let's focus specifically on A108's recent maintenance history first.",
    '-3': "That's too drastic without proper analysis. Let's understand the upstream dependencies first.",
    '-4': "Oil levels are normal. The issue appears to be temperature-related. Try analyzing upstream systems.",
    '-5': "That could make things worse! We need a systematic approach. What about getting recommendations?",
    '-6': "Let's focus on the immediate issue first. We need actionable recommendations for the current problem.",
    '-7': "That's too slow - the problem needs immediate attention to prevent damage.",
    '-8': "That's excessive and would cause unnecessary downtime. We have better options."
  };

  const handleOptionClick = (option) => {
    const userMessage = {
      type: 'user',
      content: option.text,
      timestamp: new Date().toLocaleTimeString()
    };

    if (!option.isCorrect) {
      setScore(prev => Math.max(0, prev - 1));
      const errorMessage = {
        type: 'bot',
        content: wrongAnswers[option.next] || "Let's try a different approach.",
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };
      setMessages(prev => [...prev, userMessage, errorMessage]);
      return;
    }

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const flowData = gameFlow[option.next];
      if (flowData) {
        const botMessage = {
          type: 'bot',
          content: flowData.botMessage,
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, botMessage]);
        setCurrentStep(option.next);

        if (flowData.clue) {
          setCluesFound(prev => [...prev, flowData.clue]);
          setScore(prev => prev + 2);
        }

        if (option.next === 4) {
          setGameComplete(true);
          setScore(prev => prev + 5);
        }
      }
    }, 1000);
  };

  const startGame = () => {
    setGameStarted(true);
    const initialMessage = {
      type: 'bot',
      content: gameFlow[0].botMessage,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages([initialMessage]);
  };

  const resetGame = () => {
    setMessages([]);
    setCurrentStep(0);
    setCluesFound([]);
    setScore(0);
    setTimeLeft(300);
    setGameStarted(false);
    setGameComplete(false);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Atlas AI Assist</h1>
            <p className="text-gray-600">Industrial Troubleshooting Challenge</p>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 mr-2" />
              <div>
                <h3 className="font-semibold text-yellow-800">Mission Briefing</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  You are a remote operations engineer. Compressor A108 is experiencing issues. 
                  Use Atlas AI to investigate and find the solution in under 5 minutes!
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-6 text-sm text-gray-600">
            <p>🎯 Find all 3 clues to solve the problem</p>
            <p>⚡ Speed bonus: Complete within time limit</p>
            <p>💡 Choose your questions wisely</p>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Start Investigation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ aspectRatio: "3/4" }}>
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800">Atlas AI</h1>
                <p className="text-xs text-gray-500">Industrial Operations Co-pilot</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className={`font-mono text-sm ${timeLeft < 60 ? 'text-red-500' : 'text-gray-700'}`}>
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

        {cluesFound.length > 0 && (
          <div className="bg-green-50 border-b border-green-200 p-3">
            <h3 className="font-semibold text-green-800 mb-2">🔍 Clues Found ({cluesFound.length}/3):</h3>
            <div className="space-y-1">
              {cluesFound.map((clue, index) => (
                <p key={index} className="text-sm text-green-700">• {clue}</p>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-sm px-4 py-2 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-indigo-600 text-white'
                    : message.isError
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    {message.type === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                    <span className="text-xs opacity-70">{message.timestamp}</span>
                  </div>
                  <div className="whitespace-pre-line text-sm">{message.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!gameComplete && gameFlow[currentStep]?.options.length > 0 && (
          <div className="bg-white border-t border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-3">Choose your next action:</p>
            <div className="space-y-2">
              {gameFlow[currentStep].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-indigo-300 transition-colors text-sm"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {gameComplete && (
          <div className="bg-green-50 border-t border-green-200 p-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-green-800 mb-2">🎉 Mission Accomplished!</h2>
              <div className="flex justify-center space-x-6 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{cluesFound.length}/3</div>
                  <div className="text-xs text-gray-600">Clues Found</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{formatTime(300 - timeLeft)}</div>
                  <div className="text-xs text-gray-600">Time Taken</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-xs text-gray-600">Final Score</div>
                </div>
              </div>
              <button
                onClick={resetGame}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AtlasAIGame;
