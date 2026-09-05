import "./index.css";
import { ContactSheetComposition } from "./ContactSheet";
import { ReelComposition } from "./Reel";
import { ReferenceStripComposition } from "./ReferenceStrip";
import { TransformationComposition } from "./Transformation";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <TransformationComposition />
      <ReelComposition />
      <ContactSheetComposition />
      <ReferenceStripComposition />
    </>
  );
};
