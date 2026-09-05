import React from 'react';
import {theme} from '../theme';

/** Handle burned into the frame so reposts still point back to the account. */
export const Watermark: React.FC<{handle: string}> = ({handle}) => {
  if (!handle) {
    return null;
  }
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 180,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontFamily: theme.body,
        fontWeight: 700,
        fontSize: 34,
        letterSpacing: 1,
        color: 'rgba(255,255,255,0.82)',
        textShadow: '0 2px 12px rgba(0,0,0,0.6)',
      }}
    >
      {handle}
    </div>
  );
};
