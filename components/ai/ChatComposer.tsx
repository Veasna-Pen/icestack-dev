import React, { useLayoutEffect } from 'react';
import { Send } from 'lucide-react';
import type { Language } from '../../types';
import { useT } from '../../hooks/useT';
import { AI_INPUT_MAX_HEIGHT } from '../../constants/ui';
import { border, focusRing, radius, surface } from '../../utils/ui';

interface ChatComposerProps {
  language: Language;
  value: string;
  canSend: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const ChatComposer: React.FC<ChatComposerProps> = ({ language, value, canSend, inputRef, onChange, onSubmit }) => {
  const t = useT(language);

  useLayoutEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, AI_INPUT_MAX_HEIGHT)}px`;
  }, [value, inputRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter while an input method (Khmer, for one) is composing confirms the word, not the message.
    if (e.key !== 'Enter' || e.shiftKey || e.nativeEvent.isComposing) return;
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      className={`shrink-0 p-3 ${surface.inset} border-t ${border.base}`}
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div
        className={`flex items-end gap-2 pl-3 pr-1.5 py-1.5 ${surface.page} border border-zinc-300 dark:border-zinc-700 ${radius.control} focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-colors`}
      >
        <textarea
          ref={inputRef}
          rows={1}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('ai.placeholder')}
          aria-label={t('ai.placeholder')}
          className="flex-1 min-w-0 resize-none bg-transparent py-1 text-xs leading-5 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label={t('ai.send')}
          className={`shrink-0 p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors ${focusRing}`}
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="hidden sm:block mt-1.5 px-1 text-[10px] text-zinc-400 dark:text-zinc-500">{t('ai.inputHint')}</p>
    </form>
  );
};

export default ChatComposer;
