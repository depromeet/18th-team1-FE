import type { Meta, StoryObj } from "@storybook/nextjs";
import { BookmarkButton } from "@/features/post-bookmark";
import { MOCK_POSTS } from "../model/mock";
import { PostAuthorProfile } from "./PostAuthorProfile";
import { PostListItem } from "./PostListItem";

const meta: Meta = {
  title: "entities/post/PostListItem",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-93.75 px-5">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

const renderItem = (index: number) => {
  // biome-ignore lint/style/noNonNullAssertion: index is always valid in this story file
  const post = MOCK_POSTS[index]!;
  return (
    <PostListItem>
      <PostListItem.Header>
        <PostAuthorProfile author={post.author} createdAt={post.createdAt} />
        <BookmarkButton isBookmarked={post.isBookmarked} onToggle={() => {}} />
      </PostListItem.Header>
      <PostListItem.Body>
        <PostListItem.Content content={post.content} book={post.book} />
        <PostListItem.Tags emotionTag={post.emotionTag} toneTag={post.toneTag} mood={post.mood} />
      </PostListItem.Body>
    </PostListItem>
  );
};

export const MoodGood: Story = {
  render: () => renderItem(0),
};

export const MoodMid: Story = {
  render: () => renderItem(1),
};

export const MoodBad: Story = {
  render: () => renderItem(2),
};

export const AllMoods: Story = {
  render: () => (
    <div>
      {MOCK_POSTS.slice(0, 3).map((post) => (
        <PostListItem key={post.id}>
          <PostListItem.Header>
            <PostAuthorProfile author={post.author} createdAt={post.createdAt} />
            <BookmarkButton isBookmarked={post.isBookmarked} onToggle={() => {}} />
          </PostListItem.Header>
          <PostListItem.Body>
            <PostListItem.Content content={post.content} book={post.book} />
            <PostListItem.Tags
              emotionTag={post.emotionTag}
              toneTag={post.toneTag}
              mood={post.mood}
            />
          </PostListItem.Body>
        </PostListItem>
      ))}
    </div>
  ),
};
