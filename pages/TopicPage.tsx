import React, { useEffect, useMemo, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import KnowledgeSidebar from '../components/knowledge/KnowledgeSidebar';
import ReasoningRail from '../components/knowledge/ReasoningRail';
import RelatedTopics from '../components/knowledge/RelatedTopics';
import TopicContribution from '../components/knowledge/TopicContribution';
import TopicHeader from '../components/knowledge/TopicHeader';
import TopicPagination from '../components/knowledge/TopicPagination';
import { makeSectionHeading } from '../components/knowledge/SectionHeading';
import KnowledgeLink from '../components/knowledge/KnowledgeLink';
import MdxContainer from '../components/mdx/MdxProvider';
import TranslationNotice from '../components/layout/TranslationNotice';
import type { AiContext, CollectionId } from '../types';
import { resolveTopic, listTopics, getRelatedTopics, topicRef } from '../services/knowledgeService';
import { useLanguageParam } from '../hooks/useLanguage';
import { usePageMeta } from '../hooks/usePageMeta';
import { useMdxContent } from '../hooks/useMdxContent';
import { useOutline } from '../hooks/useOutline';
import { collectionUrl, topicUrl } from '../utils/routes';
import { repoEditUrl } from '../utils/site';
import { container } from '../utils/ui';

interface TopicPageProps {
  collection: CollectionId;
  isSidebarOpen: boolean;
  onCloseSidebar: () => void;
  onOpenAi: () => void;
  onContextChange: (context: AiContext) => void;
}

const TopicPage: React.FC<TopicPageProps> = ({
  collection,
  isSidebarOpen,
  onCloseSidebar,
  onOpenAi,
  onContextChange
}) => {
  const params = useParams<{ slug?: string }>();
  const lang = useLanguageParam();
  const resolved = params.slug ? resolveTopic(collection, params.slug, lang) : undefined;
  const topic = resolved?.topic;

  const contentRef = useRef<HTMLDivElement>(null);
  const components = useMemo(() => ({ h2: makeSectionHeading(lang), a: KnowledgeLink }), [lang]);
  const Content = useMdxContent(topic?.load);

  // Keyed on the loaded component: headings exist only once the page's chunk has rendered.
  const { entries, activeId } = useOutline(contentRef, Content);

  usePageMeta(
    topic && {
      title: topic.title,
      description: topic.summary || topic.question,
      path: topicUrl(topic.lang, topic)
    }
  );

  useEffect(() => {
    if (topic) onContextChange({ kind: 'topic', title: topic.title, collection });
  }, [topic, collection, onContextChange]);

  if (!topic || !resolved) {
    return <Navigate to={collectionUrl(lang, collection)} replace />;
  }

  const siblings = listTopics(lang, collection);
  const index = siblings.findIndex(s => s.slug === topic.slug);
  const prev = index > 0 ? siblings[index - 1] : undefined;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined;
  const editUrl = repoEditUrl(topic.sourcePath);

  return (
    <div className={`${container} flex`}>
      <KnowledgeSidebar isOpen={isSidebarOpen} onClose={onCloseSidebar} lang={lang} activeRef={topicRef(topic)} />

      <main className="flex-1 min-w-0 lg:px-8">
        <article className="max-w-3xl mx-auto py-8 lg:py-10">
          <TopicHeader topic={topic} collection={collection} lang={lang} editUrl={editUrl} />

          <TranslationNotice
            page={topic}
            isFallback={resolved.isFallback}
            lang={lang}
            englishUrl={topicUrl('en', topic)}
          />

          <div ref={contentRef}>
            {Content && (
              <MdxContainer customComponents={components}>
                <Content />
              </MdxContainer>
            )}
          </div>

          <RelatedTopics related={getRelatedTopics(topic, lang)} lang={lang} />

          <TopicContribution lang={lang} editUrl={editUrl} />

          <TopicPagination prev={prev} next={next} lang={lang} />

          <div className="h-16" />
        </article>
      </main>

      <ReasoningRail entries={entries} activeId={activeId} lang={lang} editUrl={editUrl} onAskAi={onOpenAi} />
    </div>
  );
};

export default TopicPage;
