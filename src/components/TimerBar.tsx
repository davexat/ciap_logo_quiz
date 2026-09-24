import React from 'react';
import { formatSecondsToMMSS } from '../services/storage';

interface TimerBarProps {
  secondsLeft: number;
  totalSeconds?: number;
}

export const TimerBar: React.FC<TimerBarProps> = ({
  secondsLeft,
  totalSeconds = 10
}) => {
  const percentage = Math.max(0, Math.min(100, (secondsLeft / totalSeconds) * 100));
  const isUrgent = secondsLeft <= 3;

  return (
    <div className="w-full bg-void/95 border-t border-line backdrop-blur py-2 px-4">
      <div className="max-w-4xl mx-auto flex items-center gap-3 font-mono text-xs tabular-nums">
        <span className="text-dim shrink-0">tiempo</span>
        <span className={`font-bold ${isUrgent ? 'text-bad' : 'text-ink'}`}>
          {formatSecondsToMMSS(secondsLeft)}
        </span>
        <div className="flex-1 h-2 bg-panel border border-line rounded-sm overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${isUrgent ? 'bg-bad' : 'bg-signal'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-dim shrink-0">{secondsLeft}s</span>
      </div>
    </div>
  );
};
