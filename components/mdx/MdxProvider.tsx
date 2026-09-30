import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import mdxComponents from './MdxComponents';

interface MdxContainerProps {
  children: React.ReactNode;
  customComponents?: Record<string, React.ComponentType<any>>;
}

export const MdxContainer: React.FC<MdxContainerProps> = ({ children, customComponents = {} }) => {
  return (
    <MDXProvider components={{ ...mdxComponents, ...customComponents }}>
      <div className="mdx-content prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200">{children}</div>
    </MDXProvider>
  );
};

export default MdxContainer;
