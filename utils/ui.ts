import type { Language } from '../types';

/** Dark surface ramp. Map every background onto one of these roles, never a hand-written hex. */
export const surface = {
  page: 'bg-white dark:bg-[#09090b]',
  pageBlur: 'bg-white/95 dark:bg-[#09090b]/95',
  card: 'bg-white dark:bg-[#0e0e11]',
  cardBlur: 'bg-white/90 dark:bg-[#0e0e11]/90',
  bar: 'bg-zinc-50 dark:bg-[#0b0b0e]',
  inset: 'bg-zinc-50/60 dark:bg-white/[0.015]',
  code: 'bg-[#0c0e14]',
  codeBar: 'bg-[#111520]'
} as const;

export const border = {
  base: 'border-zinc-200 dark:border-zinc-800',
  soft: 'border-zinc-200/80 dark:border-zinc-800/80',
  hairline: 'border-zinc-100 dark:border-zinc-800/80'
} as const;

export const radius = {
  card: 'rounded-2xl',
  control: 'rounded-xl',
  chip: 'rounded-lg',
  pill: 'rounded-full'
} as const;

/** One container for header, footer and pages, so everything shares a left edge. */
export const container = 'max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8';
export const pageY = 'py-10 sm:py-14';
export const sectionGap = 'mt-16 sm:mt-20';
export const sectionY = 'py-16 sm:py-20';

export const gridGap = 'gap-4';

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#09090b]';

export const eyebrow =
  'text-[10px] font-mono font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-500';

export const eyebrowAccent =
  'text-[10px] font-mono font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400';

export const eyebrowFor = (lang: Language, accent = false): string =>
  lang === 'km'
    ? `text-[12px] font-semibold ${accent ? 'text-emerald-700 dark:text-emerald-400' : 'text-zinc-500 dark:text-zinc-400'}`
    : accent
      ? eyebrowAccent
      : eyebrow;

export const kbd =
  'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-800/80 font-mono text-[10px] font-semibold text-zinc-500 dark:text-zinc-400';

export const cardInteractive = `${surface.card} border ${border.base} ${radius.card} hover:border-emerald-500/50 dark:hover:border-emerald-500/40 hover:shadow-md hover:shadow-zinc-900/[0.04] dark:hover:shadow-black/20 transition-all duration-200`;

export const cardStatic = `${surface.card} border ${border.base} ${radius.card}`;

export const cardAccent = `${radius.card} border border-emerald-500/40 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.05]`;

export const cardTitle = 'text-[15px] font-bold text-zinc-900 dark:text-white leading-snug';

export const iconTile = `w-8 h-8 shrink-0 ${radius.control} bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center`;

export const leadText = 'text-[15px] sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed';

export const iconButton = `p-2 ${radius.control} text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 border ${border.soft} transition-all cursor-pointer ${focusRing}`;

export const chip = (selected: boolean) =>
  `inline-flex items-center gap-2 ${radius.control} border text-[13px] font-semibold transition-all cursor-pointer ${focusRing} ${
    selected
      ? 'border-emerald-500 bg-emerald-500/[0.09] text-zinc-900 dark:text-white shadow-sm'
      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200'
  }`;

export const buttonPrimary = `inline-flex items-center justify-center gap-2 px-4 py-2.5 ${radius.control} bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[13px] font-semibold shadow-sm shadow-emerald-600/20 transition-colors cursor-pointer ${focusRing}`;

export const stepNumber = (n: number): string => String(n).padStart(2, '0');

export const buttonSecondary = `inline-flex items-center gap-2 px-4 py-2.5 ${radius.control} border ${border.base} text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors ${focusRing}`;

export const sectionTitle =
  'text-2xl sm:text-[1.9rem] font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight';

/** A page `h1`'s scale. Khmer is smaller with looser leading, for stacked consonants. */
const TITLE_SIZES = {
  hero: {
    en: 'text-[2.4rem] sm:text-[3.4rem] lg:text-[4rem] leading-[1.02] tracking-[-0.035em]',
    km: 'text-[2rem] sm:text-[2.6rem] lg:text-[3rem] leading-[1.3] tracking-normal'
  },
  page: {
    en: 'text-3xl sm:text-[2.7rem] tracking-tight leading-[1.08]',
    km: 'text-[1.8rem] sm:text-[2.3rem] leading-[1.35]'
  },
  topic: {
    en: 'text-3xl sm:text-[2.5rem] leading-[1.12] tracking-tight',
    km: 'text-[1.7rem] sm:text-[2.1rem] leading-[1.35]'
  }
} as const;

export type TitleSize = keyof typeof TITLE_SIZES;

export const titleSizeFor = (lang: Language, size: TitleSize = 'page'): string => TITLE_SIZES[size][lang];

export const tagChip =
  'px-1.5 py-0.5 rounded bg-zinc-100/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/40';
