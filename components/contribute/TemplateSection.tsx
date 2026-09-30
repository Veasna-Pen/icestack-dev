import React from 'react';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import CodeBlock from '../CodeBlock';
import type { Language } from '../../types';
import { useT } from '../../hooks/useT';
import { TEMPLATE_SECTIONS, englishHeading, sectionKey, stageIndex, stageKey } from '../../utils/method';
import { LESSON_TEMPLATE_URL, TEMPLATE_URL } from '../../utils/site';
import SectionHeader from '../layout/SectionHeader';
import { border, cardStatic, focusRing, radius, sectionGap, stepNumber } from '../../utils/ui';

const TEMPLATE_SOURCE = [
  '---',
  'title: "Should I use Redis?"',
  'question: "When should I use Redis?"',
  'summary: "The short answer, in one or two sentences."',
  'tags: [caching, redis, performance]',
  'related: [patterns/caching]',
  'updated: "2026-09-11"',
  '---',
  '',
  ...TEMPLATE_SECTIONS.map(section => `## ${englishHeading(section.key)}`)
].join('\n');

const TemplateSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);
  const isKm = lang === 'km';
  return (
    <section id="template" className={`${sectionGap} scroll-mt-28 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start`}>
      <div className="min-w-0">
        <SectionHeader lang={lang} title={t('contribute.template.title')} body={t('contribute.template.body')} />
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{t('contribute.template.note')}</p>
        <CodeBlock code={TEMPLATE_SOURCE} language="mdx" title="knowledge/<collection>/<slug>/en.mdx" />
        <a
          href={TEMPLATE_URL}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1.5 text-[13px] font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 ${radius.chip} ${focusRing}`}
        >
          {t('contribute.template.open')}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        <div className={`mt-6 flex items-start gap-3 p-4 ${radius.control} border ${border.base}`}>
          <GraduationCap className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
          <div className="min-w-0 text-[13px] leading-relaxed">
            <p className="text-zinc-600 dark:text-zinc-400">{t('contribute.template.lessonNote')}</p>
            <a
              href={LESSON_TEMPLATE_URL}
              target="_blank"
              rel="noreferrer"
              className={`mt-1.5 inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 ${radius.chip} ${focusRing}`}
            >
              {t('contribute.template.openLesson')}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <dl className={`${cardStatic} divide-y divide-zinc-100 dark:divide-zinc-800/80`}>
        {TEMPLATE_SECTIONS.map(section => (
          <div key={section.key} className="px-5 py-3.5 grid grid-cols-[2.25rem_1fr] gap-2">
            <span
              className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums pt-0.5"
              title={t(stageKey(section.stage, 'label'))}
            >
              {stepNumber(stageIndex(section.stage))}
            </span>
            <div className="min-w-0">
              <dt className="text-[13.5px] font-semibold text-zinc-900 dark:text-white">
                {t(sectionKey(section.key, 'heading'))}
                {isKm && (
                  <span className="ml-2 text-[11px] font-mono font-medium text-zinc-400">
                    {englishHeading(section.key)}
                  </span>
                )}
              </dt>
              <dd className="mt-0.5 text-[12.5px] text-zinc-600 dark:text-zinc-400 leading-snug">
                {t(sectionKey(section.key, 'hint'))}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default TemplateSection;
