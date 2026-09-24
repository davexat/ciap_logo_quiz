import React from 'react';
import { Heart, X } from 'lucide-react';

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
    <div className="flex items-center gap-1.5 font-mono text-xs" aria-label={`${lives} vidas`}>
      <span className="text-dim">vidas</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: maxLives }).map((_, index) => {
          const isAlive = index < lives;
          const wasJustLost = lastLostIndex === index;

          return (
            <div
              key={index}
              className={`relative transition-all duration-300 ${
                wasJustLost ? 'animate-bounce' : ''
              }`}
            >
              {isAlive ? (
                <Heart className="w-4 h-4 fill-signal text-signal" />
              ) : (
                <div className="relative">
                  <Heart className="w-4 h-4 text-line" />
                  {wasJustLost && (
                    <span className="absolute -top-1 -right-1 select-none">
                      <X className="w-3 h-3 text-bad animate-ping" />
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
