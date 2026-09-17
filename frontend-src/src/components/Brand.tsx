import React from 'react';
import { getAssetUrl } from '../utils/assets';

export const Brand: React.FC = () => {
  const config = typeof window !== 'undefined' ? (window as any).DGB_CONFIG : null;
  const profile = config?.settings?.profile;
  const avatarSrc = profile?.avatar_url || getAssetUrl('profilbild.png');
  const authorName = profile?.name || 'Jan Dennis Brüning';

  return (
    <div className="brand">
      <img
        className="brand-portrait"
        src={avatarSrc}
        alt={authorName}
        width="56"
        height="56"
      />
      <div>
        <div className="brand-title">
          Digital Guide <span>Box</span>
        </div>
        <p className="byline">von {authorName}</p>
      </div>
    </div>
  );
};

