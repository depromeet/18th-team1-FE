export type OAuthProvider = "KAKAO" | "GOOGLE";

export interface UserProfile {
  id: number;
  provider: OAuthProvider;
  email: string | null;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
}
