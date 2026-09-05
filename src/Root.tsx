import "./index.css";
import { ContactSheetComposition } from "./ContactSheet";
import { ReelComposition } from "./Reel";
import { ReferenceStripComposition } from "./ReferenceStrip";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <ReelComposition />
      <ContactSheetComposition />
      <ReferenceStripComposition />
    </>
  );
};
