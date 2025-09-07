export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const createMessage = (type, content, timestamp = null) => ({
  type,
  content,
  timestamp: timestamp || new Date().toLocaleTimeString()
});

export const calculateTimeBonus = (timeLeft) => Math.max(0, Math.floor(timeLeft / 10));

export const calculateScoreDeduction = (wrongClicks, baseDeduction = 10) => wrongClicks * baseDeduction;

export const GAME_CONFIG = {
  INITIAL_SCORE: 100,
  INITIAL_TIME: 900, // 15 minutes in seconds
  ROOT_CAUSE_BONUS: 50,
  WRONG_CLICK_PENALTY: 10,
  WARNING_TIME_THRESHOLD: 180 // 3 minutes
};
