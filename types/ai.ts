import type { Language } from './i18n';

export interface AiContext {
  kind: 'general' | 'topic' | 'lesson';
  title: string;
  collection?: string;
}

export interface ChatMessage {
  id: number;
  role: 'user' | 'model';
  text: string;
}

export type ChatTurn = Pick<ChatMessage, 'role' | 'text'>;

export interface AiRequest {
  query: string;
  context: AiContext;
  history: ChatTurn[];
  language: Language;
}

export type AiReply = { status: 'ok'; text: string } | { status: 'unavailable' } | { status: 'error' };
