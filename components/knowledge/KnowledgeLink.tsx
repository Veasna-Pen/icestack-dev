import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const linkClass = 'text-emerald-600 dark:text-emerald-400 hover:underline font-medium';

export const KnowledgeLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href = '', children, ...props }) => {
  const { pathname } = useLocation();

  if (/^([a-z]+:)?\/\//i.test(href) || href.startsWith('mailto:')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1`} {...props}>
        <span>{children}</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  }

  if (!href || href.startsWith('#')) {
    return (
      <a href={href} className={linkClass} {...props}>
        {children}
      </a>
    );
  }

  // Resolve from the page's folder (GitHub semantics), then map the repo path onto a site path.
  const url = new URL(href, `${window.location.origin}${pathname.replace(/\/?$/, '/')}`);
  const to =
    url.pathname
      .replace(/\/(en|km)\.mdx$/, '')
      .replace(/\/knowledge\//, '/')
      .replace(/(\/courses\/[^/]+\/)\d+-/, '$1')
      .replace(/\/$/, '') + url.hash;

  return (
    <Link to={to} className={linkClass}>
      {children}
    </Link>
  );
};

export default KnowledgeLink;
