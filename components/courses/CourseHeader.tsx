import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RotateCcw, SquarePen } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import type { Course, Language, Lesson } from '../../types';
import { courseMinutes } from '../../services/courseService';
import { useT } from '../../hooks/useT';
import { coursesUrl, lessonUrl } from '../../utils/routes';
import { repoEditUrl } from '../../utils/site';
import { buttonPrimary, buttonSecondary, focusRing, radius } from '../../utils/ui';
import { CourseMeta, LevelBadge, ProgressBar } from './CourseMeta';

interface CourseHeaderProps {
  course: Course;
  lessons: Lesson[];
  done: ReadonlySet<string>;
  lang: Language;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ course, lessons, done, lang }) => {
  const t = useT(lang);
  const doneCount = lessons.filter(lesson => done.has(lesson.slug)).length;
  const nextLesson = lessons.find(lesson => !done.has(lesson.slug));

  let action: React.ReactNode = null;
  if (lessons.length > 0 && nextLesson) {
    action = (
      <Link to={lessonUrl(lang, nextLesson)} className={buttonPrimary}>
        {doneCount === 0 ? t('courses.start') : t('courses.continue', { number: nextLesson.number })}
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    );
  } else if (lessons.length > 0) {
    action = (
      <Link to={lessonUrl(lang, lessons[0])} className={buttonSecondary}>
        <RotateCcw className="w-3.5 h-3.5" />
        {t('courses.restart')}
      </Link>
    );
  }

  return (
    <>
      <Link
        to={coursesUrl(lang)}
        className={`inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors ${radius.chip} ${focusRing}`}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {t('courses.allCourses')}
      </Link>

      <PageHeader lang={lang} eyebrow={t('courses.eyebrow')} title={course.title} lead={course.summary} className="mt-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <LevelBadge level={course.level} lang={lang} />
          <CourseMeta lang={lang} lessons={lessons.length} minutes={courseMinutes(course.slug, lang)} />
          <a
            href={repoEditUrl(course.sourcePath)}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${radius.chip} ${focusRing}`}
          >
            <SquarePen className="w-3.5 h-3.5" />
            {t('common.editThisPage')}
          </a>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          {action}
          {doneCount > 0 && (
            <ProgressBar lang={lang} done={doneCount} total={lessons.length} className="w-full sm:max-w-60" />
          )}
        </div>
      </PageHeader>
    </>
  );
};

export default CourseHeader;
