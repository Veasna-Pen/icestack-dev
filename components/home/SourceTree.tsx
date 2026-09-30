import React from 'react';
import { Github } from 'lucide-react';
import type { Language } from '../../types';
import { countTopics, listTopics } from '../../services/knowledgeService';
import { listCourses, listLessons } from '../../services/courseService';
import { COLLECTION_IDS } from '../../constants/collections';
import { REPO_URL } from '../../constants/site';
import { useT } from '../../hooks/useT';
import { radius, surface } from '../../utils/ui';

const SourceTree: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = useT(lang);
  const sample = listTopics('en', 'problems')[0];
  const lines: { text: string; note?: string; tone: 'dir' | 'file' | 'muted' }[] = [
    { text: 'knowledge/', tone: 'dir' }
  ];

  COLLECTION_IDS.forEach(id => {
    lines.push({ text: `├── ${id}/`, note: t('common.topicCount', { count: countTopics(id) }), tone: 'dir' });
    if (id === 'problems' && sample) {
      lines.push(
        { text: `│   ├── ${sample.slug}/`, tone: 'dir' },
        { text: '│   │   ├── en.mdx', tone: 'file' },
        { text: '│   │   └── km.mdx', tone: 'file' },
        { text: '│   └── …', tone: 'muted' }
      );
    }
  });
  lines.push({ text: '├── README.md', tone: 'file' }, { text: '└── TEMPLATE.md', tone: 'file' });

  const courses = listCourses('en');
  if (courses.length > 0) {
    const [first] = courses;
    lines.push(
      { text: 'courses/', note: t('courses.courseCount', { count: courses.length }), tone: 'dir' },
      {
        text: `├── ${first.slug}/`,
        note: t('courses.lessonCount', { count: listLessons(first.slug, 'en').length }),
        tone: 'dir'
      },
      { text: '└── …', tone: 'muted' }
    );
  }

  const tone = { dir: 'text-sky-300', file: 'text-zinc-300', muted: 'text-zinc-500' };

  return (
    <div
      className={`${radius.card} overflow-hidden border border-zinc-200 dark:border-zinc-800 ${surface.code} shadow-sm`}
    >
      <div className={`flex items-center gap-2 px-4 py-2.5 ${surface.codeBar} border-b border-white/[0.06]`}>
        <Github className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        <span className="font-mono text-[11px] text-zinc-400 truncate">{REPO_URL.replace(/^https:\/\//, '')}</span>
      </div>
      <div className="p-4 sm:p-5 font-mono text-[12.5px] leading-[1.75] overflow-x-auto">
        {lines.map((line, i) => (
          <div key={i} className="flex items-center justify-between gap-6 whitespace-pre">
            <span className={tone[line.tone]}>{line.text}</span>
            {line.note && <span className="text-[11px] text-emerald-400/80">{line.note}</span>}
          </div>
        ))}
      </div>
      <div
        className={`px-4 sm:px-5 py-3 border-t border-white/[0.06] text-[11.5px] text-zinc-400 leading-relaxed ${surface.codeBar}`}
      >
        {t('home.openSource.sourceTreeCaption')}
      </div>
    </div>
  );
};

export default SourceTree;
