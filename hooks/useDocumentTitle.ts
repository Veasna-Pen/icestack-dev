import { useEffect } from 'react';
import { SITE_NAME } from '../constants/site';

export const pageTitle = (name: string): string => `${name} · ${SITE_NAME}`;
export const useDocumentTitle = (title: string | undefined): void => {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);
};
