import React from 'react';
import { Heart } from 'lucide-react';

interface LivesDisplayProps {
  lives: number; // 0, 1, 2, or 3
  maxLives?: number;
  lastLostIndex?: number | null;
}

export const LivesDisplay: React.FC<LivesDisplayProps> = ({
  lives,
  maxLives = 3,
  lastLostIndex = null
}) => {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-xl shadow-inner">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
        Vidas:
      </span>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: maxLives }).map((_, index) => {
          const isAlive = index < lives;
          const wasJustLost = lastLostIndex === index;

          return (
            <div
              key={index}
              className={`relative transition-all duration-300 transform ${
                wasJustLost ? 'animate-bounce scale-125' : ''
              }`}
            >
              {isAlive ? (
                <Heart
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-rose-500 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)] transition-transform duration-200 hover:scale-110"
                />
              ) : (
                <div className="relative">
                  <Heart
                    className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 fill-slate-800/80 stroke-slate-600 opacity-60"
                  />
                  {wasJustLost && (
                    <span className="absolute -top-1 -right-1 text-xs select-none animate-ping">
                      💔
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
