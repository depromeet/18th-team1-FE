import type { Meta, StoryObj } from "@storybook/nextjs";

import type { SentenceTag } from "@/entities/sentence";
import { IcShare3 } from "@/shared/ui/icons";
import { Header } from "@/widgets/header";

import { SentenceCardPhase } from "./SentenceCardPhase";

const MOCK_TAGS: SentenceTag[] = [
  { id: 1, label: "자책하고 싶은", type: "emotion", emotionRangeId: 1 },
  { id: 2, label: "위로받고 싶은", type: "tone", emotionRangeId: 2 },
  { id: 3, label: "기대되는", type: "tone", emotionRangeId: 3 },
];

const DEFAULT_PROPS = {
  month: "June",
  date: "Friday 13",
  quote: "세상에는 두 종류의 고통이 있다.\n너를 아프게 하는 고통과 너를 변하게하는 고통",
  bookTitle: "『아픔이 길이 되려면』",
  bookAuthor: "김승섭",
  leftButton: { label: "확인", isMuted: false, onClick: () => {} },
  rightButton: {
    label: "공유하기",
    icon: <IcShare3 size={24} className="text-gray-0" />,
    onClick: () => {},
  },
} as const;

const meta: Meta = {
  title: "features/sentence-select/SentenceCardPhase",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div
        className="relative mx-auto overflow-hidden bg-background"
        style={{ width: 375, height: 812 }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <SentenceCardPhase {...DEFAULT_PROPS} header={<Header onBack={() => {}} />} tags={MOCK_TAGS} />
  ),
};

export const ManyTags: Story = {
  render: () => (
    <SentenceCardPhase
      {...DEFAULT_PROPS}
      header={<Header onBack={() => {}} />}
      tags={[
        ...MOCK_TAGS,
        { id: 4, label: "외로운", type: "emotion", emotionRangeId: 4 },
        { id: 5, label: "쓸쓸한", type: "tone", emotionRangeId: 5 },
      ]}
    />
  ),
};
