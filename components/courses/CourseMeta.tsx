import React from 'react';
import { BookOpen, Clock } from 'lucide-react';
import type { CourseLevel, Language } from '../../types';
import { COURSE_LEVELS } from '../../constants/courses';
import { useT } from '../../hooks/useT';
import { formatMinutes, levelKey } from '../../utils/course';

export const LevelBadge: React.FC<{ level: CourseLevel; lang: Language }> = ({ level, lang }) => {
  const t = useT(lang);
  const filled = COURSE_LEVELS.indexOf(level) + 1;
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-600 dark:text-zinc-300">
      <span aria-hidden="true" className="flex items-end gap-[2px]">
        {COURSE_LEVELS.map((_, i) => (
          <span
            key={i}
            className={`w-[3px] rounded-full ${i < filled ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
            style={{ height: 5 + i * 3 }}
          />
        ))}
      </span>
      {t(levelKey(level))}
    </span>
  );
};

interface CourseMetaProps {
  lang: Language;
  lessons: number;
  minutes: number;
  className?: string;
}

export const CourseMeta: React.FC<CourseMetaProps> = ({ lang, lessons, minutes, className = '' }) => {
  const t = useT(lang);
  return (
    <span className={`inline-flex items-center gap-3 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 ${className}`}>
      <span className="inline-flex items-center gap-1">
        <BookOpen className="w-3.5 h-3.5" />
        {t('courses.lessonCount', { count: lessons })}
      </span>
      {minutes > 0 && (
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {formatMinutes(t, minutes)}
        </span>
      )}
    </span>
  );
};

interface ProgressBarProps {
  lang: Language;
  done: number;
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ lang, done, total, className = '' }) => {
  const t = useT(lang);
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className={className}>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-label={t('courses.progress', { done, total })}
        className="h-1.5 w-full rounded-full bg-zinc-200/80 dark:bg-zinc-800 overflow-hidden"
      >
        <div className="h-full rounded-full bg-emerald-500 transition-all duration-300" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-1.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 tabular-nums">
        {t('courses.progress', { done, total })}
      </p>
    </div>
  );
};
