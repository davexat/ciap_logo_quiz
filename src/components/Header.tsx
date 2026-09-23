import React from 'react';
import { Volume2, VolumeX, Trophy, HelpCircle, Code2 } from 'lucide-react';
import { sound } from '../services/audio';

interface HeaderProps {
  onOpenLeaderboard: () => void;
  onOpenRules: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  inGame?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLeaderboard,
  onOpenRules,
  isMuted,
  onToggleMute,
  inGame = false
}) => {
  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single element brand wordmark */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
            Programming <span className="text-indigo-400">Logo Quiz</span>
          </span>
        </div>

        {/* Zone 2: Navigation Links / Quiet utility actions */}
        <nav className="flex items-center gap-2 sm:gap-4 text-sm font-medium text-slate-400">
          <button
            onClick={() => {
              sound.playClick();
              onOpenRules();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-900 transition-colors cursor-pointer text-xs sm:text-sm"
            title="Ver reglas y cómo jugar"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Cómo jugar</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenLeaderboard();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-amber-300 hover:bg-slate-900 text-slate-300 transition-colors cursor-pointer text-xs sm:text-sm"
            title="Ver tabla de posiciones"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Leaderboard</span>
          </button>
        </nav>

        {/* Zone 3: Primary Utility Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onToggleMute();
              sound.playClick();
            }}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
            className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
            title={isMuted ? 'Activar efectos de sonido' : 'Silenciar efectos de sonido'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
