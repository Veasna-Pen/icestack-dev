import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, SearchCheck, Milestone, Bug, ShieldCheck, PenLine, Bot, User, Check } from 'lucide-react';
import FlowChain from '../components/knowledge/FlowChain';
import PageHeader from '../components/layout/PageHeader';
import SectionHeader from '../components/layout/SectionHeader';
import type { IconComponent } from '../types';
import { PRIMARY_NAV } from '../constants/navigation';
import { useLanguageParam } from '../hooks/useLanguage';
import { usePageMeta } from '../hooks/usePageMeta';
import { useT } from '../hooks/useT';
import { WORKFLOW, TEMPLATE_SECTIONS, sectionKey, stageKey } from '../utils/method';
import { navUrl, contributeUrl, howToThinkUrl } from '../utils/routes';
import {
  buttonPrimary,
  buttonSecondary,
  cardAccent,
  cardStatic,
  cardTitle,
  container,
  gridGap,
  iconTile,
  leadText,
  pageY,
  sectionGap,
  stepNumber,
  tagChip
} from '../utils/ui';

type ToolId = 'constraint' | 'measure' | 'reversibility' | 'failureModes' | 'boring' | 'changeMind';

const TOOLS: { id: ToolId; icon: IconComponent }[] = [
  { id: 'constraint', icon: Target },
  { id: 'measure', icon: SearchCheck },
  { id: 'reversibility', icon: Milestone },
  { id: 'failureModes', icon: Bug },
  { id: 'boring', icon: ShieldCheck },
  { id: 'changeMind', icon: PenLine }
];

interface HowToThinkPageProps {
  onOpenAi: () => void;
}

const HowToThinkPage: React.FC<HowToThinkPageProps> = ({ onOpenAi }) => {
  const lang = useLanguageParam();
  const t = useT(lang);
  const isKm = lang === 'km';

  usePageMeta({ title: t('nav.howToThink'), description: t('howToThink.lead'), path: howToThinkUrl(lang) });

  const handToAi = t('howToThink.ai.handToAiItems', { returnObjects: true }) as string[];
  const keepForYourself = t('howToThink.ai.keepItems', { returnObjects: true }) as string[];

  return (
    <main className={`${container} ${pageY}`}>
      <PageHeader
        lang={lang}
        eyebrow={`${stepNumber(PRIMARY_NAV.indexOf('how-to-think') + 1)} · ${t('howToThink.eyebrow')}`}
        title={t('howToThink.heading')}
        lead={t('howToThink.lead')}
      >
        <FlowChain steps={WORKFLOW.map(id => t(stageKey(id, 'short')))} tone="accent" />
      </PageHeader>

      <ol className="mt-12 space-y-4">
        {WORKFLOW.map((stageId, i) => {
          const sections = TEMPLATE_SECTIONS.filter(section => section.stage === stageId);
          const onPage = sections.length
            ? sections.map(section => t(sectionKey(section.key, 'heading')))
            : [t('howToThink.titleAndSummary')];

          return (
            <li
              key={stageId}
              id={`step-${stageId}`}
              className={`${cardStatic} p-5 sm:p-6 grid sm:grid-cols-[3.25rem_1fr] gap-3 sm:gap-5 scroll-mt-28`}
            >
              <div className="font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums leading-none pt-1">
                {stepNumber(i + 1)}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{t(stageKey(stageId, 'label'))}</h2>
                <p className="mt-1 text-[15px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {t(stageKey(stageId, 'question'))}
                </p>

                <dl className="mt-4 grid md:grid-cols-2 gap-3 text-[13px] leading-relaxed">
                  <div className="rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 p-3.5">
                    <dt className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">
                      {t('howToThink.doneWhen')}
                    </dt>
                    <dd className="text-zinc-700 dark:text-zinc-300">{t(stageKey(stageId, 'output'))}</dd>
                  </div>
                  <div className="rounded-xl bg-amber-500/[0.06] border border-amber-500/20 p-3.5">
                    <dt className="font-semibold text-amber-700 dark:text-amber-300 mb-1">{t('howToThink.trap')}</dt>
                    <dd className="text-zinc-700 dark:text-zinc-300">{t(stageKey(stageId, 'trap'))}</dd>
                  </div>
                </dl>

                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11.5px] text-zinc-500 dark:text-zinc-400">
                  <span>{t('howToThink.onEveryPage')}</span>
                  {onPage.map(label => (
                    <span
                      key={label}
                      className={`${tagChip} text-[10.5px] text-zinc-600 dark:text-zinc-400 ${isKm ? '' : 'font-mono'}`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <section className={sectionGap}>
        <SectionHeader
          lang={lang}
          eyebrow={t('howToThink.tools.eyebrow')}
          title={t('howToThink.tools.title')}
          body={t('howToThink.tools.body')}
          className="mb-8"
        />
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${gridGap}`}>
          {TOOLS.map(tool => {
            const Icon = tool.icon;
            return (
              <div key={tool.id} className={`${cardStatic} p-5`}>
                <span className={`${iconTile} mb-4`}>
                  <Icon className="w-4 h-4" />
                </span>
                <h3 className={cardTitle}>{t(`howToThink.tools.${tool.id}.title`)}</h3>
                <p className="mt-2 text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t(`howToThink.tools.${tool.id}.body`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className={`${sectionGap} grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-12 items-start`}>
        <div>
          <SectionHeader
            lang={lang}
            eyebrow={t('howToThink.ai.eyebrow')}
            title={t('howToThink.ai.title')}
            body={t('howToThink.ai.body')}
          />
          <button type="button" onClick={onOpenAi} className={`mt-6 ${buttonPrimary}`}>
            <Bot className="w-4 h-4" />
            {t('common.thinkWithAi')}
          </button>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{t('howToThink.ai.note')}</p>
        </div>

        <div className={`grid sm:grid-cols-2 ${gridGap}`}>
          <div className={`${cardStatic} p-5`}>
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-4 h-4 text-zinc-500" />
              <h3 className={cardTitle}>{t('howToThink.ai.handToAi')}</h3>
            </div>
            <ul className="space-y-2.5">
              {handToAi.map(item => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[13px] text-zinc-600 dark:text-zinc-400 leading-snug"
                >
                  <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-zinc-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${cardAccent} p-5`}>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className={cardTitle}>{t('howToThink.ai.keep')}</h3>
            </div>
            <ul className="space-y-2.5">
              {keepForYourself.map(item => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[13px] text-zinc-800 dark:text-zinc-200 leading-snug"
                >
                  <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className={`${sectionGap} ${cardStatic} p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5`}
      >
        <div className="max-w-xl">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{t('howToThink.practice.title')}</h2>
          <p className={`mt-1.5 ${leadText}`}>{t('howToThink.practice.body')}</p>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link to={navUrl(lang, 'problems')} className={buttonPrimary}>
            {t('howToThink.practice.browse')}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link to={contributeUrl(lang)} className={buttonSecondary}>
            {t('howToThink.practice.write')}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HowToThinkPage;
