import React from 'react';
import CodeBlock from '../CodeBlock';
import { Lightbulb, AlertTriangle, Info, CheckCircle2, Terminal, Copy, Check, Hash, ExternalLink } from 'lucide-react';
import { slugify } from '../../utils/text';

export const CommandBlockComponent: React.FC<{
  text: string;
  description?: string;
  language?: string;
  title?: string;
}> = ({ text, description, language = 'bash', title }) => {
  return (
    <div className="my-5">
      {description && (
        <div className="flex items-center gap-2 mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>{description}</span>
        </div>
      )}
      <CodeBlock code={text} language={language} title={title} />
    </div>
  );
};

export const Callout: React.FC<{
  type?: 'tip' | 'warning' | 'info' | 'success';
  title?: string;
  children: React.ReactNode;
}> = ({ type = 'tip', title, children }) => {
  const configs = {
    tip: {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200',
      iconBg: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
      icon: Lightbulb,
      defaultTitle: 'Tip'
    },
    warning: {
      bg: 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200',
      iconBg: 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
      icon: AlertTriangle,
      defaultTitle: 'Warning'
    },
    info: {
      bg: 'bg-blue-500/10 border-blue-500/30 text-blue-900 dark:text-blue-200',
      iconBg: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
      icon: Info,
      defaultTitle: 'Note'
    },
    success: {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200',
      iconBg: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
      icon: CheckCircle2,
      defaultTitle: 'Success'
    }
  };

  const config = configs[type] || configs.tip;
  const IconComponent = config.icon;

  return (
    <div className={`p-4 rounded-xl border ${config.bg} my-5 transition-colors`}>
      <div className="flex items-start gap-3">
        <div className={`p-1.5 rounded-lg ${config.iconBg} shrink-0 mt-0.5`}>
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0 text-sm leading-relaxed">
          <div className="font-semibold mb-1">{title || config.defaultTitle}</div>
          <div className="text-zinc-700 dark:text-zinc-300">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const mdxComponents = {
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(children);
    return (
      <h2
        id={id}
        className="group flex items-center gap-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-10 mb-4 tracking-tight scroll-mt-24 border-b border-zinc-200 dark:border-zinc-800 pb-2"
        {...props}
      >
        <span>{children}</span>
        <a
          href={`#${id}`}
          className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-emerald-500 transition-opacity p-1"
          aria-label="Direct link to heading"
        >
          <Hash className="w-4 h-4" />
        </a>
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(children);
    return (
      <h3
        id={id}
        className="group flex items-center gap-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3 tracking-tight scroll-mt-24"
        {...props}
      >
        <span>{children}</span>
        <a
          href={`#${id}`}
          className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-emerald-500 transition-opacity p-1"
          aria-label="Direct link to heading"
        >
          <Hash className="w-3.5 h-3.5" />
        </a>
      </h3>
    );
  },
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed my-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-outside pl-6 space-y-2 text-zinc-700 dark:text-zinc-300 my-4" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-outside pl-6 space-y-2 text-zinc-700 dark:text-zinc-300 my-4" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li className="leading-relaxed pl-1" {...props} />,
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-emerald-500/60 pl-4 italic text-zinc-600 dark:text-zinc-400 my-4"
      {...props}
    />
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http') || href?.startsWith('//');
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium inline-flex items-center gap-1"
        {...props}
      >
        <span>{children}</span>
        {isExternal && <ExternalLink className="w-3 h-3" />}
      </a>
    );
  },
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6 border border-zinc-200 dark:border-zinc-800 rounded-xl">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-sm" {...props} />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-2.5 text-left font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/60"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-2.5 border-t border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
      {...props}
    />
  ),
  hr: () => <hr className="border-zinc-200 dark:border-zinc-800 my-8" />,
  pre: ({ children, className, ...props }: any) => {
    // MDXProvider replaces the <code> child's type, so read the language from Shiki's class.
    const codeChild = React.Children.toArray(children).find(
      (child: any) => React.isValidElement(child) && typeof (child.props as any)?.className === 'string'
    ) as React.ReactElement<any> | undefined;

    const language = ((codeChild?.props?.className as string) || '')
      .split(' ')
      .find(name => name.startsWith('language-'))
      ?.replace('language-', '');
    const title = codeChild?.props?.title || codeChild?.props?.['data-filename'];

    return (
      <CodeBlock language={language} title={title}>
        <pre className={className} {...props}>
          {children}
        </pre>
      </CodeBlock>
    );
  },

  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    if (!className) {
      return (
        <code
          className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-emerald-600 dark:text-emerald-400 font-mono text-[0.875em] border border-zinc-200/60 dark:border-zinc-700/50"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  CommandBlock: CommandBlockComponent,
  Callout: Callout,
  Tip: (props: any) => <Callout type="tip" {...props} />,
  Warning: (props: any) => <Callout type="warning" {...props} />,
  Info: (props: any) => <Callout type="info" {...props} />
};

export default mdxComponents;
