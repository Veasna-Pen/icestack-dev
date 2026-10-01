import React from 'react';
import { FolderTree, GitPullRequest, MessagesSquare, PenLine } from 'lucide-react';
import type { IconComponent, Language } from '../../types';
import { COLLECTION_IDS } from '../../constants/collections';
import { useT } from '../../hooks/useT';
import SectionHeader from '../layout/SectionHeader';
import { cardStatic, cardTitle, gridGap, sectionGap, stepNumber } from '../../utils/ui';

type StepId = 'pick' | 'copy' | 'write' | 'preview';

const STEPS: { id: StepId; icon: IconComponent; code?: string }[] = [
  { id: 'pick', icon: MessagesSquare },
  { id: 'copy', icon: FolderTree, code: 'knowledge/<collection>/<slug>/en.mdx' },
  { id: 'write', icon: PenLine },
  { id: 'preview', icon: GitPullRequest, code: 'npm run dev' }
];

const HowItWorks: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);
  return (
    <>
      <section className={sectionGap}>
        <SectionHeader lang={lang} title={t('contribute.howItWorks')} className="mb-8" />
        <ol className={`grid sm:grid-cols-2 lg:grid-cols-4 ${gridGap}`}>
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.id} className={`${cardStatic} p-5 flex flex-col`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-500 tabular-nums">
                    {stepNumber(i + 1)}
                  </span>
                  <Icon className="w-4 h-4 text-emerald-500" />
                </div>
                <h3 className={cardTitle}>{t(`contribute.steps.${step.id}.title`)}</h3>
                <p className="mt-1.5 text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t(`contribute.steps.${step.id}.body`)}
                </p>
                {step.code && (
                  <code className="mt-auto pt-3 block font-mono text-[11px] text-emerald-700 dark:text-emerald-400 break-all">
                    {step.code}
                  </code>
                )}
              </li>
            );
          })}
        </ol>
        <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
          {t('contribute.collections')} <span className="font-mono">{COLLECTION_IDS.join(' · ')}</span>
        </p>
      </section>
    </>
  );
};

export default HowItWorks;
