import { useEffect, useState, type RefObject } from 'react';
import type { OutlineEntry } from '../types';
import { HEADING_ACTIVE_OFFSET } from '../constants/ui';
import { scrollToHashSoon } from '../utils/dom';

interface Outline {
  entries: OutlineEntry[];
  activeId: string;
}

export const useOutline = (contentRef: RefObject<HTMLElement | null>, key: unknown): Outline => {
  const [entries, setEntries] = useState<OutlineEntry[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    setEntries(
      Array.from(root.querySelectorAll<HTMLElement>('[data-toc]')).map(el => ({
        id: el.id,
        sectionKey: el.dataset.toc || undefined,
        label: el.dataset.label || el.id
      }))
    );
    return scrollToHashSoon(window.location.hash);
  }, [key]);

  useEffect(() => {
    if (entries.length === 0) return;
    const onScroll = () => {
      let current = '';
      for (const entry of entries) {
        const el = document.getElementById(entry.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top > HEADING_ACTIVE_OFFSET) break;
        current = entry.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [entries]);

  return { entries, activeId };
};
