import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CircleCheck, Footprints } from 'lucide-react';
import type { Course, Language, Topic } from '../../types';
import { resolveRef, topicRef } from '../../services/knowledgeService';
import { useT } from '../../hooks/useT';
import { collectionKey } from '../../utils/i18n';
import { topicUrl } from '../../utils/routes';
import { border, cardStatic, eyebrowFor, focusRing } from '../../utils/ui';

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className={`${cardStatic} p-5`}>
    <h2 className="text-[14px] font-bold text-zinc-900 dark:text-white mb-3">{title}</h2>
    {children}
  </div>
);

const listItem = 'flex items-start gap-2.5 text-[13px] text-zinc-700 dark:text-zinc-300 leading-snug';

const CourseAside: React.FC<{ course: Course; lang: Language }> = ({ course, lang }) => {
  const t = useT(lang);
  const related = course.related.map(ref => resolveRef(ref, lang)).filter((topic): topic is Topic => !!topic);

  return (
    <aside className="space-y-4">
      {course.outcomes.length > 0 && (
        <Card title={t('courses.outcomes')}>
          <ul className="space-y-2.5">
            {course.outcomes.map(outcome => (
              <li key={outcome} className={listItem}>
                <CircleCheck className="w-4 h-4 mt-px shrink-0 text-emerald-500" />
                {outcome}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card title={t('courses.prerequisites')}>
        {course.prerequisites.length > 0 ? (
          <ul className="space-y-2.5">
            {course.prerequisites.map(item => (
              <li key={item} className={listItem}>
                <Footprints className="w-4 h-4 mt-px shrink-0 text-zinc-400" />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[13px] text-zinc-600 dark:text-zinc-400">{t('courses.noPrerequisites')}</p>
        )}
      </Card>

      {related.length > 0 && (
        <Card title={t('courses.related')}>
          <ul className={`-mx-5 -mb-5 border-t ${border.hairline}`}>
            {related.map(topic => (
              <li key={topicRef(topic)}>
                <Link
                  to={topicUrl(lang, topic)}
                  className={`group flex items-start justify-between gap-3 px-5 py-3 hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors rounded-b-2xl ${focusRing}`}
                >
                  <span className="min-w-0">
                    <span className={`block mb-0.5 ${eyebrowFor(lang)}`}>
                      {t(collectionKey(topic.collection, 'singular'))}
                    </span>
                    <span className="block text-[13px] font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 leading-snug">
                      {topic.title}
                    </span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 mt-1 shrink-0 text-zinc-400 dark:text-zinc-600 group-hover:text-emerald-500" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </aside>
  );
};

export default CourseAside;
