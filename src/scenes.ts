import type {VideoConfig} from './types';

/**
 * THIS IS THE ONLY FILE YOU NEED TO EDIT.
 *
 * Drop your clips into public/scenes/ and list them below in order.
 * Then run `npm run render`.
 *
 * A scene with a `src` plays that clip. A scene without one is a title card.
 * Leave `durationInSeconds` off a video scene and the full clip is used.
 *
 * Example with real footage:
 *
 *   {kind: 'video', src: 'gym-01.mp4', trimStart: 2, durationInSeconds: 3.5,
 *    hook: 'Día 1 de 90', caption: 'Empezamos en 94 kilos'},
 *   {kind: 'image', src: 'before.jpg', durationInSeconds: 2},
 */
export const videoConfig: VideoConfig = {
  handle: '@rhayan',
  // Drop a track in public/audio and name it here, e.g. music: 'beat.mp3'
  music: undefined,
  musicVolume: 0.25,
  transition: 'fade',
  transitionFrames: 8,
  showProgressBar: true,

  scenes: [
    {
      kind: 'title',
      durationInSeconds: 2.4,
      gradient: ['#0F0F0F', '#3A2E00'],
      hook: '90 días\npara cambiar\nmi físico',
      caption: 'Sin filtros, sin excusas',
    },
    {
      kind: 'title',
      durationInSeconds: 2.6,
      gradient: ['#101418', '#1E3A5F'],
      hook: 'Día 1',
      caption: '94 kilos y sin definición',
    },
    {
      kind: 'title',
      durationInSeconds: 2.6,
      gradient: ['#12100E', '#4A2C00'],
      hook: 'El plan',
      caption: 'Pesas 5 días fútbol y padel el resto',
    },
    {
      kind: 'title',
      durationInSeconds: 2.6,
      gradient: ['#0D1210', '#14432E'],
      hook: 'La comida',
      caption: '180 gramos de proteína cada día',
    },
    {
      kind: 'title',
      durationInSeconds: 2.8,
      gradient: ['#160D0D', '#5A1616'],
      hook: 'Lo difícil',
      caption: 'No es el gym es hacerlo cuando no tienes ganas',
    },
    {
      kind: 'title',
      durationInSeconds: 3,
      gradient: ['#0F0F0F', '#3A2E00'],
      hook: 'Sígueme\ny lo vemos\njuntos',
      caption: 'Actualizo cada semana',
    },
  ],
};
