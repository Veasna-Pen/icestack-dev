/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  export const frontmatter: {
    id?: string;
    title?: string;
    description?: string;
    icon?: string;
    order?: number;
    tips?: string[];
    [key: string]: any;
  };
  const MDXContent: ComponentType<{ components?: Record<string, ComponentType<any>> }>;
  export default MDXContent;
}

declare module 'virtual:knowledge-index' {
  export const KNOWLEDGE_INDEX: {
    sourcePath: string;
    frontmatter: Record<string, unknown>;
  }[];
}

declare module 'virtual:course-index' {
  export const COURSE_INDEX: {
    sourcePath: string;
    frontmatter: Record<string, unknown>;
  }[];
}
