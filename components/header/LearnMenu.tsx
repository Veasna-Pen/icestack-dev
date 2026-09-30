import React from 'react';
import { GraduationCap, Signpost } from 'lucide-react';
import type { Language } from '../../types';
import MenuPanel, { MenuItem, MenuList, SideLink, SideList } from './MenuPanel';
import { NAV_ICONS } from '../knowledge/icons';
import { listCourses } from '../../services/courseService';
import { useT } from '../../hooks/useT';
import { courseUrl, coursesUrl, howToThinkUrl, roadmapsUrl } from '../../utils/routes';

const COURSE_COUNT = 4;

const LearnMenu: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);

  return (
    <MenuPanel
      main={
        <MenuList title={t('header.menu.explore')}>
          <MenuItem
            to={roadmapsUrl(lang)}
            icon={Signpost}
            title={t('nav.roadmaps')}
            description={t('search.roadmapsDescription')}
          />
          <MenuItem
            to={coursesUrl(lang)}
            icon={GraduationCap}
            title={t('nav.courses')}
            description={t('search.coursesDescription')}
          />
          <MenuItem
            to={howToThinkUrl(lang)}
            icon={NAV_ICONS['how-to-think']}
            title={t('nav.howToThink')}
            description={t('search.howToThinkDescription')}
          />
        </MenuList>
      }
      side={
        <SideList title={t('header.menu.startCourse')} footer={{ to: coursesUrl(lang), label: t('courses.home.cta') }}>
          {listCourses(lang)
            .slice(0, COURSE_COUNT)
            .map(course => (
              <SideLink key={course.slug} to={courseUrl(lang, course.slug)}>
                {course.title}
              </SideLink>
            ))}
        </SideList>
      }
    />
  );
};

export default LearnMenu;
