import React, { useState } from 'react';
import { Play, Trophy, ShieldCheck, Clock, Heart, Sparkles, User, Phone, CheckCircle2 } from 'lucide-react';
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
  const [contactNumber, setContactNumber] = useState(initialPlayer?.contactNumber || '');
  const [touched, setTouched] = useState({ username: false, contactNumber: false });

  // Telephone validation: digits, plus, hyphens, spaces, parenthesis, minimum 7 digits
  const phoneDigitsOnly = contactNumber.replace(/\D/g, '');
  const isPhoneValidChars = /^[0-9+\s\-().]+$/.test(contactNumber.trim());
  const isContactValid = isPhoneValidChars && phoneDigitsOnly.length >= 7 && phoneDigitsOnly.length <= 16;

  // Username validation: non-empty, at least 2 characters trimmed
  const isUsernameValid = username.trim().length >= 2 && username.trim().length <= 30;

  const isFormValid = isUsernameValid && isContactValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setTouched({ username: true, contactNumber: true });
      return;
    }

    sound.playClick();
    onStartQuiz({
      username: username.trim(),
      contactNumber: contactNumber.trim()
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Hero Badge & Title */}
      <div className="text-center max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Desafío para desarrolladores</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 text-balance">
          Programming <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-teal-400 bg-clip-text text-transparent">Logo Quiz</span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed text-balance">
          ¿Cuánto sabes sobre lenguajes de programación? Identifica los logos y completa las 16 rondas.
        </p>
      </div>

      {/* Feature Highlights Bento */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-2xl">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-indigo-400">16</span>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">16 Preguntas</div>
            <div className="text-[11px] text-slate-400">1 logo correcto entre 4</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-500/15 border border-rose-500/20 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">3 Vidas</div>
            <div className="text-[11px] text-slate-400">Cada error resta una vida</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">01:30 Global</div>
            <div className="text-[11px] text-slate-400">90 segundos en total</div>
          </div>
        </div>
      </div>

      {/* Registration Card */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-slate-950">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-1">Registro del jugador</h2>
          <p className="text-xs text-slate-400">
            Ingresa tus datos antes de iniciar la partida. Tu número de contacto nunca será público.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Nombre de usuario <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
                placeholder="Ej. Carlos Dev"
                maxLength={30}
                className={`w-full pl-9 pr-4 py-2.5 bg-slate-950/80 border rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all ${
                  touched.username && !isUsernameValid
                    ? 'border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-500'
                    : isUsernameValid
                    ? 'border-emerald-500/60 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500'
                    : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                }`}
              />
              {isUsernameValid && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>
            {touched.username && !isUsernameValid && (
              <p className="mt-1 text-xs text-rose-400">
                El nombre de usuario es obligatorio (mínimo 2 caracteres).
              </p>
            )}
          </div>

          {/* Contact Number Field */}
          <div>
            <label htmlFor="contact" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Número de contacto <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="contact"
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, contactNumber: true }))}
                placeholder="+34 600 000 000 ó 55 1234 5678"
                maxLength={20}
                className={`w-full pl-9 pr-4 py-2.5 bg-slate-950/80 border rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all ${
                  touched.contactNumber && !isContactValid
                    ? 'border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-500'
                    : isContactValid
                    ? 'border-emerald-500/60 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500'
                    : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                }`}
              />
              {isContactValid && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>
            {touched.contactNumber && !isContactValid && (
              <p className="mt-1 text-xs text-rose-400">
                Ingresa un número telefónico válido (mínimo 7 dígitos, solo números y signos +, - o paréntesis).
              </p>
            )}
          </div>

          {/* Privacy Note */}
          <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Privacidad garantizada: tu teléfono queda registrado para la partida pero nunca se muestra en la tabla de posiciones pública.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                isFormValid
                  ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 text-white hover:opacity-95 shadow-indigo-500/25 active:scale-[0.99]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Comenzar quiz</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenLeaderboard();
              }}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-300 bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver leaderboard</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
