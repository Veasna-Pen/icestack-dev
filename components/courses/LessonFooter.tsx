import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Flag } from 'lucide-react';
import type { Course, Language, Lesson } from '../../types';
import { useT } from '../../hooks/useT';
import { courseUrl, lessonUrl } from '../../utils/routes';
import { buttonPrimary, buttonSecondary, cardAccent, cardInteractive, focusRing } from '../../utils/ui';

interface LessonFooterProps {
  course: Course;
  lesson: Lesson;
  prev?: Lesson;
  next?: Lesson;
  isDone: boolean;
  onToggleDone: () => void;
  lang: Language;
}

const NavCard: React.FC<{ to: string; label: string; title: string; direction: 'prev' | 'next' }> = ({
  to,
  label,
  title,
  direction
}) => (
  <Link
    to={to}
    className={`group flex flex-col p-4 ${cardInteractive} ${focusRing} ${direction === 'next' ? 'items-end text-right' : ''}`}
  >
    <span className="flex items-center gap-1.5 text-xs text-zinc-400 group-hover:text-emerald-500 font-medium mb-1">
      {direction === 'prev' && <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />}
      {label}
      {direction === 'next' && <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />}
    </span>
    <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 line-clamp-1">{title}</span>
  </Link>
);

const LessonFooter: React.FC<LessonFooterProps> = ({ course, lesson, prev, next, isDone, onToggleDone, lang }) => {
  const t = useT(lang);

  return (
    <div className="mt-14 pt-10 border-t border-zinc-200 dark:border-zinc-800">
      <div className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${cardAccent}`}>
        <div className="min-w-0">
          <p className="text-[15px] font-bold text-zinc-900 dark:text-white">
            {next ? t('courses.doneQuestion') : t('courses.finishedTitle')}
          </p>
          {!next && (
            <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t('courses.finishedBody')}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onToggleDone}
          aria-pressed={isDone}
          className={`shrink-0 ${isDone ? buttonSecondary : buttonPrimary}`}
          title={isDone ? t('courses.markIncomplete') : undefined}
        >
          <Check className="w-4 h-4" />
          {isDone ? t('courses.completed') : t('courses.markComplete')}
        </button>
      </div>

      <nav aria-label={t('courses.contents')} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <NavCard to={lessonUrl(lang, prev)} label={t('courses.previous')} title={prev.title} direction="prev" />
        ) : (
          <div className="hidden sm:block" />
        )}
        {next ? (
          <NavCard to={lessonUrl(lang, next)} label={t('courses.next')} title={next.title} direction="next" />
        ) : (
          <Link
            to={courseUrl(lang, course.slug)}
            onClick={() => !isDone && onToggleDone()}
            className={`group flex flex-col items-end p-4 text-right ${cardInteractive} ${focusRing}`}
          >
            <span className="flex items-center gap-1.5 text-xs text-zinc-400 group-hover:text-emerald-500 font-medium mb-1">
              {t('courses.finish')}
              <Flag className="w-3.5 h-3.5" />
            </span>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 line-clamp-1">{course.title}</span>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default LessonFooter;
