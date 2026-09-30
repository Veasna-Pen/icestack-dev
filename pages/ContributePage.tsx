import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContributeHeader from '../components/contribute/ContributeHeader';
import ContributionTypes from '../components/contribute/ContributionTypes';
import GuidelinesSection from '../components/contribute/GuidelinesSection';
import HowItWorks from '../components/contribute/HowItWorks';
import PreviewSection from '../components/contribute/PreviewSection';
import TemplateSection from '../components/contribute/TemplateSection';
import TranslateSection from '../components/contribute/TranslateSection';
import { useLanguageParam } from '../hooks/useLanguage';
import { pageTitle } from '../utils/seo';
import { usePageMeta } from '../hooks/usePageMeta';
import { contributeUrl } from '../utils/routes';
import { useT } from '../hooks/useT';
import { scrollToHashSoon } from '../utils/dom';
import { container, pageY } from '../utils/ui';

const ContributePage: React.FC = () => {
  const location = useLocation();
  const lang = useLanguageParam();
  const t = useT(lang);

  usePageMeta({ title: pageTitle(t('nav.contribute')), description: t('contribute.lead'), path: contributeUrl(lang) });

  useEffect(() => scrollToHashSoon(location.hash), [location.hash]);

  return (
    <main className={`${container} ${pageY}`}>
      <ContributeHeader lang={lang} />
      <ContributionTypes lang={lang} />
      <HowItWorks lang={lang} />
      <TemplateSection lang={lang} />
      <GuidelinesSection lang={lang} />
      <TranslateSection lang={lang} />
      <PreviewSection lang={lang} />
    </main>
  );
};

export default ContributePage;
