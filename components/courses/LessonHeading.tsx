import React from 'react';
import { Hash } from 'lucide-react';
import type { Language } from '../../types';
import { useT } from '../../hooks/useT';
import { englishLessonHeading, lessonSectionKey, resolveLessonSection } from '../../utils/course';
import { nodeText, slugify } from '../../utils/text';
import { iconTile } from '../../utils/ui';
import { LESSON_SECTION_ICONS } from './icons';

const anchorClass =
  'opacity-0 group-hover:opacity-100 focus-visible:opacity-100 text-zinc-400 hover:text-emerald-500 transition-opacity p-1 self-center';

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

export const makeLessonHeading = (lang: Language): React.FC<HeadingProps> => {
  const LessonHeading: React.FC<HeadingProps> = ({ children }) => {
    const t = useT(lang);
    const section = resolveLessonSection(nodeText(children).trim());
    const id = section ?? slugify(children);

    const anchor = (
      <a href={`#${id}`} className={anchorClass} aria-label={t('topic.linkToSection')}>
        <Hash className="w-4 h-4" />
      </a>
    );

    if (!section) {
      return (
        <h2
          id={id}
          className="group flex items-center gap-2 scroll-mt-28 mt-12 mb-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          <span>{children}</span>
          {anchor}
        </h2>
      );
    }

    const Icon = LESSON_SECTION_ICONS[section];
    return (
      <h2
        id={id}
        className="group flex flex-wrap items-center gap-x-3 gap-y-1 scroll-mt-28 mt-12 mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-800 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
      >
        <span className={iconTile}>
          <Icon className="w-4 h-4" />
        </span>
        <span>{t(lessonSectionKey(section, 'heading'))}</span>
        {lang === 'km' && (
          <span className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-500">
            {englishLessonHeading(section)}
          </span>
        )}
        {anchor}
      </h2>
    );
  };
  return LessonHeading;
};
