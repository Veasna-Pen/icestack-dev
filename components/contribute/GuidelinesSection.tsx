import React from 'react';
import { CodeXml, Handshake, ListChecks, ShieldCheck, Target, TriangleAlert } from 'lucide-react';
import type { IconComponent, Language } from '../../types';
import { useT } from '../../hooks/useT';
import SectionHeader from '../layout/SectionHeader';
import { cardTitle, sectionGap } from '../../utils/ui';

type GuidelineId = 'specific' | 'boring' | 'whenNot' | 'safely' | 'noPitches' | 'smallCode';

const GUIDELINES: { id: GuidelineId; icon: IconComponent }[] = [
  { id: 'specific', icon: Target },
  { id: 'boring', icon: ListChecks },
  { id: 'whenNot', icon: TriangleAlert },
  { id: 'safely', icon: ShieldCheck },
  { id: 'noPitches', icon: Handshake },
  { id: 'smallCode', icon: CodeXml }
];

const GuidelinesSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);
  return (
    <section className={sectionGap}>
      <SectionHeader lang={lang} title={t('contribute.goodPage')} className="mb-8" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {GUIDELINES.map(item => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-start gap-3">
              <Icon className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
              <div className="min-w-0">
                <h3 className={cardTitle}>{t(`contribute.guidelines.${item.id}.title`)}</h3>
                <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t(`contribute.guidelines.${item.id}.body`)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GuidelinesSection;
