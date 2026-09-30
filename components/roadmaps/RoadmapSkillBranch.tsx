import React from 'react';
import type { RoadmapSkill } from '../../types';
import { radius, surface } from '../../utils/ui';
import { connectorLine } from './connectors';

interface RoadmapSkillBranchProps {
  skills: RoadmapSkill[];
  side: 'left' | 'right';
  label: string;
  isDone: boolean;
}

const RoadmapSkillBranch: React.FC<RoadmapSkillBranchProps> = ({ skills, side, label, isDone }) => {
  if (!skills.length) return null;
  const isLeft = side === 'left';
  const last = skills.length - 1;

  return (
    <ul
      aria-label={label}
      className={`relative flex flex-col gap-2 pl-12 ${
        isLeft ? 'md:order-1 md:items-end md:pl-0 md:pr-12' : 'md:order-3 md:items-start'
      }`}
    >
      <span
        aria-hidden="true"
        className={`hidden md:block absolute top-1/2 w-6 h-px ${isLeft ? 'right-0' : 'left-0'} ${connectorLine}`}
      />

      {skills.map((skill, i) => (
        <li key={skill.name} className="relative w-full md:w-auto">
          <span aria-hidden="true" className={`md:hidden absolute -left-7 top-1/2 w-7 h-px ${connectorLine}`} />
          <span
            aria-hidden="true"
            className={`hidden md:block absolute top-1/2 w-6 h-px ${isLeft ? '-right-6' : '-left-6'} ${connectorLine}`}
          />
          {last > 0 && (
            <span
              aria-hidden="true"
              className={`hidden md:block absolute w-px ${isLeft ? '-right-6' : '-left-6'} ${
                i === 0 ? 'top-1/2' : '-top-1'
              } ${i === last ? 'bottom-1/2' : '-bottom-1'} ${connectorLine}`}
            />
          )}

          <div
            className={`w-full md:w-[15rem] px-3 py-2 ${radius.control} border ${surface.card} ${
              isDone ? 'border-emerald-500/40' : 'border-zinc-200 dark:border-zinc-800'
            } ${isLeft ? 'md:text-right' : ''}`}
          >
            <p className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">{skill.name}</p>
            <p className="mt-0.5 text-[11.5px] text-zinc-500 dark:text-zinc-400 leading-snug">{skill.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RoadmapSkillBranch;
