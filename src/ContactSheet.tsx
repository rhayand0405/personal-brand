import { Video } from "@remotion/media";
import { AbsoluteFill, Composition, staticFile } from "remotion";
import { clips } from "./clips";

// A single still showing one frame from every clip, so the footage can be
// reviewed at a glance (and shared) without opening 30 files.

const COLUMNS = 6;
const CELL_WIDTH = 240;
const CELL_HEIGHT = 426;
const LABEL_HEIGHT = 26;

// Sample ~1s in; the very first frame of a phone clip is often blurred or dark.
const SAMPLE_FRAME = 30;

export const ContactSheet: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#111",
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start",
      }}
    >
      {clips.map((clip, index) => (
        <div
          key={clip.src}
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
            src={staticFile(clip.src)}
            trimBefore={Math.min(
              SAMPLE_FRAME,
              Math.max(0, Math.floor(clip.durationInSeconds * 30) - 1),
            )}
            objectFit="cover"
            style={{ width: CELL_WIDTH, height: CELL_HEIGHT }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,0.75)",
              color: "#fff",
              fontFamily: "monospace",
              fontSize: 20,
              padding: "2px 8px",
            }}
          >
            {index + 1}
          </div>
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
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {clip.src.split("/").pop()} · {clip.durationInSeconds}s
          </div>
        </div>
      ))}
    </AbsoluteFill>
  );
};

export const ContactSheetComposition: React.FC = () => {
  const rows = Math.ceil(clips.length / COLUMNS);

  return (
    <Composition
      id="ContactSheet"
      component={ContactSheet}
      durationInFrames={1}
      fps={30}
      width={COLUMNS * CELL_WIDTH}
      height={Math.max(1, rows) * (CELL_HEIGHT + LABEL_HEIGHT)}
    />
  );
};
