import React, { useRef, useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { useHighlightedCode } from '../hooks/useHighlightedCode';
import { surface, radius, focusRing } from '../utils/ui';

interface CodeBlockProps {
  code?: string;
  children?: React.ReactNode;
  language?: string;
  className?: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, children, language = 'bash', className = '', title }) => {
  const [copied, setCopied] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const highlighted = useHighlightedCode(children === undefined ? code : undefined, language);

  const handleCopy = async () => {
    const text = code ?? bodyRef.current?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className={`group relative ${radius.control} overflow-hidden border border-zinc-200 dark:border-zinc-800 ${surface.code} my-3.5 shadow-sm ${className}`}
    >
      <div
        className={`flex items-center justify-between px-4 py-2 ${surface.codeBar} border-b border-white/[0.06] text-xs`}
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-zinc-400 font-semibold">
            {title || language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2 py-1 ${radius.chip} text-[11px] font-mono font-medium text-zinc-400 hover:text-zinc-100 bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] transition-all active:scale-95 cursor-pointer ${focusRing} focus-visible:ring-offset-[#111520]`}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div
        ref={bodyRef}
        className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-zinc-200 [&_pre]:bg-transparent [&_pre]:m-0 [&_pre]:p-0"
      >
        {children ??
          (highlighted ? (
            // Safe: Shiki text-escapes every token.
            <div
              className="[&_pre]:whitespace-pre-wrap [&_pre]:break-all sm:[&_pre]:break-normal"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          ) : (
            <pre className="whitespace-pre-wrap break-all sm:break-normal">
              <code>{code}</code>
            </pre>
          ))}
      </div>
    </div>
  );
};

export default CodeBlock;
