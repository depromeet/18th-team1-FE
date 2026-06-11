import { useRouter } from "next/navigation";

export const useDiscoverSearch = () => {
  const router = useRouter();

  const navigateToSearch = (query = "") => {
    router.push(`/discover?search=${encodeURIComponent(query)}`);
  };

  return { navigateToSearch };
};
