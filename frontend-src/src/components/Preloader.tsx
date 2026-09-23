import React, { useState, useEffect } from 'react';
import { getAssetUrl } from '../utils/assets';

interface PreloaderProps {
  active: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ active }) => {
  const [visible, setVisible] = useState(active);

  useEffect(() => {
    if (active) {
      setVisible(true);
      return;
    }
    const timer = window.setTimeout(() => setVisible(false), 240);
    return () => window.clearTimeout(timer);
  }, [active]);

  if (!active && !visible) return null;

  const config = typeof window !== 'undefined' ? (window as any).DGB_CONFIG : null;
  const avatarUrl = config?.settings?.profile?.avatar_url || getAssetUrl('profilbild.png');

  return (
    <div
      className={`box-preloader${active ? '' : ' is-leaving'}`}
      role="status"
      aria-live="polite"
      aria-hidden={!active}
    >
      <span className="sr-only">Deine Digital-Guide-Box wird geöffnet.</span>
      <div className="preloader-stage" aria-hidden="true">
        <div className="preloader-logo-shell">
          <span className="preloader-orbit">
            <svg viewBox="0 0 100 100">
              <path d="M 50 2 A 48 48 0 0 1 84 16" />
            </svg>
          </span>
          <span className="preloader-mark">
            <img
              src={avatarUrl}
              alt=""
              width="128"
              height="128"
              onError={(e) => {
                const fallback = getAssetUrl('profilbild.png');
                if (e.currentTarget.src !== fallback) {
                  e.currentTarget.src = fallback;
                }
              }}
            />
          </span>
        </div>
        <p>
          Sicher und kreativ
          <br />
          im digitalen Zeitalter
        </p>
        <span className="preloader-progress">
          <i />
        </span>
      </div>
    </div>
  );
};
