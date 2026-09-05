import React from 'react';
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import type {Scene} from '../types';
import {Captions} from './Captions';
import {Hook} from './Hook';

const DEFAULT_GRADIENT: [string, string] = ['#161616', '#2b2b2b'];

/** Slow push-in. Static footage reads as a dead frame; movement holds the eye. */
const useKenBurns = (enabled: boolean) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  if (!enabled) {
    return 1;
  }
  return interpolate(frame, [0, durationInFrames], [1, 1.08], {
    extrapolateRight: 'clamp',
  });
};

const Media: React.FC<{scene: Scene}> = ({scene}) => {
  const {fps} = useVideoConfig();

  if (scene.kind === 'video' && scene.src) {
    return (
      <OffthreadVideo
        src={staticFile(`scenes/${scene.src}`)}
        trimBefore={Math.round((scene.trimStart ?? 0) * fps)}
        volume={scene.volume ?? 1}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    );
  }

  if (scene.kind === 'image' && scene.src) {
    return (
      <Img
        src={staticFile(`scenes/${scene.src}`)}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    );
  }

  const [from, to] = scene.gradient ?? DEFAULT_GRADIENT;
  return (
    <AbsoluteFill
      style={{background: `linear-gradient(150deg, ${from} 0%, ${to} 100%)`}}
    />
  );
};

export const SceneView: React.FC<{scene: Scene}> = ({scene}) => {
  const isMedia = scene.kind !== 'title';
  const scale = useKenBurns(scene.kenBurns ?? isMedia);

  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <AbsoluteFill style={{transform: `scale(${scale})`}}>
        <Media scene={scene} />
      </AbsoluteFill>

      {/* Scrim: keeps captions legible over bright or busy footage. */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 32%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.62) 100%)',
        }}
      />

      {scene.hook ? <Hook text={scene.hook} center={!isMedia} /> : null}
      {scene.caption ? <Captions text={scene.caption} /> : null}
    </AbsoluteFill>
  );
};

