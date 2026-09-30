import React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from '../CodeBlock';
import { PLAIN_LANGUAGE } from '../../constants/code';
import { nodeText } from '../../utils/text';

/** Compact styles for the 12px chat bubble. Each component drops react-markdown's `node` prop. */
const components: Components = {
  p: ({ node, ...props }) => <p className="my-2 first:mt-0 last:mb-0 leading-relaxed" {...props} />,
  h1: ({ node, ...props }) => <h3 className="mt-3 mb-1.5 first:mt-0 text-[13px] font-bold" {...props} />,
  h2: ({ node, ...props }) => <h3 className="mt-3 mb-1.5 first:mt-0 text-[13px] font-bold" {...props} />,
  h3: ({ node, ...props }) => <h4 className="mt-3 mb-1 first:mt-0 text-xs font-bold" {...props} />,
  h4: ({ node, ...props }) => <h5 className="mt-2.5 mb-1 first:mt-0 text-xs font-semibold" {...props} />,
  ul: ({ node, ...props }) => <ul className="my-2 pl-4 list-disc space-y-1 marker:text-zinc-400" {...props} />,
  ol: ({ node, ...props }) => <ol className="my-2 pl-4 list-decimal space-y-1 marker:text-zinc-400" {...props} />,
  li: ({ node, ...props }) => <li className="pl-0.5 leading-relaxed" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-semibold text-zinc-900 dark:text-zinc-50" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote className="my-2 border-l-2 border-emerald-500/50 pl-2.5 text-zinc-600 dark:text-zinc-400" {...props} />
  ),
  hr: () => <hr className="my-3 border-zinc-200 dark:border-zinc-800" />,
  // Model output is untrusted: new tab, no opener. The default urlTransform strips `javascript:`.
  a: ({ node, ...props }) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-emerald-600 dark:text-emerald-400 underline underline-offset-2 decoration-emerald-500/40 hover:decoration-emerald-500"
    />
  ),
  table: ({ node, ...props }) => (
    <div className="my-2 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full text-[11px]" {...props} />
    </div>
  ),
  th: ({ node, ...props }) => (
    <th
      className="px-2 py-1.5 text-left font-semibold bg-zinc-100 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100"
      {...props}
    />
  ),
  td: ({ node, ...props }) => <td className="px-2 py-1.5 border-t border-zinc-200 dark:border-zinc-800" {...props} />,
  code: ({ node, className, ...props }) => (
    <code
      className="px-1 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-emerald-700 dark:text-emerald-400 font-mono text-[11px]"
      {...props}
    />
  ),
  pre: ({ children }) => {
    const code = React.Children.toArray(children)[0];
    const props = React.isValidElement<{ className?: string; children?: React.ReactNode }>(code) ? code.props : {};
    const language = /language-([\w+#.-]+)/.exec(props.className ?? '')?.[1];
    return <CodeBlock code={nodeText(props.children).replace(/\n$/, '')} language={language ?? PLAIN_LANGUAGE} />;
  }
};

const AiMarkdown: React.FC<{ text: string }> = ({ text }) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
    {text}
  </ReactMarkdown>
);

export default AiMarkdown;
