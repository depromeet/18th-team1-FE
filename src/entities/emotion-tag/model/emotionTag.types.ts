export interface ToneTag {
  id: number;
  label: string;
  type: "TONE";
}

export interface EmotionTag {
  id: number;
  label: string;
  type: "EMOTION";
  emotionRangeId: number;
}

export interface NeedTag {
  id: number;
  label: string;
  type: "NEED";
}

export interface EmotionTagsResponse {
  tags: EmotionTag[];
}

export interface ToneTagsResponse {
  tags: ToneTag[];
}

export interface NeedTagsResponse {
  tags: NeedTag[];
}
