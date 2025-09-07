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

export const calculateOvertimePenalty = (timeLeft) => {
  if (timeLeft >= 0) return 0; // No penalty if within time limit
  const overtimeMinutes = Math.ceil(Math.abs(timeLeft) / 60); // Convert to minutes, round up
  return overtimeMinutes * GAME_CONFIG.OVERTIME_PENALTY_PER_MINUTE;
};

export const GAME_CONFIG = {
  INITIAL_SCORE: 0,
  INITIAL_TIME: 300, // 5 minutes in seconds
  CORRECT_ANSWER_POINTS: 2,
  WRONG_ANSWER_PENALTY: 1,
  ROOT_CAUSE_BONUS: 10,
  OVERTIME_PENALTY_PER_MINUTE: 2,
  WARNING_TIME_THRESHOLD: 60 // 1 minute
};
