import { DiaryCompleteView } from "@/features/diary-complete";

interface DiaryCompletePageProps {
  params: Promise<{ id: string }>;
}

// TODO: API 연동 시 params.id로 일기 조회 후 DiaryCompleteView에 데이터 전달
const DiaryCompletePage = async ({
  params,
}: DiaryCompletePageProps): Promise<React.ReactElement> => {
  const { id } = await params;
  return <DiaryCompleteView diaryId={id} />;
};

export default DiaryCompletePage;
