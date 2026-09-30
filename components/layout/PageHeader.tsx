import React from 'react';
import type { IconComponent, Language } from '../../types';
import { eyebrowFor, leadText, titleSizeFor } from '../../utils/ui';

interface PageHeaderProps {
  lang: Language;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  icon?: IconComponent;
  children?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  lang,
  eyebrow,
  title,
  lead,
  icon: Icon,
  children,
  className = ''
}) => (
  <header className={`max-w-3xl ${className}`}>
    <p className={`${eyebrowFor(lang, true)} mb-3 tabular-nums`}>{eyebrow}</p>
    <h1 className={`flex items-center gap-3 font-extrabold text-zinc-900 dark:text-white ${titleSizeFor(lang)}`}>
      {Icon && <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-500 shrink-0" />}
      {title}
    </h1>
    {lead && <p className={`mt-4 ${leadText}`}>{lead}</p>}
    {children && <div className="mt-6">{children}</div>}
  </header>
);

export default PageHeader;
