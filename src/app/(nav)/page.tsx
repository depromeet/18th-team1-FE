import { Logo } from "@/shared/ui/logo";
import { HomeDiarySection } from "@/widgets/home";

const HomePage = () => (
  <div className="relative flex min-h-0 flex-1 flex-col">
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-gray-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
      <header className="sticky top-0 z-10 flex items-center bg-linear-to-b from-white from-[54.31%] to-transparent px-5 py-4.75">
        <Logo className="text-key-secondary2" />
      </header>
      <HomeDiarySection />
    </div>
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-35 bg-linear-to-b from-transparent to-white" />
  </div>
);

export default HomePage;
