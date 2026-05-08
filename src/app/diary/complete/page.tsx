import { redirect } from "next/navigation";

import { DiaryCompleteView } from "@/features/diary-complete";

interface DiaryCompletePageProps {
  searchParams: Promise<{ diaryId?: string }>;
}

const DiaryCompletePage = async ({
  searchParams,
}: DiaryCompletePageProps): Promise<React.ReactElement> => {
  const { diaryId } = await searchParams;
  const parsedId = Number(diaryId);
  if (!parsedId) redirect("/");
  return <DiaryCompleteView diaryId={parsedId} />;
};

export default DiaryCompletePage;
