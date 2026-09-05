import "./index.css";
import { ContactSheetComposition } from "./ContactSheet";
import { ReelComposition } from "./Reel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <ReelComposition />
      <ContactSheetComposition />
    </>
  );
};
