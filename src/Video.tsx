import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from '@remotion/transitions';
import type {TransitionTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {ProgressBar} from './components/ProgressBar';
import {SceneView} from './components/SceneView';
import {Watermark} from './components/Watermark';
import {loadFonts} from './fonts';
import type {ResolvedProps} from './types';

loadFonts();

/**
 * Each branch builds the element with a concrete presentation type. Returning a
 * union of presentations instead would not typecheck, and wrapping this in a
 * component would hide the transition from TransitionSeries, which inspects its
 * own children.
 */
const renderTransition = (
  kind: ResolvedProps['transition'],
  timing: TransitionTiming,
  key: string,
) => {
  switch (kind) {
    case 'slide':
      return (
        <TransitionSeries.Transition
          key={key}
          presentation={slide()}
          timing={timing}
        />
      );
    case 'wipe':
      return (
        <TransitionSeries.Transition
          key={key}
          presentation={wipe()}
          timing={timing}
        />
      );
    default:
      return (
        <TransitionSeries.Transition
          key={key}
          presentation={fade()}
          timing={timing}
        />
      );
  }
};

export const ShortVideo: React.FC<ResolvedProps> = (props) => {
  const {
    scenes,
    resolvedFrames = [],
    transition,
    transitionFrames,
    handle,
    music,
    musicVolume,
    showProgressBar,
  } = props;

  const useTransition = transition !== 'none' && transitionFrames > 0;
  const timing =
    transition === 'slide'
      ? springTiming({config: {damping: 200}, durationInFrames: transitionFrames})
      : linearTiming({durationInFrames: transitionFrames});

  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <TransitionSeries>
        {scenes.map((scene, i) => {
          const durationInFrames = resolvedFrames[i] ?? 90;
          return (
            <React.Fragment key={`scene-${i}`}>
              {i > 0 && useTransition
                ? renderTransition(transition, timing, `t-${i}`)
                : null}
              <TransitionSeries.Sequence durationInFrames={durationInFrames}>
                <SceneView scene={scene} />
              </TransitionSeries.Sequence>
            </React.Fragment>
          );
        })}
      </TransitionSeries>

      {music ? (
        <Audio src={staticFile(`audio/${music}`)} volume={musicVolume} />
      ) : null}

      <Watermark handle={handle} />
      {showProgressBar ? <ProgressBar /> : null}
    </AbsoluteFill>
  );
};
