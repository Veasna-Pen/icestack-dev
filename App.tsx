import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import AiAssistant from './components/AiAssistant';
import HomePage from './pages/HomePage';
import HowToThinkPage from './pages/HowToThinkPage';
import ContributePage from './pages/ContributePage';
import CollectionPage from './pages/CollectionPage';
import TopicPage from './pages/TopicPage';
import RoadmapsPage from './pages/RoadmapsPage';
import RoadmapPage from './pages/RoadmapPage';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';
import i18n from './i18n';
import type { AiContext } from './types';
import { COLLECTION_IDS, isCollectionId } from './constants/collections';
import { ROADMAP_IDS } from './constants/roadmaps';
import { SITE_NAME } from './constants/site';
import { HEADER_SCROLL_THRESHOLD, SHORTCUT_KEYS } from './constants/ui';
import { usePersistedLanguage } from './hooks/useLanguage';
import { useModKeyShortcuts } from './hooks/useModKeyShortcuts';
import { useScrolled } from './hooks/useScrolled';
import { useTheme } from './hooks/useTheme';
import { hasLanguagePrefix, otherLanguage, stripLanguagePrefix, withLanguagePrefix } from './utils/i18n';
import { coursesUrl, homeUrl, isLessonPath, roadmapsUrl } from './utils/routes';

const GENERAL_AI_CONTEXT: AiContext = { kind: 'general', title: SITE_NAME };

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split('/').filter(Boolean);
  const langSegment = pathParts[0];
  const section = pathParts[1];
  const isTopicView = isCollectionId(section) && pathParts.length > 2;
  const isLessonView = isLessonPath(location.pathname);
  const hasSidebar = isTopicView || isLessonView;

  const { language, changeLanguage } = usePersistedLanguage(langSegment);
  const { themeMode, toggleTheme } = useTheme();
  const isScrolled = useScrolled(HEADER_SCROLL_THRESHOLD);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
  }, [language]);

  const [aiContext, setAiContext] = useState<AiContext>(GENERAL_AI_CONTEXT);

  useEffect(() => {
    if (!hasSidebar) setAiContext(GENERAL_AI_CONTEXT);
  }, [hasSidebar]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  const previousPath = useRef(location.pathname);
  useEffect(() => {
    const pageChanged = stripLanguagePrefix(previousPath.current) !== stripLanguagePrefix(location.pathname);
    previousPath.current = location.pathname;
    if (!pageChanged) return;
    setIsSidebarOpen(false);
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [location.pathname, location.hash]);

  useModKeyShortcuts({
    [SHORTCUT_KEYS.search]: () => setIsSearchOpen(prev => !prev),
    [SHORTCUT_KEYS.assistant]: () => setIsAiOpen(prev => !prev)
  });

  const toggleLanguage = () => {
    const next = otherLanguage(language);
    changeLanguage(next);
    navigate(
      hasLanguagePrefix(location.pathname) ? withLanguagePrefix(location.pathname, next) + location.hash : homeUrl(next)
    );
  };

  const handleNavigate = useCallback((url: string) => navigate(url), [navigate]);

  const openSearch = () => setIsSearchOpen(true);
  const openAi = () => setIsAiOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col text-zinc-900 dark:text-zinc-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-500 transition-colors duration-200">
      <Header
        isScrolled={isScrolled}
        hasSidebar={hasSidebar}
        onSidebarOpen={() => setIsSidebarOpen(true)}
        onOpenSearch={openSearch}
        language={language}
        onLanguageToggle={toggleLanguage}
        themeMode={themeMode}
        onThemeToggle={toggleTheme}
      />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to={homeUrl(language)} replace />} />

          <Route path="/:lang" element={<HomePage onOpenSearch={openSearch} onOpenAi={openAi} />} />

          <Route path="/:lang/how-to-think" element={<HowToThinkPage onOpenAi={openAi} />} />
          <Route path="/:lang/contribute" element={<ContributePage />} />

          <Route path="/:lang/roadmaps" element={<RoadmapsPage />} />
          {ROADMAP_IDS.map(id => (
            <Route key={id} path={`/:lang/roadmaps/${id}`} element={<RoadmapPage key={id} roadmapId={id} />} />
          ))}
          <Route path="/:lang/roadmaps/*" element={<Navigate to={roadmapsUrl(language)} replace />} />

          <Route path="/:lang/courses" element={<CoursesPage />} />
          <Route path="/:lang/courses/:course" element={<CoursePage key={stripLanguagePrefix(location.pathname)} />} />
          <Route
            path="/:lang/courses/:course/:lesson"
            element={
              <LessonPage
                key={stripLanguagePrefix(location.pathname)}
                isSidebarOpen={isSidebarOpen}
                onCloseSidebar={closeSidebar}
                onContextChange={setAiContext}
              />
            }
          />
          <Route path="/:lang/courses/*" element={<Navigate to={coursesUrl(language)} replace />} />

          {COLLECTION_IDS.flatMap(id => [
            <Route key={id} path={`/:lang/${id}`} element={<CollectionPage collection={id} />} />,
            <Route
              key={`${id}/topic`}
              path={`/:lang/${id}/:slug`}
              element={
                <TopicPage
                  key={stripLanguagePrefix(location.pathname)}
                  collection={id}
                  isSidebarOpen={isSidebarOpen}
                  onCloseSidebar={closeSidebar}
                  onOpenAi={openAi}
                  onContextChange={setAiContext}
                />
              }
            />
          ])}

          <Route path="*" element={<Navigate to={homeUrl(language)} replace />} />
        </Routes>
      </div>

      <Footer language={language} onOpenSearch={openSearch} />

      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        language={language}
      />

      <AiAssistant
        context={aiContext}
        language={language}
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        onOpen={openAi}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
