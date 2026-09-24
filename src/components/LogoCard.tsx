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

const OPTION_KEYS = ['A', 'B', 'C', 'D'];

// ponytail: devicon ships these marks only in black/near-black; invert to white
// silhouettes so they read on dark cards. Proper fix: per-logo light assets.
const INVERT_LOGOS = new Set(['flask', 'github', 'symfony', 'django', 'apache-kafka', 'mariadb', 'rust', 'nextjs', 'unreal-engine']);

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
  let stateClasses = 'bg-void border-line hover:border-signal/70 hover:-translate-y-0.5';
  let badge = null;

  if (hasAnswered) {
    if (isSelected && isCorrectOption) {
      stateClasses = 'bg-ok/10 border-ok';
      badge = (
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-ok text-black font-mono text-[11px] font-bold px-2 py-0.5 rounded">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>correcto</span>
        </div>
      );
    } else if (isSelected && !isCorrectOption) {
      stateClasses = 'bg-bad/10 border-bad animate-shake';
      badge = (
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-bad text-black font-mono text-[11px] font-bold px-2 py-0.5 rounded">
          <XCircle className="w-3.5 h-3.5" />
          <span>fallo</span>
        </div>
      );
    } else if (!isSelected && isCorrectOption) {
      stateClasses = 'bg-ok/5 border-ok/60';
      badge = (
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 border border-ok/60 text-ok font-mono text-[11px] font-bold px-2 py-0.5 rounded">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>era esta</span>
        </div>
      );
    } else {
      stateClasses = 'bg-void/60 border-line/60 opacity-40';
    }
  }

  const optionKey = OPTION_KEYS[index] ?? String(index + 1);

  return (
    <button
      type="button"
      onClick={() => onSelect(language)}
      disabled={disabled}
      aria-label={`Opción ${optionKey}`}
      title={`Pulsa ${optionKey}`}
      className={`group relative w-full rounded-md border p-4 sm:p-5 flex flex-col items-center justify-center transition-all duration-150 cursor-pointer select-none min-h-[160px] sm:min-h-[185px] ${stateClasses} ${
        disabled && !hasAnswered ? 'cursor-not-allowed opacity-75' : ''
      }`}
    >
      {/* kbd key chip */}
      <kbd className="absolute top-2.5 left-2.5 font-mono text-[11px] font-bold px-1.5 py-0.5 rounded border border-line bg-panel text-dim group-hover:text-signal group-hover:border-signal/50 transition-colors">
        {optionKey}
      </kbd>

      {badge}

      <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center my-2 transition-transform duration-150 group-hover:scale-105">
        <img
          src={language.logo}
          alt={language.displayName}
          className={`w-full h-full object-contain ${INVERT_LOGOS.has(language.id) ? 'invert' : ''}`}
        />
      </div>

      <div className="font-mono text-[11px] text-dim mt-1">
        pulsa {optionKey} o toca
      </div>
    </button>
  );
};
