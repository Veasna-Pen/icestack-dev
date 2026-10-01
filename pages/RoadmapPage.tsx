import React from 'react';
import SectionHeader from '../components/layout/SectionHeader';
import RoadmapCard from '../components/roadmaps/RoadmapCard';
import RoadmapHeader from '../components/roadmaps/RoadmapHeader';
import RoadmapStageList from '../components/roadmaps/RoadmapStageList';
import type { RoadmapId } from '../types';
import { ROADMAPS, getRoadmap } from '../constants/roadmaps';
import { useLanguageParam } from '../hooks/useLanguage';
import { usePageMeta } from '../hooks/usePageMeta';
import { roadmapUrl } from '../utils/routes';
import { useRoadmapProgress } from '../hooks/useRoadmapProgress';
import { useT } from '../hooks/useT';
import { roadmapKey } from '../utils/i18n';
import { container, gridGap, pageY, sectionGap } from '../utils/ui';

interface RoadmapPageProps {
  roadmapId: RoadmapId;
}

const RoadmapPage: React.FC<RoadmapPageProps> = ({ roadmapId }) => {
  const lang = useLanguageParam();
  const t = useT(lang);
  const roadmap = getRoadmap(roadmapId);
  const { done, toggle } = useRoadmapProgress(roadmapId);

  usePageMeta({
    title: t(roadmapKey(roadmapId, 'label')),
    description: t(roadmapKey(roadmapId, 'summary')),
    path: roadmapUrl(lang, roadmapId)
  });

  return (
    <main className={`${container} ${pageY}`}>
      <RoadmapHeader roadmap={roadmap} lang={lang} />

      <div className="mt-12 max-w-5xl mx-auto">
        <RoadmapStageList roadmap={roadmap} lang={lang} done={done} onToggle={toggle} />
      </div>

      <section className={sectionGap}>
        <SectionHeader lang={lang} title={t('roadmaps.otherRoadmaps')} className="mb-8" />
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${gridGap}`}>
          {ROADMAPS.filter(other => other.id !== roadmapId).map(other => (
            <RoadmapCard key={other.id} roadmap={other} lang={lang} compact />
          ))}
        </div>
      </section>
    </main>
  );
};

export default RoadmapPage;
