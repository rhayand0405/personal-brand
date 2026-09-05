import { Video } from "@remotion/media";
import { AbsoluteFill, Composition, staticFile } from "remotion";
import { references } from "./clips";

// Samples the reference video at even intervals into one still, so its look
// and structure can be reviewed without playing the file.

const COLUMNS = 8;
const CELL_WIDTH = 200;
const CELL_HEIGHT = 355;
const LABEL_HEIGHT = 22;
const SAMPLES = 24;
const FPS = 30;

const reference = references[0] ?? null;

export const ReferenceStrip: React.FC = () => {
  if (!reference) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: "#111",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
          fontSize: 32,
        }}
      >
        No reference video found. Name one with &quot;reference&quot; in it.
      </AbsoluteFill>
    );
  }

  const totalFrames = Math.floor(reference.durationInSeconds * FPS);
  const step = Math.max(1, Math.floor(totalFrames / SAMPLES));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#111",
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start",
      }}
    >
      {Array.from({ length: SAMPLES }, (_, index) => {
        const frame = Math.min(index * step, totalFrames - 1);
        return (
          <div
            key={frame}
            style={{
              width: CELL_WIDTH,
              height: CELL_HEIGHT + LABEL_HEIGHT,
              position: "relative",
              backgroundColor: "black",
              borderRight: "2px solid #111",
              borderBottom: "2px solid #111",
            }}
          >
            <Video
              src={staticFile(reference.src)}
              trimBefore={frame}
              objectFit="cover"
              style={{ width: CELL_WIDTH, height: CELL_HEIGHT }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: CELL_WIDTH,
                height: LABEL_HEIGHT,
                color: "#bbb",
                fontFamily: "monospace",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                paddingLeft: 6,
              }}
            >
              {(frame / FPS).toFixed(1)}s
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const ReferenceStripComposition: React.FC = () => {
  const rows = Math.ceil(SAMPLES / COLUMNS);

  return (
    <Composition
      id="ReferenceStrip"
      component={ReferenceStrip}
      durationInFrames={1}
      fps={FPS}
      width={COLUMNS * CELL_WIDTH}
      height={rows * (CELL_HEIGHT + LABEL_HEIGHT)}
    />
  );
};
