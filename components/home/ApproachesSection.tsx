import React from 'react';
import type { TFunction } from 'i18next';
import { Bot, Brain, GraduationCap } from 'lucide-react';
import FlowChain from '../knowledge/FlowChain';
import type { IconComponent, Language } from '../../types';
import { useT } from '../../hooks/useT';
import { WORKFLOW, stageKey } from '../../utils/method';
import SectionHeader from '../layout/SectionHeader';
import { cardAccent, cardStatic, cardTitle, container, gridGap, radius, sectionY } from '../../utils/ui';

type ApproachId = 'course' | 'assistant' | 'icestack';

const APPROACHES: { id: ApproachId; icon: IconComponent; highlight?: boolean }[] = [
  { id: 'course', icon: GraduationCap },
  { id: 'assistant', icon: Bot },
  { id: 'icestack', icon: Brain, highlight: true }
];

const approachSteps = (id: ApproachId, t: TFunction): string[] =>
  id === 'icestack'
    ? WORKFLOW.map(stageId => t(stageKey(stageId, 'short')))
    : (t(`home.approaches.${id}.steps`, { returnObjects: true }) as string[]);

const ApproachesSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);
  return (
    <section className={`${container} ${sectionY}`}>
      <SectionHeader
        lang={lang}
        eyebrow={t('home.why.eyebrow')}
        title={t('home.why.title')}
        body={t('home.why.body')}
        className="mb-8"
      />

      <div className={`grid md:grid-cols-3 ${gridGap}`}>
        {APPROACHES.map(approach => {
          const Icon = approach.icon;
          return (
            <div key={approach.id} className={`${approach.highlight ? cardAccent : cardStatic} p-5`}>
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className={`w-8 h-8 ${radius.control} flex items-center justify-center ${
                    approach.highlight
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : 'bg-zinc-100 dark:bg-zinc-800/70 text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </span>
                <h3 className={cardTitle}>{t(`home.approaches.${approach.id}.label`)}</h3>
              </div>
              <FlowChain steps={approachSteps(approach.id, t)} tone={approach.highlight ? 'accent' : 'muted'} />
              <p
                className={`mt-4 text-[13px] leading-relaxed ${
                  approach.highlight
                    ? 'text-zinc-800 dark:text-zinc-200 font-medium'
                    : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {t(`home.approaches.${approach.id}.note`)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ApproachesSection;
