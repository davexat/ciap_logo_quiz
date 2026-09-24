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
  wildcardsLeft: number;
  onUseWildcard: () => boolean;
  onAnswerCorrect: (timeSpent: number) => void;
  onAnswerIncorrect: (lastLostIndex: number, timeSpent: number) => void;
  onQuit: () => void;
}

const KEY_TO_OPTION: Record<string, number> = {
  a: 0, b: 1, c: 2, d: 3,
  '1': 0, '2': 1, '3': 2, '4': 3
};

const LEVEL_NAMES: Record<Question['level'], string> = {
  easy: 'fácil',
  medium: 'medio',
  hard: 'difícil'
};

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  currentRoundIndex,
  lives,
  wildcardsLeft,
  onUseWildcard,
  onAnswerCorrect,
  onAnswerIncorrect,
  onQuit
}) => {
  const currentQuestion = questions[currentRoundIndex];
  const timeLimit = currentQuestion?.timeLimit ?? 10;

  // Selection & Feedback state for current question
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [lastLostLifeIndex, setLastLostLifeIndex] = useState<number | null>(null);
  const [timedOut, setTimedOut] = useState<boolean>(false);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);

  // Refs mirror the per-question clock (interval-safe, no stale closures)
  const secondsRef = useRef(timeLimit);
  const busyRef = useRef(false);
  const expiredRef = useRef(false);
  const [secondsLeft, setSecondsLeft] = useState(timeLimit);

  // Latest callbacks for the interval (App handlers change identity per render)
  const cbRef = useRef({ onAnswerCorrect, onAnswerIncorrect });
  cbRef.current = { onAnswerCorrect, onAnswerIncorrect };

  // Per-question setup: reset clock and reveal state
  useEffect(() => {
    busyRef.current = false;
    expiredRef.current = false;
    secondsRef.current = timeLimit;
    setSecondsLeft(timeLimit);
    setSelectedLanguage(null);
    setIsTransitioning(false);
    setLastLostLifeIndex(null);
    setTimedOut(false);
    setHiddenIds([]);

    const id = window.setInterval(() => {
      if (busyRef.current) return;
      secondsRef.current -= 1;
      setSecondsLeft(Math.max(0, secondsRef.current));
      if (secondsRef.current <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        busyRef.current = true;
        handleTimeout();
      }
    }, 1000);

    return () => {
      window.clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoundIndex]);

  // Timeout counts as a wrong answer: reveal correct, lose a life, move on
  const handleTimeout = () => {
    setTimedOut(true);
    setIsTransitioning(true);
    sound.playIncorrect();
    setTimeout(() => {
      cbRef.current.onAnswerIncorrect(lives - 1, timeLimit);
    }, 950);
  };

  // Handle player choice
  const handleSelectOption = (option: Language) => {
    if (busyRef.current || expiredRef.current) return;
    busyRef.current = true;

    setIsTransitioning(true);
    setSelectedLanguage(option);

    const timeSpent = Math.max(1, timeLimit - secondsRef.current);
    const isCorrect = option.id === currentQuestion.targetLanguage.id;

    if (isCorrect) {
      sound.playCorrect();
      setTimeout(() => {
        cbRef.current.onAnswerCorrect(timeSpent);
      }, 700);
    } else {
      setLastLostLifeIndex(lives - 1); // 0-based index of heart being lost
      sound.playIncorrect();
      setTimeout(() => {
        cbRef.current.onAnswerIncorrect(lives - 1, timeSpent);
      }, 950);
    }
  };

  // 50:50 wildcard: hide 2 wrong options, once per question
  const handleWildcard = () => {
    if (busyRef.current || expiredRef.current || hiddenIds.length > 0 || wildcardsLeft <= 0) return;
    if (!onUseWildcard()) return;
    const wrong = currentQuestion.options.filter(o => o.id !== currentQuestion.targetLanguage.id);
    const picked = [...wrong].sort(() => Math.random() - 0.5).slice(0, 2).map(o => o.id);
    setHiddenIds(picked);
  };

  // Keyboard answers: A/B/C/D or 1-4, W for wildcard (no dep array: always fresh)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (busyRef.current) return;
      const k = e.key.toLowerCase();
      if (k === 'w') {
        handleWildcard();
        return;
      }
      const idx = KEY_TO_OPTION[k];
      if (idx === undefined) return;
      const opt = currentQuestion?.options[idx];
      if (opt && !hiddenIds.includes(opt.id)) handleSelectOption(opt);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!currentQuestion) {
    return null;
  }

  const isUrgent = secondsLeft <= 3;
  const levelQuestions = questions.filter(q => q.level === currentQuestion.level);
  const indexInLevel = levelQuestions.findIndex(q => q.id === currentQuestion.id) + 1;

  return (
    <div className="w-full flex-1 flex flex-col max-w-4xl mx-auto px-4 py-4 sm:py-6">
      <div className="border border-line bg-panel rounded-lg overflow-hidden flex-1 flex flex-col">
        {/* Window title bar */}
        <div className="flex items-center gap-1.5 px-3.5 py-2 border-b border-line bg-void/60 font-mono text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-line" />
          <span className="w-2.5 h-2.5 rounded-full bg-line" />
          <span className="w-2.5 h-2.5 rounded-full bg-signal/70" />
          <span className="text-dim ml-2 tabular-nums">
            nivel_{currentQuestion.level}.sh — pregunta {String(currentRoundIndex + 1).padStart(2, '0')}
          </span>
          <button
            onClick={() => {
              sound.playClick();
              onQuit();
            }}
            className="ml-auto text-dim hover:text-bad font-mono text-xs transition-colors cursor-pointer"
            title="Abandonar partida"
          >
            [salir]
          </button>
        </div>

        {/* Statusline */}
        <div className="flex items-center justify-between gap-2 sm:gap-3 px-3.5 py-2 border-b border-line font-mono text-xs tabular-nums">
          <span className="text-dim shrink-0">
            <span className="text-signal font-bold">{LEVEL_NAMES[currentQuestion.level]}</span>
            {' '}{indexInLevel}/{levelQuestions.length}
          </span>
          <LivesDisplay lives={lives} maxLives={3} lastLostIndex={lastLostLifeIndex} />
          <span className={`shrink-0 ${isUrgent ? 'text-bad font-bold' : 'text-ink'}`}>
            {formatSecondsToMMSS(secondsLeft)}
          </span>
        </div>

        {/* Question body */}
        <div className="p-4 sm:p-6 flex-1">
          <p className="font-mono text-base sm:text-xl text-ink leading-snug">
            <span className="text-signal font-bold">$</span> ¿cuál de estos logos es{' '}
            <span className="text-signal font-bold">{currentQuestion.targetLanguage.displayName}</span>?
          </p>
          <p className="font-mono text-xs text-dim mt-1.5">
            # W para el comodín
          </p>

          <div className="w-full grid grid-cols-2 gap-3 mt-5 max-w-2xl mx-auto">
            {currentQuestion.options.map((option, idx) => {
              if (hiddenIds.includes(option.id)) {
                return <div key={option.id} aria-hidden className="rounded-md border border-line/40 bg-void/40 min-h-[160px] sm:min-h-[185px]" />;
              }
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

          {/* Wildcard */}
          <div className="mt-4 max-w-2xl mx-auto">
            <button
              onClick={handleWildcard}
              disabled={isTransitioning || hiddenIds.length > 0 || wildcardsLeft <= 0}
              title="Elimina 2 opciones incorrectas (tecla W)"
              className={`w-full py-2.5 px-4 rounded-md font-mono font-bold text-xs border transition-all flex items-center justify-center gap-2 cursor-pointer tabular-nums ${
                isTransitioning || hiddenIds.length > 0 || wildcardsLeft <= 0
                  ? 'border-line text-dim/60 cursor-not-allowed'
                  : 'border-signal/60 text-signal hover:bg-signal/10'
              }`}
            >
              <span>[comodín 50:50 · quedan {wildcardsLeft}]</span>
            </button>
            {timedOut && (
              <p className="mt-2 font-mono text-xs text-bad">$ tiempo agotado — cuenta como fallo.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom per-question depletion strip */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <TimerBar secondsLeft={secondsLeft} totalSeconds={timeLimit} />
      </div>
    </div>
  );
};
