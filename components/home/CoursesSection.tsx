import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Language } from '../../types';
import CourseCard from '../courses/CourseCard';
import SectionHeader from '../layout/SectionHeader';
import { listCourses } from '../../services/courseService';
import { useT } from '../../hooks/useT';
import { coursesUrl } from '../../utils/routes';
import { buttonSecondary, container, gridGap, sectionY } from '../../utils/ui';

const CoursesSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);
  const courses = listCourses(lang);
  if (courses.length === 0) return null;

  return (
    <section className={`${container} ${sectionY}`}>
      <SectionHeader
        lang={lang}
        eyebrow={t('courses.home.eyebrow')}
        title={t('courses.home.title')}
        body={t('courses.home.body')}
        action={
          <Link to={coursesUrl(lang)} className={buttonSecondary}>
            {t('courses.home.cta')}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        }
        className="mb-8"
      />

      <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${gridGap}`}>
        {courses.slice(0, 3).map(course => (
          <CourseCard key={course.slug} course={course} lang={lang} compact />
        ))}
      </div>
    </section>
  );
};

export default CoursesSection;
