import React from 'react';
import { CONTRIBUTION_TYPES } from '../knowledge/contributions';
import type { Language } from '../../types';
import { useT } from '../../hooks/useT';
import { cardStatic, cardTitle, eyebrowFor, gridGap, iconTile } from '../../utils/ui';

const ContributionTypes: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);
  return (
    <section className="mt-12">
      <p className={`${eyebrowFor(lang)} mb-4`}>{t('contribute.whatYouCan')}</p>
      <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${gridGap}`}>
        {CONTRIBUTION_TYPES.map(type => {
          const Icon = type.icon;
          return (
            <div key={type.id} className={`${cardStatic} p-5 flex items-start gap-3.5`}>
              <span className={iconTile}>
                <Icon className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <h3 className={cardTitle}>{t(`contribute.types.${type.id}.label`)}</h3>
                <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400 leading-snug">
                  {t(`contribute.types.${type.id}.detail`)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ContributionTypes;
