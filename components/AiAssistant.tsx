import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { TFunction } from 'i18next';
import { Bot, X, Info } from 'lucide-react';
import { AI_SERVICE_CONNECTED, askAssistant } from '../services/aiService';
import type { AiContext, AiReply, ChatMessage, Language } from '../types';
import { useT } from '../hooks/useT';
import { AI_MIN_REPLY_MS, AI_STICK_TO_BOTTOM_PX } from '../constants/ui';
import { border, focusRing, iconTile, surface } from '../utils/ui';
import { ChatBubble, TypingIndicator, loadAiMarkdown } from './ai/ChatBubble';
import ChatComposer from './ai/ChatComposer';

interface AiAssistantProps {
  context: AiContext;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const greetingFor = (context: AiContext, t: TFunction): string => {
  if (context.kind === 'topic') return t('ai.greetingTopic', { title: context.title });
  if (context.kind === 'lesson') return t('ai.greetingLesson', { title: context.title });
  return t('ai.greetingGeneral');
};

const replyText = (reply: AiReply, t: TFunction): string => {
  if (reply.status === 'ok') return reply.text;
  if (reply.status === 'unavailable') return t('ai.notConnected');
  return t('ai.error');
};

const conversationKey = (context: AiContext): string =>
  context.kind === 'general' ? 'general' : `${context.kind}:${context.collection}:${context.title}`;

// Visibility only transitions on the way out, so an element is focusable the moment it appears.
const reveal = (visible: boolean): string =>
  visible
    ? 'opacity-100 transition-[opacity,transform]'
    : 'opacity-0 invisible pointer-events-none transition-[opacity,transform,visibility]';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let lastMessageId = 0;
const newMessage = (role: ChatMessage['role'], text: string): ChatMessage => ({ id: ++lastMessageId, role, text });

const AiAssistant: React.FC<AiAssistantProps> = ({ context, language, isOpen, onClose, onOpen }) => {
  const t = useT(language);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const stickToBottom = useRef(true);
  const conversation = useRef(0);

  const subjectKey = conversationKey(context);
  const lastSubject = useRef(subjectKey);

  useLayoutEffect(() => {
    if (lastSubject.current === subjectKey) return;
    lastSubject.current = subjectKey;
    if (subjectKey === 'general') return;
    conversation.current += 1;
    stickToBottom.current = true;
    setMessages([]);
    setPending(false);
  }, [subjectKey]);

  useEffect(() => {
    if (!isOpen) return;
    loadAiMarkdown();
    // Skip on touch screens, where focusing would throw the keyboard over the panel.
    if (window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus({ preventScroll: true });
    return () => {
      const active = document.activeElement;
      if (!active || active === document.body || panelRef.current?.contains(active)) {
        launcherRef.current?.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const list = listRef.current;
    const content = contentRef.current;
    if (!list || !content) return;
    const observer = new ResizeObserver(() => {
      if (stickToBottom.current) list.scrollTop = list.scrollHeight;
    });
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    const list = listRef.current;
    if (!list) return;
    stickToBottom.current = list.scrollHeight - list.scrollTop - list.clientHeight < AI_STICK_TO_BOTTOM_PX;
  };

  const handleSend = async () => {
    const query = input.trim();
    if (!query || pending) return;

    const current = conversation.current;
    const history = messages.map(({ role, text }) => ({ role, text }));
    stickToBottom.current = true;
    setMessages(prev => [...prev, newMessage('user', query)]);
    setInput('');
    setPending(true);

    const [reply] = await Promise.all([
      askAssistant({ query, context, history, language }).catch((): AiReply => ({ status: 'error' })),
      wait(AI_MIN_REPLY_MS)
    ]);
    if (current !== conversation.current) return;

    setMessages(prev => [...prev, newMessage('model', replyText(reply, t))]);
    setPending(false);
  };

  const shown = reveal(isOpen);

  return (
    <>
      <button
        ref={launcherRef}
        onClick={onOpen}
        onPointerEnter={loadAiMarkdown}
        inert={isOpen}
        aria-label={t('ai.open')}
        className={`group fixed bottom-6 right-6 z-40 flex items-center gap-2 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/25 duration-200 motion-reduce:transition-none ${reveal(!isOpen)} ${
          isOpen ? 'scale-90' : 'hover:scale-105 active:scale-95'
        } ${focusRing}`}
      >
        <Bot className="w-5 h-5 group-hover:-rotate-6 transition-transform" />
        <span className="text-xs font-semibold pr-1 hidden sm:inline">{t('ai.askAi')}</span>
      </button>

      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 sm:hidden duration-200 ${shown}`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-labelledby="ai-assistant-title"
        inert={!isOpen}
        onKeyDown={e => {
          if (e.key !== 'Escape') return;
          e.stopPropagation();
          onClose();
        }}
        className={`fixed z-50 inset-x-0 bottom-0 h-[85dvh] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[min(620px,calc(100dvh-3rem))] flex flex-col overflow-hidden ${surface.card} border ${border.base} rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-zinc-900/10 dark:shadow-black/50 origin-bottom-right duration-200 ease-out motion-reduce:transition-none ${shown} ${
          isOpen ? 'translate-y-0 sm:scale-100' : 'translate-y-4 sm:translate-y-2 sm:scale-95'
        }`}
      >
        <div className={`shrink-0 flex items-center gap-3 px-4 py-3 ${surface.inset} border-b ${border.base}`}>
          <div className={iconTile}>
            <Bot className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 id="ai-assistant-title" className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100">
              {t('ai.title')}
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
              {t('ai.context')} {context.title}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label={t('common.close')}
            className={`shrink-0 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-colors ${focusRing}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!AI_SERVICE_CONNECTED && (
          <div className="shrink-0 flex items-start gap-2 px-4 py-2.5 border-b border-amber-500/20 bg-amber-500/[0.06] text-[11px] leading-relaxed text-amber-800 dark:text-amber-300">
            <Info className="w-3.5 h-3.5 shrink-0 mt-px" />
            <span>{t('ai.previewNotice')}</span>
          </div>
        )}

        <div
          ref={listRef}
          onScroll={handleScroll}
          aria-live="polite"
          className={`flex-1 min-h-0 overflow-y-auto overscroll-contain ${surface.page}`}
        >
          <div ref={contentRef} className="p-4 space-y-3">
            <ChatBubble role="model" text={greetingFor(context, t)} markdown={false} />
            {messages.map(message => (
              <ChatBubble key={message.id} role={message.role} text={message.text} />
            ))}
            {pending && <TypingIndicator label={t('ai.thinking')} />}
          </div>
        </div>

        <ChatComposer
          language={language}
          value={input}
          canSend={!pending && input.trim().length > 0}
          inputRef={inputRef}
          onChange={setInput}
          onSubmit={handleSend}
        />
      </div>
    </>
  );
};

export default AiAssistant;
