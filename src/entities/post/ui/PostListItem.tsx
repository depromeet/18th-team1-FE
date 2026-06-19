"use client";

import type { PostBook, PostMood } from "../model/post.types";
import { PostTag } from "./PostTag";

// ── Root ─────────────────────────────────────────────────────────────────────

const Root = ({ children }: { children: React.ReactNode }): React.ReactElement => (
  <div className="flex flex-col gap-4 border-b border-border bg-background py-5">{children}</div>
);

// ── Header ────────────────────────────────────────────────────────────────────
// 좌측(프로필)과 우측(액션)을 자유롭게 조합. BookmarkButton 등 feature 컴포넌트는
// 상위 레이어(widget)에서 주입하므로 entity가 feature를 직접 참조하지 않음.

const Header = ({ children }: { children: React.ReactNode }): React.ReactElement => (
  <div className="flex items-center justify-between">{children}</div>
);

// ── Body ──────────────────────────────────────────────────────────────────────
// 클릭 가능한 영역. <button>으로 구현해 Header의 BookmarkButton과 중첩 방지.

const Body = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}): React.ReactElement => (
  <button type="button" onClick={onClick} className="flex w-full flex-col gap-4 text-left">
    {children}
  </button>
);

// ── Content ───────────────────────────────────────────────────────────────────

interface ContentProps {
  content: string;
  book: PostBook;
}

const Content = ({ content, book }: ContentProps): React.ReactElement => (
  <div className="flex flex-col gap-2">
    <p className="subhead4 text-gray-700">{content}</p>
    <p className="caption2 text-gray-600">{`『${book.title}』, ${book.author}`}</p>
  </div>
);

// ── Tags ──────────────────────────────────────────────────────────────────────

interface TagsProps {
  emotionTag?: string;
  toneTag?: string;
  mood: PostMood;
}

const Tags = ({ emotionTag, toneTag, mood }: TagsProps): React.ReactElement => (
  <div className="flex gap-2">
    {toneTag && <PostTag label={toneTag} variant={mood} />}
    {emotionTag && <PostTag label={emotionTag} variant={mood} />}
  </div>
);

// ── Compound export ───────────────────────────────────────────────────────────

export const PostListItem = Object.assign(Root, { Header, Body, Content, Tags });
