import React, { useState } from 'react';
import { Flag, MapPin } from 'lucide-react';
import type { Language, Roadmap, RoadmapStageCopy } from '../../types';
import { useT } from '../../hooks/useT';
import { roadmapKey } from '../../utils/i18n';
import { eyebrowFor, focusRing, radius, surface } from '../../utils/ui';
import RoadmapSkillBranch from './RoadmapSkillBranch';
import RoadmapStageDetails from './RoadmapStageDetails';
import RoadmapStageNode from './RoadmapStageNode';
import { connectorLine, spinePosition } from './connectors';

interface RoadmapStageListProps {
  roadmap: Roadmap;
  lang: Language;
  done: ReadonlySet<string>;
  onToggle: (stageId: string) => void;
}

const RoadmapStageList: React.FC<RoadmapStageListProps> = ({ roadmap, lang, done, onToggle }) => {
  const t = useT(lang);
  const copy = t(`roadmaps.roles.${roadmap.id}.stages`, { returnObjects: true }) as unknown as Record<
    string,
    RoadmapStageCopy
  >;
  const stages = roadmap.stages.filter(stage => copy[stage.id]);

  const [expanded, setExpanded] = useState<ReadonlySet<string>>(() => new Set());

  const toggleExpanded = (stageId: string) =>
    setExpanded(previous => {
      const next = new Set(previous);
      if (next.has(stageId)) next.delete(stageId);
      else next.add(stageId);
      return next;
    });

  return (
    <div>
      <div className="relative">
        <span aria-hidden="true" className={`absolute top-4 bottom-10 w-0.5 ${spinePosition} ${connectorLine}`} />
        <ol className="relative space-y-10 md:space-y-12">
          <li className="relative flex md:justify-center">
            <span className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950 text-[12px] font-semibold text-emerald-700 dark:text-emerald-300">
              <MapPin className="w-3.5 h-3.5" />
              {t('roadmaps.start')}
            </span>
          </li>

          {stages.map((stage, i) => {
            const stageCopy = copy[stage.id];
            const isDone = done.has(stage.id);
            const isExpanded = expanded.has(stage.id);
            const half = Math.ceil(stageCopy.skills.length / 2);
            const detailsId = `${stage.id}-details`;

            return (
              <li key={stage.id} id={stage.id} className="relative scroll-mt-40">
                <div className="grid gap-2 md:gap-0 md:grid-cols-[1fr_minmax(0,19rem)_1fr] md:items-center">
                  <RoadmapStageNode
                    lang={lang}
                    number={i + 1}
                    copy={stageCopy}
                    detailsId={detailsId}
                    isDone={isDone}
                    isExpanded={isExpanded}
                    onToggleDone={() => onToggle(stage.id)}
                    onToggleExpanded={() => toggleExpanded(stage.id)}
                  />
                  <RoadmapSkillBranch
                    skills={stageCopy.skills.slice(0, half)}
                    side="left"
                    label={t('roadmaps.learn')}
                    isDone={isDone}
                  />
                  <RoadmapSkillBranch
                    skills={stageCopy.skills.slice(half)}
                    side="right"
                    label={t('roadmaps.learn')}
                    isDone={isDone}
                  />
                </div>

                {isExpanded && (
                  <div className="mt-4">
                    <RoadmapStageDetails id={detailsId} lang={lang} copy={stageCopy} related={stage.related} />
                  </div>
                )}
              </li>
            );
          })}

          <li className="relative pl-12 md:pl-0 md:flex md:justify-center">
            <span aria-hidden="true" className={`md:hidden absolute left-5 top-1/2 w-7 h-px ${connectorLine}`} />
            <div
              className={`relative z-10 md:max-w-md p-4 ${radius.card} border-2 border-emerald-500/50 ${surface.card} md:text-center`}
            >
              <p className={`flex items-center md:justify-center gap-1.5 mb-1.5 ${eyebrowFor(lang, true)}`}>
                <Flag className="w-3.5 h-3.5" />
                {t('roadmaps.outcome')}
              </p>
              <p className="text-[13.5px] text-zinc-800 dark:text-zinc-200 leading-relaxed">
                {t(roadmapKey(roadmap.id, 'outcome'))}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default RoadmapStageList;
