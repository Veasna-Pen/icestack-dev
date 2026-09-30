export const HEADER_SCROLL_THRESHOLD = 15;

export const HASH_SCROLL_DELAY = 80;

export const HEADING_ACTIVE_OFFSET = 160;

// Hover intent: open after a short rest on a trigger, close after a short absence.
export const MENU_OPEN_DELAY = 90;
export const MENU_CLOSE_DELAY = 160;

// A reply never appears sooner than this, so the typing indicator does not flash.
export const AI_MIN_REPLY_MS = 400;
export const AI_INPUT_MAX_HEIGHT = 128;
export const AI_STICK_TO_BOTTOM_PX = 48;

export const SHORTCUT_KEYS = {
  search: 'k',
  assistant: 'j'
} as const;
