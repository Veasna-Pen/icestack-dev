import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import type { Language, Roadmap } from '../../types';
import { useT } from '../../hooks/useT';
import { roadmapKey } from '../../utils/i18n';
import { roadmapsUrl } from '../../utils/routes';
import { focusRing, radius } from '../../utils/ui';
import { ROADMAP_ICONS } from './icons';

interface RoadmapHeaderProps {
  roadmap: Roadmap;
  lang: Language;
}

const RoadmapHeader: React.FC<RoadmapHeaderProps> = ({ roadmap, lang }) => {
  const t = useT(lang);

  return (
    <>
      <Link
        to={roadmapsUrl(lang)}
        className={`inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors ${radius.chip} ${focusRing}`}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {t('roadmaps.allRoadmaps')}
      </Link>

      <PageHeader
        lang={lang}
        eyebrow={t('roadmaps.eyebrow')}
        title={t(roadmapKey(roadmap.id, 'label'))}
        icon={ROADMAP_ICONS[roadmap.id]}
        lead={t(roadmapKey(roadmap.id, 'summary'))}
        className="mt-6"
      />
    </>
  );
};

export default RoadmapHeader;
