import type { Meta, StoryObj } from "@storybook/nextjs";

import { CalendarShareCardDrawer } from "./CalendarShareCardDrawer";

const meta: Meta<typeof CalendarShareCardDrawer> = {
  title: "features/calendar-share/CalendarShareCardDrawer",
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
type Story = StoryObj<typeof CalendarShareCardDrawer>;

export const Default: Story = {
  render: () => <CalendarShareCardDrawer isOpen year={2026} month={6} onClose={() => {}} />,
};
