import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, SquarePen } from 'lucide-react';
import type { Course, Language, Lesson } from '../../types';
import { useT } from '../../hooks/useT';
import { formatMinutes } from '../../utils/course';
import { courseUrl, coursesUrl } from '../../utils/routes';
import { repoEditUrl } from '../../utils/site';
import { eyebrowFor, focusRing, radius, titleSizeFor } from '../../utils/ui';

interface LessonHeaderProps {
  course: Course;
  lesson: Lesson;
  total: number;
  lang: Language;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({ course, lesson, total, lang }) => {
  const t = useT(lang);
  const crumb = `hover:text-zinc-900 dark:hover:text-zinc-200 ${radius.chip} ${focusRing}`;

  return (
    <>
      <nav
        aria-label={t('topic.breadcrumb')}
        className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-6 font-medium min-w-0"
      >
        <Link to={coursesUrl(lang)} className={`shrink-0 ${crumb}`}>
          {t('nav.courses')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        <Link to={courseUrl(lang, course.slug)} className={`truncate ${crumb}`}>
          {course.title}
        </Link>
      </nav>

      <header className="mb-8 pb-7 border-b border-zinc-200 dark:border-zinc-800/80">
        <p className={`${eyebrowFor(lang, true)} mb-3 tabular-nums`}>
          {t('courses.lessonOf', { number: lesson.number, total })}
        </p>
        <h1 className={`font-bold text-zinc-900 dark:text-white ${titleSizeFor(lang, 'topic')}`}>{lesson.title}</h1>
        {lesson.summary && (
          <p className="mt-4 text-base sm:text-[17px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {lesson.summary}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {formatMinutes(t, lesson.minutes)}
          </span>
          {lesson.updated && (
            <span>
              {t('topic.updated')} <time dateTime={lesson.updated}>{lesson.updated}</time>
            </span>
          )}
          <a
            href={repoEditUrl(lesson.sourcePath)}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${radius.chip} ${focusRing}`}
          >
            <SquarePen className="w-3.5 h-3.5" />
            {t('common.editThisPage')}
          </a>
        </div>
      </header>
    </>
  );
};

export default LessonHeader;
