import React from 'react';
import { Link } from 'react-router-dom';
import { Languages } from 'lucide-react';
import type { Language, TranslatedPage } from '../../types';
import { useT } from '../../hooks/useT';
import { repoEditUrl, repoNewFileUrl } from '../../utils/site';

const Notice: React.FC<{
  text: string;
  action: { label: string; href: string };
  secondary?: { label: string; to: string };
}> = ({ text, action, secondary }) => (
  <div className="mb-8 flex items-start gap-3 p-4 rounded-xl border border-blue-500/25 bg-blue-500/[0.06] text-sm">
    <Languages className="w-4 h-4 mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" />
    <div className="min-w-0 text-zinc-700 dark:text-zinc-300 leading-relaxed">
      <p>{text}</p>
      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 font-medium">
        <a
          href={action.href}
          target="_blank"
          rel="noreferrer"
          className="text-blue-700 dark:text-blue-300 hover:underline"
        >
          {action.label}
        </a>
        {secondary && (
          <Link to={secondary.to} className="text-blue-700 dark:text-blue-300 hover:underline">
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  </div>
);

interface TranslationNoticeProps {
  page: TranslatedPage;
  isFallback: boolean;
  lang: Language;
  englishUrl: string;
}

const TranslationNotice: React.FC<TranslationNoticeProps> = ({ page, isFallback, lang, englishUrl }) => {
  const t = useT(lang);

  if (isFallback) {
    const folder = page.sourcePath.slice(0, page.sourcePath.lastIndexOf('/'));
    return (
      <Notice
        text={t('topic.fallbackNotice')}
        action={{ label: t('topic.fallbackAction'), href: repoNewFileUrl(folder, `${lang}.mdx`) }}
      />
    );
  }

  if (page.lang === 'km' && page.translation === 'draft') {
    return (
      <Notice
        text={t('topic.draftNotice')}
        action={{ label: t('topic.draftAction'), href: repoEditUrl(page.sourcePath) }}
        secondary={{ label: t('topic.readInEnglish'), to: englishUrl }}
      />
    );
  }

  return null;
};

export default TranslationNotice;
