import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";

import type { ShareType } from "../model/calendar-share.types";
import { CalendarShareTypeSheet } from "./CalendarShareTypeSheet";

const meta: Meta<typeof CalendarShareTypeSheet> = {
  title: "features/calendar-share/CalendarShareTypeSheet",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div
        className="relative mx-auto overflow-hidden bg-muted"
        style={{ width: 375, height: 812 }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CalendarShareTypeSheet>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<ShareType | null>(null);
    return (
      <>
        <div className="flex h-full items-center justify-center">
          <span className="body3 text-gray-400">
            {selected ? `선택됨: ${selected}` : "시트가 열린 상태"}
          </span>
        </div>
        <CalendarShareTypeSheet isOpen onSelect={(type) => setSelected(type)} onClose={() => {}} />
      </>
    );
  },
};
