import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, SquarePen } from 'lucide-react';
import type { CollectionId, Language, Topic } from '../../types';
import { useT } from '../../hooks/useT';
import { collectionKey } from '../../utils/i18n';
import { collectionUrl, homeUrl } from '../../utils/routes';
import { eyebrowFor, focusRing, radius, tagChip, titleSizeFor } from '../../utils/ui';

interface TopicHeaderProps {
  topic: Topic;
  collection: CollectionId;
  lang: Language;
  editUrl: string;
}

const TopicHeader: React.FC<TopicHeaderProps> = ({ topic, collection, lang, editUrl }) => {
  const t = useT(lang);
  return (
    <>
    <nav
      aria-label={t('topic.breadcrumb')}
      className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-6 font-medium min-w-0"
    >
      <Link
        to={homeUrl(lang)}
        aria-label={t('nav.home')}
        title={t('nav.home')}
        className={`shrink-0 p-1 -m-1 hover:text-zinc-900 dark:hover:text-zinc-200 ${radius.chip} ${focusRing}`}
      >
        <Home className="w-3.5 h-3.5" />
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
      <Link
        to={collectionUrl(lang, collection)}
        className={`hover:text-zinc-900 dark:hover:text-zinc-200 shrink-0 ${radius.chip} ${focusRing}`}
      >
        {t(collectionKey(collection, 'label'))}
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
      <span className="text-zinc-900 dark:text-zinc-100 font-semibold truncate">{topic.title}</span>
    </nav>

    <header className="mb-8 pb-7 border-b border-zinc-200 dark:border-zinc-800/80">
      <p className={`${eyebrowFor(lang, true)} mb-3`}>{t(collectionKey(collection, 'singular'))}</p>
      <h1 className={`font-bold text-zinc-900 dark:text-white ${titleSizeFor(lang, 'topic')}`}>{topic.title}</h1>
      {topic.question !== topic.title && (
        <p className="mt-3 text-lg font-medium text-zinc-700 dark:text-zinc-300">{topic.question}</p>
      )}
      {topic.summary && (
        <p className="mt-4 text-base sm:text-[17px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {topic.summary}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
        {topic.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {topic.tags.map(tag => (
              <span key={tag} className={`${tagChip} font-mono text-[10.5px]`}>
                {tag}
              </span>
            ))}
          </div>
        )}
        {topic.updated && (
          <span>
            {t('topic.updated')} <time dateTime={topic.updated}>{topic.updated}</time>
          </span>
        )}
        {topic.contributors.length > 0 && (
          <span>
            {t('topic.by')}{' '}
            {topic.contributors.map((name, i) => (
              <React.Fragment key={name}>
                {i > 0 && ', '}
                <a
                  href={`https://github.com/${name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  @{name}
                </a>
              </React.Fragment>
            ))}
          </span>
        )}
        <a
          href={editUrl}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${radius.chip} ${focusRing}`}
        >
          <SquarePen className="w-3.5 h-3.5" />
          {t('common.editThisPage')}
        </a>
      </div>
    </header>
    </>
  );
};

export default TopicHeader;
