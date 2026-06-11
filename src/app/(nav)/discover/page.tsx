import { DiscoverFeed } from "@/widgets/discover-feed";
import { DiscoverSearchResults } from "@/widgets/discover-search-results";

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

const DiscoverPage = async ({ searchParams }: PageProps): Promise<React.ReactElement> => {
  const { search } = await searchParams;

  if (search !== undefined) {
    return <DiscoverSearchResults initialQuery={search} />;
  }

  return <DiscoverFeed />;
};

export default DiscoverPage;
