import React from 'react';
import { GitPullRequest, MessagesSquare, SquarePen } from 'lucide-react';
import type { Language } from '../../types';
import { REPO_URL } from '../../constants/site';
import { useT } from '../../hooks/useT';
import { buttonPrimary, buttonSecondary } from '../../utils/ui';

const TopicContribution: React.FC<{ lang: Language; editUrl: string }> = ({ lang, editUrl }) => {
  const t = useT(lang);
  return (
    <section className="mt-10 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <span className="shrink-0 w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <GitPullRequest className="w-4 h-4" />
        </span>
        <div className="min-w-0">
          <h2 className="text-[15px] font-bold text-zinc-900 dark:text-white">{t('topic.facedThis')}</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t('topic.facedThisBody')}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={editUrl}
              target="_blank"
              rel="noreferrer"
              className={`${buttonPrimary} !py-2 !px-3.5 !text-xs`}
            >
              <SquarePen className="w-3.5 h-3.5" />
              {t('common.editThisPage')}
            </a>
            <a
              href={`${REPO_URL}/issues`}
              target="_blank"
              rel="noreferrer"
              className={`${buttonSecondary} !px-3.5 !py-2 !text-xs`}
            >
              <MessagesSquare className="w-3.5 h-3.5" />
              {t('topic.discuss')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicContribution;
