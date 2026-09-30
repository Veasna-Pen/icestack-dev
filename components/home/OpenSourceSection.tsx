import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github } from 'lucide-react';
import FlowChain from '../knowledge/FlowChain';
import { CONTRIBUTION_TYPES } from '../knowledge/contributions';
import SourceTree from './SourceTree';
import type { Language } from '../../types';
import { useT } from '../../hooks/useT';
import { contributeUrl } from '../../utils/routes';
import { PROPOSE_TOPIC_URL } from '../../utils/site';
import SectionHeader from '../layout/SectionHeader';
import { buttonPrimary, buttonSecondary, container, eyebrowFor, sectionY } from '../../utils/ui';

const OpenSourceSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);
  return (
    <section className={`${container} ${sectionY}`}>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div>
          <SectionHeader
            lang={lang}
            eyebrow={t('home.openSource.eyebrow')}
            title={t('home.openSource.title')}
            body={t('home.openSource.body')}
          />
          <div className="mt-5">
            <FlowChain steps={t('home.openSource.flow', { returnObjects: true }) as string[]} tone="accent" />
          </div>

          <p className={`${eyebrowFor(lang)} mt-9 mb-3`}>{t('home.openSource.canAdd')}</p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
            {CONTRIBUTION_TYPES.map(type => {
              const Icon = type.icon;
              return (
                <li key={type.id} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-200/70 dark:border-zinc-700/50 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                      {t(`contribute.types.${type.id}.label`)}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug mt-0.5">
                      {t(`contribute.types.${type.id}.detail`)}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-9 flex flex-wrap gap-2.5">
            <Link to={contributeUrl(lang)} className={buttonPrimary}>
              {t('home.openSource.howToContribute')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a href={PROPOSE_TOPIC_URL} target="_blank" rel="noreferrer" className={buttonSecondary}>
              <Github className="w-4 h-4" />
              {t('home.openSource.proposeProblem')}
            </a>
          </div>
        </div>

        <SourceTree lang={lang} />
      </div>
    </section>
  );
};

export default OpenSourceSection;
