import type { Meta, StoryObj } from "@storybook/nextjs";

import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <Checkbox defaultChecked />
          <span className="caption2 text-muted-foreground">checked</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Checkbox />
          <span className="caption2 text-muted-foreground">unchecked</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Checkbox defaultChecked disabled />
          <span className="caption2 text-muted-foreground">checked disabled</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Checkbox disabled />
          <span className="caption2 text-muted-foreground">unchecked disabled</span>
        </div>
      </div>
    </div>
  ),
};
