import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Lightbulb } from 'lucide-react';
import type { Language, RoadmapStageCopy, Topic } from '../../types';
import { resolveRef, topicRef } from '../../services/knowledgeService';
import { useT } from '../../hooks/useT';
import { topicUrl } from '../../utils/routes';
import { cardStatic, focusRing, radius } from '../../utils/ui';
import { NAV_ICONS } from '../knowledge/icons';

interface RoadmapStageDetailsProps {
  id: string;
  lang: Language;
  copy: RoadmapStageCopy;
  related: string[];
}

const relatedTopics = (refs: string[], lang: Language): Topic[] =>
  refs.flatMap(ref => {
    const topic = resolveRef(ref, lang);
    if (!topic && import.meta.env.DEV) console.warn(`[roadmaps] Unknown related topic "${ref}".`);
    return topic ? [topic] : [];
  });

const RoadmapStageDetails: React.FC<RoadmapStageDetailsProps> = ({ id, lang, copy, related }) => {
  const t = useT(lang);
  const topics = relatedTopics(related, lang);

  return (
    <div id={id} className="relative z-10 pl-12 md:pl-0 md:max-w-2xl md:mx-auto">
      <div className={`${cardStatic} p-4 sm:p-5 shadow-sm shadow-zinc-900/[0.03] dark:shadow-black/20`}>
        <dl className="grid sm:grid-cols-2 gap-3 text-[13px] leading-relaxed">
          <div className="rounded-xl bg-amber-500/[0.06] border border-amber-500/20 p-3.5">
            <dt className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 mb-1">
              <Lightbulb className="w-3.5 h-3.5 shrink-0" />
              {t('roadmaps.decide')}
            </dt>
            <dd>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">{copy.decision}</p>
              <p className="mt-1 text-zinc-700 dark:text-zinc-300">{copy.advice}</p>
            </dd>
          </div>
          <div className="rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 p-3.5">
            <dt className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 mb-1">
              <Hammer className="w-3.5 h-3.5 shrink-0" />
              {t('roadmaps.build')}
            </dt>
            <dd className="text-zinc-700 dark:text-zinc-300">{copy.project}</dd>
          </div>
        </dl>

        {topics.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-[11.5px] text-zinc-500 dark:text-zinc-400 mr-1">{t('roadmaps.related')}</span>
            {topics.map(topic => {
              const Icon = NAV_ICONS[topic.collection];
              return (
                <Link
                  key={topicRef(topic)}
                  to={topicUrl(lang, topic)}
                  className={`inline-flex items-center gap-1.5 px-2 py-1 ${radius.chip} border border-zinc-200 dark:border-zinc-800 text-[12px] text-zinc-600 dark:text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${focusRing}`}
                >
                  <Icon className="w-3 h-3 shrink-0" />
                  {topic.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapStageDetails;
