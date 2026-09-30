import React from 'react';
import type { Language } from '../../types';
import { eyebrowFor, leadText, sectionTitle } from '../../utils/ui';

interface SectionHeaderProps {
  lang: Language;
  title: React.ReactNode;
  eyebrow?: React.ReactNode;
  body?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ lang, title, eyebrow, body, action, className = '' }) => {
  const heading = (
    <div className="max-w-2xl">
      {eyebrow && <p className={`${eyebrowFor(lang, true)} mb-2`}>{eyebrow}</p>}
      <h2 className={sectionTitle}>{title}</h2>
      {body && <p className={`mt-3 ${leadText}`}>{body}</p>}
    </div>
  );

  if (!action) return <div className={className}>{heading}</div>;

  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-5 ${className}`}>
      {heading}
      <div className="shrink-0">{action}</div>
    </div>
  );
};

export default SectionHeader;
