import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { Bot, Github, Search } from 'lucide-react';
import DecisionPathCard from './DecisionPathCard';
import type { Language, Topic } from '../../types';
import { listTopics, resolveRef, topicRef } from '../../services/knowledgeService';
import { COLLECTION_IDS } from '../../constants/collections';
import { useT } from '../../hooks/useT';
import { topicUrl } from '../../utils/routes';
import { container, eyebrowFor, focusRing, kbd, leadText, radius, surface, titleSizeFor } from '../../utils/ui';

const MAX_QUESTIONS = 6;

interface HeroSectionProps {
  lang: Language;
  onOpenSearch: () => void;
  onOpenAi: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ lang, onOpenSearch, onOpenAi }) => {
  const t = useT(lang);

  // Round-robin across collections so one large collection cannot crowd out the others.
  const askable = useMemo(() => COLLECTION_IDS.map(id => listTopics(lang, id)), [lang]);

  const questions = useMemo(() => {
    const picked: Topic[] = [];
    for (let rank = 0; picked.length < MAX_QUESTIONS; rank++) {
      const before = picked.length;
      for (const list of askable) {
        if (list[rank] && picked.length < MAX_QUESTIONS) picked.push(list[rank]);
      }
      if (picked.length === before) break;
    }
    return picked;
  }, [askable]);

  const totalQuestions = askable.reduce((sum, list) => sum + list.length, 0);
  const example = resolveRef('problems/database-is-slow', lang);

  return (
    <section
      className={`relative w-full overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80 ${surface.page}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-70 dark:opacity-100 [mask-image:linear-gradient(to_bottom,black,transparent_92%)] bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1c1c20_1px,transparent_1px),linear-gradient(to_bottom,#1c1c20_1px,transparent_1px)] [background-size:56px_56px]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] w-[620px] h-[620px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/[0.07] blur-[130px] pointer-events-none"
      />

      <div className={`relative ${container} py-12 sm:py-16 lg:py-20`}>
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] text-[11px] font-medium text-emerald-700 dark:text-emerald-300 mb-6">
              <Github className="w-3.5 h-3.5" />
              <span>{t('home.badge')}</span>
            </div>

            <h1 className={`font-extrabold text-zinc-900 dark:text-white ${titleSizeFor(lang, 'hero')}`}>
              <Trans
                t={t}
                i18nKey="home.heroTitle"
                components={{ br: <br />, muted: <span className="text-zinc-400 dark:text-zinc-500" /> }}
              />
            </h1>

            <p className={`mt-5 max-w-lg ${leadText}`}>{t('home.heroLead')}</p>

            <button
              type="button"
              onClick={onOpenSearch}
              className={`group mt-8 w-full max-w-lg flex items-center gap-3 px-4 py-3.5 ${radius.control} border border-zinc-200 dark:border-zinc-800 ${surface.card} hover:border-emerald-500/50 dark:hover:border-emerald-500/40 shadow-sm text-left transition-colors cursor-pointer ${focusRing}`}
            >
              <Search className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors shrink-0" />
              <span className="flex-1 text-sm text-zinc-500 dark:text-zinc-400">{t('home.searchPrompt')}</span>
              <kbd className={kbd}>⌘K</kbd>
            </button>

            <button
              type="button"
              onClick={onOpenAi}
              className={`mt-3 inline-flex items-center gap-1.5 text-[11.5px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer ${radius.chip} ${focusRing}`}
            >
              <kbd className={kbd}>⌘J</kbd>
              <Bot className="w-3 h-3" />
              {t('home.aiPrompt')}
            </button>

            <div className="mt-9">
              <p className={`${eyebrowFor(lang)} mb-3`}>{t('home.questionsEyebrow')}</p>
              <ul className="flex flex-wrap gap-2">
                {questions.map(topic => (
                  <li key={topicRef(topic)}>
                    <Link
                      to={topicUrl(lang, topic)}
                      className={`inline-flex items-center px-3 py-1.5 ${radius.pill} border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 text-[12.5px] text-zinc-700 dark:text-zinc-300 hover:border-emerald-500/50 hover:text-zinc-900 dark:hover:text-white transition-colors ${focusRing}`}
                    >
                      {topic.question}
                    </Link>
                  </li>
                ))}
                {totalQuestions > questions.length && (
                  <li>
                    <button
                      type="button"
                      onClick={onOpenSearch}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${radius.pill} border border-dashed border-zinc-300 dark:border-zinc-700 text-[12.5px] font-medium text-zinc-600 dark:text-zinc-400 hover:border-emerald-500/60 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer ${focusRing}`}
                    >
                      <Search className="w-3 h-3" />
                      {t('home.browseAll', { total: totalQuestions })}
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <DecisionPathCard lang={lang} example={example} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
