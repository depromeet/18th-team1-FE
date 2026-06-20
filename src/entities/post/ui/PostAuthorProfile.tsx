import Image from "next/image";
import { IcProfileDefault } from "@/shared/ui/icons";
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
    <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full">
      {author.avatarUrl ? (
        <Image src={author.avatarUrl} alt={author.nickname} fill className="object-cover" />
      ) : (
        <IcProfileDefault size={32} />
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
