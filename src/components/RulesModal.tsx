import React from 'react';
import { X, HelpCircle, Heart, Clock, CheckCircle2, Trophy, ShieldCheck } from 'lucide-react';
import { sound } from '../services/audio';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Reglas del Juego</h2>
              <p className="text-xs text-slate-400">Cómo jugar a Programming Logo Quiz</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-sm mb-1">16 Preguntas de Logotipos</h3>
              <p className="text-slate-400 leading-relaxed text-xs">
                En cada ronda se te pedirá identificar el logo oficial de un lenguaje de programación específico entre 4 opciones posibles. Solo una es correcta.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex gap-3">
            <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-sm mb-1">90 Segundos Globales (01:30)</h3>
              <p className="text-slate-400 leading-relaxed text-xs">
                El tiempo corre continuamente para toda la partida desde el momento en que pulsas &ldquo;Comenzar quiz&rdquo;. Si el cronómetro llega a 00:00, la partida termina por tiempo agotado.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex gap-3">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Sistema de 3 Vidas</h3>
              <p className="text-slate-400 leading-relaxed text-xs">
                Comienzas con 3 vidas. Cada respuesta incorrecta te restará una vida. Si pierdes las 3 vidas antes de responder las 16 preguntas, la partida termina.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex gap-3">
            <Trophy className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Clasificación en el Leaderboard</h3>
              <p className="text-slate-400 leading-relaxed text-xs">
                Quienes completen las 16 preguntas clasificarán primero por más vidas sobrantes y luego por menor tiempo empleado. Quienes no completen clasificarán según la ronda máxima alcanzada.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Seguridad y Privacidad</h3>
              <p className="text-slate-400 leading-relaxed text-xs">
                Tu número de contacto se guarda únicamente para la persistencia del registro, pero nunca será mostrado de forma pública en la tabla de posiciones.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
