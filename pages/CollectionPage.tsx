import React from 'react';
import { PlusCircle } from 'lucide-react';
import TopicCard from '../components/knowledge/TopicCard';
import { NAV_ICONS } from '../components/knowledge/icons';
import PageHeader from '../components/layout/PageHeader';
import type { CollectionId } from '../types';
import { listTopics, topicRef } from '../services/knowledgeService';
import { PRIMARY_NAV } from '../constants/navigation';
import { useLanguageParam } from '../hooks/useLanguage';
import { usePageMeta } from '../hooks/usePageMeta';
import { collectionUrl } from '../utils/routes';
import { useT } from '../hooks/useT';
import { collectionKey } from '../utils/i18n';
import { PROPOSE_TOPIC_URL } from '../utils/site';
import { cardTitle, container, focusRing, gridGap, pageY, radius, stepNumber } from '../utils/ui';

interface CollectionPageProps {
  collection: CollectionId;
}

const CollectionPage: React.FC<CollectionPageProps> = ({ collection }) => {
  const lang = useLanguageParam();
  const t = useT(lang);
  const label = t(collectionKey(collection, 'label'));
  const topics = listTopics(lang, collection);
  const position = PRIMARY_NAV.indexOf(collection) + 1;

  usePageMeta({
    title: label,
    description: t(collectionKey(collection, 'description')),
    path: collectionUrl(lang, collection)
  });

  return (
    <main className={`${container} ${pageY}`}>
      <PageHeader
        lang={lang}
        eyebrow={`${stepNumber(position)} · ${t(collectionKey(collection, 'role'))}`}
        title={label}
        icon={NAV_ICONS[collection]}
        lead={t(collectionKey(collection, 'description'))}
        className="mb-10"
      />

      <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${gridGap}`}>
        {topics.map(topic => (
          <TopicCard key={topicRef(topic)} topic={topic} lang={lang} />
        ))}

        <a
          href={PROPOSE_TOPIC_URL}
          target="_blank"
          rel="noreferrer"
          className={`group flex flex-col justify-center items-start gap-1.5 p-5 ${radius.card} border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-emerald-500/60 transition-colors ${focusRing}`}
        >
          <PlusCircle className="w-5 h-5 text-zinc-400 group-hover:text-emerald-500 transition-colors mb-1" />
          <span className={cardTitle}>{t('collection.missingTitle')}</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {t('collection.missingBody')}
          </span>
        </a>
      </div>
    </main>
  );
};

export default CollectionPage;
