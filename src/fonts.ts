import {continueRender, delayRender, staticFile} from 'remotion';

const faces: [string, string, number][] = [
  ['Inter', 'fonts/Inter-400.ttf', 400],
  ['Inter', 'fonts/Inter-700.ttf', 700],
  ['Inter', 'fonts/Inter-900.ttf', 900],
  ['Anton', 'fonts/Anton-400.ttf', 400],
];

let started = false;

/**
 * Loads the bundled font files before the first frame is captured, so text
 * never renders in a fallback face. Fonts ship in public/fonts, which keeps
 * renders deterministic and offline.
 */
export const loadFonts = () => {
  if (started || typeof document === 'undefined') {
    return;
  }
  started = true;
  const handle = delayRender('Loading fonts');
  Promise.all(
    faces.map(async ([family, path, weight]) => {
      const face = new FontFace(family, `url(${staticFile(path)})`, {
        weight: String(weight),
      });
      await face.load();
      document.fonts.add(face);
    }),
  )
    .then(() => continueRender(handle))
    .catch(() => continueRender(handle));
};
