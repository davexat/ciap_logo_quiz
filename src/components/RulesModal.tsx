import React from 'react';
import { X } from 'lucide-react';
import { sound } from '../services/audio';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTIONS: { cmd: string; body: string }[] = [
  {
    cmd: '$ man niveles',
    body: '3 niveles encadenados: fácil ×5, medio ×5 y difícil ×5. Al superar uno pasas al siguiente automáticamente. El fácil solo trae logos comunes, el medio mezcla medios y fáciles, y el difícil solo medios y difíciles.'
  },
  {
    cmd: '$ man tiempo',
    body: '10 segundos por pregunta, sin pausa. Si el contador llega a 00:00 cuenta como fallo: pierdes una vida y avanzas.'
  },
  {
    cmd: '$ man vidas',
    body: 'Empiezas con 3 vidas para toda la partida, sin recargas entre niveles. Sin vidas, fin de la partida.'
  },
  {
    cmd: '$ man leaderboard',
    body: 'Quien completa las 15 clasifica por vidas restantes y luego por tiempo. Quien no completa, por ronda máxima.'
  },
  {
    cmd: '$ man comodin',
    body: 'Comodín 50:50: elimina 2 opciones incorrectas. Tienes 3 usos por partida (botón o tecla W), uno por pregunta como máximo.'
  }
];

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-void/85 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-panel border border-line rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Title bar */}
        <div className="px-4 py-2.5 border-b border-line bg-void/60 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-line" />
          <span className="w-2.5 h-2.5 rounded-full bg-line" />
          <span className="w-2.5 h-2.5 rounded-full bg-signal/70" />
          <span className="font-mono text-xs text-dim ml-2">man logo-quiz</span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="ml-auto font-mono text-xs text-dim hover:text-bad transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            [x]
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {SECTIONS.map((s) => (
            <section key={s.cmd}>
              <h3 className="font-mono text-xs font-bold text-signal mb-1">{s.cmd}</h3>
              <p className="text-sm text-dim leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-line bg-void/60 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-signal text-black hover:brightness-110 rounded-md font-mono text-xs font-bold cursor-pointer transition-all"
          >
            entendido
          </button>
        </div>
      </div>
    </div>
  );
};
