import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { Language } from '../../types';
import { useT } from '../../hooks/useT';
import { radius } from '../../utils/ui';

export const makeAnswer = (lang: Language): React.FC<{ children: React.ReactNode }> => {
  const Answer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const t = useT(lang);
    return (
      <details
        className={`group my-4 ${radius.control} border border-emerald-500/25 bg-emerald-500/[0.04] open:bg-emerald-500/[0.06]`}
      >
        <summary className="flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold text-emerald-700 dark:text-emerald-400 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
          <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
          {t('courses.showAnswer')}
        </summary>
        <div className="px-4 pb-1 -mt-2 text-zinc-700 dark:text-zinc-300">{children}</div>
      </details>
    );
  };
  return Answer;
};
