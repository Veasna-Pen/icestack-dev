import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Github, GraduationCap, Languages, MessageSquarePlus, Users } from 'lucide-react';
import type { Language } from '../../types';
import MenuPanel, { MenuItem, MenuList } from './MenuPanel';
import { REPO_URL } from '../../constants/site';
import { buildReviewQueue } from '../../services/reviewQueue';
import { useT } from '../../hooks/useT';
import { contributeUrl } from '../../utils/routes';
import { LESSON_TEMPLATE_URL, PROPOSE_TOPIC_URL } from '../../utils/site';
import { focusRing, radius } from '../../utils/ui';

type ItemId = 'guide' | 'pageTemplate' | 'lessonTemplate' | 'propose';

const CommunityMenu: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);
  const waiting = useMemo(() => buildReviewQueue(lang).length, [lang]);
  const copy = (id: ItemId) => ({
    title: t(`header.menu.items.${id}.title`),
    description: t(`header.menu.items.${id}.description`)
  });

  return (
    <MenuPanel
      main={
        <MenuList title={t('header.menu.contribute')}>
          <MenuItem to={contributeUrl(lang)} icon={Users} {...copy('guide')} />
          <MenuItem to={`${contributeUrl(lang)}#template`} icon={FileText} {...copy('pageTemplate')} />
          <MenuItem href={LESSON_TEMPLATE_URL} icon={GraduationCap} {...copy('lessonTemplate')} />
          <MenuItem href={PROPOSE_TOPIC_URL} icon={MessageSquarePlus} {...copy('propose')} />
        </MenuList>
      }
      side={
        <div className="flex flex-col h-full gap-3">
          <Link
            to={`${contributeUrl(lang)}#translate`}
            className={`group block p-4 ${radius.control} border border-emerald-500/25 bg-emerald-500/[0.06] hover:border-emerald-500/50 transition-colors ${focusRing}`}
          >
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
              <Languages className="w-3.5 h-3.5" />
              {t('header.menu.helpTranslate')}
            </span>
            <span className="mt-2 block text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white tabular-nums">
              {waiting}
            </span>
            <span className="block text-[12px] text-zinc-600 dark:text-zinc-400">
              {t('header.menu.translateLabel', { count: waiting })}
            </span>
            <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-600 dark:text-emerald-400">
              {t('header.menu.translateCta')}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className={`mt-auto flex items-center gap-2 px-2.5 py-1.5 ${radius.chip} text-[12px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors ${focusRing}`}
          >
            <Github className="w-3.5 h-3.5" />
            {t('common.viewOnGithub')}
          </a>
        </div>
      }
    />
  );
};

export default CommunityMenu;
