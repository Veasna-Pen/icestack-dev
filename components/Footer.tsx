import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ExternalLink, Github } from 'lucide-react';
import { Trans } from 'react-i18next';
import IceStackLogo from './IceStackLogo';
import type { Language } from '../types';
import { COLLECTION_IDS } from '../constants/collections';
import { REPO_URL } from '../constants/site';
import { useT } from '../hooks/useT';
import { collectionKey } from '../utils/i18n';
import { howToThinkUrl, contributeUrl, collectionUrl, coursesUrl, homeUrl, roadmapsUrl } from '../utils/routes';
import { PROPOSE_TOPIC_URL } from '../utils/site';
import { container, focusRing, radius, kbd, surface } from '../utils/ui';

interface FooterProps {
  language: Language;
  onOpenSearch?: () => void;
}

type FooterLink = { label: string; to?: string; href?: string };

export const Footer: React.FC<FooterProps> = ({ language, onOpenSearch }) => {
  const t = useT(language);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: t('footer.knowledge'),
      links: COLLECTION_IDS.map(id => ({ label: t(collectionKey(id, 'label')), to: collectionUrl(language, id) }))
    },
    {
      title: t('footer.method'),
      links: [
        { label: t('nav.roadmaps'), to: roadmapsUrl(language) },
        { label: t('nav.courses'), to: coursesUrl(language) },
        { label: t('nav.howToThink'), to: howToThinkUrl(language) },
        { label: t('footer.pageTemplate'), to: `${contributeUrl(language)}#template` }
      ]
    },
    {
      title: t('footer.community'),
      links: [
        { label: t('nav.contribute'), to: contributeUrl(language) },
        { label: t('common.proposeTopic'), href: PROPOSE_TOPIC_URL },
        { label: t('footer.reportIssue'), href: `${REPO_URL}/issues` },
        { label: t('footer.sourceOnGithub'), href: REPO_URL }
      ]
    }
  ];

  const linkClass = `inline-flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${radius.chip} ${focusRing}`;

  return (
    <footer
      className={`w-full ${surface.bar} border-t border-zinc-200/80 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 transition-colors`}
    >
      <div className={`${container} py-12 lg:py-16`}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-4">
            <Link to={homeUrl(language)} className={`inline-flex items-center group ${radius.chip} ${focusRing}`}>
              <IceStackLogo size={36} />
            </Link>

            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t('footer.tagline')}</p>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>

            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-3 py-1.5 ${radius.control} bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors shadow-2xs ${focusRing}`}
            >
              <Github className="w-4 h-4" />
              <span>{t('footer.contributeOnGithub')}</span>
            </a>
          </div>

          {columns.map(column => (
            <div key={column.title} className="space-y-3">
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{column.title}</h4>
              <ul className="space-y-2 text-xs">
                {column.links.map(link => (
                  <li key={link.to ?? link.href}>
                    {link.to ? (
                      <Link to={link.to} className={linkClass}>
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} target="_blank" rel="noreferrer" className={linkClass}>
                        {link.label}
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-center sm:text-left">
            <span>© {new Date().getFullYear()} IceStack.dev</span>
            <span>•</span>
            <span>
              <Trans
                t={t}
                i18nKey="footer.createdBy"
                components={{ strong: <strong className="font-semibold text-zinc-700 dark:text-zinc-300" /> }}
              />
            </span>
            <span>•</span>
            <span>{t('footer.builtIn')}</span>
          </div>

          <div className="flex items-center gap-3">
            {onOpenSearch && (
              <button
                type="button"
                onClick={onOpenSearch}
                className={`inline-flex items-center gap-1.5 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer ${radius.chip} ${focusRing}`}
              >
                <span>{t('common.search')}</span>
                <kbd className={kbd}>⌘K</kbd>
              </button>
            )}
            <button
              type="button"
              onClick={scrollToTop}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${radius.control} bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs ${focusRing}`}
              title={t('footer.backToTop')}
            >
              <span>{t('footer.backToTop')}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
