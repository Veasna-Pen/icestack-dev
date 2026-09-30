import { HASH_SCROLL_DELAY } from '../constants/ui';

const headElement = (selector: string, create: () => HTMLElement): HTMLElement =>
  document.head.querySelector<HTMLElement>(selector) ?? document.head.appendChild(create());

export const setHeadMeta = (attribute: 'name' | 'property', key: string, content: string): void => {
  headElement(`meta[${attribute}="${key}"]`, () => {
    const meta = document.createElement('meta');
    meta.setAttribute(attribute, key);
    return meta;
  }).setAttribute('content', content);
};

export const setCanonicalUrl = (href: string): void => {
  headElement('link[rel="canonical"]', () => {
    const link = document.createElement('link');
    link.rel = 'canonical';
    return link;
  }).setAttribute('href', href);
};

export const scrollToHashSoon = (hash: string): (() => void) => {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return () => {};
  const timer = window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
  }, HASH_SCROLL_DELAY);
  return () => window.clearTimeout(timer);
};
