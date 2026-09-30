import React from 'react';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import CourseCard from '../components/courses/CourseCard';
import LessonFormat from '../components/courses/LessonFormat';
import { listCourses } from '../services/courseService';
import { useLanguageParam } from '../hooks/useLanguage';
import { pageTitle, useDocumentTitle } from '../hooks/useDocumentTitle';
import { useT } from '../hooks/useT';
import { LESSON_TEMPLATE_URL } from '../utils/site';
import { buttonSecondary, container, gridGap, pageY, radius, sectionGap } from '../utils/ui';

const CoursesPage: React.FC = () => {
  const lang = useLanguageParam();
  const t = useT(lang);

  useDocumentTitle(pageTitle(t('nav.courses')));

  return (
    <main className={`${container} ${pageY}`}>
      <PageHeader
        lang={lang}
        eyebrow={t('courses.eyebrow')}
        title={t('courses.heading')}
        lead={t('courses.lead')}
        className="mb-10"
      />

      <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${gridGap}`}>
        {listCourses(lang).map(course => (
          <CourseCard key={course.slug} course={course} lang={lang} />
        ))}
      </div>

      <p
        className={`mt-10 flex items-start gap-3 p-5 ${radius.card} border border-emerald-500/20 bg-emerald-500/[0.04] text-[13px] text-zinc-700 dark:text-zinc-300 leading-relaxed`}
      >
        <GraduationCap className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
        {t('courses.principle')}
      </p>

      <LessonFormat lang={lang} />

      <section
        className={`${sectionGap} flex flex-col md:flex-row md:items-center justify-between gap-5 p-6 ${radius.card} border border-dashed border-zinc-300 dark:border-zinc-700`}
      >
        <div className="max-w-2xl">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{t('courses.teach.title')}</h2>
          <p className="mt-1.5 text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t('courses.teach.body')}
          </p>
        </div>
        <a href={LESSON_TEMPLATE_URL} target="_blank" rel="noreferrer" className={`shrink-0 ${buttonSecondary}`}>
          {t('courses.teach.cta')}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </section>
    </main>
  );
};

export default CoursesPage;
