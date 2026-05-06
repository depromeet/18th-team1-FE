import { MOCK_DIARIES } from "@/mock";
import { Logo } from "@/shared/ui/Logo";
import { HomeDiarySection, HomeScrollContainer } from "@/widgets/home";

const HomePage = (): React.ReactElement => (
  <HomeScrollContainer>
    <header className="sticky top-0 z-10 flex items-center bg-linear-to-b from-white from-[54.31%] to-transparent px-5 py-4.75">
      <Logo className="text-key-secondary2" />
    </header>
    <HomeDiarySection diaries={MOCK_DIARIES} />
  </HomeScrollContainer>
);

export default HomePage;
