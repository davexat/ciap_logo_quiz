export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Language {
  id: string;
  name: string;
  displayName: string;
  logo: string; // ponytail: path placeholder for svg file in src/data/logos, e.g. src/data/logos/python.svg
  difficulty: Difficulty; // recognition tier: easy (mainstream) / medium / hard (obscure)
}

export interface Question {
  id: string;
  roundNumber: number;
  level: Difficulty;
  timeLimit: number; // seconds allowed for this question
  targetLanguage: Language;
  options: Language[];
}

export interface Player {
  username: string;
}

export type GameStatus = 'WELCOME' | 'PLAYING' | 'SUCCESS' | 'GAMEOVER';

export interface GameRecord {
  id: string;
  username: string;
  completed: boolean;
  maxRound: number;
  totalRounds: number;
  levelReached: Difficulty; // deepest level reached in this round
  totalTime: number; // in seconds
  totalTimeFormatted: string; // "MM:SS"
  livesRemaining: number;
  startedAt: string;
  finishedAt: string;
  reason: 'completed' | 'lives_depleted';
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  completed: boolean;
  maxRound: number;
  totalRounds: number;
  levelReached: Difficulty;
  totalTime: number;
  totalTimeFormatted: string;
  livesRemaining: number;
  finishedAt: string;
  isCurrentPlayer?: boolean;
}
