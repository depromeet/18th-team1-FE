import type { PostMood } from "../model/post.types";

type PostTagVariant = PostMood | "share";

interface PostTagProps {
  label: string;
  variant: PostTagVariant;
}

const variantStyles: Record<PostTagVariant, string> = {
  good: "bg-key-primary-0 text-key-primary-100",
  mid: "bg-key-point-0 text-key-point-100",
  bad: "bg-key-secondary-0 text-key-secondary",
  share: "bg-gray-600 text-white",
};

export const PostTag = ({ label, variant }: PostTagProps): React.ReactElement => (
  <span
    className={`caption2 inline-flex items-center rounded-full px-2 py-1 ${variantStyles[variant]}`}
  >
    {label}
  </span>
);
