import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';

/**
 * The line that has to earn the first second. Pops in on a spring, sits in the
 * upper third so it never fights with a face in the centre of the frame.
 */
export const Hook: React.FC<{text: string; center?: boolean}> = ({
  text,
  center = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = spring({frame, fps, config: {damping: 14, mass: 0.7}});
  const scale = interpolate(enter, [0, 1], [0.82, 1]);
  const lift = interpolate(enter, [0, 1], [40, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        // Over footage the hook sits in the upper third, clear of a face in the
        // middle of the frame. A title card has nothing to clear, so it centres.
        top: center ? 0 : 260,
        bottom: center ? 0 : undefined,
        left: 70,
        right: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateY(${lift}px) scale(${scale})`,
        opacity: enter,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: theme.display,
          fontSize: 108,
          lineHeight: 1.14,
          letterSpacing: -1,
          textTransform: 'uppercase',
          textAlign: 'center',
          whiteSpace: 'pre-line',
          color: theme.ink,
          textShadow: theme.shadow,
          WebkitTextStroke: '3px rgba(0,0,0,0.35)',
          paintOrder: 'stroke fill',
        }}
      >
        {text}
      </h1>
    </div>
  );
};
