import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { NAV_ICONS } from '../knowledge/icons';
import type { Language, NavId } from '../../types';
import { countTopics, listTopics } from '../../services/knowledgeService';
import { PRIMARY_NAV } from '../../constants/navigation';
import { useT } from '../../hooks/useT';
import { collectionKey, navLabelKey } from '../../utils/i18n';
import { WORKFLOW, stageKey } from '../../utils/method';
import { navUrl } from '../../utils/routes';
import SectionHeader from '../layout/SectionHeader';
import {
  cardInteractive,
  cardTitle,
  container,
  focusRing,
  gridGap,
  sectionY,
  stepNumber,
  surface
} from '../../utils/ui';

const LearningPathSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);

  const roleFor = (id: NavId): string =>
    id === 'how-to-think' ? t('home.path.methodRole') : t(collectionKey(id, 'role'));

  const samplesFor = (id: NavId): string[] =>
    id === 'how-to-think'
      ? WORKFLOW.slice(0, 3).map(stageId => t(stageKey(stageId, 'label')))
      : listTopics(lang, id)
          .slice(0, 3)
          .map(topic => topic.title);

  const countFor = (id: NavId): string =>
    id === 'how-to-think'
      ? t('common.stepCount', { count: WORKFLOW.length })
      : t('common.topicCount', { count: countTopics(id) });

  return (
    <section className={`border-y border-zinc-200/80 dark:border-zinc-800/80 ${surface.bar}`}>
      <div className={`${container} ${sectionY}`}>
        <SectionHeader
          lang={lang}
          eyebrow={t('home.path.eyebrow')}
          title={t('home.path.title')}
          body={t('home.path.body')}
          className="mb-8"
        />

        <ol className={`grid sm:grid-cols-2 lg:grid-cols-5 ${gridGap}`}>
          {PRIMARY_NAV.map((id, i) => {
            const Icon = NAV_ICONS[id];
            return (
              <li key={id} className="relative">
                <Link
                  to={navUrl(lang, id)}
                  className={`group flex flex-col h-full p-4 ${cardInteractive} ${focusRing}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-500 tabular-nums">
                      {stepNumber(i + 1)}
                    </span>
                    <Icon className="w-4 h-4 text-emerald-500" />
                  </div>
                  <h3
                    className={`${cardTitle} group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors`}
                  >
                    {t(navLabelKey(id))}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-snug">{roleFor(id)}</p>
                  <ul className="mt-3 space-y-1">
                    {samplesFor(id).map(sample => (
                      <li key={sample} className="text-[12px] text-zinc-600 dark:text-zinc-400 truncate">
                        {sample}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 flex items-center justify-between gap-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-500">
                    <span className="truncate">{countFor(id)}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 text-zinc-400 dark:text-zinc-600 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
                {i < PRIMARY_NAV.length - 1 && (
                  <ChevronRight
                    aria-hidden="true"
                    className={`hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-4 h-4 p-0.5 rounded-full ${surface.bar} text-zinc-400 dark:text-zinc-600`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default LearningPathSection;
