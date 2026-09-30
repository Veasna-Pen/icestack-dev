import React from 'react';
import type { Language } from '../../types';
import SectionHeader from '../layout/SectionHeader';
import { LESSON_SECTIONS } from '../../constants/courses';
import { useT } from '../../hooks/useT';
import { lessonSectionKey } from '../../utils/course';
import { cardStatic, eyebrowFor, gridGap, iconTile, sectionGap, stepNumber } from '../../utils/ui';
import { LESSON_SECTION_ICONS } from './icons';

const LessonFormat: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);

  return (
    <section className={sectionGap}>
      <SectionHeader
        lang={lang}
        eyebrow={t('courses.format.eyebrow')}
        title={t('courses.format.title')}
        body={t('courses.format.body')}
        className="mb-8"
      />
      <ol className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ${gridGap}`}>
        {LESSON_SECTIONS.map((id, i) => {
          const Icon = LESSON_SECTION_ICONS[id];
          return (
            <li key={id} className={`${cardStatic} p-4`}>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={iconTile}>
                  <Icon className="w-4 h-4" />
                </span>
                <span className={`${eyebrowFor(lang)} tabular-nums`}>{stepNumber(i + 1)}</span>
              </div>
              <h3 className="text-[14px] font-bold text-zinc-900 dark:text-white leading-snug">
                {t(lessonSectionKey(id, 'heading'))}
              </h3>
              <p className="mt-1 text-[12px] text-zinc-600 dark:text-zinc-400 leading-snug">
                {t(lessonSectionKey(id, 'hint'))}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default LessonFormat;
