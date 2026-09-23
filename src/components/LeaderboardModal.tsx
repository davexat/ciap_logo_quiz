import React, { useState } from 'react';
import { X, Trophy, ShieldCheck, Heart, Medal, Sparkles } from 'lucide-react';
import { getLeaderboard } from '../services/storage';
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

  if (!isOpen) return null;

  const entries = getLeaderboard(currentUsername);

  const filteredEntries = entries.filter((entry) => {
    if (filter === 'completed') return entry.completed;
    if (filter === 'uncompleted') return !entry.completed;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                Tabla de Posiciones
                <span className="text-xs font-normal text-slate-400">· Leaderboard</span>
              </h2>
              <p className="text-xs text-slate-400">
                Mejores marcas registradas por los participantes
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Privacy Note Banner */}
        <div className="bg-slate-950/60 border-b border-slate-800/80 px-4 py-2.5 flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-slate-200">Privacidad:</strong> Los números de contacto están protegidos y nunca se exhiben en la tabla pública.
          </span>
        </div>

        {/* Filters */}
        <div className="px-4 sm:px-6 pt-3 pb-2 flex items-center justify-between gap-2 border-b border-slate-800/50">
          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                sound.playClick();
                setFilter('all');
              }}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos ({entries.length})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilter('completed');
              }}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'completed'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              16/16 Completados ({entries.filter((e) => e.completed).length})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilter('uncompleted');
              }}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'uncompleted'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              No completados
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No hay partidas registradas bajo este filtro.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-separate border-spacing-y-1.5">
                <thead>
                  <tr className="text-[11px] font-semibold uppercase text-slate-400 border-b border-slate-800 tracking-wider">
                    <th className="py-2 px-3 w-16">Pos.</th>
                    <th className="py-2 px-3">Jugador</th>
                    <th className="py-2 px-3 text-center">Ronda</th>
                    <th className="py-2 px-3 text-center">Vidas Restantes</th>
                    <th className="py-2 px-3 text-right">Tiempo</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry, index) => {
                    const position = index + 1;
                    const isPodium = position <= 3;
                    const isCurrent = entry.isCurrentPlayer;

                    return (
                      <tr
                        key={entry.id || index}
                        className={`rounded-xl transition-colors ${
                          isCurrent
                            ? 'bg-indigo-950/60 border border-indigo-500/40 text-indigo-100 font-semibold'
                            : 'bg-slate-950/40 hover:bg-slate-800/40 text-slate-200'
                        }`}
                      >
                        {/* Position */}
                        <td className="py-2.5 px-3 rounded-l-xl">
                          <div className="flex items-center gap-1.5">
                            {position === 1 && (
                              <Medal className="w-4 h-4 text-amber-400 shrink-0" />
                            )}
                            {position === 2 && (
                              <Medal className="w-4 h-4 text-slate-300 shrink-0" />
                            )}
                            {position === 3 && (
                              <Medal className="w-4 h-4 text-amber-600 shrink-0" />
                            )}
                            <span
                              className={`font-mono font-bold tabular-nums ${
                                isPodium ? 'text-amber-400' : 'text-slate-400'
                              }`}
                            >
                              {position}
                            </span>
                          </div>
                        </td>

                        {/* Player name */}
                        <td className="py-2.5 px-3 font-medium">
                          <div className="flex items-center gap-2">
                            <span>{entry.username}</span>
                            {isCurrent && (
                              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.2 rounded-md font-semibold">
                                Tú
                              </span>
                            )}
                            {entry.completed && (
                              <span title="16/16 completado" className="inline-flex items-center">
                                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Round */}
                        <td className="py-2.5 px-3 text-center font-mono font-semibold">
                          <span
                            className={
                              entry.completed ? 'text-emerald-400' : 'text-slate-300'
                            }
                          >
                            {entry.maxRound}/{entry.totalRounds}
                          </span>
                        </td>

                        {/* Lives remaining */}
                        <td className="py-2.5 px-3 text-center">
                          <div className="inline-flex items-center gap-1">
                            {entry.livesRemaining > 0 ? (
                              <span className="font-mono font-bold text-rose-400 flex items-center gap-1">
                                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                                {entry.livesRemaining}
                              </span>
                            ) : (
                              <span className="text-slate-500 font-mono text-xs">
                                0
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Time */}
                        <td className="py-2.5 px-3 text-right font-mono font-bold tabular-nums text-slate-100 rounded-r-xl">
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

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Criterio: Completados por vidas y tiempo; no completados por ronda máxima.
          </span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
