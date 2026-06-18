import { DiscoverFeed } from "@/widgets/discover-feed";
import { DiscoverSearchResults } from "@/widgets/discover-search-results";

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

const DiscoverPage = async ({ searchParams }: PageProps): Promise<React.ReactElement> => {
  const { search } = await searchParams;

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      {search !== undefined ? <DiscoverSearchResults initialQuery={search} /> : <DiscoverFeed />}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-35 bg-linear-to-b from-transparent to-white" />
    </div>
  );
};

export default DiscoverPage;
