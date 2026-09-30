import React from 'react';
import TopicCard from './TopicCard';
import type { Language, Topic } from '../../types';
import { topicRef } from '../../services/knowledgeService';
import { useT } from '../../hooks/useT';

const RelatedTopics: React.FC<{ related: Topic[]; lang: Language }> = ({ related, lang }) => {
  const t = useT(lang);
  if (related.length === 0) return null;
  return (
      <section className="mt-16">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">{t('topic.related')}</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {related.slice(0, 4).map(r => (
            <TopicCard key={topicRef(r)} topic={r} lang={lang} compact />
          ))}
        </div>
      </section>
  );
};

export default RelatedTopics;
