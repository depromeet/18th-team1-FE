import type { Meta, StoryObj } from "@storybook/nextjs";

import { IcBack } from "./IcBack";
import { IcBookmark } from "./IcBookmark";
import { IcCalendar } from "./IcCalendar";
import { IcCheck } from "./IcCheck";
import { IcEdit } from "./IcEdit";
import { IcGoogle } from "./IcGoogle";
import { IcHome } from "./IcHome";
import { IcKakao } from "./IcKakao";
import { IcOption } from "./IcOption";
import { IcReport } from "./IcReport";
import { IcSearch } from "./IcSearch";
import { IcSetting } from "./IcSetting";
import { IcShare } from "./IcShare";
import { IcTrash } from "./IcTrash";
import type { IconProps } from "./icon.types";

const meta: Meta = {
  title: "Icons",
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "number", min: 12, max: 64, step: 4 },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── 전체 목록 ─────────────────────────────────────────────────────────────────

export const AllIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <section>
        <p className="caption1 text-muted-foreground mb-4">variant (default / line)</p>
        <div className="flex flex-col gap-4">
          {(
            [
              { name: "IcHome", icon: IcHome },
              { name: "IcCalendar", icon: IcCalendar },
            ] as const
          ).map(({ name, icon: Icon }) => (
            <div key={name} className="flex items-center gap-6">
              <span className="caption2 text-muted-foreground w-24">{name}</span>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <Icon size={24} className="text-foreground" variant="default" />
                  <span className="caption2 text-muted-foreground">default</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Icon size={24} className="text-foreground" variant="line" />
                  <span className="caption2 text-muted-foreground">line</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <p className="caption1 text-muted-foreground mb-4">단일 스타일</p>
        <div className="flex flex-wrap gap-6">
          {(
            [
              { name: "IcBack", icon: IcBack },
              { name: "IcCheck", icon: IcCheck },
              { name: "IcEdit", icon: IcEdit },
              { name: "IcOption", icon: IcOption },
              { name: "IcReport", icon: IcReport },
              { name: "IcSearch", icon: IcSearch },
              { name: "IcSetting", icon: IcSetting },
              { name: "IcShare", icon: IcShare },
              { name: "IcTrash", icon: IcTrash },
            ] as const
          ).map(({ name, icon: Icon }) => (
            <div key={name} className="flex flex-col items-center gap-1">
              <Icon size={24} className="text-foreground" />
              <span className="caption2 text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};

// ─── variant 아이콘 ────────────────────────────────────────────────────────────

export const IcHomeStory: Story = {
  name: "IcHome",
  render: (args: IconProps) => (
    <div className="flex items-center gap-4">
      <IcHome {...args} variant="default" className="text-foreground" />
      <IcHome {...args} variant="line" className="text-foreground" />
    </div>
  ),
  args: { size: 24 },
};

export const IcCalendarStory: Story = {
  name: "IcCalendar",
  render: (args: IconProps) => (
    <div className="flex items-center gap-4">
      <IcCalendar {...args} variant="default" className="text-foreground" />
      <IcCalendar {...args} variant="line" className="text-foreground" />
    </div>
  ),
  args: { size: 24 },
};

export const IcBookmarkStory: Story = {
  name: "IcBookmark",
  render: (args: IconProps) => (
    <div className="flex items-center gap-4">
      <IcBookmark {...args} variant="default" className="text-foreground" />
      <IcBookmark {...args} variant="line" className="text-foreground" />
    </div>
  ),
  args: { size: 24 },
};

// ─── 단일 스타일 아이콘 ────────────────────────────────────────────────────────

export const IcBackStory: Story = {
  name: "IcBack",
  render: (args: IconProps) => <IcBack {...args} className="text-foreground" />,
  args: { size: 24 },
};

export const IcCheckStory: Story = {
  name: "IcCheck",
  render: (args: IconProps) => <IcCheck {...args} className="text-foreground" />,
  args: { size: 24 },
};

export const IcEditStory: Story = {
  name: "IcEdit",
  render: (args: IconProps) => <IcEdit {...args} className="text-foreground" />,
  args: { size: 24 },
};

export const IcOptionStory: Story = {
  name: "IcOption",
  render: (args: IconProps) => <IcOption {...args} className="text-foreground" />,
  args: { size: 24 },
};

export const IcReportStory: Story = {
  name: "IcReport",
  render: (args: IconProps) => <IcReport {...args} className="text-foreground" />,
  args: { size: 24 },
};

export const IcSearchStory: Story = {
  name: "IcSearch",
  render: (args: IconProps) => <IcSearch {...args} className="text-foreground" />,
  args: { size: 24 },
};

export const IcSettingStory: Story = {
  name: "IcSetting",
  render: (args: IconProps) => <IcSetting {...args} className="text-foreground" />,
  args: { size: 24 },
};

export const IcShareStory: Story = {
  name: "IcShare",
  render: (args: IconProps) => <IcShare {...args} className="text-foreground" />,
  args: { size: 24 },
};

export const IcTrashStory: Story = {
  name: "IcTrash",
  render: (args: IconProps) => <IcTrash {...args} className="text-foreground" />,
  args: { size: 24 },
};

export const IcKakaoStory: Story = {
  name: "IcKakao",
  render: (args: IconProps) => <IcKakao {...args} className="text-foreground" />,
  args: { size: 24 },
};

export const IcGoogleStory: Story = {
  name: "IcGoogle",
  render: (args: IconProps) => <IcGoogle {...args} className="text-foreground" />,
  args: { size: 24 },
};
