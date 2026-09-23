import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Language } from '../types/quiz';

interface LogoCardProps {
  language: Language;
  index: number;
  isSelected: boolean;
  isCorrectOption: boolean;
  hasAnswered: boolean;
  onSelect: (language: Language) => void;
  disabled: boolean;
}

export const LogoCard: React.FC<LogoCardProps> = ({
  language,
  index,
  isSelected,
  isCorrectOption,
  hasAnswered,
  onSelect,
  disabled
}) => {
  // Determine state styles
  let stateClasses = 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/60 hover:bg-slate-850 hover:shadow-indigo-500/10 hover:-translate-y-1';
  let badge = null;

  if (hasAnswered) {
    if (isSelected && isCorrectOption) {
      // User picked correctly
      stateClasses = 'bg-emerald-950/70 border-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.35)] ring-2 ring-emerald-500 scale-[1.02]';
      badge = (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500 text-slate-950 text-xs font-bold px-2 py-0.5 rounded-md shadow-md animate-in fade-in zoom-in-75">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>¡Correcto!</span>
        </div>
      );
    } else if (isSelected && !isCorrectOption) {
      // User picked wrongly
      stateClasses = 'bg-rose-950/70 border-rose-500 shadow-[0_0_24px_rgba(244,63,94,0.35)] ring-2 ring-rose-500 animate-shake';
      badge = (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-md animate-in fade-in zoom-in-75">
          <XCircle className="w-3.5 h-3.5" />
          <span>Incorrecto</span>
        </div>
      );
    } else if (!isSelected && isCorrectOption) {
      // Reveal correct option when wrong
      stateClasses = 'bg-emerald-950/40 border-emerald-500/80 ring-2 ring-emerald-500/60 ring-dashed shadow-[0_0_16px_rgba(16,185,129,0.2)]';
      badge = (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-600/90 text-white text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Era esta</span>
        </div>
      );
    } else {
      // Other incorrect options
      stateClasses = 'bg-slate-900/40 border-slate-800/40 opacity-40 grayscale-[40%]';
    }
  }

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <button
      type="button"
      onClick={() => onSelect(language)}
      disabled={disabled}
      aria-label={`Opción ${optionLabels[index]}`}
      className={`group relative w-full rounded-2xl border p-4 sm:p-6 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 min-h-[160px] sm:min-h-[190px] ${stateClasses} ${
        disabled && !hasAnswered ? 'cursor-not-allowed opacity-75' : ''
      }`}
    >
      {/* Option Letter Indicator */}
      <div className="absolute top-3 left-3 w-6 h-6 rounded-lg bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-xs font-bold text-slate-300">
        {optionLabels[index]}
      </div>

      {/* Result Badge */}
      {badge}

      {/* Large Crisp Logo */}
      <div className="w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center my-2 p-1.5 transition-transform duration-200 group-hover:scale-105">
        <div
          className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-full [&>svg]:object-contain drop-shadow-md"
          dangerouslySetInnerHTML={{ __html: language.svg }}
        />
      </div>

      <div className="text-[11px] text-slate-500 font-medium tracking-wider uppercase mt-1">
        Toca para elegir
      </div>
    </button>
  );
};
