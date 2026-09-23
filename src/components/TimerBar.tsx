import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { formatSecondsToMMSS } from '../services/storage';

interface TimerBarProps {
  remainingSeconds: number;
  totalSeconds?: number;
}

export const TimerBar: React.FC<TimerBarProps> = ({
  remainingSeconds,
  totalSeconds = 90
}) => {
  const percentage = Math.max(0, Math.min(100, (remainingSeconds / totalSeconds) * 100));
  const isUrgent = remainingSeconds <= 20;
  const isCritical = remainingSeconds <= 10;

  // Determine bar color gradient based on urgency
  let barGradient = 'from-emerald-500 via-teal-400 to-indigo-500';
  if (isCritical) {
    barGradient = 'from-rose-600 via-red-500 to-rose-500';
  } else if (isUrgent) {
    barGradient = 'from-amber-500 via-orange-400 to-rose-500';
  }

  return (
    <div className="w-full bg-slate-950/95 border-t border-slate-800 backdrop-blur-md py-2.5 px-4 shadow-2xl">
      <div className="max-w-4xl mx-auto flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-medium text-slate-300">
            {isUrgent ? (
              <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
            ) : (
              <Clock className="w-4 h-4 text-indigo-400" />
            )}
            <span className="font-semibold text-slate-200">Tiempo restante:</span>
            <span
              className={`font-mono text-base font-bold tabular-nums tracking-wide ${
                isCritical
                  ? 'text-rose-400 animate-pulse'
                  : isUrgent
                  ? 'text-amber-300'
                  : 'text-indigo-300'
              }`}
            >
              {formatSecondsToMMSS(remainingSeconds)}
            </span>
          </div>

          <span className="text-xs text-slate-400 tabular-nums">
            {remainingSeconds}s de {totalSeconds}s
          </span>
        </div>

        {/* Progress track */}
        <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${barGradient} transition-all duration-1000 ease-linear shadow-[0_0_12px_rgba(99,102,241,0.5)]`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
