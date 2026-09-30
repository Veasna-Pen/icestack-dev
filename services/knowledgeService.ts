import { KNOWLEDGE_INDEX } from 'virtual:knowledge-index';
import type { CollectionId, Language, ResolvedTopic, Topic, TopicIdentity, TopicLoader } from '../types';
import { COLLECTION_IDS, KNOWLEDGE_PATH_PATTERN, isCollectionId } from '../constants/collections';
import { asDate, asNumber, asString, asStrings, asTranslation } from '../utils/frontmatter';

// Keep this lazy glob the only import of `.mdx` files: an eager one merges every page into the entry chunk.
const loaders = import.meta.glob('/knowledge/**/*.mdx') as Record<string, TopicLoader>;

const topicsByRef = new Map<string, Partial<Record<Language, Topic>>>();

for (const { sourcePath, frontmatter: fm } of KNOWLEDGE_INDEX) {
  const match = sourcePath.match(KNOWLEDGE_PATH_PATTERN);
  const load = loaders['/' + sourcePath];
  if (!match || !isCollectionId(match[1]) || !load) {
    if (import.meta.env.DEV) {
      console.warn(
        `[knowledge] Skipped ${sourcePath}. Pages must live at knowledge/<collection>/<slug>/<en|km>.mdx, ` +
          `with <collection> one of: ${COLLECTION_IDS.join(', ')}.`
      );
    }
    continue;
  }

  const [, collection, slug, lang] = match as unknown as [string, CollectionId, string, Language];
  const title = asString(fm.title, slug);
  const ref = `${collection}/${slug}`;

  const topic: Topic = {
    collection,
    slug,
    lang,
    title,
    question: asString(fm.question, title),
    summary: asString(fm.summary),
    tags: asStrings(fm.tags),
    related: asStrings(fm.related),
    order: asNumber(fm.order, 99),
    updated: asDate(fm.updated),
    contributors: asStrings(fm.contributors),
    translation: asTranslation(fm.translation),
    load,
    sourcePath
  };

  topicsByRef.set(ref, { ...topicsByRef.get(ref), [lang]: topic });
}

const inLanguage = (entry: Partial<Record<Language, Topic>>, lang: Language): Topic | undefined =>
  entry[lang] || entry.en || entry.km;

export const topicRef = (topic: TopicIdentity): string => `${topic.collection}/${topic.slug}`;

export const resolveTopic = (collection: CollectionId, slug: string, lang: Language): ResolvedTopic | undefined => {
  const entry = topicsByRef.get(`${collection}/${slug}`);
  const topic = entry && inLanguage(entry, lang);
  return topic ? { topic, requested: lang, isFallback: topic.lang !== lang } : undefined;
};

export const resolveRef = (ref: string, lang: Language): Topic | undefined => {
  const [collection, slug] = ref.split('/');
  return isCollectionId(collection) && slug ? resolveTopic(collection, slug, lang)?.topic : undefined;
};

export const hasTranslation = (topic: TopicIdentity, lang: Language): boolean =>
  !!topicsByRef.get(topicRef(topic))?.[lang];

const COLLECTION_RANK = Object.fromEntries(COLLECTION_IDS.map((id, i) => [id, i]));

const byReadingOrder = (a: Topic, b: Topic) =>
  COLLECTION_RANK[a.collection] - COLLECTION_RANK[b.collection] || a.order - b.order || a.title.localeCompare(b.title);

export const listTopics = (lang: Language, collection?: CollectionId): Topic[] => {
  const topics: Topic[] = [];
  topicsByRef.forEach(entry => {
    const topic = inLanguage(entry, lang);
    if (topic && (!collection || topic.collection === collection)) topics.push(topic);
  });
  return topics.sort(byReadingOrder);
};

export const countTopics = (collection: CollectionId): number =>
  Array.from(topicsByRef.keys()).filter(ref => ref.startsWith(`${collection}/`)).length;

export const getRelatedTopics = (topic: Topic, lang: Language): Topic[] => {
  const self = topicRef(topic);
  const refs = new Set(topic.related);
  topicsByRef.forEach((entry, ref) => {
    const linksHere = Object.values(entry).some(other => other?.related.includes(self));
    if (linksHere) refs.add(ref);
  });
  refs.delete(self);
  return Array.from(refs)
    .map(ref => resolveRef(ref, lang))
    .filter((t): t is Topic => !!t);
};
