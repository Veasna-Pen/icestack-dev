import React from 'react';
import ApproachesSection from '../components/home/ApproachesSection';
import CoursesSection from '../components/home/CoursesSection';
import HeroSection from '../components/home/HeroSection';
import LearningPathSection from '../components/home/LearningPathSection';
import OpenSourceSection from '../components/home/OpenSourceSection';
import RoadmapsSection from '../components/home/RoadmapsSection';
import { useLanguageParam } from '../hooks/useLanguage';
import { usePageMeta } from '../hooks/usePageMeta';
import { homeUrl } from '../utils/routes';
import { useT } from '../hooks/useT';

interface HomePageProps {
  onOpenSearch: () => void;
  onOpenAi: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenSearch, onOpenAi }) => {
  const lang = useLanguageParam();
  const t = useT(lang);

  usePageMeta({ title: t('meta.homeTitle'), description: t('home.heroLead'), path: homeUrl(lang) });

  return (
    <main className="w-full">
      <HeroSection lang={lang} onOpenSearch={onOpenSearch} onOpenAi={onOpenAi} />
      <ApproachesSection lang={lang} />
      <LearningPathSection lang={lang} />
      <RoadmapsSection lang={lang} />
      <CoursesSection lang={lang} />
      <OpenSourceSection lang={lang} />
    </main>
  );
};

export default HomePage;
