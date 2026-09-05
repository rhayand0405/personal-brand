export type SceneKind = 'video' | 'image' | 'title';

export type Scene = {
  /** What kind of scene this is. Omit `src` for a `title` scene. */
  kind: SceneKind;
  /** File inside public/scenes, e.g. "gym-01.mp4". Required for video/image. */
  src?: string;
  /** How long this scene stays on screen. Videos auto-detect if omitted. */
  durationInSeconds?: number;
  /** Skip the first N seconds of the source clip (video only). */
  trimStart?: number;
  /** Big punchy line on top of the scene. Keep it under ~6 words. */
  hook?: string;
  /** Subtitle line, animated word by word at the bottom. */
  caption?: string;
  /** Slow push-in on the footage. Defaults to true for video/image. */
  kenBurns?: boolean;
  /** Clip audio volume, 0 to 1. Defaults to 1 (0 for title scenes). */
  volume?: number;
  /** Background for `title` scenes: two hex colors for the gradient. */
  gradient?: [string, string];
};

export type VideoConfig = {
  /** Handle burned into the bottom of every frame. Empty string hides it. */
  handle: string;
  /** Music file inside public/audio, e.g. "beat.mp3". Optional. */
  music?: string;
  /** Music volume, 0 to 1. */
  musicVolume: number;
  /** Cross-scene transition style. */
  transition: 'fade' | 'slide' | 'wipe' | 'none';
  /** Transition length in frames. Ignored when transition is "none". */
  transitionFrames: number;
  /** Thin progress bar across the top of the video. */
  showProgressBar: boolean;
  scenes: Scene[];
};

/** Injected by calculateMetadata once every scene length is known. */
export type ResolvedProps = VideoConfig & {
  resolvedFrames?: number[];
};
