export type OAuthProvider = "KAKAO" | "GOOGLE";

export interface UpdateProfileRequest {
  nickname?: string;
  profileImageId?: number;
}

export interface UserProfile {
  id: number;
  provider: OAuthProvider;
  email: string | null;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
}

export interface UserSignupDate {
  signupDate: string;
}
