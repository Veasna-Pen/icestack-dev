import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, X } from 'lucide-react';
import IceStackLogo from '../IceStackLogo';
import type { Course, Language, Lesson } from '../../types';
import { useT } from '../../hooks/useT';
import { courseUrl, lessonUrl } from '../../utils/routes';
import { eyebrowFor, focusRing, radius, stepNumber, surface } from '../../utils/ui';
import { ProgressBar } from './CourseMeta';

interface CourseSidebarProps {
  course: Course;
  lessons: Lesson[];
  activeSlug: string;
  done: ReadonlySet<string>;
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({ course, lessons, activeSlug, done, lang, isOpen, onClose }) => {
  const t = useT(lang);
  const doneCount = lessons.filter(lesson => done.has(lesson.slug)).length;

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={`
          fixed lg:sticky top-0 lg:top-14 inset-y-0 lg:inset-y-auto left-0 lg:left-auto z-50 lg:z-20
          w-72 lg:w-64 h-screen lg:h-[calc(100vh-3.5rem)]
          ${surface.page} lg:bg-transparent
          border-r border-zinc-200 dark:border-zinc-800/80
          flex flex-col shrink-0
          transition-transform duration-300 ease-in-out lg:transition-none lg:transform-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 lg:hidden flex items-center justify-between">
          <IceStackLogo size={30} />
          <button
            type="button"
            onClick={onClose}
            aria-label={t('nav.closeNavigation')}
            className={`p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 ${radius.chip} hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer ${focusRing}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav aria-label={t('courses.contents')} className="scrollbar-slim flex-1 overflow-y-auto py-6 pr-4 pl-4 lg:pl-0">
          <Link
            to={courseUrl(lang, course.slug)}
            onClick={onClose}
            className={`inline-flex items-center gap-1.5 text-[12px] font-medium text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors ${radius.chip} ${focusRing}`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t('courses.backToCourse')}
          </Link>

          <p className={`mt-5 ${eyebrowFor(lang, true)}`}>{t('courses.contents')}</p>
          <p className="mt-1.5 text-[15px] font-bold text-zinc-900 dark:text-white leading-snug">{course.title}</p>
          <ProgressBar lang={lang} done={doneCount} total={lessons.length} className="mt-3" />

          <ol className="mt-6 space-y-1">
            {lessons.map(lesson => {
              const isActive = lesson.slug === activeSlug;
              const isDone = done.has(lesson.slug);
              return (
                <li key={lesson.slug}>
                  <Link
                    to={lessonUrl(lang, lesson)}
                    onClick={onClose}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-start gap-3 px-2.5 py-2 ${radius.control} text-[13px] leading-snug transition-colors ${focusRing} ${
                      isActive
                        ? 'bg-emerald-500/[0.08] text-zinc-900 dark:text-white font-semibold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/40'
                    }`}
                  >
                    <span
                      className={`mt-px w-5 h-5 shrink-0 rounded-full border flex items-center justify-center text-[9px] font-mono font-semibold tabular-nums ${
                        isDone
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : isActive
                            ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                            : 'border-zinc-300 dark:border-zinc-700 text-zinc-400'
                      }`}
                    >
                      {isDone ? <Check className="w-3 h-3" aria-label={t('courses.completed')} /> : stepNumber(lesson.number)}
                    </span>
                    <span className="min-w-0">{lesson.title}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
      </aside>
    </>
  );
};

export default CourseSidebar;
