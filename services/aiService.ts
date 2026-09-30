import type { AiReply, AiRequest } from '../types';

// The assistant will run as a separate service. Until it exists, every request is unavailable.
export const AI_SERVICE_CONNECTED = false;

export const askAssistant = async (_request: AiRequest): Promise<AiReply> => ({ status: 'unavailable' });
