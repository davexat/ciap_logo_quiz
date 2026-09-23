import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Clock, Target, Heart, CheckCircle2, XCircle, AlertOctagon } from 'lucide-react';
import { GameRecord } from '../types/quiz';
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
  const isTimeOut = record.reason === 'time_out';
  const isGameOver = record.reason === 'lives_depleted';

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

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center">
        {/* Decorative ambient backdrop */}
        <div
          className={`absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none ${
            isSuccess
              ? 'bg-emerald-400'
              : isTimeOut
              ? 'bg-amber-400'
              : 'bg-rose-500'
          }`}
        />

        {/* Status Icon */}
        <div className="mx-auto mb-4 flex items-center justify-center">
          {isSuccess && (
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-emerald-500/20 animate-bounce">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-4xl">
                🎉
              </div>
            </div>
          )}
          {isTimeOut && (
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 p-0.5 shadow-xl shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <AlertOctagon className="w-10 h-10 text-amber-400" />
              </div>
            </div>
          )}
          {isGameOver && (
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 p-0.5 shadow-xl shadow-rose-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <XCircle className="w-10 h-10 text-rose-500" />
              </div>
            </div>
          )}
        </div>

        {/* Heading & Greeting */}
        {isSuccess && (
          <>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
              🎉 ¡Quiz completado!
            </h1>
            <p className="text-slate-300 text-sm sm:text-base font-medium mb-6">
              ¡Excelente trabajo, <span className="text-emerald-400 font-bold">{record.username}</span>! Has demostrado un conocimiento impecable de los lenguajes de programación.
            </p>
          </>
        )}

        {isTimeOut && (
          <>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-amber-400 mb-2">
              ⏱ ¡Tiempo agotado!
            </h1>
            <p className="text-slate-300 text-sm sm:text-base font-medium mb-6">
              <span className="text-amber-300 font-bold">{record.username}</span>, se ha cumplido el límite de 01:30 minutos. Has llegado hasta la ronda {record.maxRound}.
            </p>
          </>
        )}

        {isGameOver && (
          <>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-rose-400 mb-2">
              Game Over
            </h1>
            <p className="text-slate-300 text-sm sm:text-base font-medium mb-6">
              <span className="text-rose-300 font-bold">{record.username}</span>, has llegado hasta la ronda {record.maxRound}.
            </p>
          </>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-8">
          {/* Result / Round */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 sm:p-4 flex flex-col items-center">
            <Target className="w-5 h-5 text-indigo-400 mb-1" />
            <span className="text-[11px] text-slate-400 uppercase font-semibold">
              {isSuccess ? 'Resultado' : 'Ronda'}
            </span>
            <span className="text-lg sm:text-xl font-bold font-mono text-white mt-0.5">
              {record.maxRound}/{record.totalRounds}
            </span>
          </div>

          {/* Time */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 sm:p-4 flex flex-col items-center">
            <Clock className="w-5 h-5 text-amber-400 mb-1" />
            <span className="text-[11px] text-slate-400 uppercase font-semibold">
              Tiempo
            </span>
            <span className="text-lg sm:text-xl font-bold font-mono text-white mt-0.5 tabular-nums">
              {record.totalTimeFormatted}
            </span>
          </div>

          {/* Lives Remaining */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 sm:p-4 flex flex-col items-center">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 mb-1" />
            <span className="text-[11px] text-slate-400 uppercase font-semibold">
              Vidas
            </span>
            <span className="text-base sm:text-lg font-bold text-white mt-0.5">
              {record.livesRemaining > 0
                ? Array.from({ length: record.livesRemaining })
                    .map(() => '❤️')
                    .join(' ')
                : '0'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-sky-500 text-white hover:opacity-95 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isSuccess ? 'Jugar nuevamente' : 'Intentar nuevamente'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenLeaderboard();
            }}
            className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700/80 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Ver leaderboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
