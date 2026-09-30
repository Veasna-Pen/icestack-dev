import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { focusRing, radius } from '../../utils/ui';

interface NavMenuProps {
  id: string;
  label: string;
  isActive: boolean;
  isOpen: boolean;
  onHoverOpen: () => void;
  onHoverClose: () => void;
  onToggle: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

export const navTriggerClass = (highlighted: boolean) =>
  `inline-flex items-center gap-1 whitespace-nowrap px-2.5 py-1.5 ${radius.chip} text-[13px] font-medium transition-colors cursor-pointer ${focusRing} ${
    highlighted
      ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800/70'
      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
  }`;

/** True one frame after `open` turns on, so the panel can transition in from its hidden state. */
const useEntered = (open: boolean): boolean => {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (!open) return setEntered(false);
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [open]);
  return entered;
};

const NavMenu: React.FC<NavMenuProps> = ({
  id,
  label,
  isActive,
  isOpen,
  onHoverOpen,
  onHoverClose,
  onToggle,
  onClose,
  children
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const entered = useEntered(isOpen);
  const panelId = `menu-${id}`;

  return (
    <div
      className="relative"
      onMouseEnter={onHoverOpen}
      onMouseLeave={onHoverClose}
      onKeyDown={event => {
        if (event.key === 'Escape' && isOpen) {
          event.stopPropagation();
          onClose();
          triggerRef.current?.focus();
        }
      }}
      onBlur={event => {
        if (isOpen && !event.currentTarget.contains(event.relatedTarget as Node | null)) onClose();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={navTriggerClass(isActive || isOpen)}
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          id={panelId}
          // pt-3 keeps the gap under the header inside the hover area.
          className={`absolute left-0 top-full pt-3 z-50 origin-top-left transition duration-150 ease-out motion-reduce:transition-none ${
            entered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-1 scale-[0.98]'
          }`}
          onClick={event => {
            if ((event.target as HTMLElement).closest('a')) onClose();
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default NavMenu;
