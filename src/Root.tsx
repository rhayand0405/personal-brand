import "./index.css";
import { ContactSheetComposition } from "./ContactSheet";
import { Day0Composition } from "./Day0";
import { ReelComposition } from "./Reel";
import { ReferenceStripComposition } from "./ReferenceStrip";
import { TransformationComposition } from "./Transformation";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Day0Composition />
      <TransformationComposition />
      <ReelComposition />
      <ContactSheetComposition />
      <ReferenceStripComposition />
    </>
  );
};
