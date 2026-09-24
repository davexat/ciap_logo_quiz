import React from 'react';
import { Volume2, VolumeX, Trophy, HelpCircle } from 'lucide-react';
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
    <header className="w-full border-b border-line bg-void/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        {/* Brand: terminal prompt */}
        <div className="flex items-center gap-1.5 font-mono text-sm shrink-0" aria-label="logo-quiz">
          <span className="text-signal font-bold">$</span>
          <span className="font-bold text-ink tracking-tight">logo-quiz</span>
          <span className="text-dim text-xs hidden md:inline">--v1.0</span>
        </div>

        {/* Utility actions */}
        <nav className="flex items-center gap-1 text-sm">
          <button
            onClick={() => {
              sound.playClick();
              onOpenRules();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-mono text-xs text-dim hover:text-ink hover:bg-panel transition-colors cursor-pointer"
            title="Ver reglas y cómo jugar"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">cómo jugar</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenLeaderboard();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-mono text-xs text-dim hover:text-ink hover:bg-panel transition-colors cursor-pointer"
            title="Ver tabla de posiciones"
          >
            <Trophy className="w-4 h-4 text-signal" />
            <span className="hidden sm:inline">leaderboard</span>
          </button>

          <button
            onClick={() => {
              onToggleMute();
              sound.playClick();
            }}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
            title={isMuted ? 'Activar efectos de sonido' : 'Silenciar efectos de sonido'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-mono text-xs text-dim hover:text-ink border border-line bg-panel hover:border-dim/50 transition-all cursor-pointer ml-1"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-bad" />
            ) : (
              <Volume2 className="w-4 h-4 text-ok" />
            )}
            <span className="hidden sm:inline tabular-nums">{isMuted ? 'off' : 'on'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
