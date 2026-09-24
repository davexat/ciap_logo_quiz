import React, { useState } from 'react';
import { Play, Trophy, CheckCircle2, User } from 'lucide-react';
import { Player } from '../types/quiz';
import { sound } from '../services/audio';

interface WelcomeScreenProps {
  onStartQuiz: (player: Player) => void;
  onOpenLeaderboard: () => void;
  initialPlayer?: Player;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartQuiz,
  onOpenLeaderboard,
  initialPlayer
}) => {
  const [username, setUsername] = useState(initialPlayer?.username || '');
  const [touched, setTouched] = useState(false);

  // Username validation: non-empty, at least 2 characters trimmed
  const isUsernameValid = username.trim().length >= 2 && username.trim().length <= 30;

  const isFormValid = isUsernameValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setTouched(true);
      return;
    }

    sound.playClick();
    onStartQuiz({ username: username.trim() });
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* README window */}
      <div className="border border-line bg-panel rounded-lg overflow-hidden shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-line bg-void/60">
          <span className="w-2.5 h-2.5 rounded-full bg-line" />
          <span className="w-2.5 h-2.5 rounded-full bg-line" />
          <span className="w-2.5 h-2.5 rounded-full bg-signal/70" />
          <span className="font-mono text-xs text-dim ml-2">~/logo-quiz/README.md</span>
        </div>

        <div className="p-5 sm:p-8">
          <p className="font-mono text-xs text-dim mb-3">$ ./iniciar-quiz</p>
          <h1 className="font-mono text-2xl sm:text-4xl font-bold tracking-tight text-ink mb-3">
            Programming Logo Quiz<span className="cursor-blink text-signal">▊</span>
          </h1>
          <p className="text-sm text-dim leading-relaxed mb-6 max-w-xl">
            ¿Cuánto sabes de lenguajes de programación? Supera los 3 niveles y completa las 15 preguntas.
          </p>

          {/* Spec output */}
          <dl className="font-mono text-xs sm:text-sm border-y border-line divide-y divide-line mb-7">
            <div className="flex items-baseline gap-3 py-2.5">
              <dt className="text-signal w-20 shrink-0">niveles</dt>
              <dd className="text-ink">fácil ×5 → medio ×5 → difícil ×5</dd>
            </div>
            <div className="flex items-baseline gap-3 py-2.5">
              <dt className="text-signal w-20 shrink-0">vidas</dt>
              <dd className="text-ink">3 para toda la partida</dd>
            </div>
            <div className="flex items-baseline gap-3 py-2.5">
              <dt className="text-signal w-20 shrink-0">tiempo</dt>
              <dd className="text-ink tabular-nums">10 segundos por pregunta</dd>
            </div>
            <div className="flex items-baseline gap-3 py-2.5">
              <dt className="text-signal w-20 shrink-0">comodín</dt>
              <dd className="text-ink">50:50, 3 usos por partida (tecla W)</dd>
            </div>
          </dl>

          {/* Registration */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block font-mono text-xs text-dim mb-1.5">
                <span className="text-signal">&gt;</span> nombre <span className="text-bad">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dim">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="Ej. Carlos Dev"
                  maxLength={30}
                  className={`w-full pl-9 pr-4 py-2.5 bg-void border rounded-md text-sm text-ink placeholder-dim/60 outline-none transition-colors font-sans ${
                    touched && !isUsernameValid
                      ? 'border-bad'
                      : isUsernameValid
                      ? 'border-ok/60'
                      : 'border-line focus:border-signal'
                  }`}
                />
                {isUsernameValid && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-ok">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
              {touched && !isUsernameValid && (
                <p className="mt-1 font-mono text-xs text-bad">
                  error: el nombre es obligatorio (mínimo 2 caracteres).
                </p>
              )}
            </div>

            <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`flex-1 py-3 px-4 rounded-md font-mono font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isFormValid
                    ? 'bg-signal text-black hover:brightness-110 active:scale-[0.99]'
                    : 'bg-void text-dim border border-line cursor-not-allowed'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>ejecutar quiz</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onOpenLeaderboard();
                }}
                className="flex-1 sm:flex-none py-3 px-4 rounded-md font-mono font-bold text-sm text-dim bg-void border border-line hover:border-dim/60 hover:text-ink transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-signal" />
                <span>leaderboard</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
