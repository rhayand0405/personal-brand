import React from 'react';
import {Composition, staticFile} from 'remotion';
import {getVideoMetadata} from '@remotion/media-utils';
import {ShortVideo} from './Video';
import {videoConfig} from './scenes';
import {FPS, HEIGHT, WIDTH} from './theme';
import type {ResolvedProps, Scene} from './types';

const FALLBACK_SECONDS = 3;

/**
 * Works out how long each scene runs. An explicit `durationInSeconds` always
 * wins; otherwise a video scene is measured so the whole clip plays, minus
 * whatever `trimStart` skips.
 */
const resolveSceneFrames = async (scene: Scene): Promise<number> => {
  if (scene.durationInSeconds) {
    return Math.round(scene.durationInSeconds * FPS);
  }

  if (scene.kind === 'video' && scene.src) {
    try {
      const {durationInSeconds} = await getVideoMetadata(
        staticFile(`scenes/${scene.src}`),
      );
      const usable = durationInSeconds - (scene.trimStart ?? 0);
      if (usable > 0.2) {
        return Math.round(usable * FPS);
      }
    } catch {
      // Unreadable or missing file: fall through to the default below rather
      // than failing the whole render.
    }
  }

  return Math.round(FALLBACK_SECONDS * FPS);
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ShortVideo"
      component={ShortVideo}
      width={WIDTH}
      height={HEIGHT}
      fps={FPS}
      durationInFrames={FPS * 10}
      defaultProps={videoConfig as ResolvedProps}
      calculateMetadata={async ({props}) => {
        const resolvedFrames = await Promise.all(
          props.scenes.map(resolveSceneFrames),
        );

        const total = resolvedFrames.reduce((a, b) => a + b, 0);
        // TransitionSeries overlaps neighbours, so each transition eats frames.
        const overlap =
          props.transition === 'none'
            ? 0
            : Math.max(0, props.scenes.length - 1) * props.transitionFrames;

        return {
          durationInFrames: Math.max(1, total - overlap),
          props: {...props, resolvedFrames},
        };
      }}
    />
  );
};
