import React, { useEffect, useMemo } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { makeAnswer } from '../components/courses/Answer';
import CourseSidebar from '../components/courses/CourseSidebar';
import LessonFooter from '../components/courses/LessonFooter';
import LessonHeader from '../components/courses/LessonHeader';
import { makeLessonHeading } from '../components/courses/LessonHeading';
import KnowledgeLink from '../components/knowledge/KnowledgeLink';
import RelatedTopics from '../components/knowledge/RelatedTopics';
import TranslationNotice from '../components/layout/TranslationNotice';
import MdxContainer from '../components/mdx/MdxProvider';
import type { AiContext, Topic } from '../types';
import { listLessons, resolveCourse, resolveLesson } from '../services/courseService';
import { resolveRef } from '../services/knowledgeService';
import { useCourseProgress } from '../hooks/useCourseProgress';
import { pageTitle } from '../utils/seo';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguageParam } from '../hooks/useLanguage';
import { useMdxContent } from '../hooks/useMdxContent';
import { scrollToHashSoon } from '../utils/dom';
import { courseUrl, coursesUrl, lessonUrl } from '../utils/routes';
import { container } from '../utils/ui';

interface LessonPageProps {
  isSidebarOpen: boolean;
  onCloseSidebar: () => void;
  onContextChange: (context: AiContext) => void;
}

const LessonPage: React.FC<LessonPageProps> = ({ isSidebarOpen, onCloseSidebar, onContextChange }) => {
  const { course: courseSlug = '', lesson: lessonSlug = '' } = useParams<{ course: string; lesson: string }>();
  const { hash } = useLocation();
  const lang = useLanguageParam();
  const course = resolveCourse(courseSlug, lang)?.page;
  const resolved = resolveLesson(courseSlug, lessonSlug, lang);
  const lesson = resolved?.page;

  const { done, toggle } = useCourseProgress(courseSlug);
  const components = useMemo(
    () => ({ h2: makeLessonHeading(lang), a: KnowledgeLink, Answer: makeAnswer(lang) }),
    [lang]
  );
  const Content = useMdxContent(lesson?.load);

  usePageMeta(
    lesson &&
      course && {
        title: pageTitle(`${lesson.title} · ${course.title}`),
        description: lesson.summary,
        path: lessonUrl(lesson.lang, lesson)
      }
  );

  useEffect(() => {
    if (lesson && course) onContextChange({ kind: 'lesson', title: lesson.title, collection: course.title });
  }, [lesson, course, onContextChange]);

  useEffect(() => (Content ? scrollToHashSoon(hash) : undefined), [Content, hash]);

  if (!course) return <Navigate to={coursesUrl(lang)} replace />;
  if (!lesson || !resolved) return <Navigate to={courseUrl(lang, courseSlug)} replace />;

  const lessons = listLessons(courseSlug, lang);
  const index = lessons.findIndex(other => other.slug === lesson.slug);
  const prev = index > 0 ? lessons[index - 1] : undefined;
  const next = index >= 0 ? lessons[index + 1] : undefined;
  const related = lesson.related.map(ref => resolveRef(ref, lang)).filter((topic): topic is Topic => !!topic);

  return (
    <div className={`${container} flex`}>
      <CourseSidebar
        course={course}
        lessons={lessons}
        activeSlug={lesson.slug}
        done={done}
        lang={lang}
        isOpen={isSidebarOpen}
        onClose={onCloseSidebar}
      />

      <main className="flex-1 min-w-0 lg:px-8">
        <article className="max-w-3xl mx-auto py-8 lg:py-10">
          <LessonHeader course={course} lesson={lesson} total={lessons.length} lang={lang} />

          <TranslationNotice
            page={lesson}
            isFallback={resolved.isFallback}
            lang={lang}
            englishUrl={lessonUrl('en', lesson)}
          />

          {Content && (
            <MdxContainer customComponents={components}>
              <Content />
            </MdxContainer>
          )}

          <RelatedTopics related={related} lang={lang} />

          <LessonFooter
            course={course}
            lesson={lesson}
            prev={prev}
            next={next}
            isDone={done.has(lesson.slug)}
            onToggleDone={() => toggle(lesson.slug)}
            lang={lang}
          />

          <div className="h-16" />
        </article>
      </main>
    </div>
  );
};

export default LessonPage;
