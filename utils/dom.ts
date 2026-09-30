import { HASH_SCROLL_DELAY } from '../constants/ui';

export const scrollToHashSoon = (hash: string): (() => void) => {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return () => {};
  const timer = window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
  }, HASH_SCROLL_DELAY);
  return () => window.clearTimeout(timer);
};
