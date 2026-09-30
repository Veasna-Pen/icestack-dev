import React from 'react';
import type { Language } from '../../types';
import MenuPanel, { MenuItem, MenuList, SideLink, SideList } from './MenuPanel';
import { NAV_ICONS } from '../knowledge/icons';
import { PRIMARY_NAV } from '../../constants/navigation';
import { countTopics, listTopics, topicRef } from '../../services/knowledgeService';
import { useT } from '../../hooks/useT';
import { collectionKey, navLabelKey } from '../../utils/i18n';
import { collectionUrl, navUrl, topicUrl } from '../../utils/routes';

const QUESTION_COUNT = 4;

const KnowledgeMenu: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);

  return (
    <MenuPanel
      main={
        <MenuList title={t('header.menu.methodPath')} path>
          {PRIMARY_NAV.map(id => (
            <MenuItem
              key={id}
              to={navUrl(lang, id)}
              icon={NAV_ICONS[id]}
              title={t(navLabelKey(id))}
              description={id === 'how-to-think' ? t('header.menu.howToThinkRole') : t(collectionKey(id, 'role'))}
            />
          ))}
        </MenuList>
      }
      side={
        <SideList
          title={t('header.menu.commonQuestions')}
          footer={{
            to: collectionUrl(lang, 'problems'),
            label: t('home.browseAll', { total: countTopics('problems') })
          }}
        >
          {listTopics(lang, 'problems')
            .slice(0, QUESTION_COUNT)
            .map(topic => (
              <SideLink key={topicRef(topic)} to={topicUrl(lang, topic)}>
                {topic.question}
              </SideLink>
            ))}
        </SideList>
      }
    />
  );
};

export default KnowledgeMenu;
