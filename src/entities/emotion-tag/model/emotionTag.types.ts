export interface ToneTag {
  id: number;
  label: string;
  type: "TONE";
}

export interface EmotionTag {
  id: number;
  label: string;
  type: "EMOTION";
}

export interface EmotionTagsResponse {
  tags: EmotionTag[];
}

export interface ToneTagsResponse {
  tags: ToneTag[];
}
