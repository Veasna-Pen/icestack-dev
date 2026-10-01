import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Language, Roadmap } from '../../types';
import { useT } from '../../hooks/useT';
import { roadmapKey } from '../../utils/i18n';
import { roadmapUrl } from '../../utils/routes';
import { cardInteractive, cardTitle, focusRing, iconTile } from '../../utils/ui';
import { ROADMAP_ICONS } from './icons';

interface RoadmapCardProps {
  roadmap: Roadmap;
  lang: Language;
  compact?: boolean;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({ roadmap, lang, compact = false }) => {
  const t = useT(lang);
  const Icon = ROADMAP_ICONS[roadmap.id];

  return (
    <Link
      to={roadmapUrl(lang, roadmap.id)}
      className={`group flex flex-col h-full ${cardInteractive} ${focusRing} ${compact ? 'p-4' : 'p-5'}`}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className={iconTile}>
          <Icon className="w-4 h-4" />
        </span>
        <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-500">
          {t('roadmaps.stageCount', { count: roadmap.stages.length })}
        </span>
      </div>

      <h3 className={`${cardTitle} group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors`}>
        {t(roadmapKey(roadmap.id, 'label'))}
      </h3>
      <p className="mt-1.5 text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {t(roadmapKey(roadmap.id, 'summary'))}
      </p>

      {!compact && <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">{t(roadmapKey(roadmap.id, 'pace'))}</p>}

      <div className="mt-auto pt-4 flex items-center justify-between gap-2 text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">
        <span>{t('roadmaps.open')}</span>
        <ArrowRight className="w-3.5 h-3.5 shrink-0 text-zinc-400 dark:text-zinc-600 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
};

export default RoadmapCard;
