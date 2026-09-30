import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { IconComponent } from '../../types';
import { border, focusRing, radius, surface } from '../../utils/ui';

type Target = { to: string; href?: never } | { href: string; to?: never };

const Anchor: React.FC<Target & { className: string; children: React.ReactNode }> = ({
  to,
  href,
  className,
  children
}) =>
  href ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link to={to!} className={className}>
      {children}
    </Link>
  );

const heading = 'px-2.5 mb-1.5 text-[11px] font-medium text-zinc-400 dark:text-zinc-500';

type MenuItemProps = Target & {
  icon: IconComponent;
  title: string;
  description?: string;
};

export const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, title, description, ...target }) => (
  <li className="relative">
    <Anchor
      {...(target as Target)}
      className={`group flex items-center gap-3 p-2.5 ${radius.control} hover:bg-zinc-100/80 dark:hover:bg-white/[0.04] transition-colors ${focusRing}`}
    >
      <span
        className={`relative w-9 h-9 shrink-0 ${radius.chip} ${surface.card} border ${border.base} shadow-xs flex items-center justify-center text-zinc-600 dark:text-zinc-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/40 transition-colors`}
      >
        <Icon className="w-4 h-4" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1 text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
          {title}
          {target.href && <ArrowUpRight className="w-3 h-3 text-zinc-400" />}
        </span>
        {description && (
          <span className="mt-0.5 block truncate text-[12px] text-zinc-500 dark:text-zinc-400">{description}</span>
        )}
      </span>
    </Anchor>
  </li>
);

interface MenuListProps {
  title?: string;
  /** Draw a line through the icon tiles, for steps that follow one another. */
  path?: boolean;
  children: React.ReactNode;
}

export const MenuList: React.FC<MenuListProps> = ({ title, path = false, children }) => (
  <div>
    {title && <p className={heading}>{title}</p>}
    <ul className="relative">
      {path && (
        // Centred on the icon tiles (p-2.5 + half of w-9), from the first tile to the last.
        <span
          aria-hidden="true"
          className="absolute left-[27.5px] top-7 bottom-7 w-px bg-gradient-to-b from-emerald-500/50 via-zinc-200 to-zinc-200 dark:via-zinc-800 dark:to-zinc-800"
        />
      )}
      {children}
    </ul>
  </div>
);

interface SideListProps {
  title: string;
  children: React.ReactNode;
  footer?: Target & { label: string };
}

export const SideList: React.FC<SideListProps> = ({ title, children, footer }) => (
  <div className="flex flex-col h-full">
    <p className={heading}>{title}</p>
    <ul className="space-y-px">{children}</ul>
    {footer && (
      <Anchor
        {...(footer as Target)}
        className={`group mt-auto pt-3 px-2.5 inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-600 dark:text-emerald-400 ${radius.chip} ${focusRing}`}
      >
        {footer.label}
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </Anchor>
    )}
  </div>
);

export const SideLink: React.FC<Target & { children: React.ReactNode }> = ({ children, ...target }) => (
  <li>
    <Anchor
      {...(target as Target)}
      className={`block px-2.5 py-1.5 ${radius.chip} text-[12.5px] leading-snug text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/[0.04] transition-colors ${focusRing}`}
    >
      {children}
    </Anchor>
  </li>
);

interface MenuPanelProps {
  main: React.ReactNode;
  side: React.ReactNode;
}

const MenuPanel: React.FC<MenuPanelProps> = ({ main, side }) => (
  <div
    className={`w-[600px] grid grid-cols-[minmax(0,1fr)_236px] ${surface.card} border ${border.base} ${radius.card} shadow-2xl shadow-zinc-900/10 dark:shadow-black/60 overflow-hidden`}
  >
    <div className="p-2.5">{main}</div>
    <div className={`p-2.5 pt-3 border-l ${border.hairline} ${surface.inset}`}>{side}</div>
  </div>
);

export default MenuPanel;
