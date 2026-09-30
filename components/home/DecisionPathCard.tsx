import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Language, Topic } from '../../types';
import { useT } from '../../hooks/useT';
import { WORKFLOW, stageKey } from '../../utils/method';
import { topicUrl } from '../../utils/routes';
import { border, buttonPrimary, eyebrowFor, stepNumber, surface } from '../../utils/ui';

/** Mirrors knowledge/problems/database-is-slow; keep the numbers in sync. */
const DecisionPathCard: React.FC<{ lang: Language; example?: Topic }> = ({ lang, example }) => {
  const t = useT(lang);
  return (
    <div className="lg:sticky lg:top-24">
      <div
        className={`rounded-2xl border border-zinc-200 dark:border-zinc-800 ${surface.cardBlur} backdrop-blur-sm shadow-sm overflow-hidden`}
      >
        <div className={`px-5 py-4 border-b ${border.hairline} ${surface.inset}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className={`${eyebrowFor(lang)} mb-1.5`}>{t('home.workedExample')}</div>
              <div className="text-[15px] font-bold text-zinc-900 dark:text-white leading-snug">
                {example?.title || t('home.exampleFallbackTitle')}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-extrabold text-zinc-900 dark:text-white tabular-nums leading-none">
                {WORKFLOW.length}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-1">
                {t('home.stepsLabel')}
              </div>
            </div>
          </div>
        </div>

        <ol className="px-2 py-2">
          {WORKFLOW.map((stageId, idx) => (
            <li key={stageId} className="relative flex items-start gap-3 pl-3 pr-2.5 py-2">
              {idx < WORKFLOW.length - 1 && (
                <span aria-hidden="true" className="absolute left-[21.5px] top-8 -bottom-2.5 w-px bg-emerald-500/30" />
              )}
              <span className="relative z-10 mt-0.5 shrink-0 w-5 h-5 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-mono font-semibold text-zinc-400 dark:text-zinc-600 tabular-nums">
                    {stepNumber(idx + 1)}
                  </span>
                  <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                    {t(stageKey(stageId, 'short'))}
                  </span>
                </div>
                <p className="mt-0.5 text-[13px] text-zinc-800 dark:text-zinc-200 leading-snug">
                  {t(`home.example.${stageId}`)}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {example && (
          <div className={`p-3 border-t ${border.hairline} ${surface.inset}`}>
            <Link to={topicUrl(lang, example)} className={`w-full ${buttonPrimary}`}>
              {t('home.readFullReasoning')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionPathCard;
