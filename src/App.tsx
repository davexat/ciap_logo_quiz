import { useState, useRef } from 'react';
import { Player, Question, GameRecord, GameStatus } from './types/quiz';
import { generateRoundDeck, TOTAL_ROUNDS } from './data/languages';
import { saveGameRecord, formatSecondsToMMSS } from './services/storage';
import { prefetchBoard, submitScore } from './services/leaderboard';
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
  const [wildcardsLeft, setWildcardsLeft] = useState(3);
  const [latestRecord, setLatestRecord] = useState<GameRecord | null>(null);

  // Round refs (no global clock: each question owns its 10s timer)
  const elapsedRef = useRef(0); // banked seconds from answered questions
  const wildcardsRef = useRef(3);
  const startTimeRef = useRef<number>(0);
  const gameActiveRef = useRef<boolean>(false);

  // Shared record builder
  const buildRecord = (
    completed: boolean,
    livesLeft: number,
    reason: 'completed' | 'lives_depleted',
    atIndex: number
  ): GameRecord | null => {
    if (!currentPlayer) return null;
    const totalTime = elapsedRef.current;
    return {
      id: `game_${Date.now()}`,
      username: currentPlayer.username,
      completed,
      maxRound: completed ? TOTAL_ROUNDS : atIndex + 1,
      totalRounds: TOTAL_ROUNDS,
      levelReached: questions[atIndex]?.level ?? 'hard',
      totalTime,
      totalTimeFormatted: formatSecondsToMMSS(totalTime),
      livesRemaining: livesLeft,
      startedAt: new Date(startTimeRef.current).toISOString(),
      finishedAt: new Date().toISOString(),
      reason
    };
  };

  // Start a new match: easy x5 -> medium x5 -> hard x5, 3 lives, 3 wildcards
  const handleStartQuiz = (player: Player) => {
    gameActiveRef.current = false;
    setCurrentPlayer(player);

    setQuestions(generateRoundDeck());
    setCurrentRoundIndex(0);
    setLives(3);
    wildcardsRef.current = 3;
    setWildcardsLeft(3);
    elapsedRef.current = 0;
    setLatestRecord(null);

    startTimeRef.current = Date.now();
    gameActiveRef.current = true;
    setGameStatus('PLAYING');

    // Warm the leaderboard cache: instant board at game end.
    void prefetchBoard();
  };

  // Correct answer handler (timeSpent reported by the question timer)
  const handleAnswerCorrect = (timeSpent: number) => {
    if (!gameActiveRef.current) return;
    elapsedRef.current += timeSpent;

    const nextIndex = currentRoundIndex + 1;

    if (nextIndex >= TOTAL_ROUNDS) {
      const record = buildRecord(true, lives, 'completed', currentRoundIndex);
      if (record) {
        saveGameRecord(record);
        void submitScore(record);
        setLatestRecord(record);
      }
      gameActiveRef.current = false;
      setGameStatus('SUCCESS');
    } else {
      setCurrentRoundIndex(nextIndex);
    }
  };

  // Incorrect answer handler (wrong pick or per-question timeout)
  const handleAnswerIncorrect = (lostIndex: number, timeSpent: number) => {
    if (!gameActiveRef.current) return;
    elapsedRef.current += timeSpent;

    const newLives = lives - 1;
    setLives(newLives);

    const nextIndex = currentRoundIndex + 1;

    if (newLives <= 0) {
      const record = buildRecord(false, 0, 'lives_depleted', currentRoundIndex);
      if (record) {
        saveGameRecord(record);
        void submitScore(record);
        setLatestRecord(record);
      }
      gameActiveRef.current = false;
      setGameStatus('GAMEOVER');
    } else if (nextIndex >= TOTAL_ROUNDS) {
      // Survived all 15 questions with lives to spare
      const record = buildRecord(true, newLives, 'completed', currentRoundIndex);
      if (record) {
        saveGameRecord(record);
        void submitScore(record);
        setLatestRecord(record);
      }
      gameActiveRef.current = false;
      setGameStatus('SUCCESS');
    } else {
      setCurrentRoundIndex(nextIndex);
    }
  };

  // 50:50 wildcard: one use per call, 3 per round (ref-backed, StrictMode-safe)
  const handleUseWildcard = (): boolean => {
    if (!gameActiveRef.current || wildcardsRef.current <= 0) return false;
    wildcardsRef.current -= 1;
    setWildcardsLeft(wildcardsRef.current);
    sound.playClick();
    return true;
  };

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
    <div className="min-h-full flex flex-col bg-void bg-scanlines text-ink font-sans">
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
            wildcardsLeft={wildcardsLeft}
            onUseWildcard={handleUseWildcard}
            onAnswerCorrect={handleAnswerCorrect}
            onAnswerIncorrect={handleAnswerIncorrect}
            onQuit={() => {
              gameActiveRef.current = false;
              setGameStatus('WELCOME');
            }}
          />
        )}

        {(gameStatus === 'SUCCESS' || gameStatus === 'GAMEOVER') && latestRecord && (
          <ResultScreen
            record={latestRecord}
            onPlayAgain={handlePlayAgain}
            onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          />
        )}
      </main>

      {/* CIAP proprietary footer */}
      <footer className="w-full border-t border-line bg-void/80">
        <div className="max-w-5xl mx-auto px-4 py-2.5 text-center font-mono text-[11px] text-dim">
          $ © CIAP — todos los derechos reservados
        </div>
      </footer>

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
