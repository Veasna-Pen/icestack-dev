import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { Language, RoadmapStageCopy } from '../../types';
import { useT } from '../../hooks/useT';
import { eyebrowFor, focusRing, radius, stepNumber, surface } from '../../utils/ui';
import { connectorLine } from './connectors';

interface RoadmapStageNodeProps {
  lang: Language;
  number: number;
  copy: RoadmapStageCopy;
  detailsId: string;
  isDone: boolean;
  isExpanded: boolean;
  onToggleDone: () => void;
  onToggleExpanded: () => void;
}

const RoadmapStageNode: React.FC<RoadmapStageNodeProps> = ({
  lang,
  number,
  copy,
  detailsId,
  isDone,
  isExpanded,
  onToggleDone,
  onToggleExpanded
}) => {
  const t = useT(lang);
  const doneLabel = isDone ? t('roadmaps.markNotDone') : t('roadmaps.markDone');

  return (
    <div className="relative pl-12 md:pl-0 md:order-2">
      <span aria-hidden="true" className={`md:hidden absolute left-5 top-1/2 w-7 h-px ${connectorLine}`} />
      <span
        aria-hidden="true"
        className={`md:hidden absolute left-5 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 ${
          isDone ? 'bg-emerald-500 border-emerald-500' : `${surface.page} border-zinc-400 dark:border-zinc-600`
        }`}
      />

      <div
        className={`relative z-10 p-4 ${radius.card} border-2 ${surface.card} shadow-sm shadow-zinc-900/[0.03] dark:shadow-black/20 transition-colors ${
          isDone ? 'border-emerald-500/70' : 'border-zinc-300 dark:border-zinc-700'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <span className={`${eyebrowFor(lang, true)} tabular-nums`}>
            {t('roadmaps.stageLabel', { number: stepNumber(number) })}
          </span>
          <button
            type="button"
            onClick={onToggleDone}
            aria-pressed={isDone}
            aria-label={`${doneLabel}: ${copy.title}`}
            title={doneLabel}
            className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer ${focusRing} ${
              isDone
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'border-zinc-300 dark:border-zinc-600 text-transparent hover:border-emerald-500 hover:text-emerald-500'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        </div>

        <h2 className="mt-1.5 text-[16px] font-bold text-zinc-900 dark:text-white leading-snug">{copy.title}</h2>
        <p className="mt-1 text-[12.5px] text-zinc-600 dark:text-zinc-400 leading-relaxed">{copy.goal}</p>

        <button
          type="button"
          onClick={onToggleExpanded}
          aria-expanded={isExpanded}
          aria-controls={detailsId}
          className={`mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors cursor-pointer ${radius.chip} ${focusRing}`}
        >
          {isExpanded ? t('roadmaps.hideDetails') : t('roadmaps.showDetails')}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default RoadmapStageNode;
