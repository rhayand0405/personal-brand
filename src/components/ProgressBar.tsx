import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';

/** Whole-video progress, so viewers can see the end is close and stay. */
export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const pct = Math.min(1, frame / Math.max(1, durationInFrames - 1)) * 100;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 10,
        backgroundColor: 'rgba(255,255,255,0.18)',
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          backgroundColor: theme.accent,
        }}
      />
    </div>
  );
};
