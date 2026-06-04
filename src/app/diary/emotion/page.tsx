import { Suspense } from "react";

import { EmotionStepView } from "@/features/diary-emotion";

const EmotionPage = () => (
  <Suspense>
    <EmotionStepView />
  </Suspense>
);

export default EmotionPage;
