import { Suspense } from "react";

import { EmotionSelectView } from "@/widgets/emotion-select";

const EmotionPage = (): React.ReactElement => (
  <Suspense>
    <EmotionSelectView />
  </Suspense>
);

export default EmotionPage;
