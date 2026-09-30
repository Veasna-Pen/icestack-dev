import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronRight } from 'lucide-react';
import type { Language, Lesson } from '../../types';
import { useT } from '../../hooks/useT';
import { formatMinutes } from '../../utils/course';
import { lessonUrl } from '../../utils/routes';
import { cardStatic, focusRing, stepNumber } from '../../utils/ui';

interface CourseLessonListProps {
  lessons: Lesson[];
  done: ReadonlySet<string>;
  lang: Language;
}

const CourseLessonList: React.FC<CourseLessonListProps> = ({ lessons, done, lang }) => {
  const t = useT(lang);

  return (
    <section>
      <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">{t('courses.lessons')}</h2>
      <ol className={`${cardStatic} overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800/80`}>
        {lessons.map(lesson => {
          const isDone = done.has(lesson.slug);
          return (
            <li key={lesson.slug}>
              <Link
                to={lessonUrl(lang, lesson)}
                className={`group flex items-start gap-4 px-5 py-4 hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors ${focusRing}`}
              >
                <span
                  className={`mt-0.5 w-8 h-8 shrink-0 rounded-full border-2 flex items-center justify-center text-[11px] font-mono font-semibold tabular-nums transition-colors ${
                    isDone
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 group-hover:border-emerald-500'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" aria-label={t('courses.completed')} /> : stepNumber(lesson.number)}
                </span>

                <span className="flex-1 min-w-0">
                  <span className="block text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                    {lesson.title}
                  </span>
                  {lesson.summary && (
                    <span className="mt-1 block text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {lesson.summary}
                    </span>
                  )}
                </span>

                <span className="hidden sm:flex items-center gap-2 shrink-0 mt-1 text-[11px] font-medium text-zinc-400 dark:text-zinc-500 tabular-nums">
                  {formatMinutes(t, lesson.minutes)}
                  <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-700 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default CourseLessonList;
