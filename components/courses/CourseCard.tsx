import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap } from 'lucide-react';
import type { Course, Language } from '../../types';
import { courseMinutes, listLessons } from '../../services/courseService';
import { useCourseProgress } from '../../hooks/useCourseProgress';
import { useT } from '../../hooks/useT';
import { courseUrl } from '../../utils/routes';
import { cardInteractive, cardTitle, focusRing, iconTile } from '../../utils/ui';
import { CourseMeta, LevelBadge, ProgressBar } from './CourseMeta';

interface CourseCardProps {
  course: Course;
  lang: Language;
  compact?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, lang, compact = false }) => {
  const t = useT(lang);
  const lessons = listLessons(course.slug, lang);
  const { done } = useCourseProgress(course.slug);
  const doneCount = lessons.filter(lesson => done.has(lesson.slug)).length;

  return (
    <Link
      to={courseUrl(lang, course.slug)}
      className={`group flex flex-col h-full ${cardInteractive} ${focusRing} ${compact ? 'p-4' : 'p-5'}`}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className={iconTile}>
          <GraduationCap className="w-4 h-4" />
        </span>
        <LevelBadge level={course.level} lang={lang} />
      </div>

      <h3 className={`${cardTitle} group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors`}>
        {course.title}
      </h3>
      <p className="mt-1.5 text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">{course.summary}</p>

      <CourseMeta
        lang={lang}
        lessons={lessons.length}
        minutes={courseMinutes(course.slug, lang)}
        className="mt-4"
      />

      {doneCount > 0 && <ProgressBar lang={lang} done={doneCount} total={lessons.length} className="mt-4" />}

      <div className="mt-auto pt-4 flex items-center justify-between gap-2 text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">
        <span>{t('courses.open')}</span>
        <ArrowRight className="w-3.5 h-3.5 shrink-0 text-zinc-400 dark:text-zinc-600 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
};

export default CourseCard;
