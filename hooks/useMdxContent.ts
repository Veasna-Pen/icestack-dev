import { useEffect, useState, type ComponentType } from 'react';
import type { MdxLoader } from '../types';

type MdxContent = ComponentType<Record<string, unknown>> | null;

export const useMdxContent = (load: MdxLoader | undefined): MdxContent => {
  const [Content, setContent] = useState<MdxContent>(null);

  useEffect(() => {
    if (!load) return;
    let current = true;
    setContent(null);
    load().then(module => {
      if (current) setContent(() => module.default);
    });
    return () => {
      current = false;
    };
  }, [load]);

  return Content;
};
