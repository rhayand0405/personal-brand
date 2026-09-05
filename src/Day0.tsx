import { AbsoluteFill, Composition } from "remotion";

// Placeholder. Running `npm run scan:day0` overwrites this with one section
// per numbered clip found in public/day0/.

export const Day0: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "sans-serif",
        fontSize: 52,
        padding: 80,
      }}
    >
      Put 01.mov … 07.mov in public/day0/, then run npm run scan:day0
    </AbsoluteFill>
  );
};

export const Day0Composition: React.FC = () => {
  return (
    <Composition
      id="Day0"
      component={Day0}
      durationInFrames={90}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
