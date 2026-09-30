import React from 'react';
import { Hash } from 'lucide-react';
import type { Language } from '../../types';
import { useT } from '../../hooks/useT';
import { englishHeading, resolveSection, sectionKey, stageIndex, stageKey } from '../../utils/method';
import { nodeText, slugify } from '../../utils/text';
import { eyebrowFor, stepNumber } from '../../utils/ui';

const anchorClass =
  'opacity-0 group-hover:opacity-100 focus-visible:opacity-100 text-zinc-400 hover:text-emerald-500 transition-opacity p-1 self-center';

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

export const makeSectionHeading = (lang: Language): React.FC<HeadingProps> => {
  const SectionHeading: React.FC<HeadingProps> = ({ children }) => {
    const t = useT(lang);
    const text = nodeText(children).trim();
    const section = resolveSection(text);
    const id = section ? section.key : slugify(children);
    const label = section ? t(sectionKey(section.key, 'heading')) : text;

    const anchor = (
      <a href={`#${id}`} className={anchorClass} aria-label={t('topic.linkToSection')}>
        <Hash className="w-4 h-4" />
      </a>
    );

    if (!section) {
      return (
        <div
          id={id}
          data-toc=""
          data-label={label}
          className="group scroll-mt-28 mt-12 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800"
        >
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            <span>{children}</span>
            {anchor}
          </h2>
        </div>
      );
    }

    return (
      <div
        id={id}
        data-toc={section.key}
        data-label={label}
        className="group scroll-mt-28 mt-14 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800"
      >
        <p className={`${eyebrowFor(lang, true)} mb-1.5 tabular-nums`}>
          {stepNumber(stageIndex(section.stage))} · {t(stageKey(section.stage, 'label'))}
        </p>
        <h2 className="flex flex-wrap items-baseline gap-x-2.5 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          <span>{label}</span>
          {lang === 'km' && (
            <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
              {englishHeading(section.key)}
            </span>
          )}
          {anchor}
        </h2>
      </div>
    );
  };
  return SectionHeading;
};
