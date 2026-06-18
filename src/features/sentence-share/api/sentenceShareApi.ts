import { httpClient } from "@/shared/api/http-client";

export type SentenceCardVariant = 1 | 2 | 3;

const COVER_IMAGE_URL = "https://image.aladin.co.kr/product/38850/38/cover200/k562137707_1.jpg";

interface SentenceCardImageParams {
  variant: SentenceCardVariant;
  createdAt: string;
  quote: string;
  title: string;
  author: string;
}

export const fetchSentenceCardImage = ({
  variant,
  createdAt,
  quote,
  title,
  author,
}: SentenceCardImageParams): Promise<Blob> => {
  const params = new URLSearchParams({ type: String(variant), createdAt, quote, title, author });
  if (variant === 3) {
    params.set("coverImageUrl", COVER_IMAGE_URL);
  }
  return httpClient.getBlob(`/images/share/quote?${params.toString()}`);
};
