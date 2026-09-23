import React, { useState, useEffect, useRef } from 'react';
import { Question, Language } from '../types/quiz';
import { LivesDisplay } from './LivesDisplay';
import { LogoCard } from './LogoCard';
import { TimerBar } from './TimerBar';
import { sound } from '../services/audio';
import { formatSecondsToMMSS } from '../services/storage';

interface QuizScreenProps {
  questions: Question[];
  currentRoundIndex: number;
  lives: number;
  remainingSeconds: number;
  onAnswerCorrect: () => void;
  onAnswerIncorrect: (lastLostIndex: number) => void;
  onTimeOut: () => void;
  onQuit: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  currentRoundIndex,
  lives,
  remainingSeconds,
  onAnswerCorrect,
  onAnswerIncorrect,
  onTimeOut,
  onQuit
}) => {
  const currentQuestion = questions[currentRoundIndex];
  const totalQuestions = questions.length;

  // Selection & Feedback state for current question
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [lastLostLifeIndex, setLastLostLifeIndex] = useState<number | null>(null);
  const timerExpiredReportedRef = useRef(false);

  // Monitor timer timeout
  useEffect(() => {
    if (remainingSeconds <= 0 && !timerExpiredReportedRef.current) {
      timerExpiredReportedRef.current = true;
      onTimeOut();
    }
  }, [remainingSeconds, onTimeOut]);

  // Handle player choice
  const handleSelectOption = (option: Language) => {
    if (isTransitioning || remainingSeconds <= 0 || lives <= 0) return;

    setIsTransitioning(true);
    setSelectedLanguage(option);

    const isCorrect = option.id === currentQuestion.targetLanguage.id;

    if (isCorrect) {
      sound.playCorrect();
      setTimeout(() => {
        setSelectedLanguage(null);
        setIsTransitioning(false);
        onAnswerCorrect();
      }, 700);
    } else {
      const lostIndex = lives - 1; // 0-based index of heart being lost
      setLastLostLifeIndex(lostIndex);
      sound.playIncorrect();

      setTimeout(() => {
        setLastLostLifeIndex(null);
        setSelectedLanguage(null);
        setIsTransitioning(false);
        onAnswerIncorrect(lostIndex);
      }, 950);
    }
  };

  if (!currentQuestion) {
    return null;
  }

  const isUrgent = remainingSeconds <= 20;

  return (
    <div className="w-full flex-1 flex flex-col justify-between max-w-4xl mx-auto px-4 py-4 sm:py-6">
      {/* Top HUD: Round counter, Lives, and Quick Timer */}
      <div className="w-full bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-xl flex items-center justify-between gap-2 sm:gap-4">
        {/* Round Progress */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase font-bold tracking-wider text-indigo-400">
              Ronda
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">
                {currentRoundIndex + 1}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-mono">
                / {totalQuestions}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Lives */}
        <LivesDisplay lives={lives} maxLives={3} lastLostIndex={lastLostLifeIndex} />

        {/* Right: Quick Timer readout */}
        <div className="flex flex-col items-end">
          <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
            Cronómetro
          </span>
          <div
            className={`text-lg sm:text-2xl font-black font-mono tabular-nums ${
              isUrgent ? 'text-rose-400 animate-pulse' : 'text-slate-100'
            }`}
          >
            ⏱ {formatSecondsToMMSS(remainingSeconds)}
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="w-full flex-1 flex flex-col items-center justify-center mb-6">
        <div className="w-full text-center mb-5 sm:mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Pregunta {currentRoundIndex + 1} de {totalQuestions}
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white text-balance">
            ¿Cuál de estos logos corresponde a{' '}
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-teal-300 underline decoration-indigo-500/40 underline-offset-4"
            >
              {currentQuestion.targetLanguage.displayName}
            </span>
            ?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Selecciona la opción correcta antes de que se agote el tiempo.
          </p>
        </div>

        {/* 4 Logo Choices Grid */}
        <div className="w-full grid grid-cols-2 gap-3 sm:gap-5 max-w-2xl">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedLanguage?.id === option.id;
            const isCorrectOption = option.id === currentQuestion.targetLanguage.id;

            return (
              <LogoCard
                key={option.id}
                language={option}
                index={idx}
                isSelected={isSelected}
                isCorrectOption={isCorrectOption}
                hasAnswered={isTransitioning}
                onSelect={handleSelectOption}
                disabled={isTransitioning}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Full-Width Timer Depletion Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <TimerBar remainingSeconds={remainingSeconds} totalSeconds={90} />
      </div>
    </div>
  );
};
