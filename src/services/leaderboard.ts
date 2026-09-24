import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { GameRecord, LeaderboardEntry } from '../types/quiz';
import { getLeaderboard, getStoredRecords, sortRecords, toEntry, formatSecondsToMMSS } from './storage';

export const TOP_N = 10;
const TABLE = 'scores';

// Lazy singleton: null when unconfigured -> whole remote layer degrades to mocks.
let client: SupabaseClient | null | undefined;
function getClient(): SupabaseClient | null {
  if (client !== undefined) return client;
  const meta = typeof import.meta !== 'undefined' ? (import.meta.env as Record<string, string | boolean | undefined>) : undefined;
  const url = meta?.VITE_SUPABASE_URL as string | undefined;
  // Dashboards label the key "publishable" (sb_publishable_…) or legacy "anon";
  // accept both names so either .env spelling works.
  const key = (meta?.VITE_SUPABASE_ANON_KEY ?? meta?.VITE_SUPABASE_PUBLISHABLE_KEY) as string | undefined;
  client = url && key ? createClient(url, key) : null;
  if (meta?.DEV) {
    console.info(
      `[board] ${client ? 'remote enabled' : 'local mode (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing at startup — restart pnpm dev after creating .env)'}`
    );
  }
  return client;
}

interface ScoreRow {
  id: string;
  username: string;
  completed: boolean;
  max_round: number;
  total_rounds: number;
  level_reached: string;
  total_time: number;
  lives_remaining: number;
  started_at: string | null;
  finished_at: string | null;
}

function rowToRecord(r: ScoreRow): GameRecord {
  const completed = !!r.completed;
  return {
    id: r.id,
    username: r.username,
    completed,
    maxRound: r.max_round,
    totalRounds: r.total_rounds,
    levelReached: r.level_reached === 'medium' || r.level_reached === 'hard' ? r.level_reached : 'easy',
    totalTime: r.total_time,
    totalTimeFormatted: formatSecondsToMMSS(r.total_time),
    livesRemaining: r.lives_remaining,
    startedAt: r.started_at ?? new Date().toISOString(),
    finishedAt: r.finished_at ?? new Date().toISOString(),
    reason: completed ? 'completed' : 'lives_depleted'
  };
}

// Last board failure reason, surfaced in the UI so failures are diagnosable.
let lastError: string | null = null;
export function getBoardError(): string | null {
  return lastError;
}

function noteError(context: string, err: unknown): void {
  const msg = err && typeof err === 'object' && 'message' in err ? String((err as { message: unknown }).message) : String(err);
  lastError = msg.length > 90 ? msg.slice(0, 90) + '…' : msg;
  console.error(`[board] ${context}`, err);
}

// Last good remote board (records + display rows). Stale cache beats refetch failure.
let cachedRecords: GameRecord[] | null = null;
let cachedEntries: LeaderboardEntry[] | null = null;

/** Fetch top board in background; on any failure the previous cache survives. */
export async function prefetchBoard(): Promise<void> {
  try {
    const sb = getClient();
    if (!sb) return;
    const { data, error } = await sb
      .from(TABLE)
      .select('*')
      .order('finished_at', { ascending: false })
      .limit(100);
    if (error || !data) {
      noteError('prefetch failed, keeping previous cache', error ?? 'empty response');
      return;
    }
    lastError = null;
    cachedRecords = (data as ScoreRow[]).map(rowToRecord);
    cachedEntries = sortRecords(cachedRecords).slice(0, TOP_N).map((r) => toEntry(r));
  } catch (err) {
    noteError('prefetch failed, keeping previous cache', err);
  }
}

export type BoardSource = 'remote' | 'local';

/** Display board: warm cache instantly, else one fetch attempt, else mocks. */
export async function getBoardForDisplay(
  currentUsername?: string
): Promise<{ entries: LeaderboardEntry[]; source: BoardSource }> {
  if (!cachedEntries) await prefetchBoard();
  if (cachedEntries) {
    const me = (currentUsername ?? '').toLowerCase();
    return {
      entries: cachedEntries.map((e) => ({
        ...e,
        isCurrentPlayer: !!me && e.username.toLowerCase() === me
      })),
      source: 'remote'
    };
  }
  return { entries: getLeaderboard(currentUsername), source: 'local' };
}

export interface FinalBoard {
  entries: LeaderboardEntry[];
  rank: number | null; // 1-based rank of the player, null when board is mock-only
  below: LeaderboardEntry | null; // player row when outside top N
  source: BoardSource;
}

/** Pure merge: player record into a sorted board at its true rank. */
export function mergeBoard(
  base: GameRecord[],
  record: GameRecord
): { entries: LeaderboardEntry[]; rank: number; below: LeaderboardEntry | null } {
  // Dedupe: the record may already be saved locally before the board renders.
  const sorted = sortRecords([...base.filter((r) => r.id !== record.id), record]);
  const rank = sorted.findIndex((r) => r.id === record.id) + 1;
  if (rank >= 1 && rank <= TOP_N) {
    return {
      entries: sorted.slice(0, TOP_N).map((r) => toEntry(r, r.id === record.id)),
      rank,
      below: null
    };
  }
  return {
    entries: sorted.filter((r) => r.id !== record.id).slice(0, TOP_N).map((r) => toEntry(r)),
    rank,
    below: toEntry(record, true)
  };
}

/** End-of-game board with the player merged at their true rank. */
export async function getFinalBoard(record: GameRecord): Promise<FinalBoard> {
  if (!cachedEntries) await prefetchBoard();
  const base = cachedRecords ?? getStoredRecords();
  const { entries, rank, below } = mergeBoard(base, record);
  return { entries, rank, below, source: cachedRecords ? 'remote' : 'local' };
}

/** Record the score remotely; best-effort, never blocks the UI. */
export async function submitScore(record: GameRecord): Promise<void> {
  try {
    const sb = getClient();
    if (!sb) return;
    const { error } = await sb.from(TABLE).insert({
      id: record.id,
      username: record.username,
      completed: record.completed,
      max_round: record.maxRound,
      total_rounds: record.totalRounds,
      level_reached: record.levelReached,
      total_time: record.totalTime,
      lives_remaining: record.livesRemaining,
      started_at: record.startedAt,
      finished_at: record.finishedAt
    });
    if (error) noteError('submit failed', error);
  } catch (err) {
    noteError('submit failed', err);
  }
}
