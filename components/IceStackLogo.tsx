import React from 'react';

interface IceStackLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
  badge?: string;
  badgeClassName?: string;
  accentText?: boolean;
  withSpace?: boolean;
}

export const IceStackLogo: React.FC<IceStackLogoProps> = ({
  className = '',
  size = 32,
  showText = false,
  textClassName = 'font-black text-[17px] tracking-wide text-zinc-900 dark:text-white',
  badge = '',
  badgeClassName,
  accentText = true,
  withSpace = false
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div
        className="relative flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <svg viewBox="451 329 660 660" fill="none" className="w-full h-full drop-shadow-xs" aria-hidden="true">
          <circle cx="538.4" cy="785.3" r="72.5" fill="#73B7FE" />
          <line x1="607.4" y1="529.8" x2="745.0" y2="788.4" stroke="#0175E4" strokeWidth="145" strokeLinecap="round" />
          <line x1="817.8" y1="530.0" x2="955.4" y2="788.6" stroke="#023BA6" strokeWidth="145" strokeLinecap="round" />
          <circle cx="1024.7" cy="532.9" r="72.5" fill="#73B7FE" />
        </svg>
      </div>

      {showText && (
        <div className="flex items-center">
          <span
            className={`${textClassName} group-hover:text-[#0175E4] dark:group-hover:text-[#73B7FE] transition-colors`}
          >
            {accentText ? (
              <>
                ICE{withSpace ? ' ' : ''}
                <span className="text-[#0175E4] dark:text-[#73B7FE] group-hover:text-[#023BA6] dark:group-hover:text-sky-300 transition-colors">
                  STACK
                </span>
              </>
            ) : withSpace ? (
              'ICE STACK'
            ) : (
              'ICESTACK'
            )}
          </span>
          {Boolean(badge) && (
            <span
              className={
                badgeClassName ||
                'ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-bold text-[#0175E4] dark:text-[#73B7FE] bg-[#0175E4]/10 dark:bg-[#0175E4]/15 border border-[#0175E4]/25 dark:border-[#73B7FE]/30'
              }
            >
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default IceStackLogo;
