import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import type { Language } from '../../types';
import { REPO_URL } from '../../constants/site';
import { useT } from '../../hooks/useT';
import { PROPOSE_TOPIC_URL, CONTRIBUTING_URL } from '../../utils/site';
import { buttonPrimary, buttonSecondary } from '../../utils/ui';

const ContributeHeader: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);
  return (
    <PageHeader lang={lang} eyebrow={t('nav.contribute')} title={t('contribute.heading')} lead={t('contribute.lead')}>
      <div className="flex flex-wrap gap-2.5">
        <a href={PROPOSE_TOPIC_URL} target="_blank" rel="noreferrer" className={buttonPrimary}>
          <Github className="w-4 h-4" />
          {t('common.proposeTopic')}
        </a>
        <a href={CONTRIBUTING_URL} target="_blank" rel="noreferrer" className={buttonSecondary}>
          CONTRIBUTING.md
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <a href={REPO_URL} target="_blank" rel="noreferrer" className={buttonSecondary}>
          {t('common.viewOnGithub')}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </PageHeader>
  );
};

export default ContributeHeader;
