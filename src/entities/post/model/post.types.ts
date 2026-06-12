export interface PostAuthor {
  id: string;
  nickname: string;
  avatarUrl?: string;
}

export interface PostBook {
  title: string;
  author: string;
  coverImageUrl?: string;
}

export type PostMood = "good" | "mid" | "bad";

export interface Post {
  id: string;
  author: PostAuthor;
  content: string;
  book: PostBook;
  date: string;
  mood: PostMood;
  emotionTag: string;
  toneTag: string;
  isBookmarked: boolean;
  createdAt: string;
}

export interface PostListResponse {
  posts: Post[];
}
