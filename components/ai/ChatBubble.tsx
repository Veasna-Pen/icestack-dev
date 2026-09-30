import React, { Suspense, lazy } from 'react';
import { Bot } from 'lucide-react';
import type { ChatMessage } from '../../types';
import { border } from '../../utils/ui';

// Lazy, so react-markdown and remark-gfm stay out of the entry chunk. Preloaded when the panel opens.
export const loadAiMarkdown = () => import('./AiMarkdown');
const AiMarkdown = lazy(loadAiMarkdown);

const modelBubble = `rounded-2xl rounded-bl-md border ${border.base} bg-zinc-100 dark:bg-white/[0.03] text-zinc-800 dark:text-zinc-200`;

const Avatar: React.FC = () => (
  <div
    className="w-6 h-6 mt-0.5 shrink-0 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center"
    aria-hidden="true"
  >
    <Bot className="w-3.5 h-3.5" />
  </div>
);

const PlainText: React.FC<{ text: string }> = ({ text }) => <p className="whitespace-pre-wrap">{text}</p>;

interface ChatBubbleProps {
  role: ChatMessage['role'];
  text: string;
  markdown?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ role, text, markdown = true }) => {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] px-3 py-2 rounded-2xl rounded-br-md bg-emerald-600 text-white text-xs leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere]">
          {text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <Avatar />
      <div
        className={`min-w-0 max-w-[85%] px-3 py-2.5 ${modelBubble} text-xs leading-relaxed [overflow-wrap:anywhere]`}
      >
        {markdown ? (
          <Suspense fallback={<PlainText text={text} />}>
            <AiMarkdown text={text} />
          </Suspense>
        ) : (
          <PlainText text={text} />
        )}
      </div>
    </div>
  );
};

export const TypingIndicator: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-start gap-2" role="status">
    <Avatar />
    <div className={`px-3 py-3 ${modelBubble} flex items-center gap-1`}>
      {[0, 150, 300].map(delay => (
        <span
          key={delay}
          className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-bounce motion-reduce:animate-none"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  </div>
);
