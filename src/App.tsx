import { useState, useEffect, useRef, useCallback } from 'react';
import { Player, Question, GameRecord, GameStatus } from './types/quiz';
import { generateQuizDeck } from './data/languages';
import { saveGameRecord, formatSecondsToMMSS } from './services/storage';
import { sound } from './services/audio';

import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { LeaderboardModal } from './components/LeaderboardModal';
import { RulesModal } from './components/RulesModal';

export default function App() {
  // App navigation & modal state
  const [gameStatus, setGameStatus] = useState<GameStatus>('WELCOME');
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => sound.isMuted());

  // Active match state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [remainingSeconds, setRemainingSeconds] = useState(90);
  const [latestRecord, setLatestRecord] = useState<GameRecord | null>(null);

  // Timing refs
  const timerIntervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const gameActiveRef = useRef<boolean>(false);

  // Clear running timer
  const stopTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    gameActiveRef.current = false;
  }, []);

  // Handle Timeout
  const handleTimeOut = useCallback(() => {
    if (!gameActiveRef.current) return;
    stopTimer();

    if (!currentPlayer) return;

    const finishedAt = new Date().toISOString();
    const record: GameRecord = {
      id: `game_${Date.now()}`,
      username: currentPlayer.username,
      contactNumber: currentPlayer.contactNumber,
      completed: false,
      maxRound: currentRoundIndex + 1,
      totalRounds: 16,
      totalTime: 90,
      totalTimeFormatted: '01:30',
      livesRemaining: lives,
      startedAt: new Date(startTimeRef.current).toISOString(),
      finishedAt,
      reason: 'time_out'
    };

    saveGameRecord(record);
    setLatestRecord(record);
    setGameStatus('TIMEOUT');
  }, [currentPlayer, currentRoundIndex, lives, stopTimer]);

  // Start a new match
  const handleStartQuiz = (player: Player) => {
    stopTimer();
    setCurrentPlayer(player);

    const newDeck = generateQuizDeck();
    setQuestions(newDeck);
    setCurrentRoundIndex(0);
    setLives(3);
    setRemainingSeconds(90);
    setLatestRecord(null);

    const now = Date.now();
    startTimeRef.current = now;
    gameActiveRef.current = true;
    setGameStatus('PLAYING');

    // Launch global timer interval
    timerIntervalRef.current = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Correct answer handler
  const handleAnswerCorrect = () => {
    if (!gameActiveRef.current) return;

    const nextIndex = currentRoundIndex + 1;

    // Check if player has completed all 16 questions!
    if (nextIndex >= 16) {
      stopTimer();
      const elapsedSeconds = Math.min(90, Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000)));
      const finishedAt = new Date().toISOString();

      if (currentPlayer) {
        const record: GameRecord = {
          id: `game_${Date.now()}`,
          username: currentPlayer.username,
          contactNumber: currentPlayer.contactNumber,
          completed: true,
          maxRound: 16,
          totalRounds: 16,
          totalTime: elapsedSeconds,
          totalTimeFormatted: formatSecondsToMMSS(elapsedSeconds),
          livesRemaining: lives,
          startedAt: new Date(startTimeRef.current).toISOString(),
          finishedAt,
          reason: 'completed'
        };

        saveGameRecord(record);
        setLatestRecord(record);
      }
      setGameStatus('SUCCESS');
    } else {
      setCurrentRoundIndex(nextIndex);
    }
  };

  // Incorrect answer handler
  const handleAnswerIncorrect = (lostIndex: number) => {
    if (!gameActiveRef.current) return;

    const newLives = lives - 1;
    setLives(newLives);

    if (newLives <= 0) {
      // Game Over: lives depleted
      stopTimer();
      const elapsedSeconds = Math.min(90, Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000)));
      const finishedAt = new Date().toISOString();

      if (currentPlayer) {
        const record: GameRecord = {
          id: `game_${Date.now()}`,
          username: currentPlayer.username,
          contactNumber: currentPlayer.contactNumber,
          completed: false,
          maxRound: currentRoundIndex + 1,
          totalRounds: 16,
          totalTime: elapsedSeconds,
          totalTimeFormatted: formatSecondsToMMSS(elapsedSeconds),
          livesRemaining: 0,
          startedAt: new Date(startTimeRef.current).toISOString(),
          finishedAt,
          reason: 'lives_depleted'
        };

        saveGameRecord(record);
        setLatestRecord(record);
      }
      setGameStatus('GAMEOVER');
    } else {
      // Advance to next question after losing life
      const nextIndex = currentRoundIndex + 1;
      if (nextIndex >= 16) {
        // Player reached 16 questions even with some mistakes
        stopTimer();
        const elapsedSeconds = Math.min(90, Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000)));
        const finishedAt = new Date().toISOString();

        if (currentPlayer) {
          const record: GameRecord = {
            id: `game_${Date.now()}`,
            username: currentPlayer.username,
            contactNumber: currentPlayer.contactNumber,
            completed: true,
            maxRound: 16,
            totalRounds: 16,
            totalTime: elapsedSeconds,
            totalTimeFormatted: formatSecondsToMMSS(elapsedSeconds),
            livesRemaining: newLives,
            startedAt: new Date(startTimeRef.current).toISOString(),
            finishedAt,
            reason: 'completed'
          };

          saveGameRecord(record);
          setLatestRecord(record);
        }
        setGameStatus('SUCCESS');
      } else {
        setCurrentRoundIndex(nextIndex);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [stopTimer]);

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handlePlayAgain = () => {
    if (currentPlayer) {
      handleStartQuiz(currentPlayer);
    } else {
      setGameStatus('WELCOME');
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans">
      {/* Top Bar Header */}
      <Header
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenRules={() => setIsRulesOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        inGame={gameStatus === 'PLAYING'}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center">
        {gameStatus === 'WELCOME' && (
          <WelcomeScreen
            onStartQuiz={handleStartQuiz}
            onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
            initialPlayer={currentPlayer || undefined}
          />
        )}

        {gameStatus === 'PLAYING' && (
          <QuizScreen
            questions={questions}
            currentRoundIndex={currentRoundIndex}
            lives={lives}
            remainingSeconds={remainingSeconds}
            onAnswerCorrect={handleAnswerCorrect}
            onAnswerIncorrect={handleAnswerIncorrect}
            onTimeOut={handleTimeOut}
            onQuit={() => {
              stopTimer();
              setGameStatus('WELCOME');
            }}
          />
        )}

        {(gameStatus === 'SUCCESS' || gameStatus === 'GAMEOVER' || gameStatus === 'TIMEOUT') && latestRecord && (
          <ResultScreen
            record={latestRecord}
            onPlayAgain={handlePlayAgain}
            onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        currentUsername={currentPlayer?.username}
      />

      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />
    </div>
  );
}
