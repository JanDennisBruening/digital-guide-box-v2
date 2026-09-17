import React from 'react';
import { getAssetUrl } from '../utils/assets';

export const Brand: React.FC<{ avatarUrl?: string; name?: string }> = ({ avatarUrl, name }) => {
  const config = typeof window !== 'undefined' ? (window as any).DGB_CONFIG : null;
  const profileName = name || config?.settings?.profile?.name || 'Jan Dennis Brüning';
  const imgUrl = avatarUrl || config?.settings?.profile?.avatar_url || getAssetUrl('profilbild.png');

  return (
    <div className="brand">
      <img
        className="brand-portrait"
        src={imgUrl}
        alt=""
        width="56"
        height="56"
      />
      <div>
        <div className="brand-title">
          Digital Guide <span>Box</span>
        </div>
        <p className="byline">von {profileName}</p>
      </div>
    </div>
  );
};
