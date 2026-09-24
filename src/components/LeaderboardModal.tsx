import React, { useState, useEffect } from 'react';
import { X, Trophy, Heart, Check } from 'lucide-react';
import type { LeaderboardEntry } from '../types/quiz';
import { getBoardForDisplay, getBoardError, type BoardSource } from '../services/leaderboard';
import { sound } from '../services/audio';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsername?: string;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  currentUsername
}) => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'uncompleted'>('all');
  const [board, setBoard] = useState<{ entries: LeaderboardEntry[]; source: BoardSource } | null>(null);
  const [boardErr, setBoardErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    if (isOpen) {
      setBoard(null);
      setBoardErr(null);
      getBoardForDisplay(currentUsername).then((b) => {
        if (alive) {
          setBoard(b);
          setBoardErr(getBoardError());
        }
      });
    }
    return () => {
      alive = false;
    };
  }, [isOpen, currentUsername]);

  if (!isOpen) return null;

  const entries = board?.entries ?? [];

  const filteredEntries = entries.filter((entry) => {
    if (filter === 'completed') return entry.completed;
    if (filter === 'uncompleted') return !entry.completed;
    return true;
  });

  const filterBtn = (active: boolean) =>
    `px-3 py-1 font-mono text-xs rounded transition-colors cursor-pointer ${
      active ? 'bg-signal text-black font-bold' : 'text-dim hover:text-ink'
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-void/85 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-panel border border-line rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Title bar */}
        <div className="px-4 py-2.5 border-b border-line bg-void/60 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-line" />
          <span className="w-2.5 h-2.5 rounded-full bg-line" />
          <span className="w-2.5 h-2.5 rounded-full bg-signal/70" />
          <span className="font-mono text-xs text-dim ml-2 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-signal" />
            $ leaderboard --top
          </span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="ml-auto font-mono text-xs text-dim hover:text-bad transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            [x]
          </button>
        </div>

        {board?.source === 'local' && (
          <div className="border-b border-line px-4 py-1.5 font-mono text-[11px] text-dim">
            # tabla local{boardErr ? ` — ${boardErr}` : ' — sin conexión'}
          </div>
        )}

        {/* Filters */}
        <div className="px-4 pt-3 pb-2 border-b border-line/60">
          <div className="flex items-center gap-1 p-1 bg-void rounded-md border border-line w-fit font-mono">
            <button
              onClick={() => {
                sound.playClick();
                setFilter('all');
              }}
              className={filterBtn(filter === 'all')}
            >
              todos ({entries.length})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilter('completed');
              }}
              className={filterBtn(filter === 'completed')}
            >
              15/15 ({entries.filter((e) => e.completed).length})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilter('uncompleted');
              }}
              className={filterBtn(filter === 'uncompleted')}
            >
              resto
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto p-4">
          {!board ? (
            <div className="text-center py-12 font-mono text-xs text-dim">
              # cargando tabla…
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-12 font-mono text-xs text-dim">
              # sin registros con este filtro.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs sm:text-sm">
                <thead>
                  <tr className="text-dim border-b border-line">
                    <th className="py-2 px-3 font-normal w-14">pos.</th>
                    <th className="py-2 px-3 font-normal">jugador</th>
                    <th className="py-2 px-3 font-normal text-center">ronda</th>
                    <th className="py-2 px-3 font-normal text-center">vidas</th>
                    <th className="py-2 px-3 font-normal text-right">tiempo</th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  {filteredEntries.map((entry, index) => {
                    const position = index + 1;
                    const isPodium = position <= 3;
                    const isCurrent = entry.isCurrentPlayer;

                    return (
                      <tr
                        key={entry.id || index}
                        className={`border-b border-line/50 transition-colors ${
                          isCurrent
                            ? 'bg-signal/5 text-ink'
                            : 'text-ink hover:bg-void/60'
                        }`}
                      >
                        <td className="py-2.5 px-3">
                          <span className={`font-bold ${isPodium ? 'text-signal' : 'text-dim'}`}>
                            {String(position).padStart(2, '0')}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="flex items-center gap-2">
                            {entry.username}
                            {isCurrent && (
                              <span className="text-[10px] border border-signal/50 text-signal px-1.5 py-px rounded font-bold">
                                tú
                              </span>
                            )}
                            {entry.completed && (
                              <Check className="w-3.5 h-3.5 text-ok shrink-0" />
                            )}
                          </span>
                        </td>
                        <td className={`py-2.5 px-3 text-center font-bold ${entry.completed ? 'text-ok' : ''}`}>
                          {entry.maxRound}/{entry.totalRounds}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {entry.livesRemaining > 0 ? (
                            <span className="inline-flex items-center gap-1 font-bold">
                              <Heart className="w-3.5 h-3.5 fill-signal text-signal" />
                              {entry.livesRemaining}
                            </span>
                          ) : (
                            <span className="text-dim">0</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold">
                          {entry.totalTimeFormatted}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-line bg-void/60 flex items-center justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-void text-dim hover:text-ink border border-line hover:border-dim/60 rounded-md font-mono text-xs font-bold cursor-pointer transition-colors shrink-0"
          >
            cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
