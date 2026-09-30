import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Language, Topic } from '../../types';
import { useT } from '../../hooks/useT';
import { collectionKey } from '../../utils/i18n';
import { topicUrl } from '../../utils/routes';
import { cardInteractive, eyebrowFor, focusRing, tagChip } from '../../utils/ui';
import { NAV_ICONS } from './icons';

interface TopicCardProps {
  topic: Topic;
  lang: Language;
  compact?: boolean;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, lang, compact = false }) => {
  const t = useT(lang);
  const Icon = NAV_ICONS[topic.collection];
  const untranslated = topic.lang !== lang;

  return (
    <Link
      to={topicUrl(lang, topic)}
      className={`group flex flex-col h-full text-left ${cardInteractive} ${focusRing} ${compact ? 'p-4' : 'p-5'}`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className={`inline-flex items-center gap-1.5 ${eyebrowFor(lang)}`}>
          <Icon className="w-3.5 h-3.5 shrink-0" />
          {t(collectionKey(topic.collection, 'singular'))}
        </span>
        {untranslated && (
          <span
            title={t('topic.notTranslated')}
            className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-200/70 dark:border-zinc-700/60"
          >
            {topic.lang.toUpperCase()}
          </span>
        )}
      </div>

      <h3
        className={`font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug ${
          compact ? 'text-[14px]' : 'text-[15px]'
        }`}
      >
        {topic.title}
      </h3>

      {topic.question !== topic.title && (
        <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400 leading-snug">{topic.question}</p>
      )}

      {!compact && topic.summary && (
        <p className="mt-2.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">{topic.summary}</p>
      )}

      <div className="mt-auto pt-4 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1 overflow-hidden">
          {topic.tags.slice(0, compact ? 2 : 3).map(tag => (
            <span
              key={tag}
              className={`${tagChip} text-[10px] font-mono text-zinc-500`}
            >
              {tag}
            </span>
          ))}
        </div>
        <ArrowRight className="w-3.5 h-3.5 shrink-0 text-zinc-300 dark:text-zinc-700 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
};

export default TopicCard;
