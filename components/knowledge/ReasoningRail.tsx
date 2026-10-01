import React, { useState } from 'react';
import { Bot, SquarePen, Link2, Check } from 'lucide-react';
import type { Language, OutlineEntry, StageId } from '../../types';
import { useT } from '../../hooks/useT';
import { WORKFLOW, getSection, stageKey } from '../../utils/method';
import { eyebrowFor, kbd, radius, focusRing, stepNumber, surface } from '../../utils/ui';

interface ReasoningRailProps {
  entries: OutlineEntry[];
  activeId: string;
  lang: Language;
  editUrl: string;
  onAskAi: () => void;
}

type StageState = 'done' | 'active' | 'todo' | 'missing';

const DOT: Record<StageState, string> = {
  done: 'bg-emerald-500 border-emerald-500',
  active: `${surface.page} border-emerald-500 ring-4 ring-emerald-500/15`,
  todo: `${surface.page} border-zinc-300 dark:border-zinc-700`,
  missing: `${surface.page} border-dashed border-zinc-300 dark:border-zinc-700`
};

const LABEL: Record<StageState, string> = {
  done: 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200',
  active: 'text-emerald-700 dark:text-emerald-400 font-semibold',
  todo: 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200',
  missing: 'text-zinc-400 dark:text-zinc-600'
};

const scrollToId = (id: string) => {
  if (!id) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const stageOf = (entry: OutlineEntry): StageId | undefined =>
  entry.sectionKey ? getSection(entry.sectionKey)?.stage : undefined;

const actionClass = `w-full flex items-center justify-between gap-2 p-2 ${radius.chip} text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer ${focusRing}`;

const ReasoningRail: React.FC<ReasoningRailProps> = ({ entries, activeId, lang, editUrl, onAskAi }) => {
  const t = useT(lang);
  const [copied, setCopied] = useState(false);

  const templateEntries = entries.filter(e => e.sectionKey);
  const extraEntries = entries.filter(e => !e.sectionKey);
  const followsTemplate = templateEntries.length >= 3;

  let activeStage: StageId = 'problem';
  if (activeId) {
    for (const entry of entries) {
      const stage = stageOf(entry);
      if (stage) activeStage = stage;
      if (entry.id === activeId) break;
    }
  }
  const activeIndex = WORKFLOW.indexOf(activeStage);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const plainLink = (entry: OutlineEntry, small = false) => {
    const isActive = entry.id === activeId;
    return (
      <button
        key={entry.id}
        type="button"
        onClick={() => scrollToId(entry.id)}
        className={`block w-full text-left py-1 border-l -ml-px pl-3 transition-colors ${small ? 'text-[11.5px]' : 'text-xs'} ${focusRing} ${
          isActive
            ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400 font-medium'
            : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-400'
        }`}
      >
        <span className="line-clamp-2">{entry.label}</span>
      </button>
    );
  };

  return (
    <aside className="w-60 shrink-0 hidden xl:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto px-3 py-8 text-sm">
      {followsTemplate ? (
        <nav aria-label={t('rail.reasoningPath')} className="mb-8">
          <div className={`${eyebrowFor(lang)} mb-4`}>{t('rail.reasoningPath')}</div>
          <ol>
            {WORKFLOW.map((stageId, i) => {
              const sections = templateEntries.filter(e => stageOf(e) === stageId);
              const present = stageId === 'problem' || sections.length > 0;
              const state: StageState = !present
                ? 'missing'
                : i < activeIndex
                  ? 'done'
                  : i === activeIndex
                    ? 'active'
                    : 'todo';
              const target = stageId === 'problem' ? '' : (sections[0]?.id ?? '');

              return (
                <li key={stageId} className="relative pl-6 pb-3 last:pb-0">
                  {i < WORKFLOW.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`absolute left-[5px] top-[18px] -bottom-[5px] w-px ${
                        i < activeIndex ? 'bg-emerald-500/70' : 'bg-zinc-200 dark:bg-zinc-800'
                      }`}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-[5px] w-[11px] h-[11px] rounded-full border ${DOT[state]}`}
                  />
                  <button
                    type="button"
                    disabled={!present}
                    onClick={() => scrollToId(target)}
                    title={present ? undefined : t('rail.notCovered')}
                    aria-current={state === 'active' ? 'step' : undefined}
                    className={`flex items-baseline gap-2 w-full text-left text-[12.5px] leading-snug transition-colors ${radius.chip} ${focusRing} ${
                      present ? 'cursor-pointer' : 'cursor-default'
                    } ${LABEL[state]}`}
                  >
                    <span className="font-mono text-[10px] tabular-nums opacity-70">{stepNumber(i + 1)}</span>
                    <span>{t(stageKey(stageId, 'label'))}</span>
                  </button>
                  {sections.length > 1 && (
                    <ul className="mt-1 space-y-0.5 pl-[22px]">
                      {sections.map(s => (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => scrollToId(s.id)}
                            className={`text-left text-[11.5px] rounded transition-colors ${focusRing} ${
                              s.id === activeId
                                ? 'text-emerald-700 dark:text-emerald-400 font-medium'
                                : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                            }`}
                          >
                            {s.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>

          {extraEntries.length > 0 && (
            <div className="mt-6">
              <div className={`${eyebrowFor(lang)} mb-2`}>{t('rail.alsoOnPage')}</div>
              <div className="border-l border-zinc-200 dark:border-zinc-800">
                {extraEntries.map(e => plainLink(e, true))}
              </div>
            </div>
          )}
        </nav>
      ) : (
        entries.length > 0 && (
          <nav aria-label={t('rail.onThisPage')} className="mb-8">
            <div className={`${eyebrowFor(lang)} mb-3`}>{t('rail.onThisPage')}</div>
            <div className="border-l border-zinc-200 dark:border-zinc-800 space-y-0.5">
              {entries.map(e => plainLink(e))}
            </div>
          </nav>
        )
      )}

      <div className="space-y-1 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
        <button
          type="button"
          onClick={onAskAi}
          className={`${actionClass} group hover:!text-emerald-600 dark:hover:!text-emerald-400`}
        >
          <span className="flex items-center gap-2">
            <Bot className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-left">{t('common.thinkWithAi')}</span>
          </span>
          <kbd className={kbd}>⌘J</kbd>
        </button>
        <a href={editUrl} target="_blank" rel="noreferrer" className={actionClass}>
          <span className="flex items-center gap-2">
            <SquarePen className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span>{t('rail.editOnGithub')}</span>
          </span>
        </a>
        <button type="button" onClick={handleCopy} className={actionClass}>
          <span className="flex items-center gap-2">
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            ) : (
              <Link2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            )}
            <span>{copied ? t('rail.linkCopied') : t('rail.copyLink')}</span>
          </span>
        </button>
      </div>
    </aside>
  );
};

export default ReasoningRail;
