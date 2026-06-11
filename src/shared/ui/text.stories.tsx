import type { Meta, StoryObj } from "@storybook/nextjs";

import { Text } from "./text";

const meta: Meta<typeof Text> = {
  title: "Text",
  component: Text,
  parameters: { layout: "padded" },
  args: {
    children: "책 속 한 문장이 오늘의 하루를 바꾼다",
    variant: "body1",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "title1",
        "title2",
        "head0",
        "head1",
        "head2",
        "head3",
        "subhead1",
        "subhead2",
        "subhead3",
        "subhead4",
        "subhead5",
        "subhead6",
        "body1",
        "body2-1",
        "body2",
        "body3",
        "caption1",
        "caption2",
        "point1",
        "point1-2",
        "point2",
        "point3",
      ],
    },
    color: {
      control: "select",
      options: [
        "gray-0",
        "gray-50",
        "gray-100",
        "gray-200",
        "gray-300",
        "gray-400",
        "gray-500",
        "gray-600",
        "gray-700",
        "key-primary",
        "key-secondary",
        "key-secondary",
        "sub-saturday",
        "sub-sunday",
      ],
    },
    as: {
      control: "select",
      options: ["p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "label"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(
        [
          "title1",
          "title2",
          "head0",
          "head1",
          "head2",
          "head3",
          "subhead1",
          "subhead2",
          "subhead3",
          "subhead4",
          "subhead5",
          "subhead6",
          "body1",
          "body2-1",
          "body2",
          "body3",
          "caption1",
          "caption2",
        ] as const
      ).map((variant) => (
        <Text key={variant} variant={variant} color="gray-700">
          [{variant}] 책 속 한 문장이 오늘의 하루를 바꾼다
        </Text>
      ))}
      {(["point1", "point1-2", "point2", "point3"] as const).map((variant) => (
        <Text key={variant} variant={variant} color="gray-700">
          [{variant}] 1234567890@
        </Text>
      ))}
    </div>
  ),
};

export const WithColor: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text variant="subhead1" color="gray-700">
        gray-700
      </Text>
      <Text variant="subhead1" color="gray-400">
        gray-400
      </Text>
      <Text variant="subhead1" color="gray-300">
        gray-300
      </Text>
      <Text variant="subhead1" color="key-primary">
        key-primary
      </Text>
      <Text variant="subhead1" color="key-secondary">
        key-secondary
      </Text>
      <Text variant="subhead1" color="sub-saturday">
        sub-saturday
      </Text>
      <Text variant="subhead1" color="sub-sunday">
        sub-sunday
      </Text>
    </div>
  ),
};
