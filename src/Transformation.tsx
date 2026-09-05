import { Video } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill, Composition, staticFile } from "remotion";

// Hand-authored edit, modelled on the reference video's structure:
// talking-head hook -> title -> weight reveal -> commitment -> routine B-roll.
// `npm run scan` does not touch this file; it only regenerates Reel.tsx.

const YELLOW = "#FFD400";

const fill: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

// The reference keeps text in the upper third, heavy and outlined, so it stays
// readable over bright gym footage and above the platform's caption UI.
const Caption: React.FC<{
  children: React.ReactNode;
  top?: number;
}> = ({ children, top = 260 }) => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: top,
        paddingLeft: 80,
        paddingRight: 80,
      }}
    >
      <div
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 900,
          fontSize: 86,
          lineHeight: 1.05,
          color: "white",
          textAlign: "center",
          textShadow: "0 6px 24px rgba(0,0,0,0.75)",
          letterSpacing: -1,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

const TextCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      <div
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 900,
          fontSize: 96,
          lineHeight: 1.1,
          color: "white",
          textAlign: "center",
          letterSpacing: -2,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const Transformation: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <TransitionSeries name="Transformation">
        <TransitionSeries.Sequence name="Hook — talking" durationInFrames={48}>
          <Video
            src={staticFile("reels/IMG_4220.mov")}
            trimBefore={45}
            objectFit="cover"
            style={fill}
          />
          <Caption>
            CAMBIO
            <br />
            <span style={{ color: YELLOW }}>FÍSICO</span>
          </Caption>
        </TransitionSeries.Sequence>

        <TransitionSeries.Sequence name="Body — day 1" durationInFrames={32}>
          <Video
            src={staticFile("reels/IMG_6161.MOV")}
            trimBefore={20}
            objectFit="cover"
            style={fill}
          />
          <Caption>DÍA 1</Caption>
        </TransitionSeries.Sequence>

        <TransitionSeries.Sequence name="Scale — 97kg" durationInFrames={48}>
          <Video
            src={staticFile("reels/IMG_2791 2.MOV")}
            trimBefore={40}
            objectFit="cover"
            style={fill}
          />
          <Caption>
            PESANDO
            <br />
            <span style={{ color: YELLOW }}>97.7 KG</span>
          </Caption>
        </TransitionSeries.Sequence>

        <TransitionSeries.Sequence name="Card — the goal" durationInFrames={36}>
          <TextCard>
            EL RETO
            <br />
            <span style={{ color: YELLOW }}>90 DÍAS</span>
          </TextCard>
        </TransitionSeries.Sequence>

        <TransitionSeries.Sequence name="Gym — jersey" durationInFrames={30}>
          <Video
            src={staticFile("reels/IMG_3828 2.mov")}
            trimBefore={60}
            objectFit="cover"
            style={fill}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Sequence name="Gym — bench" durationInFrames={30}>
          <Video
            src={staticFile("reels/IMG_4195.MOV")}
            trimBefore={30}
            objectFit="cover"
            style={fill}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Sequence name="Gym — floor" durationInFrames={26}>
          <Video
            src={staticFile("reels/IMG_4109 2.MOV")}
            trimBefore={30}
            objectFit="cover"
            style={fill}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Sequence name="Food" durationInFrames={34}>
          <Video
            src={staticFile("reels/IMG_3819 2.MOV")}
            trimBefore={30}
            objectFit="cover"
            style={fill}
          />
          <Caption>COMIDA LIMPIA</Caption>
        </TransitionSeries.Sequence>

        <TransitionSeries.Sequence name="Outside gym" durationInFrames={28}>
          <Video
            src={staticFile("reels/IMG_4137 2.MOV")}
            trimBefore={45}
            objectFit="cover"
            style={fill}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Sequence name="Football" durationInFrames={26}>
          <Video
            src={staticFile("reels/IMG_3984 2.MOV")}
            trimBefore={10}
            objectFit="cover"
            style={fill}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Sequence name="Car" durationInFrames={26}>
          <Video
            src={staticFile("reels/IMG_2777 2.mov")}
            trimBefore={45}
            objectFit="cover"
            style={fill}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Sequence name="Close — talking" durationInFrames={60}>
          <Video
            src={staticFile("reels/IMG_4240.mov")}
            trimBefore={60}
            objectFit="cover"
            style={fill}
          />
          <Caption>
            <span style={{ color: YELLOW }}>DÍA 1 / 90</span>
          </Caption>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

export const TransformationComposition: React.FC = () => {
  return (
    <Composition
      id="Transformation"
      component={Transformation}
      durationInFrames={424}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
