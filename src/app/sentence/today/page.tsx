import { SentenceTodayView } from "@/widgets/sentence-select";

interface PageProps {
  searchParams: Promise<{ phase?: string }>;
}

const SentenceTodayPage = async ({ searchParams }: PageProps): Promise<React.ReactElement> => {
  const params = await searchParams;
  return <SentenceTodayView initialPhase={params.phase === "card" ? "card" : "date"} />;
};

export default SentenceTodayPage;
