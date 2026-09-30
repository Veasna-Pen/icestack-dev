import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, PlusCircle } from 'lucide-react';
import IceStackLogo from '../IceStackLogo';
import type { Language } from '../../types';
import { listTopics, topicRef } from '../../services/knowledgeService';
import { COLLECTION_IDS } from '../../constants/collections';
import { useT } from '../../hooks/useT';
import { collectionKey } from '../../utils/i18n';
import { howToThinkUrl, topicUrl, collectionUrl } from '../../utils/routes';
import { PROPOSE_TOPIC_URL } from '../../utils/site';
import { focusRing, radius, surface } from '../../utils/ui';
import { NAV_ICONS } from './icons';

interface KnowledgeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  activeRef?: string;
}

const KnowledgeSidebar: React.FC<KnowledgeSidebarProps> = ({ isOpen, onClose, lang, activeRef }) => {
  const t = useT(lang);
  const MethodIcon = NAV_ICONS['how-to-think'];
  const navRef = useRef<HTMLElement>(null);

  // The sidebar remounts at scrollTop 0 on every topic, so centre the current one. Setting scrollTop
  // directly avoids scrollIntoView, which would also scroll the window.
  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !active) return;

    const navBox = nav.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    if (activeBox.top >= navBox.top && activeBox.bottom <= navBox.bottom) return;

    nav.scrollTop += activeBox.top - navBox.top - (nav.clientHeight - activeBox.height) / 2;
  }, [activeRef, isOpen]);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={`
          fixed lg:sticky top-0 lg:top-14 inset-y-0 lg:inset-y-auto left-0 lg:left-auto z-50 lg:z-20
          w-72 lg:w-60 h-screen lg:h-[calc(100vh-3.5rem)]
          ${surface.page} lg:bg-transparent
          border-r border-zinc-200 dark:border-zinc-800/80
          flex flex-col shrink-0
          transition-transform duration-300 ease-in-out lg:transition-none lg:transform-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 lg:hidden flex items-center justify-between">
          <IceStackLogo size={30} />
          <button
            type="button"
            onClick={onClose}
            aria-label={t('nav.closeNavigation')}
            className={`p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 ${radius.chip} hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer ${focusRing}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav
          ref={navRef}
          aria-label={t('nav.knowledgeBase')}
          className="scrollbar-slim flex-1 overflow-y-auto pb-6 pr-4 pl-4 lg:pl-0 space-y-6 select-none"
        >
          <Link
            to={howToThinkUrl(lang)}
            onClick={onClose}
            className={`mt-6 flex items-center gap-2 text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${radius.chip} ${focusRing}`}
          >
            <MethodIcon className="w-4 h-4 shrink-0 text-zinc-600 dark:text-zinc-300" />
            {t('nav.howToThink')}
          </Link>

          {COLLECTION_IDS.map(id => {
            const Icon = NAV_ICONS[id];
            const topics = listTopics(lang, id);
            return (
              <div key={id}>
                <Link
                  to={collectionUrl(lang, id)}
                  onClick={onClose}
                  // Negative margins let the sticky background cover the nav's gutters.
                  className={`sticky top-0 z-10 -mx-4 px-4 py-2 lg:ml-0 lg:pl-0 ${surface.page} flex items-center gap-2 text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${focusRing}`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-zinc-600 dark:text-zinc-300" />
                  <span className="flex-1">{t(collectionKey(id, 'label'))}</span>
                  <span className="text-[10px] font-mono font-medium text-zinc-400 dark:text-zinc-600 tabular-nums">
                    {topics.length}
                  </span>
                </Link>
                <ul className="ml-2 pl-3.5 mt-1.5 border-l border-zinc-200 dark:border-zinc-800 space-y-0.5">
                  {topics.map(topic => {
                    const isActive = topicRef(topic) === activeRef;
                    return (
                      <li key={topicRef(topic)}>
                        <Link
                          to={topicUrl(lang, topic)}
                          onClick={onClose}
                          aria-current={isActive ? 'page' : undefined}
                          className={`relative block py-1.5 pr-1 text-[13px] leading-snug transition-colors rounded ${focusRing} ${
                            isActive
                              ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                          }`}
                        >
                          {isActive && (
                            <span className="absolute -left-[15px] top-1 bottom-1 w-[2px] bg-emerald-500 rounded-full" />
                          )}
                          <span className="line-clamp-2">{topic.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        <div className="p-4 lg:pl-0 border-t border-zinc-200 dark:border-zinc-800/80">
          <a
            href={PROPOSE_TOPIC_URL}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${radius.chip} ${focusRing}`}
          >
            <PlusCircle className="w-3.5 h-3.5 shrink-0" />
            {t('nav.proposeNewTopic')}
          </a>
        </div>
      </aside>
    </>
  );
};

export default KnowledgeSidebar;
