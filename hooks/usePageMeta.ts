import { useEffect } from 'react';
import { absoluteUrl, metaDescription } from '../utils/seo';
import { setCanonicalUrl, setHeadMeta } from '../utils/dom';

export interface PageMeta {
  title: string;
  description: string;
  /** The canonical path: a page shown in its fallback language points at the language it is written in. */
  path: string;
}

export const usePageMeta = (meta: PageMeta | undefined): void => {
  const { title, description = '', path } = meta ?? {};

  useEffect(() => {
    if (!title || path === undefined) return;
    const summary = metaDescription(description);
    const url = absoluteUrl(path);
    document.title = title;
    setHeadMeta('name', 'description', summary);
    setHeadMeta('property', 'og:title', title);
    setHeadMeta('property', 'og:description', summary);
    setHeadMeta('property', 'og:url', url);
    setCanonicalUrl(url);
  }, [title, description, path]);
};
