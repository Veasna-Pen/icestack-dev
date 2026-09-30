import React from 'react';
import { Trans } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import type { Language } from '../../types';
import { buildReviewQueue } from '../../services/reviewQueue';
import { useT } from '../../hooks/useT';
import SectionHeader from '../layout/SectionHeader';
import { border, cardStatic, focusRing, sectionGap } from '../../utils/ui';

const TranslateSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);
  const reviewQueue = buildReviewQueue(lang);
  return (
    <section
      id="translate"
      className={`${sectionGap} scroll-mt-28 grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-start`}
    >
      <div>
        <SectionHeader lang={lang} title={t('contribute.translate.title')} body={t('contribute.translate.body')} />
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          <Trans
            t={t}
            i18nKey="contribute.translate.draftNote"
            components={{ code: <code className="font-mono text-[12px] text-emerald-700 dark:text-emerald-400" /> }}
          />
        </p>
      </div>

      <div className={`${cardStatic} overflow-hidden`}>
        <div className={`px-5 py-3.5 border-b ${border.hairline} flex items-center justify-between gap-3`}>
          <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white">
            {t('contribute.translate.queueTitle')}
          </h3>
          <span className="text-[11px] font-mono text-zinc-400 tabular-nums">{reviewQueue.length}</span>
        </div>
        {reviewQueue.length === 0 ? (
          <p className="px-5 py-6 text-sm text-zinc-500">{t('contribute.translate.allReviewed')}</p>
        ) : (
          <ul className="max-h-[360px] overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {reviewQueue.map(item => (
              <li key={item.key}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex items-center justify-between gap-3 px-5 py-2.5 hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors ${focusRing}`}
                >
                  <span className="min-w-0">
                    <span className="block text-[13px] font-medium text-zinc-800 dark:text-zinc-200 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {item.title}
                    </span>
                    <span className="block text-[11px] font-mono text-zinc-400 truncate">
                      {item.folder.replace(/^knowledge\//, '')}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${
                        item.status === 'draft'
                          ? 'text-amber-700 dark:text-amber-300 bg-amber-500/10 border-amber-500/25'
                          : 'text-zinc-500 bg-zinc-100 dark:bg-zinc-800/70 border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      {item.status === 'draft'
                        ? t('contribute.translate.draft')
                        : t('contribute.translate.notTranslated')}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 group-hover:text-emerald-500" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default TranslateSection;
