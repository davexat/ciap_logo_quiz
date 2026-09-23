export interface Language {
  id: string;
  name: string;
  displayName: string;
  category?: string;
  brandColor: string;
  svg: string; // Valid scalable SVG markup
}

export interface Question {
  id: string;
  roundNumber: number;
  targetLanguage: Language;
  options: Language[];
}

export interface Player {
  username: string;
  contactNumber: string;
}

export type GameStatus = 'WELCOME' | 'PLAYING' | 'SUCCESS' | 'GAMEOVER' | 'TIMEOUT';

export interface GameRecord {
  id: string;
  username: string;
  contactNumber: string; // Stored securely, never displayed in public leaderboard
  completed: boolean;
  maxRound: number;
  totalRounds: number;
  totalTime: number; // in seconds
  totalTimeFormatted: string; // "MM:SS"
  livesRemaining: number;
  startedAt: string;
  finishedAt: string;
  reason: 'completed' | 'lives_depleted' | 'time_out';
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  completed: boolean;
  maxRound: number;
  totalRounds: number;
  totalTime: number;
  totalTimeFormatted: string;
  livesRemaining: number;
  finishedAt: string;
  isCurrentPlayer?: boolean;
}
