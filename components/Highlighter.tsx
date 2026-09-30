import React from 'react';

interface HighlighterProps {
  text: string;
  query: string;
  className?: string;
}

const Highlighter: React.FC<HighlighterProps> = ({
  text,
  query,
  className = 'bg-yellow-200 dark:bg-yellow-900/50 text-slate-900 dark:text-slate-100 rounded-sm px-0.5'
}) => {
  if (!query || !text) return <>{text}</>;

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const escapedQuery = escapeRegExp(query);
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className={className}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default Highlighter;
