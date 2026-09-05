import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';

/**
 * Bottom subtitle that reveals word by word across the scene, with the active
 * word highlighted. Reading along is what keeps people watching with sound off.
 */
export const Captions: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return null;
  }

  // Spread the words over the middle 85% of the scene so the last word is not
  // still hitting as the scene cuts away.
  const span = durationInFrames * 0.85;
  const perWord = span / words.length;
  const activeIndex = Math.min(words.length - 1, Math.floor(frame / perWord));

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 360,
        left: 80,
        right: 80,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '14px 18px',
        justifyContent: 'center',
        opacity: fadeIn,
      }}
    >
      {words.map((word, i) => {
        const spoken = i <= activeIndex;
        const isActive = i === activeIndex;
        return (
          <span
            key={`${word}-${i}`}
            style={{
              fontFamily: theme.body,
              fontWeight: 900,
              fontSize: 62,
              lineHeight: 1.15,
              letterSpacing: -0.5,
              textTransform: 'uppercase',
              color: isActive ? theme.accent : theme.ink,
              // Upcoming words stay on screen but dimmed. Hiding them outright
              // would leave their space blank and knock the line off centre.
              opacity: spoken ? 1 : 0.32,
              transform: `scale(${isActive ? 1.06 : 1})`,
              textShadow: theme.shadow,
              WebkitTextStroke: '2px rgba(0,0,0,0.45)',
              paintOrder: 'stroke fill',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
