import { SentenceShareView } from "@/widgets/sentence-share";

interface PageProps {
  searchParams: Promise<{ phase?: string }>;
}

const SentenceSharePage = async ({ searchParams }: PageProps): Promise<React.ReactElement> => {
  const params = await searchParams;
  return <SentenceShareView initialPhase={params.phase === "card" ? "card" : "date"} />;
};

export default SentenceSharePage;
