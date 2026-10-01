import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Github, Menu, Moon, Search, Sun } from 'lucide-react';
import IceStackLogo from './IceStackLogo';
import NavMenu from './header/NavMenu';
import LearnMenu from './header/LearnMenu';
import KnowledgeMenu from './header/KnowledgeMenu';
import CommunityMenu from './header/CommunityMenu';
import type { Language, ThemeMode } from '../types';
import { border, container, radius, focusRing, iconButton, kbd, surface } from '../utils/ui';
import { LANGUAGE_FLAGS } from '../constants/i18n';
import { PRIMARY_NAV } from '../constants/navigation';
import { REPO_URL } from '../constants/site';
import { useMegaMenu } from '../hooks/useMegaMenu';
import { useT } from '../hooks/useT';
import { navLabelKey, otherLanguage } from '../utils/i18n';
import {
  navUrl,
  activeNavFor,
  coursesUrl,
  homeUrl,
  isContributePath,
  isCoursesPath,
  isRoadmapsPath,
  roadmapsUrl
} from '../utils/routes';

type MenuId = 'learn' | 'knowledge' | 'community';

interface HeaderProps {
  isScrolled: boolean;
  hasSidebar: boolean;
  onSidebarOpen: () => void;
  onOpenSearch: () => void;
  language: Language;
  onLanguageToggle: () => void;
  themeMode: ThemeMode;
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isScrolled,
  hasSidebar,
  onSidebarOpen,
  onOpenSearch,
  language,
  onLanguageToggle,
  themeMode,
  onThemeToggle
}) => {
  const t = useT(language);
  const { pathname } = useLocation();
  const activeNav = activeNavFor(pathname);
  const learnLinks = [
    { to: roadmapsUrl(language), label: t('nav.roadmaps'), isActive: isRoadmapsPath(pathname) },
    { to: coursesUrl(language), label: t('nav.courses'), isActive: isCoursesPath(pathname) }
  ];

  const navLinkClass = (isActive: boolean) =>
    `whitespace-nowrap px-2.5 py-1.5 ${radius.chip} text-[13px] font-medium transition-colors ${focusRing} ${
      isActive
        ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800/70'
        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
    }`;

  const menu = useMegaMenu<MenuId>();
  const menus: { id: MenuId; isActive: boolean; panel: React.ReactNode }[] = [
    { id: 'learn', isActive: learnLinks.some(link => link.isActive), panel: <LearnMenu lang={language} /> },
    { id: 'knowledge', isActive: !!activeNav, panel: <KnowledgeMenu lang={language} /> },
    { id: 'community', isActive: isContributePath(pathname), panel: <CommunityMenu lang={language} /> }
  ];

  const navItems = (
    <>
      {learnLinks.map(link => (
        <Link
          key={link.to}
          to={link.to}
          aria-current={link.isActive ? 'page' : undefined}
          className={navLinkClass(link.isActive)}
        >
          {link.label}
        </Link>
      ))}
      <span aria-hidden="true" className={`mx-1.5 h-4 shrink-0 border-l ${border.base}`} />
      {PRIMARY_NAV.map((id, i) => {
        const isActive = id === activeNav;
        return (
          <React.Fragment key={id}>
            <Link
              to={navUrl(language, id)}
              aria-current={isActive ? 'page' : undefined}
              className={navLinkClass(isActive)}
            >
              {t(navLabelKey(id))}
            </Link>
            {i < PRIMARY_NAV.length - 1 && (
              <ChevronRight aria-hidden="true" className="w-3 h-3 shrink-0 text-zinc-400 dark:text-zinc-600" />
            )}
          </React.Fragment>
        );
      })}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-md transition-all duration-200 border-b ${surface.pageBlur} ${
        isScrolled
          ? `${border.soft} shadow-[0_1px_8px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_12px_rgba(0,0,0,0.3)]`
          : 'border-zinc-200/60 dark:border-zinc-800/60'
      }`}
    >
      <div ref={menu.rootRef} className={`${container} relative h-14 flex items-center justify-between gap-2 sm:gap-4`}>
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {hasSidebar && (
            <button
              type="button"
              onClick={onSidebarOpen}
              className={`lg:hidden p-1.5 -ml-1 shrink-0 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${radius.chip} transition-colors cursor-pointer ${focusRing}`}
              aria-label={t('nav.openNavigation')}
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link
            to={homeUrl(language)}
            aria-label={t('nav.home')}
            className={`flex items-center group text-left shrink-0 ${radius.chip} ${focusRing}`}
          >
            <IceStackLogo size={32} />
          </Link>

          <nav
            aria-label={t('nav.primary')}
            className={`hidden lg:flex items-center gap-0.5 pl-4 ml-1 border-l ${border.base}`}
          >
            {menus.map(({ id, isActive, panel }) => (
              <NavMenu
                key={id}
                id={id}
                label={t(`header.menu.${id}`)}
                isActive={isActive}
                isOpen={menu.openId === id}
                onHoverOpen={() => menu.hoverOpen(id)}
                onHoverClose={menu.hoverClose}
                onToggle={() => menu.toggle(id)}
                onClose={menu.close}
              >
                {panel}
              </NavMenu>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            className={`sm:hidden ${iconButton}`}
            aria-label={t('common.search')}
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenSearch}
            className={`group hidden sm:flex items-center justify-between gap-2.5 px-3 py-1.5 bg-zinc-100/90 dark:bg-zinc-900/90 hover:bg-zinc-200/70 dark:hover:bg-zinc-800/80 border ${border.soft} hover:border-zinc-300 dark:hover:border-zinc-700 ${radius.control} text-xs transition-all w-44 xl:w-56 cursor-pointer ${focusRing}`}
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors shrink-0" />
              <span className="truncate text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                {t('common.search')}
              </span>
            </span>
            <kbd className={kbd}>⌘K</kbd>
          </button>

          <button
            type="button"
            onClick={onLanguageToggle}
            className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-2 ${radius.control} text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 border ${border.soft} transition-all cursor-pointer ${focusRing}`}
            title={t('header.switchLanguage')}
          >
            <img
              src={LANGUAGE_FLAGS[otherLanguage(language)]}
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 shrink-0 object-contain"
            />
          </button>

          <button
            type="button"
            onClick={onThemeToggle}
            className={iconButton}
            title={themeMode === 'dark' ? t('header.switchToLight') : t('header.switchToDark')}
          >
            {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className={`hidden sm:flex ${iconButton}`}
            title={t('common.viewOnGithub')}
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      <nav aria-label={t('nav.primary')} className={`lg:hidden border-t ${border.hairline} overflow-x-auto`}>
        <div className="flex items-center gap-0.5 px-3 sm:px-5 h-10 w-max">{navItems}</div>
      </nav>
    </header>
  );
};

export default Header;
