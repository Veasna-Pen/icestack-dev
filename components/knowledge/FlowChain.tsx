import React from 'react';
import { ChevronRight } from 'lucide-react';

interface FlowChainProps {
  steps: string[];
  tone?: 'muted' | 'accent';
}

export const FlowChain: React.FC<FlowChainProps> = ({ steps, tone = 'muted' }) => (
  <ol className="flex flex-wrap items-center gap-x-1 gap-y-1.5">
    {steps.map((step, i) => (
      <li key={`${step}-${i}`} className="flex items-center gap-1">
        <span
          className={`px-2 py-0.5 rounded-md border text-[11.5px] font-medium whitespace-nowrap ${
            tone === 'accent'
              ? 'bg-emerald-500/[0.08] border-emerald-500/25 text-emerald-700 dark:text-emerald-300'
              : 'bg-zinc-100/80 dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          {step}
        </span>
        {i < steps.length - 1 && (
          <ChevronRight aria-hidden="true" className="w-3 h-3 shrink-0 text-zinc-300 dark:text-zinc-600" />
        )}
      </li>
    ))}
  </ol>
);

export default FlowChain;
