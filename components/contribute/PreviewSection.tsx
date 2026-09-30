import React from 'react';
import CodeBlock from '../CodeBlock';
import SectionHeader from '../layout/SectionHeader';
import type { Language } from '../../types';
import { REPO_URL } from '../../constants/site';
import { useT } from '../../hooks/useT';
import { sectionGap } from '../../utils/ui';

const PreviewSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);
  return (
    <section className={`${sectionGap} max-w-3xl`}>
      <SectionHeader lang={lang} title={t('contribute.preview.title')} />
      <CodeBlock
        code={`git clone ${REPO_URL}.git\ncd ${REPO_URL.split('/').pop()}\nnpm install\nnpm run dev`}
        language="bash"
        className="mt-5"
      />
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t('contribute.preview.body')}</p>
    </section>
  );
};

export default PreviewSection;
