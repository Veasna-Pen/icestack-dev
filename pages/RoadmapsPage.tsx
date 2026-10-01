import React from 'react';
import { Signpost } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import RoadmapCard from '../components/roadmaps/RoadmapCard';
import { ROADMAPS } from '../constants/roadmaps';
import { useLanguageParam } from '../hooks/useLanguage';
import { usePageMeta } from '../hooks/usePageMeta';
import { roadmapsUrl } from '../utils/routes';
import { useT } from '../hooks/useT';
import { container, gridGap, pageY, radius } from '../utils/ui';

const RoadmapsPage: React.FC = () => {
  const lang = useLanguageParam();
  const t = useT(lang);

  usePageMeta({ title: t('nav.roadmaps'), description: t('roadmaps.lead'), path: roadmapsUrl(lang) });

  return (
    <main className={`${container} ${pageY}`}>
      <PageHeader
        lang={lang}
        eyebrow={t('roadmaps.eyebrow')}
        title={t('roadmaps.heading')}
        lead={t('roadmaps.lead')}
        className="mb-10"
      />

      <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${gridGap}`}>
        {ROADMAPS.map(roadmap => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} lang={lang} />
        ))}
      </div>

      <p
        className={`mt-10 flex items-start gap-3 p-5 ${radius.card} border border-emerald-500/20 bg-emerald-500/[0.04] text-[13px] text-zinc-700 dark:text-zinc-300 leading-relaxed`}
      >
        <Signpost className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
        {t('roadmaps.principle')}
      </p>
    </main>
  );
};

export default RoadmapsPage;
