import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Language, Topic } from '../../types';
import { useT } from '../../hooks/useT';
import { topicUrl } from '../../utils/routes';
import { cardInteractive, focusRing } from '../../utils/ui';

interface TopicPaginationProps {
  prev?: Topic;
  next?: Topic;
  lang: Language;
}

const TopicPagination: React.FC<TopicPaginationProps> = ({ prev, next, lang }) => {
  const t = useT(lang);
  if (!prev && !next) return null;
  return (
      <nav
        aria-label={t('topic.moreInCollection')}
        className="pt-10 mt-10 border-t border-zinc-200 dark:border-zinc-800"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <Link to={topicUrl(lang, prev)} className={`group flex flex-col p-4 ${cardInteractive} ${focusRing}`}>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-emerald-500 font-medium mb-1">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                {t('topic.previous')}
              </span>
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 line-clamp-1">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link
              to={topicUrl(lang, next)}
              className={`group flex flex-col items-end p-4 text-right ${cardInteractive} ${focusRing}`}
            >
              <span className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-emerald-500 font-medium mb-1">
                {t('topic.next')}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 line-clamp-1">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </nav>
  );
};

export default TopicPagination;
