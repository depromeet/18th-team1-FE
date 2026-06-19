import Image from "next/image";
import { IcProfileS } from "@/shared/ui/icons";
import type { PostAuthor } from "../model/post.types";

interface PostAuthorProfileProps {
  author: PostAuthor;
  createdAt: string;
  variant?: "default" | "light";
}

export const PostAuthorProfile = ({
  author,
  createdAt,
  variant = "default",
}: PostAuthorProfileProps): React.ReactElement => (
  <div className="flex items-center gap-2">
    <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-key-primary-0">
      {author.avatarUrl ? (
        <Image src={author.avatarUrl} alt={author.nickname} fill className="object-cover" />
      ) : (
        <IcProfileS width={12} height={15} className="text-key-primary" />
      )}
    </div>
    <div className="flex items-center gap-1">
      <span className={`caption1 ${variant === "light" ? "text-gray-50" : "text-gray-600"}`}>
        {author.nickname}
      </span>
      <span className="caption3 text-gray-300">{createdAt}</span>
    </div>
  </div>
);
