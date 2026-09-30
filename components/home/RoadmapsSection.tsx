import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Language } from '../../types';
import RoadmapCard from '../roadmaps/RoadmapCard';
import { ROADMAPS } from '../../constants/roadmaps';
import { useT } from '../../hooks/useT';
import { roadmapsUrl } from '../../utils/routes';
import SectionHeader from '../layout/SectionHeader';
import { buttonSecondary, container, gridGap, sectionY } from '../../utils/ui';

const RoadmapsSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);

  return (
    <section className={`${container} ${sectionY}`}>
      <SectionHeader
        lang={lang}
        eyebrow={t('roadmaps.home.eyebrow')}
        title={t('roadmaps.home.title')}
        body={t('roadmaps.home.body')}
        action={
          <Link to={roadmapsUrl(lang)} className={buttonSecondary}>
            {t('roadmaps.home.cta')}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        }
        className="mb-8"
      />

      <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${gridGap}`}>
        {ROADMAPS.map(roadmap => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} lang={lang} compact />
        ))}
      </div>
    </section>
  );
};

export default RoadmapsSection;
