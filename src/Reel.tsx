import { AbsoluteFill, Composition } from "remotion";

// Placeholder. Running `npm run scan` overwrites this file with one
// TransitionSeries.Sequence per clip found in public/.

export const Reel: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "sans-serif",
        fontSize: 56,
        padding: 80,
      }}
    >
      Put your clips in public/, then run npm run scan
    </AbsoluteFill>
  );
};

export const ReelComposition: React.FC = () => {
  return (
    <Composition
      id="Reel"
      component={Reel}
      durationInFrames={90}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
