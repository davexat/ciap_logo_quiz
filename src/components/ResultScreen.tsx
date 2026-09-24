import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Heart, XCircle } from 'lucide-react';
import { GameRecord, LeaderboardEntry } from '../types/quiz';
import { getFinalBoard, getBoardError, type FinalBoard } from '../services/leaderboard';
import { sound } from '../services/audio';

interface ResultScreenProps {
  record: GameRecord;
  onPlayAgain: () => void;
  onOpenLeaderboard: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  record,
  onPlayAgain,
  onOpenLeaderboard
}) => {
  const isSuccess = record.reason === 'completed' && record.completed;
  const isGameOver = record.reason === 'lives_depleted';

  const levelName = record.levelReached === 'easy' ? 'fácil' : record.levelReached === 'medium' ? 'medio' : 'difícil';

  const status = isSuccess
    ? { word: 'completado', color: 'text-ok', border: 'border-ok/50' }
    : { word: 'sin vidas', color: 'text-bad', border: 'border-bad/50' };

  useEffect(() => {
    if (isSuccess) {
      sound.playVictory();
      // Confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
        const timeout = setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 300);
        return () => clearTimeout(timeout);
      } catch {
        // confetti safe
      }
    } else {
      sound.playGameOver();
    }
  }, [isSuccess]);

  // End-of-game board with the player merged at their true rank.
  const [board, setBoard] = useState<FinalBoard | null>(null);
  const [boardErr, setBoardErr] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    getFinalBoard(record).then((b) => {
      if (alive) {
        setBoard(b);
        setBoardErr(getBoardError());
      }
    });
    return () => {
      alive = false;
    };
  }, [record]);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 sm:py-12">
      <div className="border border-line bg-panel rounded-lg overflow-hidden shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-line bg-void/60">
          <span className="w-2.5 h-2.5 rounded-full bg-line" />
          <span className="w-2.5 h-2.5 rounded-full bg-line" />
          <span className="w-2.5 h-2.5 rounded-full bg-signal/70" />
          <span className="font-mono text-xs text-dim ml-2">./logo-quiz --resultado</span>
        </div>

        <div className="p-5 sm:p-8">
          {/* Status icon */}
          <div className="mb-5">
            {isSuccess && (
              <div className={`w-14 h-14 rounded-md border ${status.border} bg-void flex items-center justify-center`}>
                <Trophy className="w-7 h-7 text-signal" />
              </div>
            )}
            {isGameOver && (
              <div className={`w-14 h-14 rounded-md border ${status.border} bg-void flex items-center justify-center`}>
                <XCircle className="w-7 h-7 text-bad" />
              </div>
            )}
          </div>

          <h1 className={`font-mono text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${status.color}`}>
            {status.word}
          </h1>
          <p className="text-sm text-dim mb-6">
            {isSuccess && (
              <>Bien jugado, <span className="text-ink font-semibold">{record.username}</span>. 15 de 15, conocimiento verificado.</>
            )}
            {isGameOver && (
              <><span className="text-ink font-semibold">{record.username}</span>, te quedaste sin vidas en la ronda {record.maxRound} (nivel {levelName}).</>
            )}
          </p>

          {/* Stats readout */}
          <dl className="font-mono text-xs sm:text-sm border-y border-line divide-y divide-line mb-6 tabular-nums">
            <div className="flex items-baseline gap-3 py-2.5">
              <dt className="text-dim w-20 shrink-0">usuario</dt>
              <dd className="text-ink">{record.username}</dd>
            </div>
            <div className="flex items-baseline gap-3 py-2.5">
              <dt className="text-dim w-20 shrink-0">ronda</dt>
              <dd className="text-ink font-bold">{record.maxRound}/{record.totalRounds}</dd>
            </div>
            <div className="flex items-baseline gap-3 py-2.5">
              <dt className="text-dim w-20 shrink-0">tiempo</dt>
              <dd className="text-ink font-bold">{record.totalTimeFormatted}</dd>
            </div>
            <div className="flex items-baseline gap-3 py-2.5">
              <dt className="text-dim w-20 shrink-0">nivel</dt>
              <dd className="text-ink font-bold">{levelName}</dd>
            </div>
            <div className="flex items-baseline gap-3 py-2.5">
              <dt className="text-dim w-20 shrink-0">vidas</dt>
              <dd className="text-ink font-bold flex items-center gap-1.5">
                {record.livesRemaining > 0 ? (
                  <>
                    <Heart className="w-3.5 h-3.5 fill-signal text-signal" />
                    {record.livesRemaining}
                  </>
                ) : (
                  '0'
                )}
              </dd>
            </div>
          </dl>

          {/* Final board */}
          <div className="mb-6">
            <p className="font-mono text-xs text-dim mb-2">
              $ tabla final
              {board && board.source === 'local' && (
                <span className="text-dim/70"> # tabla local{boardErr ? ` — ${boardErr}` : ' — sin conexión'}</span>
              )}
            </p>
            {!board ? (
              <p className="font-mono text-xs text-dim py-3"># cargando tabla…</p>
            ) : (
              <ol className="font-mono text-xs sm:text-sm border-y border-line divide-y divide-line tabular-nums">
                {board.entries.map((entry, i) => (
                  <BoardRow key={entry.id || i} entry={entry} pos={i + 1} />
                ))}
              </ol>
            )}
            {board?.below && (
              <div className="mt-2">
                <p className="font-mono text-[11px] text-dim mb-1"># fuera del top 10</p>
                <ol className="font-mono text-xs sm:text-sm border border-line rounded-md tabular-nums">
                  <BoardRow entry={board.below} pos={board.rank ?? undefined} />
                </ol>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => {
                sound.playClick();
                onPlayAgain();
              }}
              className="flex-1 py-3 px-5 rounded-md font-mono font-bold text-sm bg-signal text-black hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>jugar de nuevo</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenLeaderboard();
              }}
              className="flex-1 py-3 px-5 rounded-md font-mono font-bold text-sm text-dim bg-void border border-line hover:border-dim/60 hover:text-ink flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Trophy className="w-4 h-4 text-signal" />
              <span>leaderboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function BoardRow({ entry, pos }: { entry: LeaderboardEntry; pos?: number }) {
  return (
    <li
      className={`flex items-center gap-3 px-3 py-2 ${
        entry.isCurrentPlayer ? 'bg-signal/5' : ''
      }`}
    >
      <span
        className={`w-7 shrink-0 font-bold ${
          entry.isCurrentPlayer ? 'text-signal' : 'text-dim'
        }`}
      >
        {pos != null ? String(pos).padStart(2, '0') : '--'}
      </span>
      <span className="flex-1 truncate text-ink">
        {entry.username}
        {entry.isCurrentPlayer && (
          <span className="ml-2 text-[10px] border border-signal/50 text-signal px-1.5 py-px rounded font-bold">
            tú
          </span>
        )}
      </span>
      <span className="text-dim shrink-0">
        {entry.maxRound}/{entry.totalRounds}
      </span>
      <span className="font-bold text-ink shrink-0">{entry.totalTimeFormatted}</span>
    </li>
  );
}
