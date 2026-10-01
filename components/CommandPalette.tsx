import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { TFunction } from 'i18next';
import { Search, X, CornerDownLeft, BookOpen, GraduationCap, Signpost, Users } from 'lucide-react';
import type { IconComponent, Language } from '../types';
import { listTopics, topicRef } from '../services/knowledgeService';
import { lessonRef, listCourses, listLessons } from '../services/courseService';
import { useT } from '../hooks/useT';
import { collectionKey, roadmapKey } from '../utils/i18n';
import {
  howToThinkUrl,
  contributeUrl,
  courseUrl,
  coursesUrl,
  lessonUrl,
  roadmapsUrl,
  roadmapUrl,
  topicUrl
} from '../utils/routes';
import { ROADMAPS } from '../constants/roadmaps';
import { NAV_ICONS } from './knowledge/icons';
import { ROADMAP_ICONS } from './roadmaps/icons';
import Highlighter from './Highlighter';
import { eyebrowFor, kbd, surface } from '../utils/ui';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (url: string) => void;
  language: Language;
}

type ItemKind = 'topic' | 'page';

interface SearchItem {
  key: string;
  kind: ItemKind;
  url: string;
  title: string;
  description: string;
  badge: string;
  icon: IconComponent;
  haystack: string;
}

const buildIndex = (language: Language, t: TFunction): SearchItem[] => {
  const items: SearchItem[] = [];
  const seen = new Set<string>();
  const add = (item: SearchItem) => {
    if (seen.has(item.key)) return;
    seen.add(item.key);
    items.push(item);
  };

  listTopics(language).forEach(topic => {
    add({
      key: `topic:${topicRef(topic)}`,
      kind: 'topic',
      url: topicUrl(language, topic),
      title: topic.title,
      description: topic.question !== topic.title ? topic.question : topic.summary,
      badge: t(collectionKey(topic.collection, 'singular')),
      icon: NAV_ICONS[topic.collection],
      haystack: [topic.title, topic.question, topic.summary, topic.slug, ...topic.tags].join(' ').toLowerCase()
    });
  });

  [
    {
      url: howToThinkUrl(language),
      icon: NAV_ICONS['how-to-think'],
      title: t('nav.howToThink'),
      description: t('search.howToThinkDescription'),
      keywords: 'method workflow template thinking decision'
    },
    {
      url: contributeUrl(language),
      icon: Users,
      title: t('nav.contribute'),
      description: t('search.contributeDescription'),
      keywords: 'contribute github open source template translate khmer pull request'
    }
  ].forEach(page =>
    add({
      key: `page:${page.url}`,
      kind: 'page',
      url: page.url,
      title: page.title,
      description: page.description,
      badge: t('search.pageBadge'),
      icon: page.icon,
      haystack: `${page.title} ${page.description} ${page.keywords}`.toLowerCase()
    })
  );

  add({
    key: `page:${roadmapsUrl(language)}`,
    kind: 'page',
    url: roadmapsUrl(language),
    title: t('nav.roadmaps'),
    description: t('search.roadmapsDescription'),
    badge: t('search.pageBadge'),
    icon: Signpost,
    haystack:
      `${t('nav.roadmaps')} ${t('search.roadmapsDescription')} roadmap career beginner start learn`.toLowerCase()
  });

  ROADMAPS.forEach(({ id }) => {
    const title = t(roadmapKey(id, 'label'));
    const description = t(roadmapKey(id, 'summary'));
    add({
      key: `roadmap:${id}`,
      kind: 'page',
      url: roadmapUrl(language, id),
      title,
      description,
      badge: t('search.roadmapBadge'),
      icon: ROADMAP_ICONS[id],
      haystack: `${title} ${description} ${id} roadmap career beginner`.toLowerCase()
    });
  });

  add({
    key: `page:${coursesUrl(language)}`,
    kind: 'page',
    url: coursesUrl(language),
    title: t('nav.courses'),
    description: t('search.coursesDescription'),
    badge: t('search.pageBadge'),
    icon: GraduationCap,
    haystack: `${t('nav.courses')} ${t('search.coursesDescription')} course lesson learn beginner`.toLowerCase()
  });

  listCourses(language).forEach(course => {
    add({
      key: `course:${course.slug}`,
      kind: 'page',
      url: courseUrl(language, course.slug),
      title: course.title,
      description: course.summary,
      badge: t('search.courseBadge'),
      icon: GraduationCap,
      haystack: `${course.title} ${course.summary} ${course.slug} course`.toLowerCase()
    });

    listLessons(course.slug, language).forEach(lesson => {
      add({
        key: `lesson:${lessonRef(lesson)}`,
        kind: 'page',
        url: lessonUrl(language, lesson),
        title: lesson.title,
        description: `${course.title} · ${lesson.summary}`,
        badge: t('search.lessonBadge'),
        icon: BookOpen,
        haystack: `${lesson.title} ${lesson.summary} ${course.title} ${lesson.slug} lesson`.toLowerCase()
      });
    });
  });

  return items;
};

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate, language }) => {
  const t = useT(language);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const allItems = useMemo(() => buildIndex(language, t), [language, t]);

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return allItems.filter(item => item.kind === 'topic' || item.kind === 'page');
    const words = q.split(/\s+/);
    return allItems.filter(item => words.every(word => item.haystack.includes(word))).slice(0, 40);
  }, [allItems, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const activeEl = listRef.current?.querySelector('[data-active="true"]') as HTMLElement | null;
    activeEl?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          onNavigate(selected.url);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onNavigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-150"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('common.search')}
        className={`relative w-full max-w-2xl ${surface.card} rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-10 animate-in zoom-in-95 duration-150`}
      >
        <div className="flex items-center gap-3 px-4 border-b border-zinc-200 dark:border-zinc-800/80">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full py-4 text-sm bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={t('search.clear')}
              className="p-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className={`hidden sm:inline-flex ${kbd}`}>ESC</kbd>
        </div>

        <div ref={listRef} className="max-h-[420px] overflow-y-auto p-2 space-y-0.5">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-zinc-500">
              <Search className="w-8 h-8 text-zinc-400 mx-auto mb-2 opacity-50" />
              <p className="font-medium">{t('search.noResults', { query })}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">{t('search.tryHint')}</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const startsGroup = idx === 0 || filteredItems[idx - 1].kind !== item.kind;
              const Icon = item.icon;
              return (
                <React.Fragment key={item.key}>
                  {startsGroup && (
                    <div className={`px-3 pt-3 pb-1.5 ${eyebrowFor(language)}`}>
                      {item.kind === 'topic' ? t('search.groupTopics') : t('search.groupPages')}
                    </div>
                  )}
                  <div
                    data-active={isSelected}
                    onClick={() => {
                      onNavigate(item.url);
                      onClose();
                    }}
                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-zinc-900 dark:text-zinc-100'
                        : 'hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                          <Highlighter text={item.title} query={query} />
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60">
                          {item.badge}
                        </span>
                      </div>

                      {item.description && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                          <Highlighter text={item.description} query={query} />
                        </p>
                      )}
                    </div>

                    {isSelected && (
                      <CornerDownLeft className="w-4 h-4 text-emerald-500 shrink-0 self-center hidden sm:block" />
                    )}
                  </div>
                </React.Fragment>
              );
            })
          )}
        </div>

        <div
          className={`flex items-center justify-between px-4 py-2.5 ${surface.bar} border-t border-zinc-200 dark:border-zinc-800/80 text-[11px] text-zinc-500 dark:text-zinc-400`}
        >
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className={kbd}>↑</kbd>
              <kbd className={kbd}>↓</kbd>
              <span>{t('search.toNavigate')}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className={kbd}>↵</kbd>
              <span>{t('search.toOpen')}</span>
            </span>
          </div>

          <span className="font-mono text-zinc-500">{t('search.results', { count: filteredItems.length })}</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
