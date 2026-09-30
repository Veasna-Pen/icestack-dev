import React, { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import CourseAside from '../components/courses/CourseAside';
import CourseHeader from '../components/courses/CourseHeader';
import CourseLessonList from '../components/courses/CourseLessonList';
import KnowledgeLink from '../components/knowledge/KnowledgeLink';
import TranslationNotice from '../components/layout/TranslationNotice';
import MdxContainer from '../components/mdx/MdxProvider';
import { listLessons, resolveCourse } from '../services/courseService';
import { useCourseProgress } from '../hooks/useCourseProgress';
import { pageTitle, useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLanguageParam } from '../hooks/useLanguage';
import { useMdxContent } from '../hooks/useMdxContent';
import { courseUrl, coursesUrl } from '../utils/routes';
import { container, pageY } from '../utils/ui';

const CoursePage: React.FC = () => {
  const { course: slug = '' } = useParams<{ course: string }>();
  const lang = useLanguageParam();
  const resolved = resolveCourse(slug, lang);
  const course = resolved?.page;
  const lessons = listLessons(slug, lang);
  const { done } = useCourseProgress(slug);
  const Content = useMdxContent(course?.load);
  const components = useMemo(() => ({ a: KnowledgeLink }), []);

  useDocumentTitle(course && pageTitle(course.title));

  if (!course || !resolved) return <Navigate to={coursesUrl(lang)} replace />;

  return (
    <main className={`${container} ${pageY}`}>
      <CourseHeader course={course} lessons={lessons} done={done} lang={lang} />

      <div className="mt-12 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-12 items-start">
        <div className="min-w-0">
          <TranslationNotice
            page={course}
            isFallback={resolved.isFallback}
            lang={lang}
            englishUrl={courseUrl('en', course.slug)}
          />
          {Content && (
            <div className="mb-10">
              <MdxContainer customComponents={components}>
                <Content />
              </MdxContainer>
            </div>
          )}
          <CourseLessonList lessons={lessons} done={done} lang={lang} />
        </div>

        <CourseAside course={course} lang={lang} />
      </div>
    </main>
  );
};

export default CoursePage;
