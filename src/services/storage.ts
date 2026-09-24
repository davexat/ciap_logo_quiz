import { GameRecord, LeaderboardEntry } from '../types/quiz';
import { TOTAL_ROUNDS } from '../data/languages';

const STORAGE_KEY = 'programming_logo_quiz_records_v4';

// Seed entries for the 15-question, 3-level round (easy x5, medium x5, hard x5)
const INITIAL_RECORDS: GameRecord[] = [
  {
    id: 'seed-1',
    username: 'Carlos',
    completed: true,
    maxRound: 15,
    totalRounds: 15,
    levelReached: 'hard',
    totalTime: 73, // 01:13
    totalTimeFormatted: '01:13',
    livesRemaining: 3,
    startedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    finishedAt: new Date(Date.now() - 86400000 * 2 + 73000).toISOString(),
    reason: 'completed'
  },
  {
    id: 'seed-2',
    username: 'Ana',
    completed: true,
    maxRound: 15,
    totalRounds: 15,
    levelReached: 'hard',
    totalTime: 88, // 01:28
    totalTimeFormatted: '01:28',
    livesRemaining: 2,
    startedAt: new Date(Date.now() - 86400000).toISOString(),
    finishedAt: new Date(Date.now() - 86400000 + 88000).toISOString(),
    reason: 'completed'
  },
  {
    id: 'seed-3',
    username: 'Pedro',
    completed: false,
    maxRound: 12,
    totalRounds: 15,
    levelReached: 'hard',
    totalTime: 64, // 01:04
    totalTimeFormatted: '01:04',
    livesRemaining: 0,
    startedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    finishedAt: new Date(Date.now() - 3600000 * 12 + 64000).toISOString(),
    reason: 'lives_depleted'
  },
  {
    id: 'seed-4',
    username: 'Angel',
    completed: false,
    maxRound: 8,
    totalRounds: 15,
    levelReached: 'medium',
    totalTime: 49, // 00:49
    totalTimeFormatted: '00:49',
    livesRemaining: 0,
    startedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    finishedAt: new Date(Date.now() - 3600000 * 6 + 49000).toISOString(),
    reason: 'lives_depleted'
  },
  {
    id: 'seed-5',
    username: 'María',
    completed: false,
    maxRound: 4,
    totalRounds: 15,
    levelReached: 'easy',
    totalTime: 27, // 00:27
    totalTimeFormatted: '00:27',
    livesRemaining: 0,
    startedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    finishedAt: new Date(Date.now() - 3600000 * 2 + 27000).toISOString(),
    reason: 'lives_depleted'
  }
];

export function getStoredRecords(): GameRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_RECORDS));
      return INITIAL_RECORDS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_RECORDS;
  } catch (err) {
    console.error('Error reading game records from localStorage', err);
    return INITIAL_RECORDS;
  }
}

export function saveGameRecord(record: GameRecord): void {
  try {
    const current = getStoredRecords();
    const updated = [record, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving game record to localStorage', err);
  }
}

/**
 * Returns formatted leaderboard entries, ordered by:
 * - Records hold no personal data beyond the username.
 * - Ordered by:
 *   1. Completed games (15/15) first:
 *      - By livesRemaining descending
 *      - By totalTime ascending (faster is better)
 *   2. Non-completed games:
 *      - By maxRound descending (higher round reached is better)
 *      - By totalTime ascending
 */
export function getLeaderboard(currentUsername?: string): LeaderboardEntry[] {
  return sortRecords(getStoredRecords()).map((rec) => toEntry(rec, rec.username.toLowerCase() === (currentUsername ?? '').toLowerCase() && !!currentUsername));
}

/** Shared rank order (remote and mock boards rank identically). */
export function sortRecords(records: GameRecord[]): GameRecord[] {
  return [...records].sort((a, b) => {
    // 1. Both completed
    if (a.completed && b.completed) {
      if (b.livesRemaining !== a.livesRemaining) {
        return b.livesRemaining - a.livesRemaining; // More lives first
      }
      return a.totalTime - b.totalTime; // Faster time first
    }

    // One completed, one not
    if (a.completed && !b.completed) return -1;
    if (!a.completed && b.completed) return 1;

    // Both not completed: higher maxRound first
    if (b.maxRound !== a.maxRound) {
      return b.maxRound - a.maxRound;
    }

    // Tie-break: faster or longer survival time
    return a.totalTime - b.totalTime;
  });
}

/** Single record -> display entry (shared by mock and remote boards). */
export function toEntry(rec: GameRecord, isCurrentPlayer = false): LeaderboardEntry {
  return {
    id: rec.id,
    username: rec.username,
    completed: rec.completed,
    maxRound: rec.maxRound,
    totalRounds: rec.totalRounds || TOTAL_ROUNDS,
    levelReached: rec.levelReached ?? 'easy',
    totalTime: rec.totalTime,
    totalTimeFormatted: rec.totalTimeFormatted,
    livesRemaining: rec.livesRemaining,
    finishedAt: rec.finishedAt,
    isCurrentPlayer
  };
}

export function formatSecondsToMMSS(seconds: number): string {
  const clamped = Math.max(0, Math.floor(seconds));
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
