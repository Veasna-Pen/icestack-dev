import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MENU_CLOSE_DELAY, MENU_OPEN_DELAY } from '../constants/ui';

/** A click this soon after a hover opened the menu is the same gesture, not a request to close it. */
const HOVER_CLICK_GRACE = 400;

export const useMegaMenu = <Id extends string>() => {
  const [openId, setOpenId] = useState<Id | null>(null);
  const openRef = useRef<Id | null>(null);
  const openedAt = useRef(0);
  const timer = useRef<number | undefined>(undefined);
  const rootRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const set = useCallback((id: Id | null) => {
    window.clearTimeout(timer.current);
    if (id && id !== openRef.current) openedAt.current = Date.now();
    openRef.current = id;
    setOpenId(id);
  }, []);

  const close = useCallback(() => set(null), [set]);

  const hoverOpen = useCallback(
    (id: Id) => {
      window.clearTimeout(timer.current);
      if (openRef.current) return set(id);
      timer.current = window.setTimeout(() => set(id), MENU_OPEN_DELAY);
    },
    [set]
  );

  const hoverClose = useCallback(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => set(null), MENU_CLOSE_DELAY);
  }, [set]);

  const toggle = useCallback(
    (id: Id) => {
      if (openRef.current === id && Date.now() - openedAt.current < HOVER_CLICK_GRACE) return;
      set(openRef.current === id ? null : id);
    },
    [set]
  );

  useEffect(close, [pathname, close]);

  useEffect(() => {
    if (!openId) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [openId, close]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { openId, rootRef, hoverOpen, hoverClose, toggle, close };
};
