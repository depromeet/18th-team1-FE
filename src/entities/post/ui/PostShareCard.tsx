import type { Post } from "../model/post.types";

interface PostShareCardProps {
  post: Post;
}

export const PostShareCard = ({ post }: PostShareCardProps): React.ReactElement => (
  <div className="flex h-[378px] w-[260px] flex-col overflow-hidden rounded-[16px] drop-shadow-[0px_2px_15px_rgba(0,0,0,0.1)]">
    {/* Date header */}
    <div className="flex h-[47px] shrink-0 items-center bg-key-secondary px-[18px]">
      <span className="point3 text-white">{post.date}</span>
    </div>

    {/* Quote content */}
    <div className="relative flex-1 overflow-hidden bg-white">
      <p className="head4 absolute left-[17px] top-[21px] w-[225px] text-key-secondary">
        {post.content}
      </p>
    </div>

    {/* Color accent strip */}
    <div className="h-3 w-full shrink-0 bg-key-point" />

    {/* Book banner */}
    <div className="flex h-[52px] shrink-0 items-center bg-key-primary px-[18px]">
      <span className="body2 text-key-secondary">
        {`『${post.book.title}』, ${post.book.author}`}
      </span>
    </div>
  </div>
);
