import { GameRecord, LeaderboardEntry } from '../types/quiz';

const STORAGE_KEY = 'programming_logo_quiz_records_v1';

// Seed entries mirroring the prompt's examples (adapted to the 90s limit)
const INITIAL_RECORDS: GameRecord[] = [
  {
    id: 'seed-1',
    username: 'Carlos',
    contactNumber: '+34 612 345 678',
    completed: true,
    maxRound: 16,
    totalRounds: 16,
    totalTime: 62, // 01:02
    totalTimeFormatted: '01:02',
    livesRemaining: 3,
    startedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    finishedAt: new Date(Date.now() - 86400000 * 2 + 62000).toISOString(),
    reason: 'completed'
  },
  {
    id: 'seed-2',
    username: 'Ana',
    contactNumber: '+52 55 9876 5432',
    completed: true,
    maxRound: 16,
    totalRounds: 16,
    totalTime: 78, // 01:18
    totalTimeFormatted: '01:18',
    livesRemaining: 2,
    startedAt: new Date(Date.now() - 86400000).toISOString(),
    finishedAt: new Date(Date.now() - 86400000 + 78000).toISOString(),
    reason: 'completed'
  },
  {
    id: 'seed-3',
    username: 'Pedro',
    contactNumber: '+54 9 11 2345 6789',
    completed: false,
    maxRound: 11,
    totalRounds: 16,
    totalTime: 58, // 00:58
    totalTimeFormatted: '00:58',
    livesRemaining: 0,
    startedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    finishedAt: new Date(Date.now() - 3600000 * 12 + 58000).toISOString(),
    reason: 'lives_depleted'
  },
  {
    id: 'seed-4',
    username: 'Angel',
    contactNumber: '+57 300 123 4567',
    completed: false,
    maxRound: 11,
    totalRounds: 16,
    totalTime: 75, // 01:15
    totalTimeFormatted: '01:15',
    livesRemaining: 0,
    startedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    finishedAt: new Date(Date.now() - 3600000 * 6 + 75000).toISOString(),
    reason: 'lives_depleted'
  },
  {
    id: 'seed-5',
    username: 'María',
    contactNumber: '+56 9 8765 4321',
    completed: false,
    maxRound: 7,
    totalRounds: 16,
    totalTime: 44, // 00:44
    totalTimeFormatted: '00:44',
    livesRemaining: 0,
    startedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    finishedAt: new Date(Date.now() - 3600000 * 2 + 44000).toISOString(),
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
 * Returns formatted leaderboard entries strictly respecting privacy rules:
 * - NEVER includes contactNumber!
 * - Ordered by:
 *   1. Completed games (16/16) first:
 *      - By livesRemaining descending
 *      - By totalTime ascending (faster is better)
 *   2. Non-completed games:
 *      - By maxRound descending (higher round reached is better)
 *      - By totalTime ascending
 */
export function getLeaderboard(currentUsername?: string): LeaderboardEntry[] {
  const records = getStoredRecords();

  const sorted = [...records].sort((a, b) => {
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

  return sorted.map((rec) => ({
    id: rec.id,
    username: rec.username,
    completed: rec.completed,
    maxRound: rec.maxRound,
    totalRounds: rec.totalRounds || 16,
    totalTime: rec.totalTime,
    totalTimeFormatted: rec.totalTimeFormatted,
    livesRemaining: rec.livesRemaining,
    finishedAt: rec.finishedAt,
    isCurrentPlayer: currentUsername ? rec.username.toLowerCase() === currentUsername.toLowerCase() : false
  }));
}

export function formatSecondsToMMSS(seconds: number): string {
  const clamped = Math.max(0, Math.floor(seconds));
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
