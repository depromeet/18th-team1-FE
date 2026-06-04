import type { Meta, StoryObj } from "@storybook/nextjs";
import { Logo } from "./logo";

const meta: Meta<typeof Logo> = {
  title: "Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    width: { control: "number" },
    height: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    width: 125,
    height: 43,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <div className="flex flex-col gap-1">
        <span className="caption2 text-muted-foreground">Small (58×20)</span>
        <Logo width={58} height={20} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="caption2 text-muted-foreground">Medium (125×43)</span>
        <Logo width={125} height={43} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="caption2 text-muted-foreground">Large (200×69)</span>
        <Logo width={200} height={69} />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <div className="flex flex-col gap-1">
        <span className="caption2 text-muted-foreground">key-secondary2 (기본)</span>
        <Logo width={125} height={43} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="caption2 text-muted-foreground">foreground</span>
        <Logo width={125} height={43} className="text-foreground" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="caption2 text-muted-foreground">key-primary</span>
        <Logo width={125} height={43} className="text-key-primary" />
      </div>
      <div className="flex flex-col gap-1 rounded-xl bg-foreground p-4">
        <span className="caption2 text-background">gray-0 (다크 배경)</span>
        <Logo width={125} height={43} className="text-gray-0" />
      </div>
    </div>
  ),
};
