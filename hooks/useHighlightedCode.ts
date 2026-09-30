import { useEffect, useState } from 'react';
import { highlightCode } from '../services/highlighter';

export const useHighlightedCode = (code: string | undefined, language?: string): string | null => {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    if (code === undefined) return;
    let current = true;
    setHtml(null);
    highlightCode(code, language)
      .then(result => {
        if (current) setHtml(result);
      })
      .catch(error => {
        if (import.meta.env.DEV) console.warn('[highlight]', error);
      });
    return () => {
      current = false;
    };
  }, [code, language]);

  return html;
};
